import AdminLayout from "@/containers/Admin/Layout/AdminLayout";
import { Box, debounce, Stack } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import PlaceTypesHeader from "@/containers/Admin/PlaceTypes/PlaceTypesHeader";
import PlaceTypesTable from "@/containers/Admin/PlaceTypes/PlaceTypesTable";

const PlaceTypes = () => {
  const [search, setSearch] = useState("");
  const _onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const onSearch = useMemo(() => debounce(_onSearch, 300), [_onSearch]);

  return (
    <AdminLayout>
      <Stack>
        <PlaceTypesHeader onSearch={onSearch} />
        <Box>
          <PlaceTypesTable searchText={search} />
        </Box>
      </Stack>
    </AdminLayout>
  );
};

export default PlaceTypes;
