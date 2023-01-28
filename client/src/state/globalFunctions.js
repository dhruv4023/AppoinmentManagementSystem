import { setCategories } from "state";

export const getCategoriesArray = async (dispatch) => {
  const x = await (
    await fetch("http://localhost:5612" + "/FixData.json")
  ).json();
  dispatch(setCategories(x.category));
};
