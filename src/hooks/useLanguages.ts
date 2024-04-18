import { LanguageIdsEnum } from "@/shared/LanguageIdsEnum";
import I18nLanguages from "@/shared/I18nLanguages";

interface ILanguageOption {
  id: LanguageIdsEnum;
  locale: keyof typeof I18nLanguages;
  label: string;
}

const useLanguages = () => {
  return [
    { id: LanguageIdsEnum.ru, locale: I18nLanguages.ru, label: "Русский" },
    {
      id: LanguageIdsEnum.be,
      locale: I18nLanguages.be,
      label: "Беларуская мова",
    },
    { id: LanguageIdsEnum.en, locale: I18nLanguages.en, label: "English" },
  ] as ILanguageOption[];
};

export default useLanguages;
