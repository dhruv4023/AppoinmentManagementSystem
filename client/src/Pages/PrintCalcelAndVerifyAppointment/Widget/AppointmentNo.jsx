import { useTheme } from "@emotion/react";
import { Button, TextField } from "@mui/material";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";

const AppointmentNo = ({ AIDNo, loading, setdoRetrive, doRetrive, setAID }) => {
  const theme = useTheme();
  return (
    <WidgetWrapper>
      <TextField
        label="Enter aid Number here"
        onChange={(e) => setAID(e.target.value)}
        name="aid"
        disabled={loading}
        value={AIDNo}
        sx={{ width: "100%" }}
      />
      <Button
        fullWidth
        disabled={loading || !AIDNo}
        type="submit"
        onClick={() => setdoRetrive(!doRetrive)}
        sx={{
          m: "2rem 0",
          p: "1rem",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.background.alt,
          "&:hover": { color: theme.palette.primary.main },
        }}
      >
        Enter
      </Button>
    </WidgetWrapper>
  );
};

export default AppointmentNo;
