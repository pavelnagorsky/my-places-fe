import { Stack } from "@mui/material";
import SearchFilter from "@/containers/excursions/content/filters/content/SearchFilter";
import AdditionalFilters from "@/containers/excursions/content/filters/content/additional-filters/AdditionalFilters";

const Filters = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
      <AdditionalFilters onSubmit={onSubmit} />
      <SearchFilter onSubmit={onSubmit} />
    </Stack>
  );
};

export default Filters;
