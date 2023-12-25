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
const ContactCollection = database.collection("Contact"); // Change this line
const JobApplicationCollection = database.collection("JobApplication"); // Change this line


const JobPostingCollection = database.collection("JobPosting"); // Change this line
const SkillCollection = database.collection("Skill"); // Change this line
function isEmpty(object) {
  return Object.keys(object).length === 0
}

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
app.post("/api/contact", cors(), async (req, res) => {

  await ContactCollection.insertOne(req.body);
  let data = {
    result: req.body,
    status: 1
  }
  res.send(data);

});
app.get("/api/alljobApply", cors(), async (req, res) => {
  const result = await JobApplicationCollection.find({}).toArray();;
  res.send(result);
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
app.post("/api/apply", cors(), async (req, res) => {

  await JobApplicationCollection.insertOne(req.body);
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
app.get("/api/myjob/:id", cors(), async (req, res) => {
  const _id = req.params.id;
  console.log("iddd", _id)
  const result = await JobPostingCollection.find({ createdBy: _id }).toArray();
  res.send(result);
});
app.get("/api/inforuser/:id", cors(), async (req, res) => {
  const _iduser = req.params.id;
  const result = await AccountCollection.findOne({ _id: new ObjectId(_iduser) });
  res.send(result);
});


app.get("/api/radomjob", cors(), async (req, res) => {
  const result = await JobPostingCollection.aggregate([{ $sample: { size: 4 } }]).toArray();
  res.send(result);
});
app.post("/api/alljob", cors(), async (req, res) => {
  console.log("req.body", req.body)
  let query = {}
  if (!isEmpty(req.body)) {
    if (!isEmpty(req.body.filter)) {
      if (req.body.filter.location) {
        query = {
          location: req.body.filter.location,
        }
      }
      if (req.body.filter.namejob) {
        query = {
          namejob: new RegExp(req.body.filter.namejob, 'i')
        }
      }
      else {
        // query = {
        //   contract_name: { [Op.like]: `%${req.body.filter.contract_name}%` },
        // }
      }



    }
  }
  console.log("queryquery", query)
  const result = await JobPostingCollection.find(query).toArray();;
  res.send(result);
});
app.get("/api/detailjob/:id", cors(), async (req, res) => {
  const jobId = req.params.id;
  const result = await JobPostingCollection.findOne({ _id: new ObjectId(jobId) });
  res.send(result);
});
app.get("/api/jobdetail_default", cors(), async (req, res) => {
  const result = await JobPostingCollection.aggregate([{ $sample: { size: 1 } }]).toArray();
  // const result = await JobPostingCollection.findOne({ _id: new ObjectId(jobId) });
  res.send(result);
});

app.post("/api/removejob/:id", cors(), async (req, res) => {
  const jobId = req.params.id;
  const result = await JobPostingCollection.deleteOne({ _id: new ObjectId(jobId) });
  res.send(result);
});
app.post("/api/updateaccount/:id", cors(), async (req, res) => {
  const jobId = req.params.id;
  console.log("jobId", jobId)
  console.log("req.body", req.body)
  const result = await AccountCollection.updateOne({ _id: new ObjectId(jobId) }
    , {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email

      }
    }


  );
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

