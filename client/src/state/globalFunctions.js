import { setCategories } from "state";

export const getCategoriesArray = async (dispatch) => {
  const x = await (
    await fetch(`${process.env.REACT_APP_SERVER}` + "/FixData.json")
  ).json();
  dispatch(setCategories(x.category));
};
