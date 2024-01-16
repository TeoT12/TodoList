import {} from "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

  
let todayTasks = [];
let workTasks = [];


app.get("/", async (req, res) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var today = new Date();
  const day = today.toLocaleDateString("en-US", options);
  res.render("index.ejs", { tasks: todayTasks, day: day });
});

app.post('/', (req, res) => {
  let newItem = req.body["newItem"];
  todayTasks.push(newItem);
   res.redirect("/");
})

app.post("/today", (req, res) => {
  res.redirect("/");
});

app.post("/work", (req, res) => {
  let newTask = req.body["newTask"];
  workTasks.push(newTask);
  res.render("index2.ejs", { tasks: workTasks });
});


app.post("/work-list", (req, res) => {
  res.render("index2.ejs", { tasks: workTasks });
}); 

app.listen(process.env.PORT || 3000);
