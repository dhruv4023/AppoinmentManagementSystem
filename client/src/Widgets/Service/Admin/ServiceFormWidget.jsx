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
import { SelectLocation } from "Components/MyComponents";
import WidgetWrapper from "Components/WidgetWrapper";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendServiceData } from "./WidgetAdminServiceFun";
import SelectTime from "./SelectTime";

const ServiceFormWidget = ({ setCrudServData, CrudServData }) => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const [values, setValues] = useState(CrudServData.data);
  const token = useSelector((s) => s.token);
  const { palette } = useTheme();
  const categories = useSelector((s) => s.categories);

  const onChangehandle = (val, name) => {
    // e.preventDefault();
    // console.log(name,val);
    let tmp = { ...values };
    tmp[name] = val;
    setValues(tmp);
  };

  const [holidayss, setHolidayss] = useState([]);
  // console.log(holidayss, values.holidays);
  useEffect(() => {
    values.holidays.map((m) => {
      holidayss.indexOf(m) === -1 && holidayss.push(m);
    }); // setHolidayss(values?.holidays);
  }, []);
  const addRemove = (d) => {
    holidayss.indexOf(d) === -1
      ? holidayss.push(d)
      : holidayss.splice(holidayss.indexOf(d), d);
    setHolidayss(holidayss);
    onChangehandle(holidayss, "holidays");
  };
  // console.log(values.serviceStartTime?.split(":")[0]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.category) {
      sendServiceData({ token, values, dispatch });
    }
    // setCrudServData({
    //   openForm: false,
    // });
  };
  console.log(CrudServData.data);
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={"primary"} variant="h3" textAlign={"center"}>
          {CrudServData.data.sid ? (
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
              onChange={(e) => onChangehandle(e.target.value, "category")}
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
          <FlexBetween
            flexWrap={"wrap"}
            p="0.5rem"
            width="100%"
            borderRadius={"0.2rem"}
            border={"1px solid grey"}
          >
            <Typography>Select Holidays</Typography>
            <FlexEvenly
              flexWrap={"wrap"}
              width="100%"
              borderRadius={"0.2rem"}
              gap={"0.5rem"}
            >
              <Button
                sx={{
                  color:
                    holidayss.filter((x) => x === 0).length === 1 && "green",
                }}
                onClick={() => addRemove(0)}
              >
                S
              </Button>
              <Button
                sx={{
                  color:
                    holidayss.filter((x) => x === 1).length === 1 && "green",
                }}
                onClick={() => addRemove(1)}
              >
                M
              </Button>
              <Button
                sx={{
                  color:
                    holidayss.filter((x) => x === 2).length === 1 && "green",
                }}
                onClick={() => addRemove(2)}
              >
                T
              </Button>
              <Button
                sx={{
                  color:
                    holidayss.filter((x) => x === 3).length === 1 && "green",
                }}
                onClick={() => addRemove(3)}
              >
                W
              </Button>
              <Button
                sx={{
                  color:
                    holidayss.filter((x) => x === 4).length === 1 && "green",
                }}
                onClick={() => addRemove(4)}
              >
                T
              </Button>
              <Button
                sx={{
                  color:
                    holidayss.filter((x) => x === 5).length === 1 && "green",
                }}
                onClick={() => addRemove(5)}
              >
                F
              </Button>
              <Button
                sx={{
                  color:
                    holidayss.filter((x) => x === 6).length === 1 && "green",
                }}
                onClick={() => addRemove(6)}
              >
                S
              </Button>
            </FlexEvenly>
          </FlexBetween>
          <TextField
            required
            sx={{ margin: "0.5rem .5rem", width: "100%" }}
            onChange={(e) => onChangehandle(e.target.value, "serviceName")}
            value={values.serviceName}
            label={"Service Name"}
          />
          <SelectTime
            time={values.serviceTime}
            label={"service"}
            inputValues={onChangehandle}
          />
          <SelectTime
            sH={11}
            eH={14}
            time={values.breakTime}
            label={"break"}
            inputValues={onChangehandle}
          />
          <FormControl sx={{ my: ".5rem", width: "100%" }}>
            <InputLabel id="category">Appointment Duration</InputLabel>
            <Select
              required
              onChange={(e) => onChangehandle(e.target.value, "appoinmentTime")}
              value={values.appoinmentTime}
              label={"Appointment Duration"}
            >
              {["15", "30", "45", "60", "90", "120"]?.map((m) => (
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
            onChange={(e) => onChangehandle(e.target.value, "description")}
          />
          <FlexBetween gap={"1rem"} width={"100%"} margin={"0.5rem"}>
            <SelectLocation
              location={values?.location}
              inputValues={onChangehandle}
            />
          </FlexBetween>

          {/* <FlexBetween gap={"1rem"} width={"100%"} margin={"0.5rem"}>
            <TextField
              required
              label="State"
              onChange={(e) => onChangehandle(e.target.value, "state")}
              name="state"
              value={values.state}
              disabled={true}
              sx={{ width: "100%" }}
            />
            <TextField
              required
              label="District"
              onChange={(e) => onChangehandle(e.target.value, "district")}
              name="district"
              value={values.district}
              sx={{ width: "100%" }}
            />
          </FlexBetween>
          <FlexBetween gap={"1rem"} m={"0.5rem"} width={"100%"}>
            <TextField
              required
              label="City"
              onChange={(e) => onChangehandle(e.target.value, "city")}
              name="city"
              value={values.city}
              sx={{ width: "100%" }}
            />
            <TextField
              required
              label="Pincode"
              onChange={(e) => onChangehandle(e.target.value, "pincode")}
              name="pincode"
              value={values.pincode}
              sx={{ width: "100%" }}
            />
          </FlexBetween> */}
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
            {CrudServData.data.sid ? <>Update Data</> : <>Create Service</>}
          </Button>
        </FlexBetween>
      </form>
    </WidgetWrapper>
  );
};

export default ServiceFormWidget;
