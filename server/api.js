const express = require("express");
const res = require("express/lib/response");
const apiRouter = express.Router();
const db = require("./db");

// Routes for /api/minions
apiRouter.get("/minions", (req, res, next) => {
  const minions = db.getAllFromDatabase("minions");
  res.status(200).json(minions);
});

apiRouter.post("/minions", (req, res, next) => {
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
  const deleted = db.deleteFromDatabasebyId("minions", req.params.minionId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send("Minion not found");
  }
});

// Routes for /api/ideas
apiRouter.get("/ideas", (req, res, next) => {
  const ideas = db.getAllFromDatabase("ideas");
  res.status(200).json(ideas);
});

apiRouter.post("/ideas", (req, res, next) => {
  const newIdea = req.body;
  const createdIdea = db.addToDatabase("ideas", newIdea);
  res.status(201).json(createdIdea);
});

apiRouter.get("/ideas/:ideaId", (req, res, next) => {
  const idea = db.getFromDatabaseById("ideas", req.params.ideaId);
  if (idea) {
    res.status(200).json(idea);
  } else {
    res.status(404).send("Idea not found");
  }
});

apiRouter.put("/ideas/:ideaId", (req, res, next) => {
  const updatedIdea = req.body;
  updatedIdea.id = req.params.ideaId;
  const result = db.updateInstanceInDatabase("ideas", updatedIdea);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send("Idea not found");
  }
});

apiRouter.delete("/ideas/:ideaId", (req, res, next) => {
  const deleted = db.deleteFromDatabasebyId("ideas", req.params.ideaId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send("Idea not found");
  }
});

// Routes for /api/meetings
apiRouter.get("/meetings", (req, res, next) => {
  const meetings = db.getAllFromDatabase("meetings");
  res.status(200).json(meetings);
});

apiRouter.post("/meetings", (req, res, next) => {
  const newMeeting = db.createMeeting();
  res.status(201).json(newMeeting);
});

apiRouter.delete("/meetings", (req, res, next) => {
  const deleted = db.deleteAllFromDatabase("meetings");
  res.status(204).send();
});

module.exports = apiRouter;
