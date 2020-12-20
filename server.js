const express = require("express");
const app = express();

app.get("/api/info", (req, res) => {
  res.json({
    name: "tom",
  });
});

app.listen(3000);
