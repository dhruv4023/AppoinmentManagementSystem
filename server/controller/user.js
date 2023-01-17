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

