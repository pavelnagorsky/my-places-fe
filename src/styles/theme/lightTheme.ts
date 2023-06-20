import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1440
        }
    },
    palette: {
        mode: "light",
        primary: {
            main: '#FF7A00',
            contrastText: "#FFF2E6"
        },
        success: {
            main: "#77D257"
        },
        warning: {
            main: '#FD6B0C'
        },
        secondary: {
            main: '#565656',
            contrastText: "#303030"
        },
        error: {
            main: '#FD6B0C'
        }
    },
    typography: {
        allVariants: {
            letterSpacing: "0.01em",
            lineHeight: "130%"
        },
        h1: {
            fontWeight: 700,
            color: "#303030",
            fontSize: "40px",
            marginBottom: "30px"
        },
        h2: {
            fontWeight: 700,
            color: "secondary.dark",
            paddingBottom: '0.7em',
        },
        h3: {
            fontWeight: 700,
            color: "secondary.dark",
            paddingBottom: '0.5em',
            fontSize: "1.625em"
        },
        h4: {
            fontWeight: 700,
            color: "secondary.dark"
        },
        h5: {
            fontWeight: 500,
            fontSize: "16px",
            color: "#201F3D"
        },
        h6: {
            fontWeight: 400,
            fontSize: "16px",
            color: "#201F3D"
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
            color: "#565656"
        },
        fontFamily: ['Inter'].join(',')
    }
});

// typography media-styles override

lightTheme.typography.h1 = {
    ...lightTheme.typography.h1,
    [lightTheme.breakpoints.down('sm')]: {
        fontSize: "24px",
    }
}

lightTheme.typography.h2 = {
    ...lightTheme.typography.h2,
    color: lightTheme.palette.secondary.dark,
    fontSize: "1.625em",
    [lightTheme.breakpoints.up('md')]: {
        fontSize: "2.5em",
    }
}

lightTheme.typography.h3 = {
    ...lightTheme.typography.h3,
    color: lightTheme.palette.secondary.dark
}

lightTheme.typography.h4 = {
    ...lightTheme.typography.h4,
    color: lightTheme.palette.secondary.dark,
    fontSize: "20px",
    [lightTheme.breakpoints.up('md')]: {
        fontSize: "24px",
    }
}

export default lightTheme;
