export const register = async (values) => {
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  formData.append("picturePath", values.picPath.name);
  const savedUserResponse = await fetch("http://localhost:5612/auth/register", {
    method: "POST",
    body: formData,
  });
  const savedUser = await savedUserResponse.json();
  return savedUser.email;
};

export const login = async (values, dispatch, setLogin, navigate) => {
  const loggedInResponse = await fetch("http://localhost:5612/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const loggedIn = await loggedInResponse.json();
  console.log(loggedIn.exist);
  if (loggedIn.exist) {
    dispatch(
      setLogin({
        user: loggedIn.user,
        token: loggedIn.token,
      })
    );
    navigate("/home");
  }
};
