const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);



app.listen(port, () => {
  console.log("Server is up at port " + port);
});
