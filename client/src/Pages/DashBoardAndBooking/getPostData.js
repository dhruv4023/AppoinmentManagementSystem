export const getServDataDashBordAndBook = async (UID, SID, setServData) => {
  SID = UID + "_" + SID;
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/service/getServDtOnBookPage/${SID}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  setServData(data);
};
