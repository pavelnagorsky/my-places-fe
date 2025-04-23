import {
  Box,
  debounce,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SortableKnob } from "react-easy-sort";
import { primaryBackground } from "@/styles/theme/lightTheme";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import deleteIcon from "../../../../../../../../public/images/icons/basket.png";
import Image from "next/image";
import locationImage from "../../../../../../../../public/images/icons/location.png";
import {
  FormProvider,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";
import DurationPicker from "@/components/forms/custom-form-elements/DurationPicker";
import { useTranslation } from "next-i18next";
import usePlaceCardForm from "@/containers/excursion-builder/content/form/content/excursion-places/excursion-place-card/logic/usePlaceCardForm";
import {
  IExcursionBuilderItem,
  updateItemExcursionDescription,
  updateItemExcursionDuration,
} from "@/store/excursion-builder-slice/excursion-builder.slice";
import { useAppDispatch } from "@/store/hooks";
import { useCallback } from "react";

interface IExcursionPlaceCardProps {
  onRemove: (id: number) => void;
  place: IExcursionBuilderItem;
  index: number;
}

const ExcursionPlaceCard = ({
  place,
  onRemove,
  index,
}: IExcursionPlaceCardProps) => {
  const theme = useTheme();
  const isMobileSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation(["excursion-management", "common"]);
  const form = usePlaceCardForm({ place });
  const dispatch = useAppDispatch();

  const onChangeDescriptionDebounced = useCallback(
    debounce((event) => {
      dispatch(
        updateItemExcursionDescription({
          id: place.id,
          value: event.target.value,
        })
      );
    }, 300),
    [dispatch, place.id]
  );

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
    <FormProvider {...form}>
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
            fontWeight={500}
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
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
                WebkitLineClamp: { xs: 3, md: 2 },
                overflow: "hidden",
              }}
            >
              {place.address}
            </Typography>
          </Stack>
          <Stack>
            <TextFieldElement
              name={`description`}
              onChange={onChangeDescriptionDebounced}
              multiline
              rows={3}
              placeholder={t("form.placeDescriptionPlaceholder")}
              rules={{
                maxLength: {
                  value: 400,
                  message: t("errors.maxLength", { ns: "common", value: 400 }),
                },
              }}
            />
          </Stack>
          <Stack
            justifyContent={"space-between"}
            alignItems={{ xs: "end", sm: "center" }}
            direction={"row"}
            gap={"1em"}
          >
            <Stack
              direction={{ sm: "row" }}
              alignItems={{ sm: "center" }}
              gap={"1em"}
            >
              <Typography color={"secondary.dark"}>
                {t("form.durationSelect")}
              </Typography>
              <DurationPicker
                name={`excursionDuration`}
                onChange={(val) => {
                  dispatch(
                    updateItemExcursionDuration({ id: place.id, value: val })
                  );
                }}
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
    </FormProvider>
  );
};

export default ExcursionPlaceCard;
