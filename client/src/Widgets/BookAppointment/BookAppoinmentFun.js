export const saveAppointmentData = async ({ Details, id }) => {
//   console.log(Details);
    const res = await fetch(
      `${process.env.REACT_APP_SERVER}/appointment/post/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Details),
      }
    );
    const rs = await res.json();
    //   console.log(msg);
    alert(rs.msg);
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
