import { Fragment } from "react";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import WrappedContainer from "@/hoc/Wrappers/WrappedContainer";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { Button } from "@/components/UI/Button/Button";
import MyStepper from "@/components/UI/Stepper/MyStepper";
import { TextFieldElement, useFormContext } from "react-hook-form-mui";
import backgroundImage from "/public/images/create-review-page/background.jpg";
import ImageUploader from "@/components/Forms/ImageUploader/ImageUploader";
import TextEditor from "@/components/Forms/TextEditor/TextEditor";
import PlaceSelect from "@/containers/CreateReview/Form/PlaceSelect/PlaceSelect";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { IReviewFormContext } from "@/containers/CreateReview/Form/interfaces";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { routerLinks } from "@/staticData/routerLinks";

interface IReviewFormProps {
  // onSubmit: () => void;
}

const ReviewForm = ({}: IReviewFormProps) => {
  const { formState } = useFormContext<IReviewFormContext>();

  return (
    <Fragment>
      <WrappedContainer>
        <Breadcrumbs />
        <Box pt="1.5em" pb={{ xs: "1.5em", md: "2em" }}>
          <Typography
            component={"h1"}
            fontSize={{ xs: "25px", md: "32px" }}
            mb={"0.5em"}
          >
            Создание заметки:{" "}
            <Box display={"inline"} fontWeight={200} color={"secondary.main"}>
              Моя заметка
            </Box>
          </Typography>
          <Typography variant={"body2"} fontSize={{ md: "20px" }}>
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
              Достопримечательность
            </Typography>
            <Typography variant={"body2"} fontSize={{ md: "20px" }}>
              На этом этапе вам нужно выбрать достопримечательность из
              выпадающего списка или создать новую.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={{ xs: "center", sm: "unset" }}
              alignItems={{ xs: "unset", sm: "flex-start" }}
              mt={"2em"}
              gap={"1.5em"}
            >
              <PlaceSelect fieldName={"place"} />
              <Button
                variant={"contained"}
                sx={{
                  color: "white",
                  py: "1em",
                  fontSize: { xs: "14px", sm: "16px" },
                }}
                linkTo={routerLinks.createPlace}
              >
                Новое место
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
          <Typography variant={"body2"} fontSize={{ md: "20px" }}>
            Загрузите до 10 фотографий, сделанных на этой локации в формате jpg,
            jpeg, png.
          </Typography>
          <Box my={"2em"}>
            <ImageUploader fieldName={"images"} />
          </Box>
        </Box>
      </WrappedContainer>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage.src})`,
        }}
        mb={"3em"}
      >
        <WrappedContainer bgColor={"transparent"}>
          <Box py={{ xs: "1.5em", md: "2em" }} maxWidth={734}>
            <MyStepper totalOptions={3} activeOption={3} />
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
                    Текст заметки требуется вводить в соотвествии с выбранным
                    языком на сайте. На остальные языки контент будет переведен
                    автоматически, посредством сервиса Google Translate. При
                    необходимости, Вы сможете отредактировать переводы в личном
                    кабинете
                  </Typography>
                }
              >
                <IconButton>
                  <InfoOutlinedIcon fontSize={"medium"} />
                </IconButton>
              </Tooltip>
            </Stack>
            <Typography variant={"body2"} fontSize={{ md: "20px" }}>
              Придумайте заголовок заметки и опишите место, в котором вы
              побывали.
            </Typography>
            <TextFieldElement
              sx={{
                mt: "1em",
                "& input": { bgcolor: "white", borderRadius: "15px" },
                width: "100%",
                fontSize: { md: "20px" },
              }}
              name={"title"}
              validation={{ required: "Это поле обязательно к заполнению" }}
              placeholder={"Введите заголовок..."}
            />
            <Typography variant={"body2"} my={"1em"} fontSize={{ md: "20px" }}>
              Текст заметки:
            </Typography>
            <TextEditor fieldName={"description"} />

            <Button
              type={"submit"}
              disabled={!formState.isValid}
              variant={"contained"}
              sx={{
                color: "white",
                mt: "2em",
                py: "1em",
                width: "100%",
                maxWidth: { sm: "250px" },
              }}
            >
              Создать
            </Button>
          </Box>
        </WrappedContainer>
      </Box>
    </Fragment>
  );
};

export default ReviewForm;
