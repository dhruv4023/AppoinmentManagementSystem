import User from "../models/user.js";
export const getUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json("Cann't get data");
  }
};
export const getUserFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    frdList = frdListFun(user);
    res.status(200).json(frdList);
  } catch (error) {
    res.status(404).json("Can't get data");
  }
};
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, frdId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(frdId);

    if (user.friends.includes(frdId)) {
      user.friends = user.friends.filter((id) => id !== frdId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(frdId);
      friend.friends.push(id);
    }
    await friend.save();
    await user.save();
    frdList = frdListFun(user);
    res.status(200).json(frdList);
  } catch (error) {
    res.status(404).json("Cann't get data");
  }
};

const frdListFun = async (user) => {
  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  );
  const frdList = friends.map(
    ({ _id, firstName, lastName, picPath, location, occupation }) => {
      return { _id, firstName, lastName, picPath, location, occupation };
    }
  );
  return frdList;
};
