import { GetStaticProps, NextPage, NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import mainImageMd from "../../public/images/home-page/main-section/main-image.jpg";
import useAlternateLinks from "@/hooks/useAlternateLinks";
import searchService from "@/services/search-service/search.service";
import { IPlacesCountByTypes } from "@/services/search-service/interfaces/places-count-by-types.interface";

const HomePageLazy = dynamic(() => import("../containers/home/HomePage"));

const Index: NextPage<{ placesCount: IPlacesCountByTypes }> = (
  { placesCount },
  context: NextPageContext
) => {
  const { t } = useTranslation("home");
  const { canonical, alternateLinks } = useAlternateLinks();

  return (
    <Fragment>
      <NextSeo
        title={t("seo.title", { year: new Date().getFullYear() })}
        description={t("seo.description")}
        canonical={canonical}
        languageAlternates={alternateLinks}
        openGraph={{
          url: canonical,
          title: t("seo.title"),
          description: t("seo.description"),
          images: [
            {
              url: mainImageMd.src,
              alt: t("seo.title", { year: new Date().getFullYear() }),
            },
          ],
        }}
      />
      <HomePageLazy placesCount={placesCount} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let placesCount: IPlacesCountByTypes = {
    museumsCount: 300,
    churchesCount: 500,
  };
  try {
    const { data } = await searchService.getPlacesCountByTypes();
    placesCount = data;
  } catch (e) {}
  return {
    props: {
      placesCount: placesCount,
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "home",
        "common",
      ])),
      // Will be passed to the page component as props
    },
    revalidate: 6 * 3600, // Updates once every 6 hours
  };
};

export default Index;
