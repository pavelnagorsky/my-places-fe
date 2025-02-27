import { Stack } from "@mui/material";
import ExcursionInfo from "@/containers/excursion-builder/content/form/content/excursion-info/ExcursionInfo";
import ExcursionPlaces from "@/containers/excursion-builder/content/form/content/excursion-places/ExcursionPlaces";

const ExcursionBuilderForm = () => {
  return (
    <Stack gap={"2em"}>
      <ExcursionInfo />
      <ExcursionPlaces />
    </Stack>
  );
};

export default ExcursionBuilderForm;
