import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { setLogin } from "state";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "Components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexEvenly from "Components/FlexEvenly";
import { getUserNames, login } from "./LoginRegisterChangePass";
const Form = () => {
  // const RegisterSchema = yup.object().shape({
  //   firstName: yup.string(), //.required("required"),
  //   lastName: yup.string(), //.required("required"),
  //   email: yup.string().email("Invalid Email").required("required"),
  //   password: yup.string().required("required"),
  //   location: yup.string(), //.required("required"),
  //   occupation: yup.string(), //.required("required"),
  //   picPath: yup.string(), //.required("required"),
  // });

  // const LoginSchema = yup.object().shape({
  //   email: yup.string().email("Invalid Email").required("required"),
  //   password: yup.string().required("required"),
  // });
  const initialValuesRegister = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    about: "",
    password: "",
    picPath: "",
    state: "Gujarat",
    district: "",
    city: "",
    pincode: "",
  };
  const initialValuesLogin = {
    email: "",
    password: "",
  };
  const { palette } = useTheme();

  const [pageType, setPageType] = useState("Login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "Login";
  const isRegister = pageType === "Register";

  const [values, setValues] = useState(
    isLogin ? initialValuesLogin : initialValuesRegister
  );
  const onChangehandle = (e, name) => {
    let tmpData = e.target === undefined ? e : e.target.value;
    let tmp = {};
    for (let value in values)
      tmp[value] = value === name ? tmpData : values[value];
    setValues(tmp);
  };
  // console.log(values)
  const [userNames, setUserNames] = useState();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) await login(values, dispatch, setLogin, navigate);
    if (isRegister) {
      if (userNames.includes(values.username))
        alert("Plz Select Unique Username");
      else navigate("/verifyemail", { state: values });
    }
  };
  const resetForm = () => {
    setValues(!isLogin ? initialValuesLogin : initialValuesRegister);
  };

  useEffect(() => {
    // isRegister &&
    getUserNames(setUserNames);
  }, []);
  return (
    <form onSubmit={handleFormSubmit}>
      {isRegister && (
        <FlexEvenly>
          <TextField
            required
            label="First Name"
            onChange={(e) => onChangehandle(e, "firstName")}
            name="firstName"
            sx={{ margin: "0.5rem", width: "100%" }}
          />
          <TextField
            required
            label="Last Name"
            onChange={(e) => onChangehandle(e, "lastName")}
            name="lastName"
            sx={{ margin: "0.5rem", width: "100%" }}
          />
        </FlexEvenly>
      )}
      <FlexEvenly flexDirection="column" margin={"0 .5rem 0 .5rem"}>
        <TextField
          required
          type={isRegister ? "email" : "text"}
          label={isLogin ? "Email or Username" : "Email"}
          onChange={(e) => onChangehandle(e, "email")}
          value={values.email}
          name="email"
          sx={{ margin: "0.5rem", width: "100%" }}
        />

        <TextField
          required
          label="Password"
          type="password"
          onChange={(e) => onChangehandle(e, "password")}
          value={values.password}
          name="password"
          sx={{ margin: "0.5rem", width: "100%" }}
        />
        {isRegister && (
          <>
            <TextField
              required
              label="Username"
              error={userNames.includes(values.username)}
              onChange={(e) => onChangehandle(e, "username")}
              value={values.username}
              name="username"
              helperText={"Enter Unique Username"}
              sx={{ margin: "0.5rem", width: "100%" }}
            />{" "}
            <TextField
              required
              label="About"
              onChange={(e) => onChangehandle(e, "about")}
              name="about"
              value={values.about}
              sx={{ margin: "0.5rem", width: "100%" }}
            />
            <Box
              border={`2px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              width={"100%"}
              p="1rem"
              margin={"0.5rem"}
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => {
                  onChangehandle(acceptedFiles[0], "picPath");
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`1px dashed ${palette.primary.main}`}
                    textAlign="center"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {values?.picPath === "" ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography padding={"0.5rem "}>
                          {values.picPath.name}
                        </Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
          </>
        )}
      </FlexEvenly>

      {isRegister && (
        <>
          <FlexEvenly>
            <TextField
              required
              label="State"
              onChange={(e) => onChangehandle(e, "state")}
              name="state"
              value={values.state}
              disabled={true}
              sx={{ margin: "0.5rem", width: "100%" }}
            />
            <TextField
              required
              label="District"
              onChange={(e) => onChangehandle(e, "district")}
              name="district"
              value={values.district}
              sx={{ margin: "0.5rem", width: "100%" }}
            />
          </FlexEvenly>
          <FlexEvenly>
            <TextField
              required
              label="City"
              onChange={(e) => onChangehandle(e, "city")}
              name="city"
              value={values.city}
              sx={{ margin: "0.5rem", width: "100%" }}
            />
            <TextField
              required
              label="Pincode"
              onChange={(e) => onChangehandle(e, "pincode")}
              name="pincode"
              value={values.pincode}
              sx={{ margin: "0.5rem", width: "100%" }}
            />
          </FlexEvenly>
        </>
      )}
      <Box>
        <Button
          fullWidth
          type="submit"
          sx={{
            m: "2rem 0",
            p: "1rem",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}
        >
          {isLogin ? "LOGIN" : "REGISTER"}
        </Button>
        <Typography
          onClick={() => {
            setPageType(isLogin ? "Register" : "Login");
            resetForm();
          }}
          sx={{
            textDecoration: "underline",
            color: palette.primary.main,
            "&:hover": {
              cursor: "pointer",
              color: palette.primary.light,
            },
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up here."
            : "Already have an account? Login here."}
        </Typography>
        {isLogin && (
          <Typography
            onClick={() => {
              navigate("/changepass", { state: { page: "enteremail" } });
            }}
            sx={{
              textDecoration: "underline",
              color: palette.primary.main,
              "&:hover": {
                cursor: "pointer",
                color: palette.primary.light,
              },
            }}
          >
            Forgot Password ?
          </Typography>
        )}
      </Box>
    </form>
  );
};
export default Form;
