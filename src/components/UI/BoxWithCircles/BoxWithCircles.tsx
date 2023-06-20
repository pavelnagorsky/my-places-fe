import {Box} from "@mui/material";
import {Circle} from "../Circle/Circle";
import {memo} from "react";

function BoxWithCircles() {
    return <Box
        position={"relative"}
        height={"160px"}
        overflow={"hidden"}
        mx={{ xs: "-1.5em", md: "-3em", xl: 0 }}
    >
        <Circle
            gradient={"linear-gradient(360deg, #FFA551 50%, rgba(255, 165, 81, 0) 95.5%)"}
            height={"100px"}
            width={"100px"}
            left={"0%"}
            top={"110px"}
        />
        <Circle
            gradient={"linear-gradient(316deg, #FFD9B6 18.63%, rgba(255, 255, 255, 0) 99.34%)"}
            height={"55px"}
            width={"63px"}
            left={"20%"}
            top={"60px"}
        />
        <Circle
            gradient={"linear-gradient(338.41deg, #FFA551 44.88%, rgba(255, 165, 81, 0) 89.75%)"}
            height={"128px"}
            width={"141px"}
            left={"25%"}
            top={"80px"}
            sx={{ display: { xs: "none", md: "block" } }}
        />
        <Circle
            gradient={"linear-gradient(13.11deg, #FFA551 59.77%, rgba(255, 165, 81, 0) 92.8%)"}
            height={"98px"}
            width={"102px"}
            left={"36%"}
            top={"115px"}
            sx={{ display: { xs: "none", md: "block" } }}
        />
        <Circle
            gradient={"linear-gradient(307.43deg, #FFA551 50.6%, rgba(255, 165, 81, 0) 99.16%)"}
            height={"67px"}
            width={"69px"}
            left={"75%"}
            top={"125px"}
            sx={{
                left: {
                    xs: "50%", md: "75%"
                }
            }}
        />
        <Circle
            gradient={"linear-gradient(319.95deg, #FFE9D6 16.54%, rgba(255, 237, 221, 0) 76.73%)"}
            height={"70px"}
            width={"72px"}
            left={"75%"}
            top={"30px"}
            sx={{
                left: {
                    xs: "55%", md: "75%"
                }
            }}
        />
        <Circle
            gradient={"linear-gradient(356.9deg, #FFA551 45.79%, rgba(255, 165, 81, 0) 104.72%)"}
            height={"125px"}
            width={"150px"}
            left={"80%"}
            top={"80px"}
            sx={{
                left: {
                    xs: "67%", md: "80%"
                }
            }}
        />
    </Box>
}

export default memo(BoxWithCircles)