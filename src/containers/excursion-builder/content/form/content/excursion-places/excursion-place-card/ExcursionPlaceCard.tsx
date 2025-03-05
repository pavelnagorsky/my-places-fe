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
import Image from "next/image";
import locationImage from "../../../../../../../../public/images/icons/location.png";
import {
  FieldError,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";
import { IExcursionBuilderForm } from "@/containers/excursion-builder/content/form/logic/interfaces";
import DurationPicker from "@/components/forms/custom-form-elements/DurationPicker";
import { useTranslation } from "next-i18next";

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
  const { watch } = useFormContext<IExcursionBuilderForm>();
  const { i18n, t } = useTranslation(["excursion-management", "common"]);

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
      <Stack width={"100%"} gap={2}>
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
          <Image src={locationImage} alt={"Location"} height={24} width={24} />
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
        <Stack>
          <TextFieldElement
            name={`places.${index}.description`}
            multiline
            rows={4}
            placeholder={"Введите краткое описание"}
            rules={{
              maxLength: {
                value: 300,
                message: t("errors.maxLength", { ns: "common", value: 300 }),
              },
            }}
          />
        </Stack>
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
            <DurationPicker
              name={`places.${index}.excursionDuration`}
              required
              parseError={() => t("errors.required", { ns: "common" })}
              slotProps={{ input: { size: "small" } }}
            />
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={"1em"}>
            {dragButton}
            {deleteButton}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ExcursionPlaceCard;
