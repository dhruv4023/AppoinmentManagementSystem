import { setServiceData } from "state";
export const sendServiceData = async (data) => {
  const { token, values, dispatch } = data;
  // console.log(values);
  const res = await fetch(`${process.env.REACT_APP_SERVER}/service/post`, {   
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const servData = await res.json();
  if (!servData.mess) {
    dispatch(
      setServiceData({
        serviceData: servData,
      })
    );
  } else {
    alert(servData.mess);
  }
};

export const getAllServices = async (dispatch, username) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/service/get/${username}`,
    {   
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const servData = await res.json();
  if (!servData.mess) {
    dispatch(
      setServiceData({
        serviceData: servData,
      })
    );
  } else {
    alert(servData.mess);
  }
};
