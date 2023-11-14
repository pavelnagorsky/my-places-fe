import { ISelect } from "@/shared/interfaces";
import { LanguageIdsEnum } from "@/shared/LanguageIdsEnum";

const useLanguages = () => {
  return [
    { id: LanguageIdsEnum.ru, label: "Русский" },
    { id: LanguageIdsEnum.be, label: "Беларускi" },
    { id: LanguageIdsEnum.en, label: "English" },
  ] as ISelect[];
};

export default useLanguages;
