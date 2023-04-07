import { setServiceData } from "state";
export const sendServiceData = async (data) => {
  const { token, values, dispatch } = data;
  const res = await fetch(`${process.env.REACT_APP_SERVER}/service/postss`, {
    method: "POST",
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const servData = await res.json();
  if (!servData.msg) {
    dispatch(
      setServiceData({
        serviceData: servData.services,
      })
    );
  } else {
    alert(servData.msg);
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
  // console.log(servData);
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

function appendData(formData, object, parentKey) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof object[key] === "object" && !(object[key] instanceof File)) {
        appendData(formData, object[key], currentKey);
      } else {
        formData.append(currentKey, object[key]);
      }
    }
  }
}
