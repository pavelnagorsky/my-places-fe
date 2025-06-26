import { useRouter } from "next/router";
import { Environment } from "@/shared/Environment";
import useRouterPathWithoutQuery from "./useRouterPathWithoutQuery";

const useAlternateLinks = () => {
  const { locale, locales, defaultLocale } = useRouter();
  const pathWithoutQuery = useRouterPathWithoutQuery();
  const basePath = `https://${Environment.domain}`;
  const isDefaultLocale = locale === defaultLocale;
  const canonical = `${basePath}${isDefaultLocale ? "" : `/${locale}`}${
    pathWithoutQuery === "/" ? "" : pathWithoutQuery
  }`;
  const alternateLinks = (locales || [])
    .filter((l) => l !== locale)
    .map((l) => ({
      href: `${basePath}${
        l === defaultLocale ? "" : `/${l}`
      }${pathWithoutQuery}`,
      hrefLang: l,
    }));

  return {
    canonical,
    alternateLinks,
  };
};

export default useAlternateLinks;
