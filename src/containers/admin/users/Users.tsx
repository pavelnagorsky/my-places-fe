import AdminLayout from "@/containers/admin/layout/AdminLayout";
import UsersTable from "@/containers/admin/users/Table/UsersTable";

const Users = () => {
  return (
    <AdminLayout>
      <UsersTable />
    </AdminLayout>
  );
};

export default Users;
