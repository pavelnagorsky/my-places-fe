import AdminLayout from "@/containers/Admin/Layout/AdminLayout";
import { Box, debounce, Stack } from "@mui/material";
import PlaceCategoriesHeader from "@/containers/Admin/PlaceCategories/PlaceCategoriesHeader";
import PlaceCategoriesTable from "@/containers/Admin/PlaceCategories/PlaceCategoriesTable";
import { ChangeEvent, useMemo, useState } from "react";

const PlaceCategories = () => {
  const [search, setSearch] = useState("");
  const _onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const onSearch = useMemo(() => debounce(_onSearch, 300), [_onSearch]);

  return (
    <AdminLayout>
      <Stack>
        <PlaceCategoriesHeader onSearch={onSearch} />
        <Box>
          <PlaceCategoriesTable searchText={search} />
        </Box>
      </Stack>
    </AdminLayout>
  );
};

export default PlaceCategories;
