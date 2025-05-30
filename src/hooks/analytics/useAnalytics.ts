import { AnalyticsEventsEnum } from "@/hooks/analytics/analytics.enum";
import { sendGTMEvent } from "@next/third-parties/google";
import { useAppSelector } from "@/store/hooks";
import { selectUserData } from "@/store/user-slice/user.slice";

const useAnalytics = () => {
  const userData = useAppSelector(selectUserData);

  const sendAnalytics = (
    event: AnalyticsEventsEnum,
    payload: Record<string, any>
  ) => {
    if (typeof window === "undefined") return;
    sendGTMEvent({ event: "cleanup", payload: null });
    sendGTMEvent({ event, payload, context: { userData } });
  };

  return sendAnalytics;
};

export default useAnalytics;
