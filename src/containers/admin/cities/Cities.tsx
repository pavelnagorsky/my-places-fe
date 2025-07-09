import AdminLayout from "@/containers/admin/layout/AdminLayout";
import { Box, debounce, Stack } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import CitiesHeader from "@/containers/admin/cities/CitiesHeader";
import CitiesTable from "@/containers/admin/cities/CitiesTable";

const Cities = () => {
  const [search, setSearch] = useState("");
  const _onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const onSearch = useMemo(() => debounce(_onSearch, 300), [_onSearch]);

  return (
    <AdminLayout>
      <Stack>
        <CitiesHeader onSearch={onSearch} />
        <Box>
          <CitiesTable searchText={search} />
        </Box>
      </Stack>
    </AdminLayout>
  );
};

export default Cities;
