import AdminLayout from "@/containers/admin/layout/AdminLayout";
import { Box, debounce, Stack } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import PlaceTypesHeader from "@/containers/admin/place-types/PlaceTypesHeader";
import PlaceTypesTable from "@/containers/admin/place-types/PlaceTypesTable";

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
