import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { setLogin } from "state";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "Components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexEvenly from "Components/FlexEvenly";
import {
  getUserNames,
  login,
  updateProfile,
} from "./LoginRegisterChangePass";
import { SelectLocation } from "../../Components/MyComponents";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import Loading from "Components/Loader/Loading";
const Form = ({ pgType, editProfile, user }) => {
  const initialValuesRegister = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    about: "",
    password: "",
    picPath: "",
    location: {
      state: "Gujarat",
      // district: "",
      city: "",
      pincode: "",
    },
  };
  const initialValuesLogin = {
    email: "",
    password: "",
  };
  const { palette } = useTheme();

  const [pageType, setPageType] = useState(pgType);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "Login";
  const isRegister = pageType === "Register";

  const [values, setValues] = useState(
    isLogin ? initialValuesLogin : editProfile ? user : initialValuesRegister
  );
  const onChangehandle = (val, name) => {
    // e.preventDefault();
    // console.log(name,val);
    let tmp = { ...values };
    tmp[name] = val;
    setValues(tmp);
  };
  const imgChangeHandl = (fl, name) => {
    let tmp = values;
    tmp[name] = fl;
    setValues(tmp);
  };
  const token = useSelector((s) => s.token);
  // console.log(token);
  // console.log(values);
  const [userNames, setUserNames] = useState();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editProfile) values["_id"] = true;
    if (isLogin) await login(values, dispatch, setLogin, navigate);
    else if (userNames?.includes(values.username))
      alert("Plz Select Unique Username");
    else if (editProfile && values.email === user.email) {
      updateProfile(values, dispatch, token, navigate);
    } else navigate("/verifyemail", { state: values });
    // else if (isRegister && !editProfile)
    //   register(values);
    // } else if (editProfile) {
    //   updateProfile(values, dispatch, token, navigate);
    // }
  };
  const resetForm = () => {
    setValues(!isLogin ? initialValuesLogin : initialValuesRegister);
  };

  const [getUserNamesOnce, setGetUserNamesOnce] = useState(false);
  useEffect(() => {
    !editProfile && isRegister && getUserNames(setUserNames);
  }, [getUserNamesOnce]);
  const [addPic, setAddPic] = useState(false);
  return (
    <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
      {isRegister && (
        <FlexEvenly>
          <TextField
            required
            label="First Name"
            onChange={(e) => onChangehandle(e.target.value, "firstName")}
            name="firstName"
            value={values.firstName}
            sx={{ margin: "0.5rem", width: "100%" }}
          />
          <TextField
            required
            label="Last Name"
            onChange={(e) => onChangehandle(e.target.value, "lastName")}
            name="lastName"
            value={values.lastName}
            sx={{ margin: "0.5rem", width: "100%" }}
          />
        </FlexEvenly>
      )}
      <FlexEvenly flexDirection="column" margin={"0 .5rem 0 .5rem"}>
        <TextField
          required
          type={isRegister ? "email" : "text"}
          label={isLogin ? "Email or Username" : "Email"}
          onChange={(e) => onChangehandle(e.target.value, "email")}
          value={values.email}
          name="email"
          sx={{ margin: "0.5rem", width: "100%" }}
        />
        {!editProfile && (
          <TextField
            required
            label="Password"
            type="password"
            onChange={(e) => onChangehandle(e.target.value, "password")}
            value={values.password}
            name="password"
            sx={{ margin: "0.5rem", width: "100%" }}
          />
        )}
        {isRegister && (
          <>
            {editProfile ? (
              <TextField
                disabled={editProfile}
                value={values.username}
                sx={{ margin: "0.5rem", width: "100%" }}
              />
            ) : userNames ? (
              <TextField
                disabled={editProfile}
                required
                label="Username"
                error={userNames?.includes(values.username) && !editProfile}
                onChange={(e) => onChangehandle(e.target.value, "username")}
                value={values.username}
                name="username"
                helperText={"Enter Unique Username"}
                sx={{ margin: "0.5rem", width: "100%" }}
              />
            ) : (
              <Loading />
            )}
            <TextField
              required
              label="About"
              onChange={(e) => onChangehandle(e.target.value, "about")}
              name="about"
              value={values.about}
              sx={{ margin: "0.5rem", width: "100%" }}
            />
            <FlexBetween width={"100%"}>
              <IconButton
                onClick={() => {
                  setAddPic(!addPic);
                  imgChangeHandl("", "picPath");
                }}
              >
                {addPic ? <CheckBox /> : <CheckBoxOutlineBlank />}
              </IconButton>
              <Typography flexGrow={"1"}>
                {addPic
                  ? "click to off Picture Option"
                  : "click to on Picture Option"}
              </Typography>
            </FlexBetween>
            {addPic && (
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
                    imgChangeHandl(acceptedFiles[0], "picPath");
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
            )}
          </>
        )}
      </FlexEvenly>

      {isRegister && (
        <>
          <SelectLocation
            location={values?.location}
            inputValues={onChangehandle}
          />
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
          {isLogin ? "LOGIN" : editProfile ? "Save Changes" : "REGISTER"}
        </Button>
        {!editProfile && (
          <Typography
            onClick={() => {
              setPageType(isLogin ? "Register" : "Login");
              setGetUserNamesOnce(true);
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
        )}{" "}
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
