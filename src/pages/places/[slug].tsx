import dynamic from "next/dynamic";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import placesService from "@/services/places-service/places.service";
import { IPlace } from "@/services/places-service/place.interface";

interface IPlacePageProps {
  place: IPlace;
}

const PlacePageLazy = dynamic(() => import("@/containers/Place/PlacePage"));

const Slug: NextPage<IPlacePageProps> = ({ place }) => {
  return <PlacePageLazy place={place} />;
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await placesService.getPlacesSlugs();

  let localizedPaths: any[] = [];
  ctx.locales?.forEach((locale) => {
    // Get the paths we want to pre-render based on places slugs
    const paths = data.map((place) => ({
      params: { slug: place.slug },
      locale: locale,
    }));
    localizedPaths = [...localizedPaths, ...paths];
  });

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths: localizedPaths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<IPlacePageProps> = async ({
  locale,
  params,
}) => {
  const { data } = await placesService.getPlaceBySlug(
    params?.slug as string,
    locale ?? I18nLanguages.ru
  );
  return {
    props: {
      place: data,
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

export default Slug;
