const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const port = 5000;
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://rifat:rifat123@cluster0.q37go.mongodb.net/all-in-one?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const eventsCollection = client.db("all-in-one").collection("events");
  const registrationCollection = client
    .db("all-in-one")
    .collection("registration");
  // perform actions on the collection object
  console.log(err);
  app.get("/events/:id", (req, res) => {
    const id = req.params.id;
    eventsCollection.find({ _id: ObjectId(id) }).toArray((err, documents) => {
      res.send(documents[0]);
    });
  });

  // app.post("/addEvents", (req, res) => {
  //   const events = req.body;
  //   eventsCollection.insertMany(events, (err, result) => {
  //     console.log(err, result);
  //     res.send({ count: result });
  //   });
  // });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
});

app.listen(port);
