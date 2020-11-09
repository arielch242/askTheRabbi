const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const cardSchema = new mongoose.Schema({
  qName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  qTopic: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  qTitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  qArticle: {
    type: String ,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  qNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true,
  },
  qAnswer:{
    type:String
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Card = mongoose.model("Card", cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    qName: Joi.string().min(2).max(255).required(),
    qTopic: Joi.string().min(2).max(255).required(),
    qTitle: Joi.string().min(2).max(255).required(),
    qArticle: Joi.string().min(2).max(1024),
    qAnswer:Joi.string().allow(""),
    user_id:Joi.object(),
  });
  return schema.validate(card);
}

async function generateqNumber(Card) {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let card = await Card.findOne({ qNumber: randomNumber });
    if (!card) return String(randomNumber);
  }
}

exports.Card = Card;
exports.validateCard = validateCard;
exports.generateqNumber = generateqNumber;
