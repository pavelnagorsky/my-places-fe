import AdminLayout from "@/containers/admin/layout/AdminLayout";
import FeedbackListTable from "@/containers/admin/feedback-list/feedback-list/table/FeedbackListTable";

const FeedbackList = () => {
  return (
    <AdminLayout>
      <FeedbackListTable />
    </AdminLayout>
  );
};

export default FeedbackList;
