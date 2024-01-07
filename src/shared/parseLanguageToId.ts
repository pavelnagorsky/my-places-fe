import I18nLanguages from "@/shared/I18nLanguages";
import { LanguageIdsEnum } from "@/shared/LanguageIdsEnum";

const parseLanguageToId = (lang?: string) => {
  if (lang === I18nLanguages.ru) return LanguageIdsEnum.ru;
  if (lang === I18nLanguages.be) return LanguageIdsEnum.be;
  if (lang === I18nLanguages.en) return LanguageIdsEnum.en;
  return LanguageIdsEnum.ru;
};

export default parseLanguageToId;
