import { Stack, Typography } from "@mui/material";
import { MuiImage } from "@/components/UI/mui-image/MuiImage";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";

const PlaceType = ({ type }: { type: IPlaceType }) => {
  return (
    <Stack direction={"row"} alignItems={"center"} gap={"0.7em"} mb={"1em"}>
      <Typography variant={"body2"} fontSize={{ xs: "20px", md: "25px" }}>
        {type.title}
      </Typography>
      {type.image && (
        <MuiImage
          imageProps={{
            height: 30,
            width: 30,
            src: type.image,
            alt: type.title,
            priority: true,
          }}
        />
      )}
    </Stack>
  );
};

export default PlaceType;
