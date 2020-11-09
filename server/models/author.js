const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const authorSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  biz: {
    type: Boolean,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

authorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, biz: this.biz },
    config.get("jwtKey")
  );
  return token;
};

const Author = mongoose.model("author", authorSchema);

function validateauthor(author) {
  const schema = Joi.object({
    authorName: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
    biz: Joi.boolean().required(),
  });

  return schema.validate(author);
}

exports.Author = Author;
exports.validate = validateauthor;
