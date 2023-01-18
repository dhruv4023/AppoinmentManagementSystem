export const register = async (values) => {
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  formData.append("picturePath", values.picPath.name);
  const savedUserResponse = await fetch(
    `${process.env.REACT_APP_SERVER}/auth/register`,
    {
      method: "POST",
      body: formData,
    }
  );
  const savedUser = await savedUserResponse.json();
  return savedUser.email;
};

export const login = async (values, dispatch, setLogin, navigate) => {
  const loggedInResponse = await fetch(
    `${process.env.REACT_APP_SERVER}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const loggedIn = await loggedInResponse.json();
  if (loggedIn.exist) {
    dispatch(
      setLogin({
        user: loggedIn.user,
        token: loggedIn.token,
      })
    );
    navigate("/");
  } else {
    alert(loggedIn.mess);
  }
};
// console.log(process.env.REACT_APP_SERVER);
export const changePass = async (values) => {
  // console.log(values);
  const changePassResponse = await fetch(
    `${process.env.REACT_APP_SERVER}/auth/changepass`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const savedUser = await changePassResponse.json();
  alert(savedUser.msg);
};

export const getUserNames = async (setUserNames) => {
  const res = await fetch(`${process.env.REACT_APP_SERVER}/auth/usernames`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  setUserNames(data);
};
