export const saveAppointmentData = async ({ details, SID }) => {
  //   console.log(Details);
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/post/${SID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    }
  );
  const rs = await res.json();
  alert(rs.msg);
  return rs.id;
};
export const checkWhetherAppointmentAlredyBooked = async ({
  contactNumber,
  SID,
}) => {
  //   console.log(Details);
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/checkWhetherAppointmentAlredyBooked/${SID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactNumber }),
    }
  );
  const rs = await res.json();
  rs.alredyBooked && alert(rs.msg);
  return rs.alredyBooked;
};

export const getBookedDtTm = async (setBookedDtTm, id) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/getbookedtime/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  setBookedDtTm(data);
  // setUserNames(user ? data.filter((f) => f !== user.username) : data);
};
export const getSingleBookedData = async (
  setUserAppointmentData,
  AID,
  UAID
) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/getbookeddata/${AID}/${UAID}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  data && setUserAppointmentData(data);
};
