const express =require("express");
// import bodyParser from "body-parser";
const bodyParser =require("body-parser");
const cors=require("cors");
const SerClient=require("@elastic/elasticsearch");

// import cors from "cors";
// import { Client } from "@elastic/elasticsearch";

const app = express();
const PORT = process.env.PORT || 3000;

// Elasticsearch client
const elasticClient = new SerClient.Client({
  node: "https://906d39f3126d433cb8e2e7df047ccb1d.us-central1.gcp.cloud.es.io:443",
  CloudID:
    "my_deployment:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDkwNmQzOWYzMTI2ZDQzM2NiOGUyZTdkZjA0N2NjYjFkJDBkOWZkMGY5NjQ0NzQwZjliY2NlM2M3Yjk5OWI5NjFl",
  auth: {
    apiKey: "STQ2eDRZc0JnbTdSWnI0R1hMNzY6N0g3UjJ5OWVUXzJac3NlQ3pKX1Bsdw==",
  },
  auth: {
    username: "elastic",
    password: "MY2pBcyvPu2QthdMxagZyHyW",
  },
});

// Middleware to enable CORS
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Route to handle log ingestion via POST requests
app.post("/", async (req, res) => {
  const logData = req.body;
  console.log("Received log data:", logData);

  try {
    // Index the log data into Elasticsearch
    const result = await elasticClient.helpers.bulk({
      datasource: logData,
      pipeline: "ent-search-generic-ingestion",
      onDocument: (doc) => ({ index: { _index: "project-logs" } }),
    });


   
    res.status(200).send(result);
  } catch (error) {
    console.error("Error:", error.meta ? error.meta.body : error);
    res.status(500).send("Error indexing log data.");
  }
});

app.post("/search", async (req, res) => {
  const logData = req.body;
  console.log("Received log data:", logData);
  const query = {
    bool: {
      must: []
    }
  };
  

  if (logData.level) {
    query.bool.must.push({
      match: {
        level: logData.level
      }
    });
  }
  
  if (logData.message) {
    query.bool.must.push({
      match: {
        message: logData.message
      }
    });
  }
  
  if (logData.resourceId) {
    query.bool.must.push({
      match: {
        resourceId: logData.resourceId
      }
    });
  }

  //   Search in the 'search-logs' index with the built query
  const searchResult = await elasticClient.search({
    index: "project-logs",
    query






  });
  console.log("starting result api")
  console.log(searchResult.hits.hits);
  res.status(200).send(searchResult.hits.hits);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Ingestion Server is running on port ${PORT}`);
}); 
