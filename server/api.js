const express = require("express");
const res = require("express/lib/response");
const apiRouter = express.Router();
const db = require("./db");

// Routes for /api/minions
apiRouter.get("/minions", (req, res, next) => {
  const minions = db.getAllFromDatabase("minions");
  res.status(200).json(minions);
});

apiRouter.post("/minons", (req, res, next) => {
  const newMinion = req.body;
  const createdMinion = db.addToDatabase("minions", newMinion);
  res.status(201).json(createdMinion);
});

apiRouter.get("/minions/:minionId", (req, res, next) => {
  const minion = db.getFromDatabaseById("minions", req.params.minionId);
  if (minion) {
    res.status(200).json(minion);
  } else {
    res.status(404).send("Minion not found");
  }
});

apiRouter.put("/minions/:minionId", (req, res, next) => {
  const updatedMinion = req.body;
  updatedMinion.id = req.params.minionId;
  const result = db.updateInstanceInDatabase("minions", updatedMinion);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send("Minion not found");
  }
});

apiRouter.delete("/minions/:minionId", (req, res, next) => {
  const deleted = db.deleteAllFromDatabase("minons", req.params.minionId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send("Minion not found");
  }
});

// Routes for /api/ideas

module.exports = apiRouter;
