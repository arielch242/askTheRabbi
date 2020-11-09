const express = require("express");
const _ = require("lodash");
const { Card, validateCard, generateqNumber } = require("../models/card");
const auth = require("../middleware/auth");
const e = require("cors");
const router = express.Router();

router.delete("/:id", auth, async (req, res) => {
  const card = await Card.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
});

router.get("/:id", auth, async (req, res) => {
  const card = await Card.findOne({
    _id: req.params.id,
  })
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
});

router.get("/", auth, async (req, res) => {
  const cards = await Card.find({});
  res.send(cards);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = await Card.findOneAndUpdate(
    { _id: req.params.id, 
    },
    req.body
  );
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");

  card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(card);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let card = new Card({
    qName: req.body.qName,
    qTopic: req.body.qTopic,
    qTitle: req.body.qTitle,
    qArticle: req.body.qArticle,
    qAnswer:req.body.qAnswer,
    qNumber: await generateqNumber(Card),
    user_id: req.user._id,
  });
  post = await card.save()
  res.send(post);
});

module.exports = router;
