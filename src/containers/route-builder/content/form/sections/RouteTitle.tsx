import { Box, IconButton, Stack, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { TextFieldElement, useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

const RouteTitle = ({ editMode }: { editMode?: boolean }) => {
  const { watch, trigger } = useFormContext<IRouteBuilderForm>();
  const title = watch("title");
  const [editTitleMode, setEditTitleMode] = useState(false);

  const toggleEditTitleMode = () => {
    if (editTitleMode) {
      trigger("title").then((res) => {
        if (res) setEditTitleMode(false);
      });
    } else {
      setEditTitleMode(true);
    }
  };

  return (
    <Stack gap={"1em"} direction={"row"} flexWrap={"wrap"}>
      <Typography variant={"h1"} mb={0}>
        {editMode ? "Маршрут:" : "Создание маршрута:"}
      </Typography>
      <Stack
        direction={"row"}
        gap={"1em"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        {editTitleMode ? (
          <TextFieldElement
            name={"title"}
            rules={{ required: true }}
            variant={"standard"}
            slotProps={{
              input: {
                sx: { fontSize: { md: "20px" } },
              },
            }}
          />
        ) : (
          <Typography
            variant={"h1"}
            mb={0}
            component={"p"}
            color={"primary.main"}
          >
            {title}
          </Typography>
        )}
        <Box>
          <IconButton
            onClick={toggleEditTitleMode}
            color={"primary"}
            size={"small"}
            sx={{ bgcolor: primaryBackground }}
          >
            {editTitleMode ? <CheckIcon /> : <ModeEditIcon />}
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default RouteTitle;
