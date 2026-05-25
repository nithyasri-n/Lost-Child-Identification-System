const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let children = [];

app.get("/children",(req,res)=>{
  res.json(children);
});

app.post("/children",(req,res)=>{
  let child = {
    id: Date.now().toString(),
    ...req.body
  };
  children.push(child);

  // notification simulation
  console.log("NEW CHILD ADDED:", child);

  res.json(child);
});

app.delete("/children/:id",(req,res)=>{
  children = children.filter(c=>c.id!==req.params.id);
  res.json({msg:"deleted"});
});

app.listen(5000,()=>{
  console.log("Server running on port 5000");
});