import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import Grid from "@mui/material/Grid2";
import { MuiImage } from "@/components/UI/mui-image/MuiImage";
import {
  Box,
  Button,
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
// import DeleteIcon from "@mui/icons-material/Delete";
import deleteIcon from "/public/images/icons/basket.png";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { SortableKnob } from "react-easy-sort";
import { routerLinks } from "@/routing/routerLinks";

interface ICartItemProps {
  onRemove: (id: number) => void;
  place: ISearchPlace;
  index: number;
}

const CartItem = ({ place, onRemove, index }: ICartItemProps) => {
  const theme = useTheme();
  const isMobileSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickPlace = () => {
    window.open(routerLinks.place(place.slug));
  };

  const handleRemove = (e: any) => {
    e.stopPropagation();
    onRemove(place.id);
  };

  const dragButton = (
    <Box>
      <SortableKnob>
        <IconButton
          size={"small"}
          color={"primary"}
          onClick={(e) => e.stopPropagation()}
          sx={{
            bgcolor: `${primaryBackground} !important`,
            cursor: "grab",
          }}
        >
          <DragHandleIcon />
        </IconButton>
      </SortableKnob>
    </Box>
  );

  const deleteButton = (
    <Box>
      <IconButton
        size={"small"}
        color={"primary"}
        sx={isMobileSm ? { bgcolor: primaryBackground } : {}}
        onClick={handleRemove}
      >
        <Box
          component={"img"}
          src={deleteIcon.src}
          alt={"Delete"}
          sx={{
            height: "25px",
            width: "25px",
            userSelect: "none",
          }}
        />
      </IconButton>
    </Box>
  );

  return (
    <Paper
      onClick={handleClickPlace}
      sx={{
        cursor: "pointer",
        boxShadow: "0px 2px 30px 0px #0000000D",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <Grid
        container
        spacing={{ xs: 0, sm: 2 }}
        sx={{
          width: "100%",
          minHeight: { sm: "200px" },
        }}
      >
        <Grid size={{ xs: 12, sm: 4 }}>
          {isMobileSm && (
            <Stack
              position={"absolute"}
              zIndex={1}
              right={"0.5em"}
              top={"0.5em"}
              direction={"column"}
              gap={"0.5em"}
            >
              {dragButton}
              {deleteButton}
            </Stack>
          )}
          {isMobile && (
            <Stack
              position={"absolute"}
              zIndex={1}
              left={"0.5em"}
              top={"0.5em"}
              bgcolor={primaryBackground}
              borderRadius={"50%"}
              fontWeight={700}
              fontSize={"20px"}
              color={"primary.main"}
              width={"42px"}
              height={"42px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {index + 1}
            </Stack>
          )}
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
                position: "relative",
                height: { xs: "210px", sm: "200px" },
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
        <Grid size={{ xs: 12, sm: 6.8, md: 7 }}>
          <Stack
            alignItems={{ xs: "center", sm: "start" }}
            height={"100%"}
            py={{ xs: "1em" }}
            px={{ xs: "1em", sm: 0 }}
            gap={{ xs: "1em", sm: "0.5em" }}
          >
            <Typography
              fontSize={"22px"}
              textAlign={{ xs: "center", sm: "start" }}
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
                fontSize={"18px"}
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
            <Stack
              gap={"1em"}
              direction={"row"}
              mt={"auto"}
              width={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                fontWeight={500}
                variant="body1"
                fontSize={"18px"}
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
          </Stack>
        </Grid>
        {!isMobileSm && (
          <Grid size={{ sm: 1.2, md: 1 }}>
            <Stack
              justifyContent={"end"}
              direction={"column"}
              gap={"1em"}
              my={"1em"}
            >
              {dragButton}
              {deleteButton}
            </Stack>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default CartItem;
