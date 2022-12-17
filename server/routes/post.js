const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");
const requireLogin = require("../middleware/requireLogin");

router.get("/allpost", requireLogin, async (req, res) => {
  await Post.find()
    .populate("postedBy", "_id name") //populate method is used for showing user details with posts
    //here only id and name we want to show so passed as 2nd parameter
    .then((posts) => {
      return res
        .status(200)
        .json({ message: "Successfully got all posts", posts });
    })
    .catch((err) => {
      return console.log(err);
    });
});

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(400).json({ message: "please add all the fields" });
  }
  //    console.log(req.user);
  req.user.password = undefined; // for don't showing the user password
  const post = new Post({
    title,
    body,
    photo: pic,
    Date: new Date().toLocaleDateString(),
    postedBy: req.user,
  });

  post
    .save()
    .then((result) => {
      return res
        .status(200)
        .json({ message: "post careated sucessfulley", result });
    })
    .catch((err) => {
      return console.log(err);
    });
});

router.get("/mypost", requireLogin, async (req, res) => {
  await Post.find({ postedBy: req.user.id })
    .populate("postedBy", "_id name")
    .then((myPost) => {
      return res.status(200).json({
        message: "got my post",
        myPost,
      });
    })
    .catch((err) => {
      return console.log(err);
    });
});

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({ message: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

module.exports = router;
