import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
} from "@mui/icons-material";
import { setMode, setLogout } from "state";
import {
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Typography,
  InputBase,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

const MenuItems = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const user = useSelector((s) => s.user);
  // const fullName = `${user?.firstName} ${user?.lastName}`;
  const fullName = "Dhruv";
  const x = fullName.charAt(0);
  return (
    <>
      <IconButton gap={"1rem"} onClick={() => dispatch(setMode())}>
        {theme.palette.mode === "dark" ? (
          <LightMode sx={{ fontSize: "25px" }} />
        ) : (
          <DarkMode sx={{ fontSize: "25px", color: dark }} />
        )}
      </IconButton>
      <Message sx={{ fontSize: "25px" }} />
      <Notifications sx={{ fontSize: "25px" }} />
      <Help sx={{ fontSize: "25px" }} />
      <FormControl variant="standard" value={fullName}>
        <Select
          value={fullName}
          sx={{
            width: "100px",
            borderRadius: "0.25rem",
            p: "0 2rem",
            "& .MuiSvgIcon-root:": {
              pr: "0.25rem",
              width: "3rem",
            },
            "& .MultiSelect-select:focus": {
              backgroundColor: neutralLight,
            },
          }}
          input={<InputBase />}
        >
          <MenuItem value={fullName}>
            <Typography>{fullName}</Typography>
          </MenuItem>
          <MenuItem onClick={() => dispatch(setLogout())}>Log out</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default MenuItems;
