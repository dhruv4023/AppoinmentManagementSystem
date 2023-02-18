export const getUser = async (setUser, UID, navigate) => {
  const res = await fetch(`${process.env.REACT_APP_SERVER}/user/get/${UID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  data ? setUser(data) : navigate("/404", { state: "Profile Not Found" });
  return data;
};

export const getFilteredData = async (setFilteredData, values) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/service/getfiltereddata/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const data = await res.json();
  setFilteredData(data);
};
  