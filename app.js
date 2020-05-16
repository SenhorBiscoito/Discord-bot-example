const express = require("express");
const discord = require("./discord.js");
const PORT = process.env.PORT || "8080"
const app = express();

discord.init();

app.get("/", (req, res) => {
  res.json({ status: "bot-online" });
});

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
