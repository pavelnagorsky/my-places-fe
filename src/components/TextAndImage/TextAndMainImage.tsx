import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import { memo} from "react";
import Image, {StaticImageData} from "next/image";

interface ITextAndMainImageProps {
    title: string;
    description?: string;
    imageUrlMd: StaticImageData;
    imageUrlXs: StaticImageData;
    showMobile: boolean;
    titleColor?: string;
    descriptionColor?: string;
    descriptionFontSizeXs?: string;
    descriptionFontSizeMd?: string;
    minHeight?: string;
    maxHeight?: string;
    opacity?: number;
    textShadow?: boolean;
    customTop?: string;
    customWidth?: string;
    customFontSize?: string;
}

function TextAndMainImage(props: ITextAndMainImageProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // main picture
    const mainImage = (<Box
        component={Image}
        priority
        sx={{
            objectFit: "cover",
            filter: "blur(0.5px)",
            maxHeight: props.maxHeight ? props.maxHeight : '500px',
            minHeight: props.minHeight ? props.minHeight : '420px',
            width: "100%",
            height: "auto",
            borderRadius: {
                xs: 0,
                md: '10px'
            },
            opacity: props.opacity ? props.opacity : 1
        }}
        alt={props.title}
        src={ isMobile ? props.imageUrlXs : props.imageUrlMd}
    />);

    // text for main picture
    const mainText = (<Box
        sx={{
            position: 'absolute',
            zIndex: 1,
            width: "100%",
            // height: '100%',
            // width: props.customWidth ? props.customWidth : {
            //     xs: '75%',
            //     sm: '60%',
            //     md: '60%',
            //     lg: '50%',
            //     xl: '40%'
            // },
            top:  '3em',
            bottom: '3em',
            px: { xs: "1em", md: "3.5em" },
            // left: '10%',
            textShadow: props.textShadow ? '0px 4px 6px rgba(0, 0, 0, 0.25)' : "none",
            fontSize: props.customFontSize
        }}
    >
        <Typography
            variant="h1"
            sx={{
                color: props.titleColor ? props.titleColor : 'primary.contrastText',
            }}
        >
            {props.title}
        </Typography>
        { props.description ? <Typography
            component={'h2'}
            gutterBottom
            fontSize={{
                'xs': '16px',
                'sm': '20px'
            }}
            fontWeight={500}
            sx={{
                color: props.descriptionColor ? props.descriptionColor : 'primary.contrastText',
                width: {
                    xs: "100%",
                    md: "80%",
                    xl: "597px"
                }
            }}
        >
            {props.description}
        </Typography> : null }
    </Box>);

    return <Box
        position={"relative"}
        maxHeight={props.maxHeight ? props.maxHeight : '500px'}
        minHeight={props.minHeight ? props.minHeight : '400px'}
        mx={{ xs: "-1.5em", md: "0em" }}
    >
        {mainImage}
        {mainText}
    </Box>
}

export default memo(TextAndMainImage);