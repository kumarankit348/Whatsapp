const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/facebook");
}

let allChats = [
  {
    from: "neha",
    to: "puja",
    msg: "share your notes with me",
    created_at: new Date(),
  },
  {
    from: "User1",
    to: "User2",
    msg: "Hello User2!",
    created_at: new Date("2024-01-25T10:00:00Z"),
  },
  {
    from: "User2",
    to: "User1",
    msg: "Hi User1, how are you?",
    created_at: new Date("2024-01-25T10:05:00Z"),
  },
  {
    from: "User1",
    to: "User3",
    msg: "Hey there!",
    created_at: new Date("2024-01-25T11:00:00Z"),
  },
  {
    from: "User3",
    to: "User1",
    msg: "Hi User1, nice to meet you!",
    created_at: new Date("2024-01-25T11:05:00Z"),
  },
  {
    from: "User4",
    to: "User5",
    msg: "Good morning!",
    created_at: new Date("2024-01-25T09:00:00Z"),
  },
  {
    from: "User5",
    to: "User4",
    msg: "Morning, how are you today?",
    created_at: new Date("2024-01-25T09:05:00Z"),
  },
  {
    from: "User6",
    to: "User7",
    msg: "Hello there!",
    created_at: new Date("2024-01-25T12:00:00Z"),
  },
  {
    from: "User7",
    to: "User6",
    msg: "Hi User6, nice to hear from you!",
    created_at: new Date("2024-01-25T12:05:00Z"),
  },
  {
    from: "User8",
    to: "User9",
    msg: "Hey, how have you been?",
    created_at: new Date("2024-01-25T13:00:00Z"),
  },
  {
    from: "User9",
    to: "User8",
    msg: "I've been good, thanks for asking!",
    created_at: new Date("2024-01-25T13:05:00Z"),
  },
];

Chat.insertMany(allChats);
