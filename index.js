const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/facebook");
}

//INDEX ROUTE
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  //   console.log(chats);
  res.render("index.ejs", { chats });
});

//New Route
app.get("/chats/new", (req, res) => {
  //render(sending) data to frontend
  res.render("new.ejs");
});

//Create Route
app.post("/chats", (req, res) => {
  //receiving data from frontend
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  //saving data to database
  newChat
    .save()
    .then((res) => {
      console.log("saved");
    })
    .catch((err) => {
      console.log(err);
    });
  //back to the same page
  res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let UpdatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  console.log(UpdatedChat);
  res.redirect("/chats");
});

//Destroy Route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("root is working");
});

app.listen(8080, () => {
  console.log("server is listining to port numner 8080");
});
