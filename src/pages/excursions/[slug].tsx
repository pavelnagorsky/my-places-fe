import dynamic from "next/dynamic";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import useAlternateLinks from "@/hooks/useAlternateLinks";
import { Fragment } from "react";
import { NextSeo } from "next-seo";
import I18nLanguages from "@/shared/I18nLanguages";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import excursionsService from "@/services/excursions-service/excursions.service";
import excursionPageJsonld from "@/shared/json-ld/excursion-page-jsonld";
import JsonLd from "@/shared/json-ld/JsonLd";
import utils from "@/shared/utils";

interface IExcursionPageProps {
  excursion: IExcursion;
}

const ExcursionPageLazy = dynamic(
  () => import("@/containers/excursion/ExcursionPage")
);

const Slug: NextPage<IExcursionPageProps> = ({ excursion }) => {
  const { canonical, alternateLinks } = useAlternateLinks();
  const jsonLdData = excursionPageJsonld(excursion);
  const plainDescription = utils.htmlToText(excursion.description);
  const seoDescription =
    plainDescription.substring(0, 160).trim() +
    (plainDescription.length > 160 ? "..." : "");
  return (
    <Fragment>
      <NextSeo
        title={excursion.title}
        description={seoDescription}
        canonical={canonical}
        languageAlternates={alternateLinks}
        openGraph={{
          url: canonical,
          title: excursion.title,
          description: seoDescription,
          images: excursion.images.map((img, index) => ({
            url: img,
            alt: excursion.places[index]?.title || excursion.title,
          })),
        }}
      />
      <JsonLd data={jsonLdData} />
      <ExcursionPageLazy excursion={excursion} />
    </Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await excursionsService.getSlugs();

  let localizedPaths: any[] = [];
  ctx.locales?.forEach((locale) => {
    // Get the paths we want to pre-render based on excursions slugs
    const paths = data.map((excursion) => ({
      params: { slug: excursion.slug },
      locale: locale,
    }));
    localizedPaths = [...localizedPaths, ...paths];
  });

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths: localizedPaths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<IExcursionPageProps> = async ({
  locale,
  params,
}) => {
  try {
    const { data } = await excursionsService.getExcursionBySlug(
      params?.slug as string,
      locale ?? I18nLanguages.ru
    );
    return {
      props: {
        excursion: data,
        ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
          "excursion-management",
          "route-management",
          "common",
        ])),
        // Will be passed to the page component as props
      },
      revalidate: 60,
    };
  } catch (e: any) {
    console.log("excursion page loading error:", e.response?.data);
    return {
      notFound: true,
    };
  }
};

export default Slug;
