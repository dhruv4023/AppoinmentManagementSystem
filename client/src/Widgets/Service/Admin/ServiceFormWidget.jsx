import { CloseOutlined } from "@mui/icons-material";
import {
  Button,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import WidgetWrapper from "Components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendServiceData } from "./ServiceSubmit";

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
const ServiceFormWidget = ({ setCrudServData, CrudServData }) => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const [values, setValues] = useState(CrudServData.data);
  const token = useSelector((s) => s.token);
  const { palette } = useTheme();
  const onChangehandle = (e, name) => {
    let tmpData = e.target === undefined ? e : e.target.value;
    let tmp = {};
    for (let value in values)
      tmp[value] = value === name ? tmpData : values[value];
    setValues(tmp);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.category) {
      sendServiceData({ token, values, dispatch });
    }
    // setValues(CrudServData.data);
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
          <TextField
            required
            sx={{ margin: "0.5rem", width: "100%" }}
            onChange={(e) => onChangehandle(e, "category")}
            value={values.category}
            label={"Category"}
          />
          <TextField
            required
            sx={{ margin: "0.5rem .5rem", width: "100%" }}
            onChange={(e) => onChangehandle(e, "timeRange")}
            value={values.timeRange}
            label={"Time Range"}
          />
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
              onChange={(e) => onChangehandle(e, "location.state")}
              name="state"
              value={values.location.state}
              disabled={true}
              sx={{ width: "100%" }}
            />
            <TextField
              required
              label="District"
              onChange={(e) => onChangehandle(e, "location.district")}
              name="district"
              value={values.location.district}
              sx={{ width: "100%" }}
            />
          </FlexBetween>
          <FlexBetween gap={"1rem"} m={"0.5rem"} width={"100%"}>
            <TextField
              required
              label="City"
              onChange={(e) => onChangehandle(e, "location.city")}
              name="city"
              value={values.location.city}
              sx={{ width: "100%" }}
            />
            <TextField
              required
              label="Pincode"
              onChange={(e) => onChangehandle(e, "location.pincode")}
              name="pincode"
              value={values.location.pincode}
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
