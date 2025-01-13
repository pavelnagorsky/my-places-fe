import { Box, IconButton, Stack, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { TextFieldElement, useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

const RouteTitle = () => {
  const { watch, trigger } = useFormContext<IRouteBuilderForm>();
  const title = watch("title");
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    if (editMode) {
      trigger("title").then((res) => {
        if (res) setEditMode(false);
      });
    } else {
      setEditMode(true);
    }
  };

  return (
    <Stack gap={"1em"} direction={"row"} flexWrap={"wrap"}>
      <Typography variant={"h1"} mb={0}>
        Создание маршрута:
      </Typography>
      <Stack
        direction={"row"}
        gap={"1em"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        {editMode ? (
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
            onClick={toggleEditMode}
            color={"primary"}
            size={"small"}
            sx={{ bgcolor: primaryBackground }}
          >
            {editMode ? <CheckIcon /> : <ModeEditIcon />}
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default RouteTitle;
