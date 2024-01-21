const express = require("express");
const CommentsModel = require("../Models/Comments");
const commentsRouter = express.Router();


// ** Get All Comments APi
commentsRouter.get("/all", (req, res) => {
  CommentsModel.find({}).then((allComments) => {
    res.json(allComments);
  });
});

// ** Delete Comment APi
commentsRouter.delete("/delete", (req, res) => {
  let commentID = req.headers.authorization;
  CommentsModel.findByIdAndDelete(`${commentID}`).then((result) => {
    res.send(true);
  });
});

// ** Update Comment APi
commentsRouter.put("/update", (req, res) => {
  let body = req.body;
  let commentID = req.headers.authorization;
  let updateCommentBody = {commentBody : body.commentBody}
  CommentsModel.findByIdAndUpdate(`${commentID}`, updateCommentBody).then((result) => {
    res.send(true);
  });
});

// ** Accept Comment APi
commentsRouter.put("/accept", (req, res) => {
  let body = req.body;
  let commentID = req.headers.authorization;
  let isAcceptComment = {isAccept : true}
  CommentsModel.findByIdAndUpdate(`${commentID}`, isAcceptComment).then((result) => {
    res.send(true);
  });
});

// ** Reject Comment APi
commentsRouter.put("/reject", (req, res) => {
  let body = req.body;
  let commentID = req.headers.authorization;
  let isRejectComment = {isAccept : false}
  CommentsModel.findByIdAndUpdate(`${commentID}`, isRejectComment).then((result) => {
    res.send(true);
  });
});

module.exports = commentsRouter;
