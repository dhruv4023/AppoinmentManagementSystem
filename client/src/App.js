import { AllRoutes } from "Components/AllRoutes";
import React, { useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // const isAuth = Boolean(useSelector((state) => state.token));
  // console.log(mode,theme,isAuth)
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

// import React, { useState } from "react";

// const App = () => {
//   const inis = {
//     x: "",
//     y: {
//       a: "",
//       b: "",
//     },
//   };
//   const [first, setFirst] = useState(inis);
//   const changeHanlde = (e, name) => {
//     const cpy = first;
//     changeValObj(cpy,name)
//     console.log("hello");
//     setFirst(cpy);
//   };
//   const changeValObj = (old,ky) => {
//     Object.keys(old).forEach((e) => {
//       if (typeof old[e] === "object") changeValObj(old[e],ky);
//       else {
//         if (e === ky) old[e] += 5;
//         console.log(e,ky,typeof old[e]);
//       }
//     });
//   };
//   return (
//     <div>
//       <input onChange={(e) => changeHanlde(e, "x")} />
//       <input onChange={(e) => changeHanlde(e, "a")} />
//       <input onChange={(e) => changeHanlde(e, "b")} />
//     </div>
//   );
// };

// export default App;
