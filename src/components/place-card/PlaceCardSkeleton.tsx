import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";

function PlaceCardSkeleton() {
  return (
    <Card
      // elevation={2}
      sx={{
        width: { xs: "330px", md: "374px" },
        height: { xs: "510px", md: "565px" },
        borderRadius: "10px",
        boxShadow: "0px 2px 22px 0px #00000012",
        // boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.50)",
        "& .MuiSkeleton-root": {
          bgcolor: "#D9D9D9",
        },
      }}
    >
      <CardActionArea sx={{ height: "100%" }}>
        <CardMedia
          sx={{
            height: {
              xs: 217,
              md: 250,
            },
          }}
        >
          <Skeleton variant={"rectangular"} height={"100%"} />
        </CardMedia>
        <CardContent
          sx={{
            height: "100%",
            px: "1.6em",
          }}
        >
          <Stack direction={"row"} justifyContent={"center"}>
            <Skeleton variant={"text"} height={32} width={178} />
          </Stack>
          <Stack
            direction={"row"}
            gap={"1em"}
            my={"0.8em"}
            alignItems={"center"}
          >
            <Skeleton variant={"circular"} height={28} width={28} />
            <Stack flexGrow={1}>
              <Skeleton height={20} />
              <Skeleton height={20} />
            </Stack>
          </Stack>
          <Skeleton height={20} sx={{ display: { xs: "none", md: "block" } }} />
          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={20} width={"50%"} />
          <Skeleton height={20} sx={{ mt: "0.8em" }} />
          <Divider variant={"middle"} sx={{ mt: "1em", mb: "0.8em" }} />
          <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
            <Stack flexGrow={1}>
              <Skeleton height={40} width={96} />
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={"1em"}>
              <Skeleton width={44} height={40} />
              <Skeleton width={50} height={40} />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PlaceCardSkeleton;
