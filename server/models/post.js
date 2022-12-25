import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    picPath: String,
    location: String,
    description: String,
    likes: { type: Map, of: Boolean },
    Comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("posts", postSchema);
