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
import { IPlaceFormContext } from "@/containers/CreatePlace/Form/interfaces";

const Tab1 = () => {
  const { setError } = useFormContext<IPlaceFormContext>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const validateSlug = useMemo(
    () =>
      debounce((value: string) => {
        return placesService
          .validateSlug({ slug: value })
          .then((res) => {
            return true;
          })
          .catch(() => {
            setError("slug", { message: "Данная ссылка уже занята" });
          });
      }, 300),
    []
  );

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
        sx={{
          mt: "1em",
          "& input": { bgcolor: "white", borderRadius: "15px" },
          width: "100%",
          fontSize: { md: "20px" },
        }}
        name={"title"}
        validation={{
          required: "Это поле обязательно к заполнению",
          maxLength: { value: 30, message: "Превышен лимит в 30 символов" },
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
          maxLength: { value: 600, message: "Превышен лимит в 300 символов" },
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
        Максимальная длина - 600 символов
      </Stack>
      <Typography
        variant={"body1"}
        mt={"1.5em"}
        fontSize={{ xs: "18px", md: "20px" }}
      >
        Общедоступная ссылка
      </Typography>
      <Typography variant={"body2"} mt={"0.5em"} fontSize={{ md: "16px" }}>
        Данная ссылка будет отображаться на поисковой странице сайта и видна
        другим пользователям
      </Typography>
      <TextFieldElement
        sx={{
          mt: "1em",
          "& input": { bgcolor: "white", borderRadius: "15px" },
          width: "100%",
          fontSize: { md: "20px" },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position={"end"}>
              {isMobile ? "places/" : `https://${Environment.domain}/places/`}
            </InputAdornment>
          ),
        }}
        name={"slug"}
        onChange={(event) => validateSlug(event.target.value)}
        validation={{
          required: "Это поле обязательно к заполнению",
          pattern: {
            value: regExp.slugPattern,
            message: "Введено некорректное значение",
          },
        }}
        placeholder={"crevo-castle"}
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
        Ссылка должна состоять из символов латинского алфавита и знаков тире
      </Stack>
      <Typography
        variant={"body1"}
        mt={"1.5em"}
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
