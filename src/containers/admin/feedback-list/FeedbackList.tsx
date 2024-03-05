import AdminLayout from "@/containers/admin/layout/AdminLayout";
import FeedbackTable from "@/containers/admin/feedback-list/Table/FeedbackTable";

const FeedbackList = () => {
  return (
    <AdminLayout>
      <FeedbackTable />
    </AdminLayout>
  );
};

export default FeedbackList;
