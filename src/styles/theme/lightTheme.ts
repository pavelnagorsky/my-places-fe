import { interFont } from "@/styles/fonts/fonts";
import { createTheme } from "@mui/material";
import { beBY, ruRU } from "@mui/material/locale";
import I18nLanguages from "@/shared/I18nLanguages";

export const primaryColor = "#FF7A00";
export const primaryBackground = "#FFEFE2";
export const secondaryLightColor = "#727272";

const createLightTheme = (locale: keyof typeof I18nLanguages) => {
  const lightTheme = createTheme(
    {
      palette: {
        mode: "light",
        primary: {
          main: primaryColor,
          light: "rgba(255, 122, 0, 0.5)",
          contrastText: "#ffffff",
        },
        success: {
          main: "#77D257",
        },
        warning: {
          main: "#FD6B0C",
        },
        secondary: {
          main: "#565656",
          contrastText: "#303030",
        },
        text: {
          primary: "#303030",
          secondary: "#565656",
        },
        divider: "rgba(0, 0, 0, 0.12)",
      },
      typography: {
        allVariants: {
          letterSpacing: "0.01em",
          lineHeight: "130%",
        },
        h1: {
          fontWeight: 600,
          color: "#303030",
          fontSize: "40px",
          marginBottom: "30px",
        },
        h2: {
          fontWeight: 600,
          color: "secondary.dark",
          paddingBottom: "0.7em",
        },
        h3: {
          fontWeight: 600,
          color: "secondary.dark",
          paddingBottom: "0.5em",
          fontSize: "1.625em",
        },
        h4: {
          fontWeight: 600,
          color: "secondary.dark",
        },
        h5: {
          fontWeight: 500,
          fontSize: "18px",
          color: "#201F3D",
        },
        h6: {
          fontWeight: 400,
          fontSize: "16px",
          color: "#201F3D",
        },
        subtitle1: {
          color: "#505877",
          fontWeight: 400,
          fontSize: "14px",
        },
        subtitle2: {
          color: "#505877",
          fontWeight: 400,
          fontSize: "18px",
        },
        body1: {
          fontSize: "16px",
          fontWeight: 400,
        },
        body2: {
          fontSize: "16px",
          fontWeight: 400,
          color: "#565656",
        },
        fontFamily: [interFont.style.fontFamily].join(","),
      },
      components: {
        MuiFormControl: {
          defaultProps: {
            sx: {
              borderRadius: "10px",
            },
          },
        },
        MuiOutlinedInput: {
          defaultProps: {
            sx: {
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
              "& input": {
                textOverflow: "ellipsis",
              },
              "& fieldset": {
                borderColor: "primary.light",
              },
              borderRadius: "10px",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: ({ ownerState }) => ({
              borderRadius: "8px",
              "&.MuiButton-sizeLarge": { height: "44px" },
            }),
          },
          defaultProps: {
            style: { boxShadow: "none" },
          },
        },
        MuiDivider: {
          defaultProps: {
            sx: {
              my: "1em",
              borderColor: primaryColor,
              opacity: 0.5,
            },
          },
        },
      },
    },
    locale === I18nLanguages.ru ? ruRU : locale === I18nLanguages.be ? beBY : {}
  );

  // typography media-styles override

  lightTheme.typography.h1 = {
    ...lightTheme.typography.h1,
    [lightTheme.breakpoints.down("md")]: {
      fontSize: "24px",
    },
  };

  lightTheme.typography.h2 = {
    ...lightTheme.typography.h2,
    color: lightTheme.palette.secondary.dark,
    fontSize: "1.625em",
    [lightTheme.breakpoints.up("md")]: {
      fontSize: "2.5em",
    },
  };

  lightTheme.typography.h3 = {
    ...lightTheme.typography.h3,
    color: lightTheme.palette.secondary.dark,
  };

  lightTheme.typography.h4 = {
    ...lightTheme.typography.h4,
    color: lightTheme.palette.secondary.dark,
    fontSize: "20px",
    [lightTheme.breakpoints.up("md")]: {
      fontSize: "24px",
    },
  };

  return lightTheme;
};

export default createLightTheme;
