import { AllRoutes } from "Components/AllRoutes";
import React, { useEffect, useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { getCategoriesArray } from "state/globalFunctions";

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // const isAuth = Boolean(useSelector((state) => state.token));
  // console.log("mode,theme,isAuth")
  const dispatch=useDispatch()
  useEffect(() => {
    getCategoriesArray(dispatch);
  }, [dispatch]);
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AllRoutes />
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;


// import React, { useState } from 'react'

// const App = () => {
//   let initVal = {
//     a: "",
//     b: {
//       x: "",
//       y: ""
//     }
//   }
//   const [arr, setArr] = useState(initVal)
//   const handleChange = (e,name) => {
//     e.preventDefault();
//     arr[e.target.name] = e.target.value;
//     console.log(initVal);

//     setArr(arr)
//   }
//   console.log(arr)
//   return (
//     <div>
//       <input name="a" onChange={(e) => handleChange(e, "a")} /><br />
//       <input name="x" onChange={(e) => handleChange(e, "x")} /><br />
//       <input name="b.y" onChange={(e) => handleChange(e, "y")} />
//     </div>
//   )
// }

// export default App