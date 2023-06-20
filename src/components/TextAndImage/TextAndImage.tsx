import {Box, Grid, SxProps, Typography} from "@mui/material";

import {Button} from "../UI/Button/Button";
import Image, {StaticImageData} from "next/image";

export interface ITextAndImageProps {
    showImageMobile?: boolean;
    reverse?: boolean;
    title: string;
    subtitle?: string;
    description: string;
    btnText: string;
    linkTo: string;
    image: StaticImageData;
    sx?: SxProps
}

// provides row with image and article
export function TextAndImage(
    { linkTo, showImageMobile, reverse, title, subtitle, description, btnText, image, sx }: ITextAndImageProps
) {
    return <Grid
        my={{ xs: "2em", md: "5em" }}
        container
        columnSpacing={{ xs: "0", md: "8em"}}
        direction={ reverse ? "row-reverse" : undefined }
        sx={{
            display: 'flex',
            alignItems: 'center',
            ...sx
        }}
    >
        <Grid
            item
            xs={12} md={6}
        >
            <Typography variant="h1" component={'h2'}>
                { title }
            </Typography>
            {subtitle ? <Typography
                variant="body2"
                color="secondary.contrastText"
                fontWeight={700}
                mb="1em"
            >
                { subtitle }
            </Typography> : null}
            <Typography variant="body2">
                { description }
            </Typography>
            <Button sx={{ mt: 3.5, width: { xs: "100%", md: "initial" } }} linkTo={linkTo}>
                { btnText }
            </Button>
        </Grid>
        <Grid
            item
            xs={showImageMobile ? 12 : 0}
            md={6}
        >
            <Box
                component={Image}
                sx={{
                    display: {
                        xs: showImageMobile ? 'block' : 'none',
                        md: 'flex'
                    },
                    borderRadius: {
                        xs: "30px",
                        md: reverse ? "180px 0px 180px 180px" : "180px 180px 180px 0px"
                    },
                    my: { xs: showImageMobile ? "2em" : "0em", md: "0em" },
                    width: "100%",
                    height: "100%",
                    maxHeight: "320px",
                    minHeight: { xs: "220px", md: "320px" }
                }}
                src={image}
                alt={title}
            />
        </Grid>
    </Grid>
}