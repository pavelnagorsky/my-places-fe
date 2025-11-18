import dynamic from "next/dynamic";
import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import useAlternateLinks from "@/hooks/useAlternateLinks";
import { Fragment } from "react";
import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { IExcursionSearchItem } from "@/services/excursions-service/interfaces/excursion-search-item.interface";
import excursionsService from "@/services/excursions-service/excursions.service";
import { SearchExcursionsOrderByEnum } from "@/services/excursions-service/enums/enums";

const GenericExcursionsPageLazy = dynamic(
  () =>
    import(
      "../../containers/excursions/generic-excursions-catalog/GenericExcursionsCatalog"
    )
);

const Index: NextPage<{ items: IExcursionSearchItem[] }> = ({ items }) => {
  const { t } = useTranslation("excursion-management");
  const { canonical, alternateLinks } = useAlternateLinks();

  return (
    <Fragment>
      <NextSeo
        title={t("seo.mustSee.title")}
        description={t("seo.mustSee.description")}
        canonical={canonical}
        languageAlternates={alternateLinks}
        openGraph={{
          url: canonical,
          title: t("seo.mustSee.title"),
          description: t("seo.mustSee.description"),
        }}
      />
      <GenericExcursionsPageLazy items={items} title={t("seo.mustSee.title")} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<{
  items: IExcursionSearchItem[];
}> = async ({ locale, params }) => {
  try {
    const response = await excursionsService.searchExcursions(
      {
        page: 0,
        isPrimary: true,
        pageSize: 100,
        orderBy: SearchExcursionsOrderByEnum.CREATED_AT,
        orderAsc: true,
        // default filters
        search: "",
        regionIds: [],
        travelModes: [],
        cityIds: [],
        types: [],
        placeTypeIds: [],
      },
      locale ?? I18nLanguages.ru
    );
    return {
      props: {
        items: response.data.items,
        ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
          "excursion-management",
          "common",
        ])),
        // Will be passed to the page component as props
      },
      revalidate: 60,
    };
  } catch (e: any) {
    console.log("place page loading error:", e.response?.data);
    return {
      notFound: true,
    };
  }
};

export default Index;
