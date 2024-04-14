import { useRouter } from "next/router";
import { Environment } from "@/shared/Environment";

const useAlternateLinks = () => {
  const { locale, locales, asPath, defaultLocale } = useRouter();
  const basePath = `https://${Environment.domain}`;
  const isDefaultLocale = locale === defaultLocale;
  const canonical = `${basePath}${
    isDefaultLocale ? "" : `/${locale}`
  }${asPath}`;
  const alternateLinks = (locales || [])
    .filter((l) => l !== locale)
    .map((l) => ({
      href: `${basePath}${l === defaultLocale ? "" : `/${l}`}${asPath}`,
      hrefLang: l,
    }));

  return {
    canonical,
    alternateLinks,
  };
};

export default useAlternateLinks;
