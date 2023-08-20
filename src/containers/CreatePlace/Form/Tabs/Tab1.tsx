import { Fragment, memo } from "react";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TextFieldElement } from "react-hook-form-mui";

const Tab1 = () => {
  return (
    <Fragment>
      <Stack direction={"row"} gap={"0.5em"}>
        <Typography
          component={"h2"}
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
      <Typography variant={"body2"} fontSize={{ md: "20px" }}>
        Введите название и опишите место, в котором вы побывали.
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
      <Typography variant={"body2"} mt={"1em"} fontSize={{ md: "20px" }}>
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
        rows={4}
        name={"description"}
        validation={{
          required: "Это поле обязательно к заполнению",
          maxLength: { value: 300, message: "Превышен лимит в 300 символов" },
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
        Максимальная длина - 300 символов
      </Stack>
    </Fragment>
  );
};

export default memo(Tab1);
