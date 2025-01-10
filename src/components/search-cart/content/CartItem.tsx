import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import Grid from "@mui/material/Grid2";
import { MuiImage } from "@/components/UI/mui-image/MuiImage";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import locationImage from "../../../../public/images/icons/location.png";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteIcon from "@mui/icons-material/Delete";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { SortableKnob } from "react-easy-sort";

interface ICartItemProps {
  onRemove: (id: number) => void;
  place: ISearchPlace;
}

const CartItem = ({ place, onRemove }: ICartItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        boxShadow: "0px 2px 30px 0px #0000000D",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <Grid
        container
        spacing={{ sm: 2 }}
        sx={{
          width: "100%",
          minHeight: { xs: "217px", sm: "200px" },
        }}
      >
        {!isMobile && (
          <Grid size={{ xs: 12, sm: 4 }}>
            <MuiImage
              imageProps={{
                style: { objectFit: "cover" },
                fill: true,
                src: place.image ?? "/none",
                alt: place.title,
                sizes: "(max-width: 768px) 100vw, 30vw",
              }}
              boxProps={{
                sx: {
                  height: { xs: "150px", sm: "200px" },
                  width: "100%",
                  "& img": {
                    borderTopRightRadius: { xs: "10px", sm: 0 },
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: { xs: 0, sm: "10px" },
                  },
                },
              }}
            />
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: 6.8, md: 7 }}>
          <Stack
            height={"100%"}
            py={{ xs: "1em" }}
            px={{ xs: "1em", sm: 0 }}
            gap={{ xs: "1em", sm: "0.5em" }}
          >
            <Typography
              fontSize={{ xs: "18px", md: "22px" }}
              mb={{ xs: 0, md: "0.5em" }}
              fontWeight={500}
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: { xs: 2, sm: 3, md: 2 },
              }}
            >
              {place.title}
            </Typography>
            <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
              <Image
                src={locationImage}
                alt={"Location"}
                height={24}
                width={24}
              />
              <Typography
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                variant="body2"
                fontSize={{ xs: "14px", md: "18px" }}
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: { xs: 2, sm: 3, md: 2 },
                  overflow: "hidden",
                }}
              >
                {place.address}
              </Typography>
            </Stack>
            <Typography
              mt={"auto"}
              fontWeight={500}
              variant="body1"
              fontSize={{ xs: "14px", md: "18px" }}
              display={"flex"}
              alignItems={"center"}
              sx={{ wordBreak: "break-word" }}
              gap={"0.5em"}
            >
              <Box
                component={"img"}
                src={place.type.image as string}
                alt={place.type.title}
                sx={{
                  objectFit: "cover",
                  width: "20px",
                  height: "20px",
                }}
              />
              {place.type.title}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 1.2, md: 1 }}
          width={{ xs: "100%", sm: "auto" }}
        >
          <Stack
            justifyContent={"end"}
            direction={{ xs: "row-reverse", sm: "column" }}
            gap={"1em"}
            m={{ xs: "0 1em 1em 1em", sm: "1em 0" }}
          >
            <Box>
              <SortableKnob>
                <IconButton
                  size={"small"}
                  color={"primary"}
                  sx={{
                    bgcolor: `${primaryBackground} !important`,
                    cursor: "grab",
                  }}
                >
                  <DragHandleIcon />
                </IconButton>
              </SortableKnob>
            </Box>
            <Box>
              <IconButton
                size={"small"}
                color={"primary"}
                onClick={() => onRemove(place.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem;
