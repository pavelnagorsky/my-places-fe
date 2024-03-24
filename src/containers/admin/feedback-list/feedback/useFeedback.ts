import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IFeedback } from "@/services/contact-service/interfaces/feedback.interface";
import contactService from "@/services/contact-service/contact.service";

const useFeedback = () => {
  const router = useRouter();
  const query = router.query as { id: string };

  const [feedback, setFeedback] = useState<IFeedback | null>(null);

  useEffect(() => {
    // get feedback
    contactService
      .getOneById(query.id)
      .then(({ data }) => {
        setFeedback(data);
      })
      .catch(() => {
        setFeedback(null);
      });
  }, [query.id]);

  return {
    feedback,
  };
};

export default useFeedback;
