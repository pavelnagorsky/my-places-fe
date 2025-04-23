import dynamic from "next/dynamic";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import placesService from "@/services/places-service/places.service";
import { IPlace } from "@/services/places-service/interfaces/place.interface";
import reviewsService from "@/services/reviews-service/reviews.service";
import { IPaginationResponse } from "@/services/interfaces";
import { ISearchReview } from "@/services/reviews-service/interfaces/interfaces";
import { Fragment } from "react";
import { NextSeo } from "next-seo";
import useAlternateLinks from "@/hooks/useAlternateLinks";
import placePageJsonld from "@/shared/json-ld/place-page-jsonld";
import JsonLd from "@/shared/json-ld/JsonLd";

interface IPlacePageProps {
  place: IPlace;
  reviews: IPaginationResponse<ISearchReview>;
}

const PlacePageLazy = dynamic(() => import("@/containers/place/PlacePage"));

const Slug: NextPage<IPlacePageProps> = ({ place, reviews }) => {
  const { canonical, alternateLinks } = useAlternateLinks();
  const jsonLdData = placePageJsonld(place);
  return (
    <Fragment>
      <NextSeo
        title={place.title}
        description={place.description}
        canonical={canonical}
        languageAlternates={alternateLinks}
        openGraph={{
          url: canonical,
          title: place.title,
          description: place.description,
          images: place.images.map((img) => ({ url: img, alt: place.title })),
        }}
      />
      <JsonLd data={jsonLdData} />
      <PlacePageLazy place={place} reviews={reviews} />
    </Fragment>
  );
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
  try {
    const fetchPlace = placesService.getPlaceBySlug(
      params?.slug as string,
      locale ?? I18nLanguages.ru
    );
    const fetchReviews = reviewsService.getPlaceReviews(
      params?.slug as string,
      locale ?? I18nLanguages.ru,
      0
    );
    const [placeRes, reviewsRes] = await Promise.all([
      fetchPlace,
      fetchReviews,
    ]);
    return {
      props: {
        place: placeRes.data,
        reviews: reviewsRes.data,
        ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
          "place",
          "route-management",
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

export default Slug;
