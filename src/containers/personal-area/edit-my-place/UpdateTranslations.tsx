import { SwitchElement } from "react-hook-form-mui";
import { Box, BoxProps, FormHelperText } from "@mui/material";

const UpdateTranslations = (props: BoxProps) => {
  return (
    <Box {...props}>
      <SwitchElement
        sx={{ mx: 0 }}
        labelPlacement={"start"}
        label={"Обновить переводы"}
        name={"updateTranslations"}
      />
      <FormHelperText>Обновить переводы на другие языки</FormHelperText>
    </Box>
  );
};

export default UpdateTranslations;
