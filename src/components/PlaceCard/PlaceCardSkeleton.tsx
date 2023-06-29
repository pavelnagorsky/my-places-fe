import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import Image from "next/image";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { secondaryLightColor } from "@/styles/theme/lightTheme";
import CastleOutlinedIcon from "@mui/icons-material/CastleOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function PlaceCardSkeleton() {
  return (
    <Card
      sx={{
        width: "374px",
        height: "570px",
        borderRadius: "10px",
        boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.50)",
        "& .MuiSkeleton-root": {
          bgcolor: "#D9D9D9",
        },
      }}
    >
      <CardActionArea>
        <CardMedia>
          <Skeleton variant={"rectangular"} height={250} />
        </CardMedia>
        <CardContent
          sx={{
            px: "1.6em",
          }}
        >
          <Stack direction={"row"} justifyContent={"center"}>
            <Skeleton variant={"rectangular"} height={18} width={178} />
          </Stack>
          <Skeleton variant={"text"} />
          <Skeleton variant={"text"} />
          <Skeleton variant={"text"} />
          <Skeleton variant={"text"} />
          <Divider variant={"middle"} />
          <Stack
            direction={"row"}
            mt="1.4em"
            mb="0.2em"
            alignItems={"center"}
            gap={"0.5em"}
          >
            <Skeleton variant={"text"} />
            <Stack direction={"row"} alignItems={"center"} gap={"1em"}>
              <Skeleton variant={"text"} />
              <Skeleton variant={"text"} />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PlaceCardSkeleton;
