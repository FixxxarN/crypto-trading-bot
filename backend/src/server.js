const express = require('express');
const cors = require("cors");
const Bot = require("./bot");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

let bot;

app.get('/initial', (req, res) => {
  bot = new Bot();
  bot.start();
  res.send({ test: 'test' })
})

app.listen(3001);