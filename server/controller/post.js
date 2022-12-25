import Post from "../models/post.js";
import User from "../models/user.js";
export const createPostControl = async (req, res) => {
  try {
    const { userId, description, picPath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      picPath,
      location: user.location,
      description,
      likes,
      Comments,
    });
    await newPost.save();
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json();
  }
};

export const getFeedPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json();
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { UserId } = req.params;
    const posts = await Post.find({ UserId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(409).json();
  }
};
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.find({ id });
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json();
  }
};
