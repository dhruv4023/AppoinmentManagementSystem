export const getServDataDashBordAndBook = async (UID, sid) => {
  sid = UID + "_" + sid;
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/service/getServDtOnBookPage/${sid}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return (data);
};
