import { Autocomplete, Box, TextField } from "@mui/material";
import React from "react";
export const SelectAutoComplete = ({setInputVal, options, label }) => {
  return (
    <Autocomplete
      sx={{ width: "100%" }}
      options={options}
      autoHighlight
      getOptionLabel={(option) => option}
      onInputChange={(e, newInputValue) => {
        setInputVal(newInputValue,String(label).replace(" ",""))
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label={String(label)} />}
    />
  );
};
