import I18nLanguages from "@/shared/I18nLanguages";

const parseLanguageToId = (lang?: string) => {
  if (lang === I18nLanguages.ru) return 1;
  if (lang === I18nLanguages.be) return 2;
  if (lang === I18nLanguages.en) return 3;
  return 1;
};

export default parseLanguageToId;
