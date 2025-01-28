import { useTranslation } from "next-i18next";
import { Stack, Typography } from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";
// @ts-ignore
import { TimePickerElement } from "react-hook-form-mui/date-pickers";
import utils from "@/shared/utils";

const TimeSelection = () => {
  const { t } = useTranslation();

  return (
    <Stack
      direction={{ sm: "row" }}
      p={"1em"}
      borderRadius={"15px"}
      bgcolor={primaryBackground}
      alignItems={{ sm: "center" }}
      justifyContent={"space-between"}
    >
      <Typography fontWeight={500} fontSize={{ xs: "18px", md: "22px" }}>
        Время начала вашего маршрута
      </Typography>
      <TimePickerElement
        transform={{
          output: utils.dateOutputTransform,
        }}
        inputProps={{
          size: "small",
        }}
        sx={{
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
  );
};

export default TimeSelection;
