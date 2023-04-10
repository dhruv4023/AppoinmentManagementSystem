export const saveAppointmentData = async ({ details, sid }) => {
  details["dateTime"] = { time: details["time"], date: details["date"] };
  delete details["time"];
  delete details["date"];
  // console.log(details);
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/post/${sid}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    }
  );
  const rs = await res.json();
  // console.log(rs);
  alert(rs.msg);
  return rs.id;
};
export const checkWhetherAppointmentAlredyBooked = async ({
  contactNumber,
  sid,
}) => {
  //   console.log(Details);
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/checkWhetherAppointmentAlredyBooked/${sid}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactNumber }),
    }
  );
  const rs = await res.json();
  // console.log(rs);
  rs.alredyBooked && alert(rs.msg);
  return rs.alredyBooked;
};

export const getRemainingSlotes = async (id) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER}/appointment/getremainingtimeslotes/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return data;
  // setUserNames(user ? data.filter((f) => f !== user.username) : data);
};
