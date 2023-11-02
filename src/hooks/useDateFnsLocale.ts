import { useTranslation } from "next-i18next";
import I18nLanguages from "@/shared/I18nLanguages";
import { be, ru } from "date-fns/locale";

const useDateFnsLocale = () => {
  const { i18n } = useTranslation();
  if (i18n.language === I18nLanguages.ru) return ru;
  if (i18n.language === I18nLanguages.be) return be;
  return undefined;
};

export default useDateFnsLocale;
