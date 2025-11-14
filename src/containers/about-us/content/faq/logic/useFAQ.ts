import { useTranslation } from "next-i18next";

const useFAQ = () => {
  const { t } = useTranslation("about");

  const data = [
    {
      title: t("faq.1.title"),
      questions: [
        { title: t("faq.1.1.title"), description: t("faq.1.1.description") },
        { title: t("faq.1.2.title"), description: t("faq.1.2.description") },
        { title: t("faq.1.3.title"), description: t("faq.1.3.description") },
        { title: t("faq.1.4.title"), description: t("faq.1.4.description") },
      ],
    },
    {
      title: t("faq.2.title"),
      questions: [
        { title: t("faq.2.1.title"), description: t("faq.2.1.description") },
        { title: t("faq.2.2.title"), description: t("faq.2.2.description") },
      ],
    },
    {
      title: t("faq.3.title"),
      questions: [
        { title: t("faq.3.1.title"), description: t("faq.3.1.description") },
        { title: t("faq.3.2.title"), description: t("faq.3.2.description") },
        { title: t("faq.3.3.title"), description: t("faq.3.3.description") },
        { title: t("faq.3.4.title"), description: t("faq.3.4.description") },
      ],
    },
    {
      title: t("faq.4.title"),
      questions: [
        { title: t("faq.4.1.title"), description: t("faq.4.1.description") },
      ],
    },
    {
      title: t("faq.5.title"),
      questions: [
        { title: t("faq.5.1.title"), description: t("faq.5.1.description") },
        { title: t("faq.5.2.title"), description: t("faq.5.2.description") },
        { title: t("faq.5.3.title"), description: t("faq.5.3.description") },
      ],
    },
    {
      title: t("faq.6.title"),
      questions: [
        { title: t("faq.6.1.title"), description: t("faq.6.1.description") },
        { title: t("faq.6.2.title"), description: t("faq.6.2.description") },
        { title: t("faq.6.3.title"), description: t("faq.6.3.description") },
      ],
    },
  ];

  return data;
};

export default useFAQ;
