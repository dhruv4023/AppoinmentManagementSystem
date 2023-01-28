export const getServDataDashBordAndBook = async (UID,SID,setServData) => {
  const res = await fetch(`${process.env.REACT_APP_SERVER}/appointment/get/${UID}/${SID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  setServData(data);
};
