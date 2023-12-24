const express = require("express")
const app = express()
const port = 5500
const morgan = require('morgan');



// Middleware for logging

app.use(morgan("combined"));

// Middleware for parsing request bodies
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for handling CORS
const cors = require("cors");
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
// Start the server
app.listen(port, () => {
  console.log(`My Server listening on port ${port}`);
});

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("This Web server is processed for MongoDB");
});

// Connect to MongoDB
// ...

// Connect to MongoDB
const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
const database = client.db("Job-portal");
const ProductCollection = database.collection("Product"); // Change this line

const JobPostingCollection = database.collection("JobPosting"); // Change this line
const SkillCollection = database.collection("Skill"); // Change this line


const AccountCollection = database.collection("User"); // Change this line
app.post("/api/addskill", cors(), async (req, res) => {
  await SkillCollection.insertOne(req.body);
  let data = {
    result: req.body,
    status: 1
  }
  res.send(data);

});
app.post("/api/login", cors(), async (req, res) => {

  const checkdata = await AccountCollection.findOne({ username: req.body.username })
  if (checkdata) {
    let data = {
      status: "success",
      role: checkdata.role,
      result: checkdata

    }
    res.send(data);
  }


});
app.post("/api/register", cors(), async (req, res) => {
  const checkdata = await AccountCollection.findOne({ username: req.body.username })
  console
  if (checkdata) {
    let data = {
      status: 0
    }
    res.send(data);
  }
  else {
    await AccountCollection.insertOne(req.body);
    let data = {
      result: req.body,
      status: 1
    }
    res.send(data);
  }

});
app.post("/api/createdJob", cors(), async (req, res) => {

  await JobPostingCollection.insertOne(req.body);
  let data = {
    result: req.body,
    status: 1
  }
  res.send(data);

});
app.get("/api/allskill", cors(), async (req, res) => {
  const result = await SkillCollection.find({}).toArray();
  res.send(result);
});
// app.get("/products/product/:id", cors(), async (req, res) => {
//   try {
//     const productId = req.params.id;

//     // Ensure productId is a valid ObjectId
//     if (!ObjectId.isValid(productId)) {
//       return res.status(400).json({ error: 'Invalid product ID' });
//     }

//     const result = await ProductCollection.findOne({ _id: new ObjectId(productId) });

//     if (!result) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });

// app.get("/products/categories", cors(), async (req, res) => {
//   try {
//     // Use distinct to get unique categories
//     const categories = await ProductCollection.distinct("category");

//     // Send the array of categories as the response
//     res.json(categories);
//   } catch (error) {
//     // Handle errors
//     res.status(500).send(error.message);
//   }
// });

