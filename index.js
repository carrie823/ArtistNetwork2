const path = require('path');
const express = require("express");
const multer = require('multer');
const bcrypt = require('bcrypt');
let upload = multer({ dest: path.join(__dirname, 'uploads') });
const { MongoClient, ObjectId } = require("mongodb")

//Mongo
const dbUrl = "mongodb://localhost:27017/artistnetworkdb";
const client = new MongoClient(dbUrl);

//set up Express App
const app = express();
const port = process.env.PORT || 3001;

const http = require("http");
var cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));


const cookie = require('cookie');

const session = require('express-session');
app.use(session({
  secret: 'This is the secret',
  resave: false,
  saveUninitialized: true,
}));


//Authentication
var isAuthenticated = function (req, res, next) {
  if (!req.username) return res.status(401).end("access denied");
  next();
};

app.get("/auth", function (req, response) {
  console.log(req.session.username);
  if (req.session.user) {
    response.status(200).send("success")
  } else {
    response.status(404).send("failure")
  }
})

//Cookie
app.use(function (req, res, next) {
  var cookies = cookie.parse(req.headers.cookie || '');
  req.username = (req.session.user) ? req.session.user._id : ''
  console.log(req)
  console.log("HTTP request", req.username, req.method, req.url, req.body);
  next();
});


//test Express App
app.get("/", async (request, response) => {
  response.status(200).send("Test page1");
  await getUsers();
})

app.get("/artistalley", async (request, response) => {
  response.status(200).send("Test page2");
  await getSales();
})


app.get("/studiospace", async (request, response) => {
  response.status(200).send("Test page4");
  await getArtworks();
})


//Signup
app.post("/signup", function (request, res) {

  let username = request.body.username;
  let password = request.body.password;
  let name = request.body.name;
  let email = request.body.email;
  let copyright = request.body.copyright;

  const saltRound = 10;

  bcrypt.hash(password, saltRound, function (err, hash) {
    client.connect().then(() => {

      db = client.db("artistnetworkdb");
      var collection = db.collection("users");
      let b = { "password": hash, "name": name, "email": email, "username": username, "copyright": copyright }

      collection.insertOne(b).then((r) => {

        if (r) {

          res.status(200)
          return res.json("");
        } else {
          res.status(400)
          return res.json("access denied")
        }
      });

    })

  })
})

//login endpoint
app.post("/login", function (request, response) {

  // b = request.body;

  let body = request.body;
  let password = body.password
  let user = body.username;


  client.connect().then(() => {

    db = client.db("artistnetworkdb");
    var collections = db.collection("users");


    collections.findOne({ "username": user }).then((username) => {

      if (!username) return response.status(401).end("access denied");

      bcrypt.compare(password, username.password, function (err, res) {
        if (res) {
          console.log("TESTUBGWFGIAGW")

          request.session.user = username;
          console.log(username.username)
          response.setHeader('Set-Cookie', cookie.serialize('username', username.username, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          }));
          response.status(200)

          return response.json(username);
        } else {
          response.status(400)
          return response.json("access denied")
        }
      })
    })
  })
})

//Signout 
app.get('/signout', function (req, res, next) {
  req.session.destroy();
  res.setHeader('Set-Cookie', cookie.serialize('username', '', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
  }));
  res.status(200);
  return res.json({});

});


//Artwork sale endpoints
app.get('/api/sale/', function (req, res, next) {
  let page = parseInt(req.query.page)
  db = client.db("artistnetworkdb");
  let collection = db.collection("sales");
  collection.find({}).sort([['_id', -1]]).toArray().then((r) => {
    if (r.length == 0) {
      res.status(404).end();
    }

    if ((page + 1) > r.length || page < 0) {
      return res.status(400).end();
    }

    res.status(200)
    let result = r[page]
    if (result === undefined) {
      return res.json([r[0]])
    }
    return res.json([result])

  })
})


app.get("/api/sale/:id/", function (req, res, next) {
  db = client.db("artistnetworkdb");
  let collection = db.collection("sales");

  collection.find({ _id: new ObjectId(req.params.id) }).toArray().then((r) => {
    res.setHeader('Content-Type', r[0].image.mimetype);
    res.sendFile(r[0].image.path);

  })
})

app.post('/api/images/sales/', isAuthenticated, upload.single('image'), function (req, res, next) {

  let image = { title: req.body.title, "description": req.body.description, "link": req.body.link, "image": req.file, "likes": 0, "username": req.body.username};

  if (req.session.user.username !== req.body.username && req.session.user.username !== "admin") {
    res.status(400)
    return res.json("");
  }

  client.connect().then(() => {

    db = client.db("artistnetworkdb");
    var collection = db.collection("sales");

    collection.insertOne(image).then((r) => {

      if (r) {
        res.status(200)
        return res.json("");
      } else {
        res.status(400)
        return res.json("access denied")
      }
    });

  })


});

app.get('/api/sale/user/:user/', function (req, res, next) {
  let page = parseInt(req.query.page)
  let userCookie = req.params.user;
  db = client.db("artistnetworkdb");
  let collection = db.collection("sales");

  let person = { "username": userCookie };
  if (userCookie === "admin") {
    person = {}
  }

  collection.find(person).sort([['_id', -1]]).toArray().then((r) => {
    console.log("WE MADE IT")
    if (r.length == 0) {
      res.status(404).end()
    }
    if ((page + 1) > r.length || page < 0) {
      return res.status(400).end();
    }

    res.status(200)
    let result = r[page]

    if (result === undefined) {
      return res.json([r[0]])
    }
    return res.json([result])
  })
})

//Artwork endpoints
app.get('/api/art/', function (req, res, next) {
  let page = parseInt(req.query.page)
  let userCookie = req.query.userCookie;

  db = client.db("artistnetworkdb");
  let collection = db.collection("artworks");

  collection.find({}).sort([['_id', -1]]).toArray().then((r) => {
    if (r.length == 0) {
      res.status(404).end()
    }
    if ((page + 1) > r.length || page < 0) {
      return res.status(400).end();
    }

    res.status(200)

    let result = r[page]

    if (result === undefined) {
      return res.json([r[0]])
    }
    return res.json([result])
  })
})


app.get('/api/art/user/:user/', function (req, res, next) {
  let page = parseInt(req.query.page)
  let userCookie = req.params.user;

  db = client.db("artistnetworkdb");
  let collection = db.collection("artworks");

  let person = { "username": userCookie };
  if (userCookie === "admin") {
    person = {}
  }
  collection.find(person).sort([['_id', -1]]).toArray().then((r) => {
    console.log("WE MADE IT")
    if (r.length == 0) {
      res.status(404).end()
    }
    if ((page + 1) > r.length || page < 0) {
      return res.status(400).end();
    }

    res.status(200)

    let result = r[page]

    if (result === undefined) {
      return res.json([r[0]])
    }
    return res.json([result])
  })
})


app.get("/api/art/:id/", function (req, res, next) {
  db = client.db("artistnetworkdb");
  let collection = db.collection("artworks");


  collection.find({ _id: new ObjectId(req.params.id) }).toArray().then((r) => {

    res.setHeader('Content-Type', r[0].image.mimetype);
    res.sendFile(r[0].image.path);
  })
})


app.post('/api/images/arts/', isAuthenticated, upload.single('image'), function (req, res, next) {
  let image = { title: req.body.title, "description": req.body.description, "image": req.file, "likes": 0, "username": req.body.username };

  console.log("Hwe WE GO");
  console.log(req.session.user);
  console.log()

  if (req.session.user.username !== req.body.username && req.session.user.username !== "admin") {
    res.status(400)
    return res.json("");

  }

  console.log("WEDIDIT ")
  client.connect().then(() => {

    db = client.db("artistnetworkdb");
    var collection = db.collection("artworks");

    collection.insertOne(image).then((r) => {

      if (r) {
        res.status(200)
        return res.json("");
      } else {
        res.status(400)
        return res.json("access denied")
      }
    });

  })

});


//Delete endpoints
app.delete('/api/items/:id/', isAuthenticated, (req, res) => {
  let itemId = req.params.id;

  let db = client.db('artistnetworkdb'); // Replace with your database name
  let collection = db.collection('artworks'); // Replace with your collection name

  collection.deleteOne({ _id: new ObjectId(itemId) }).then((result) => {

    if (result.deletedCount === 1) {
      console.log('Item deleted successfully');
      res.sendStatus(200); // Success
    } else {
      console.log('Item not found');
      res.sendStatus(404); // Item not found
    }
  })

});

app.delete('/api/items/sale/:id/', isAuthenticated, (req, res) => {
  let itemId = req.params.id;

  let db = client.db('artistnetworkdb'); // Replace with your database name
  let collection = db.collection('sales'); // Replace with your collection name

  collection.deleteOne({ _id: new ObjectId(itemId) }).then((result) => {

    if (result.deletedCount === 1) {
      console.log('Item deleted successfully');
      res.sendStatus(200); // Success
    } else {
      console.log('Item not found');
      res.sendStatus(404); // Item not found
    }
  })

});

//Edit endpoints
app.put('/api/items/updateart/:id/', isAuthenticated, (req, res) => {
  let itemId = req.params.id;

  let db = client.db('artistnetworkdb'); // Replace with your database name
  let collection = db.collection('artworks'); // Replace with your collection name

  collection.updateOne({ _id: new ObjectId(itemId) }, { $set: req.body }).then((result) => {

    if (result.matchedCount === 1) {
      console.log('Item deleted successfully');
      res.sendStatus(200); // Success
    } else {
      console.log('Item not found');
      res.sendStatus(404); // Item not found
    }
  })

});

app.put('/api/items/updatesale/:id/', isAuthenticated, (req, res) => {
  let itemId = req.params.id;
  console.log(itemId)
  let db = client.db('artistnetworkdb'); // Replace with your database name
  let collection = db.collection('sales'); // Replace with your collection name
  console.log(req.body)
  collection.updateOne({ _id: new ObjectId(itemId) }, { $set: req.body }).then((result) => {
    console.log(result)
    if (result.matchedCount === 1) {
      console.log('Item deleted successfully');
      res.sendStatus(200); // Success
    } else {
      console.log('Item not found');
      res.sendStatus(404); // Item not found
    }
  })

});

app.patch("/api/art/:id/", function (req, res, next) {
  db = client.db("artistnetworkdb");
  let collection = db.collection("artworks");


  collection.find({ _id: new ObjectId(req.params.id) }).toArray().then((r) => {
    r[0].likes = r[0].likes + 1;

    collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { "likes": r[0].likes } }).then((result) => {
      console.log(result)
      if (result.matchedCount === 1) {
        console.log('Item updated successfully');
        res.status(200) // Success
        return res.json(result);
      } else {
        console.log('Item not found');
        res.status(404).end(); // Item not found
      }
    })

  })
})

app.patch("/api/sale/:id/", function (req, res, next) {
  db = client.db("artistnetworkdb");
  let collection = db.collection("sales");

  collection.find({ _id: new ObjectId(req.params.id) }).toArray().then((r) => {
    r[0].likes = r[0].likes + 1;

    collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { "likes": r[0].likes } }).then((result) => {
      console.log(result)
      if (result.matchedCount === 1) {
        console.log('Item updated successfully');
        res.status(200) // Success
        return res.json(result);
      } else {
        console.log('Item not found');
        res.status(404).end(); // Item not found
      }
    })

  })
})

//set up server listening
app.listen(port, () => {

  console.log(`Listening on http://localhost:${port}`);
});

//Mongo Functions
async function conntection() {
  await client.connect();
  db = client.db("artistnetworkdb"); // selecting the artistnetworkdb database
  return db;
}

// Async function to display user document from users collection 
async function getUsers() {
  var db = await conntection();
  var results = db.collection("users").find({});
  console.log(await results.toArray());
  // var res = await results.toArray();
  // return res;
}

// Async function to display artwork document from artworks collection 
async function getArtworks() {
  var db = await conntection();
  var results = db.collection("artworks").find({});
  console.log(await results.toArray());
  // var res = await results.toArray();
  // return res;
}

// Async function to display sale document from sales collection 
async function getSales() {
  var db = await conntection();
  var results = db.collection("sales").find({});
  console.log(await results.toArray());
  // var res = await results.toArray();
  // return res;
}
