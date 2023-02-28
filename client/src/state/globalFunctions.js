import { setCategories } from "state";

export const getCategoriesArray = async (dispatch) => {
  const x = await (
    await fetch(`${process.env.REACT_APP_SERVER}` + "/FixData.json")
  ).json();
  dispatch(setCategories(x.category));
};

export const DDMMYYYY = (YYYYMMDD) => {
  const a = YYYYMMDD.split("-");
  return a[2] + "/" + a[1] + "/" + a[0];
};

