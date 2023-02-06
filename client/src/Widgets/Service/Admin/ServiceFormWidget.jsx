import { CloseOutlined } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import FlexEvenly from "Components/FlexEvenly";
import WidgetWrapper from "Components/WidgetWrapper";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendServiceData } from "./WidgetAdminServiceFun";

// const initialValues = {
//   category: "",
//   description: "",
//   timeRange: "",
//   username: "",
//   state: "",
//   district: "",
//   city: "",
//   pincode: "",
// };

const timeSlote = (duration, startTime, endTime) => {
  var timeStops = [];
  while (startTime <= endTime) {
    timeStops.push(new moment(startTime).format("HH:mm"));
    startTime.add(duration, "minutes");
  }
  return timeStops;
};
const serviceTime = () => {
  var startTime = moment().utc().set({ hour: 6, minute: 0 });
  var endTime = moment().utc().set({ hour: 21, minute: 59 });
  return timeSlote("60", startTime, endTime);
};
const breakTime = () => {
  var startTime = moment().utc().set({ hour: 11, minute: 0 });
  var endTime = moment().utc().set({ hour: 14, minute: 59 });
  return timeSlote("60", startTime, endTime);
};

const ServiceFormWidget = ({ setCrudServData, CrudServData }) => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const [values, setValues] = useState(CrudServData.data);
  const token = useSelector((s) => s.token);
  const { palette } = useTheme();
  const categories = useSelector((s) => s.categories);

  const onChangehandle = (e, name) => {
    e.preventDefault()
    let tmp = { ...values };
    tmp[name] = e.target.value;
    setValues(tmp);
  };
  console.log(values);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.category) {
      sendServiceData({ token, values, dispatch });
    }
    setCrudServData({
      openForm: false,
    });
  };
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={"primary"} variant="h3" textAlign={"center"}>
          {CrudServData.data._id ? (
            <>Update Service Data</>
          ) : (
            <>Create New Service</>
          )}
        </Typography>
        <IconButton
          onClick={() =>
            setCrudServData({
              openForm: false,
            })
          }
        >
          <CloseOutlined />
        </IconButton>
      </FlexBetween>
      <form onSubmit={handleSubmit}>
        <FlexBetween
          maxWidth={isNonMobileScreens ? "70%" : "100%"}
          m={"auto"}
          flexDirection={"column"}
        >
          <FormControl sx={{ my: ".5rem", width: "100%" }}>
            <InputLabel id="category">Category</InputLabel>
            <Select
              required
              onChange={(e) => onChangehandle(e, "category")}
              value={values.category}
              labelId={"category"}
              label={"category"}
            >
              {categories.map((m) => (
                <MenuItem value={m} key={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            sx={{ margin: "0.5rem .5rem", width: "100%" }}
            onChange={(e) => onChangehandle(e, "serviceName")}
            value={values.serviceName}
            label={"Service Name"}
          />
          <FlexEvenly sx={{ my: "0.5rem" }} width={"100%"}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="category">Service Start Time</InputLabel>
              <Select
                required
                sx={{ marginRight: "0.3rem" }}
                onChange={(e) => onChangehandle(e, "serviceStartTime")}
                value={values.serviceStartTime}
                label={"Service Start Time"}
              >
                {serviceTime()?.map((m) => (
                  <MenuItem value={m} key={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="category">Service End Time</InputLabel>
              <Select
                required
                sx={{ marginLeft: "0.3rem" }}
                onChange={(e) => onChangehandle(e, "serviceEndTime")}
                value={values.serviceEndTime}
                label={"Service End Time"}
              >
                {serviceTime()?.map((m) => (
                  <MenuItem value={m} key={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FlexEvenly>
          <FlexEvenly sx={{ my: "0.5rem" }} width={"100%"}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="category">Break Start Time</InputLabel>
              <Select
                required
                sx={{ marginRight: "0.3rem" }}
                onChange={(e) => onChangehandle(e, "breakStartTime")}
                value={values.breakStartTime}
                label={"Break Start Time"}
              >
                {breakTime()?.map((m) => (
                  <MenuItem value={m} key={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="category">Break End Time</InputLabel>
              <Select
                required
                sx={{ marginLeft: "0.3rem" }}
                onChange={(e) => onChangehandle(e, "breakEndTime")}
                value={values.breakEndTime}
                label={"Break End Time"}
              >
                {breakTime()?.map((m) => (
                  <MenuItem value={m} key={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FlexEvenly>
          <FormControl sx={{ my: ".5rem", width: "100%" }}>
            <InputLabel id="category">Appointment Duration</InputLabel>
            <Select
              required
              onChange={(e) => onChangehandle(e, "appoinmentTime")}
              value={values.appoinmentTime}
              label={"Appointment Duration"}
            >
              {["15", "60", "30", "45", "90", "120"]?.map((m) => (
                <MenuItem value={m} key={m}>
                  {m} min
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            sx={{ margin: "0.5rem", width: "100%" }}
            label={"Description"}
            value={values.description}
            onChange={(e) => onChangehandle(e, "description")}
          />
          <FlexBetween gap={"1rem"} width={"100%"} margin={"0.5rem"}>
            <TextField
              required
              label="State"
              onChange={(e) => onChangehandle(e, "state")}
              name="state"
              value={values.state}
              disabled={true}
              sx={{ width: "100%" }}
            />
            <TextField
              required
              label="District"
              onChange={(e) => onChangehandle(e, "district")}
              name="district"
              value={values.district}
              sx={{ width: "100%" }}
            />
          </FlexBetween>
          <FlexBetween gap={"1rem"} m={"0.5rem"} width={"100%"}>
            <TextField
              required
              label="City"
              onChange={(e) => onChangehandle(e, "city")}
              name="city"
              value={values.city}
              sx={{ width: "100%" }}
            />
            <TextField
              required
              label="Pincode"
              onChange={(e) => onChangehandle(e, "pincode")}
              name="pincode"
              value={values.pincode}
              sx={{ width: "100%" }}
            />
          </FlexBetween>
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
            {CrudServData.data._id ? <>Update Data</> : <>Create Service</>}
          </Button>
        </FlexBetween>
      </form>
    </WidgetWrapper>
  );
};

export default ServiceFormWidget;