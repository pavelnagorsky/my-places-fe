import AdminLayout from "@/containers/admin/layout/AdminLayout";
import { Box, debounce, Stack } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import RegionsHeader from "@/containers/admin/regions/RegionsHeader";
import RegionsTable from "@/containers/admin/regions/RegionsTable";

const Regions = () => {
  const [search, setSearch] = useState("");
  const _onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const onSearch = useMemo(() => debounce(_onSearch, 300), [_onSearch]);

  return (
    <AdminLayout>
      <Stack>
        <RegionsHeader onSearch={onSearch} />
        <Box>
          <RegionsTable searchText={search} />
        </Box>
      </Stack>
    </AdminLayout>
  );
};

export default Regions;
