const express = require("express");
const apiRouter = express.Router();
const db = require("./db");

// Routes for /api/minions
apiRouter.get("/minions", (req, res, next) => {
  const minions = db.getAllFromDatabase("minions");
  res.status(200).json(minions);
});

module.exports = apiRouter;
