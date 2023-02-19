export const getSinglebookedData = async (AID) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/getsinglebookeddata/${AID}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return (data);
};
