import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";
import { sendGTMEvent } from "@next/third-parties/google";
import { useAppSelector } from "@/store/hooks";
import { selectUserData } from "@/store/user-slice/user.slice";

type AnalyticFields = "title" | "entity" | "entityId" | "page";

const useAnalytics = () => {
  const userData = useAppSelector(selectUserData);

  const sendAnalytics = (
    event: AnalyticsEventsEnum,
    payload: Partial<Record<AnalyticFields, string>>
  ) => {
    if (typeof window === "undefined") return;
    sendGTMEvent({ event: "cleanup", payload: null });
    sendGTMEvent({
      event,
      userName: userData ? `${userData.firstName} ${userData.lastName}` : "",
      userEmail: userData?.email || "",
      ...payload,
    });
  };

  return sendAnalytics;
};

export default useAnalytics;
