const mongoose = require("mongoose");

let CommentsSchema = mongoose.Schema({
  commentBody: {
    type: String,
    require: true,
    minLength: 3,
    trim: true,
  },
  CREATED_AT: {
    type: String,
    require: true,
    trim: true,
  },
  CREATED_HOUR: {
    type: String,
    require: true,
    trim: true,
  },
  userID: {
    type: String,
    require: true,
    trim: true,
  },
  productID: {
    type: String,
    require: true,
    trim: true,
  },
  isReply: {
    type: Boolean,
    require: true,
  },
  replyID: {
    type: String,
    require: true,
  },
  isAccept: {
    type: Boolean,
    require: true,
  }
});

let Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
