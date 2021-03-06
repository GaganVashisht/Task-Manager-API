const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");
// task post
router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
   await  task.save();
   // await task.populate("owner").execPopulate();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
// task get  
//task?completed=(true||false) filteration
// limit , skip for pagination
// limit=10 show 10 result, skip=num means skip num results and show next results
// task?sortBy=createdAt_asc||desc 
router.get("/tasks", auth, async (req, res) => {
  try {
    // const task = await Task.find({ owner: req.user._id });
    // res.send(task);
   const match= {}
   if(req.query.completed)
      match.completed=req.query.completed==="true";
   const sort={}
   if(req.query.sortBy){
     const parts=req.query.sortBy.split(":")
      sort[parts[0]]=parts[1]==="asc"?1:-1;
    }
    
    await req.user.populate({
      path:"tasks",
      match,
      options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort
      }
    }).execPopulate();
     res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
});
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({
      _id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send("Not found");
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) return res.send(400).send("error : Invalid updates");
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) res.status(404).send();
    
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
    
  } catch (error) {
    res.status(400).send();
  }
});

router.delete("/tasks/:id",auth, async (req, res) => {
  try {
    //console.log("sd");
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task=await Task.findOneAndDelete({
      _id:req.params.id,
      owner: req.user._id
    })
    if (!task) return res.status(404).send();

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
