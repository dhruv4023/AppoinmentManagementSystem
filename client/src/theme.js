// color design tokens export
export const colorTokens = {
    grey: {
      0: "#FFFFFF",
      10: "#F6F6F6",
      50: "#F0F0F0",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#4D4D4D",
      700: "#333333",
      800: "#1A1A1A",
      900: "#0A0A0A",
      1000: "#000000",
    },
    primary: {
      50: "#E6FBFF", //"#e6ebff",  //#fbffe6,
      100: "#CCF7FE", //"#ccdafe",  //#f1fecc,
      200: "#99EEFD", //"#99b7fd",  //#ecfd99,
      300: "#66E6FC", //"#6693fc",  //#d6fc66,
      400: "#33DDFB", //"#3390fb",  //#e4fb33,
      500: "#00D5FA", //"#0070fa",  //#ccfa00,
      600: "#00A0BC", //"#0048bc",  //#9dbc00,
      700: "#006B7D", //"#00197d",  //#647d00,
      800: "#00353F", //"#00013f",  //#383f00,
      900: "#001519", //"#000619",  //#151900,
    },
  };
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                dark: colorTokens.primary[200],
                main: colorTokens.primary[500],
                light: colorTokens.primary[800],
              },
              neutral: {
                dark: colorTokens.grey[100],
                main: colorTokens.grey[200],
                mediumMain: colorTokens.grey[300],
                medium: colorTokens.grey[400],
                light: colorTokens.grey[700],
              },
              background: {
                default: colorTokens.grey[900],
                alt: colorTokens.grey[800],
              },
            }
          : {
              // palette values for light mode
              primary: {
                dark: colorTokens.primary[800],
                main: colorTokens.primary[500],
                light: colorTokens.primary[100],
              },
              neutral: {
                dark: colorTokens.grey[1000],
                main: colorTokens.grey[700],
                mediumMain: colorTokens.grey[400],
                medium: colorTokens.grey[500],
                light: colorTokens.grey[50],
              },
              background: {
                default: colorTokens.grey[200],
                alt: colorTokens.grey[100],
              },
            }),
      },
      typography: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };
  