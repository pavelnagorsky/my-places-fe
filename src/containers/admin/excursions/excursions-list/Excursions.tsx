import AdminLayout from "@/containers/admin/layout/AdminLayout";
import ExcursionsTable from "@/containers/admin/excursions/excursions-list/table/ExcursionsTable";

const Excursions = () => {
  return (
    <AdminLayout>
      <ExcursionsTable />
    </AdminLayout>
  );
};

export default Excursions;
