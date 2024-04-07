import { Fragment, memo, useMemo } from "react";
import {
  debounce,
  IconButton,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TextFieldElement, useFormContext } from "react-hook-form-mui";
import regExp from "@/shared/regExp";
import PublicIcon from "@mui/icons-material/Public";
import placesService from "@/services/places-service/places.service";
import { Environment } from "@/shared/Environment";
import {
  IPlaceFormContext,
  IPlaceTabProps,
} from "@/containers/create-place/form/interfaces";

const Tab1 = ({ readonly }: IPlaceTabProps) => {
  return (
    <Fragment>
      <Stack direction={"row"} gap={"0.5em"}>
        <Typography
          component={"h2"}
          fontWeight={{ xs: 500, md: 400 }}
          fontSize={{ xs: "20px", md: "30px" }}
          my={{ xs: "0.5em", md: "0.4em" }}
        >
          Описание
        </Typography>
        <Tooltip
          arrow
          enterTouchDelay={0}
          leaveTouchDelay={6000}
          sx={{ fontSize: "16px", alignSelf: "center" }}
          title={
            <Typography p={"0.5em"}>
              Текст требуется вводить в соотвествии с выбранным языком на сайте.
              На остальные языки контент будет переведен автоматически,
              посредством сервиса Google Translate. При необходимости, Вы
              сможете отредактировать переводы в личном кабинете
            </Typography>
          }
        >
          <IconButton>
            <InfoOutlinedIcon fontSize={"medium"} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Typography variant={"body2"} fontSize={{ xs: "18px", md: "20px" }}>
        Введите название и опишите место, в котором вы побывали.
      </Typography>
      <Typography
        variant={"body1"}
        mt="1em"
        fontSize={{ xs: "18px", md: "20px" }}
      >
        Название:
      </Typography>
      <TextFieldElement
        InputProps={{
          readOnly: readonly,
        }}
        sx={{
          mt: "1em",
          "& input": { bgcolor: "white", borderRadius: "15px" },
          width: "100%",
          fontSize: { md: "20px" },
        }}
        name={"title"}
        validation={{
          required: "Это поле обязательно к заполнению",
          maxLength: { value: 60, message: "Превышен лимит в 60 символов" },
        }}
        placeholder={"Введите название..."}
      />
      <Typography
        variant={"body1"}
        mt={"1em"}
        fontSize={{ xs: "18px", md: "20px" }}
      >
        Краткое описание:
      </Typography>
      <TextFieldElement
        InputProps={{
          readOnly: readonly,
        }}
        sx={{
          mt: "1em",
          "& input": { bgcolor: "white", borderRadius: "15px" },
          width: "100%",
          fontSize: { md: "20px" },
        }}
        multiline
        // rows={4}
        minRows={4}
        name={"description"}
        validation={{
          required: "Это поле обязательно к заполнению",
          maxLength: { value: 1000, message: "Превышен лимит в 1000 символов" },
        }}
        placeholder={"Введите краткое описание..."}
      />
      <Stack
        mt={"0.3em"}
        color={"secondary.main"}
        fontSize={14}
        sx={{
          fontWeight: 300,
          opacity: 0.8,
        }}
        display={"flex"}
        direction={"row"}
        alignItems={"center"}
        gap={"0.5em"}
      >
        <InfoOutlinedIcon fontSize={"small"} />
        Максимальная длина - 1000 символов
      </Stack>
      <Typography
        variant={"body1"}
        mt={"1em"}
        fontSize={{ xs: "18px", md: "20px" }}
      >
        Сайт достопримечательности
      </Typography>
      <Typography variant={"body2"} mt={"0.5em"} fontSize={{ md: "16px" }}>
        Укажите сайт данного места или достопримечательности (необязательно)
      </Typography>
      <TextFieldElement
        sx={{
          mt: "1em",
          mb: "3em",
          "& input": { bgcolor: "white", borderRadius: "15px" },
          width: "100%",
          fontSize: { md: "20px" },
        }}
        InputProps={{
          readOnly: readonly,
          startAdornment: (
            <InputAdornment position={"start"}>
              <PublicIcon />
            </InputAdornment>
          ),
        }}
        name={"website"}
        validation={{
          pattern: {
            value: regExp.urlPattern,
            message: "Введено некорректное значение",
          },
        }}
        placeholder={"https://example.com"}
      />
    </Fragment>
  );
};

export default memo(Tab1);
