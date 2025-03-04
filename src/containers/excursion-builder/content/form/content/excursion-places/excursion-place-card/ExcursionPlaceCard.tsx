import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import { SortableKnob } from "react-easy-sort";
import { primaryBackground } from "@/styles/theme/lightTheme";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import deleteIcon from "../../../../../../../../public/images/icons/basket.png";
import Grid from "@mui/material/Grid2";
import { MuiImage } from "@/components/UI/mui-image/MuiImage";
import Image from "next/image";
import locationImage from "../../../../../../../../public/images/icons/location.png";
import utils from "@/shared/utils";
// @ts-ignore
import { TimePickerElement } from "react-hook-form-mui/date-pickers";
import { renderDigitalClockTimeView } from "@mui/x-date-pickers";

interface IExcursionPlaceCardProps {
  onRemove: (id: number) => void;
  place: ISearchPlace;
  index: number;
}

const ExcursionPlaceCard = ({
  place,
  onRemove,
  index,
}: IExcursionPlaceCardProps) => {
  const theme = useTheme();
  const isMobileSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dragButton = (
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
  );
  const deleteButton = (
    <Box>
      <IconButton
        size={"small"}
        color={"primary"}
        sx={isMobileSm ? { bgcolor: primaryBackground } : {}}
        onClick={() => onRemove(place.id)}
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
      sx={{
        boxShadow: "0px 2px 30px 0px #0000000D",
        borderRadius: "10px",
        position: "relative",
        p: 2,
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          width: "100%",
        }}
      >
        <Grid size={12}>
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
        </Grid>
        <Grid size={12}>
          <Typography
            fontSize={"22px"}
            textAlign={{ xs: "center", sm: "start" }}
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
        </Grid>
        {!isMobileSm && (
          <Grid size={12}>
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
              gap={"1em"}
            >
              <Stack direction={"row"} alignItems={"center"} gap={"1em"}>
                <Typography color={"secondary.dark"}>
                  Введите время на посещение экскурсии:
                </Typography>
                <TimePickerElement
                  textReadOnly
                  transform={{
                    output: utils.dateOutputTransform,
                  }}
                  timeSteps={{ minutes: 15 }}
                  f
                  viewRenderers={{
                    hours: renderDigitalClockTimeView,
                    minutes: null,
                    seconds: null,
                  }}
                  inputProps={{
                    size: "small",
                  }}
                  sx={{
                    "& .MuiDigitalClock-root": {
                      scrollbarWidth: "thin",
                    },
                    "& .MuiInputBase-root": {
                      backgroundColor: "white",
                      maxWidth: "150px",
                      "& input": {
                        // textAlign: "center",
                      },
                    },
                  }}
                  name={"time"}
                  required
                />
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={"1em"}>
                {dragButton}
                {deleteButton}
              </Stack>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default ExcursionPlaceCard;
