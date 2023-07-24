import { Fragment } from "react";
import { Box, Stack, Typography } from "@mui/material";
import WrappedContainer from "@/hoc/Wrappers/WrappedContainer";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { Button } from "@/components/UI/Button/Button";
import MyStepper from "@/components/UI/Stepper/MyStepper";
import { TextFieldElement } from "react-hook-form-mui";
import backgroundImage from "/public/images/create-review-page/background.jpg";
import ImageUploader from "@/components/Forms/ImageUploader/ImageUploader";

const ReviewForm = () => {
  return (
    <Fragment>
      <WrappedContainer>
        <Box py={{ xs: "1.5em", md: "2em" }}>
          <Typography
            component={"h1"}
            fontSize={{ xs: "20px", md: "32px" }}
            mb={{ xs: "1em", md: "0.5em" }}
          >
            Создание заметки:{" "}
            <Box display={"inline"} fontWeight={200} color={"secondary.main"}>
              Моя заметка
            </Box>
          </Typography>
          <Typography variant={"body2"}>
            Заметка - это авторская экскурсия по выбранному месту. Здесь вы
            можете рассказать другим о посещённой локации, дополнив это
            описанием и прикрепив фотографии.
          </Typography>
        </Box>
      </WrappedContainer>
      <Box bgcolor={primaryBackground}>
        <WrappedContainer bgColor={"transparent"}>
          <Box py={{ xs: "1.5em", md: "2em" }}>
            <MyStepper totalOptions={3} activeOption={1} />
            <Typography
              component={"h2"}
              fontSize={{ xs: "20px", md: "30px" }}
              my={{ xs: "0.5em", md: "0.4em" }}
            >
              Локация
            </Typography>
            <Typography variant={"body2"}>
              На этом этапе вам нужно выбрать достопримечательность из
              выпадающего списка или создать новую.
            </Typography>
            <Stack direction={"row"} mt={"2em"}>
              <Button variant={"contained"} sx={{ color: "white" }}>
                Новая локация
              </Button>
            </Stack>
          </Box>
        </WrappedContainer>
      </Box>
      <WrappedContainer>
        <Box py={{ xs: "1.5em", md: "2em" }}>
          <MyStepper totalOptions={3} activeOption={2} />
          <Typography
            component={"h2"}
            fontSize={{ xs: "20px", md: "30px" }}
            my={{ xs: "0.5em", md: "0.4em" }}
          >
            Фотографии
          </Typography>
          <Typography variant={"body2"}>
            Загрузите до 10 фотографий, сделанных на этой локации в формате jpg,
            jpeg, png.
          </Typography>
          <ImageUploader fieldName={"imagesIds"} />
        </Box>
      </WrappedContainer>
      <Box sx={{ backgroundImage: `url(${backgroundImage.src})` }} mb={"2em"}>
        <WrappedContainer bgColor={"transparent"}>
          <Box py={{ xs: "1.5em", md: "2em" }}>
            <MyStepper totalOptions={3} activeOption={3} />
            <Typography
              component={"h2"}
              fontSize={{ xs: "20px", md: "30px" }}
              my={{ xs: "0.5em", md: "0.4em" }}
            >
              Описание
            </Typography>
            <Typography variant={"body2"}>
              Придумайте заголовок заметки и опишите место, в котором вы
              побывали.
            </Typography>
            <TextFieldElement
              sx={{
                mt: "1em",
                bgcolor: "white",
              }}
              name={"title"}
              validation={{ required: true }}
              placeholder={"Введите заголовок..."}
            />
          </Box>
        </WrappedContainer>
      </Box>
    </Fragment>
  );
};

export default ReviewForm;
