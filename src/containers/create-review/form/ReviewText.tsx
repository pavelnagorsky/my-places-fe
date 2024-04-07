import MyStepper from "@/components/UI/stepper/MyStepper";
import {
  Box,
  IconButton,
  Stack,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TextFieldElement } from "react-hook-form-mui";
import { memo } from "react";
import TextEditor from "@/components/forms/text-editor/TextEditor";

const ReviewText = ({ sx, readonly }: { sx?: SxProps; readonly?: boolean }) => {
  return (
    <Box sx={sx}>
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
              Текст заметки требуется вводить в соотвествии с выбранным языком
              на сайте. На остальные языки контент будет переведен
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
        Придумайте заголовок заметки и опишите место, в котором вы побывали.
      </Typography>
      <TextFieldElement
        sx={{
          mt: "1em",
          "& input": { bgcolor: "white", borderRadius: "15px" },
          width: "100%",
          fontSize: { md: "20px" },
        }}
        name={"title"}
        InputProps={{
          readOnly: readonly,
        }}
        validation={{ required: "Это поле обязательно к заполнению" }}
        placeholder={"Введите заголовок..."}
      />
      <Typography variant={"body1"} my={"1em"} fontSize={{ md: "20px" }}>
        Текст заметки:
      </Typography>
      <TextEditor
        readonly={readonly}
        fieldName={"description"}
        placeholder={"Введите текст заметки"}
      />
    </Box>
  );
};

export default memo(ReviewText);
