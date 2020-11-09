const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Author, validate } = require("../models/author");
const auth = require("../middleware/auth");
const router = express.Router();
const config = require("config");

// development author(=admin) login details
const loginAuthorName = config.get("authorName");
const loginPassword = config.get("password");


router.get("/me", auth, async (req, res) => {
  const author = await Author.findById(req.author._id).select("-password");
  res.send(author);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  author = new Author(
    _.pick(req.body, ["name", "password", "biz"])
  );
  const salt = await bcrypt.genSalt(10);
  author.password = await bcrypt.hash( loginPassword , salt);
  const validAdminName = (req.body.name ===  loginAuthorName  ) || (req.body.biz === true);
  const validPassword = await bcrypt.compare(req.body.password, author.password);

  if (!validAdminName || !validPassword ) return res.status(400).send('Invalid author name or password.');
  res.json({ token: author.generateAuthToken() });
});

module.exports = router;
