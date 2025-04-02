import SearchResultsLoader, {
  searchResultsGridSx,
} from "@/containers/search-page/content/loader/SearchResultsLoader";
import PlaceCard from "@/containers/search-page/content/cards-section/place-card/PlaceCard";
import { Stack } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { selectHasMore, selectItems } from "@/store/search-slice/search.slice";
import ScrollPositionTracker from "@/containers/search-page/content/cards-section/ScrollPositionTracker";
import InfiniteScroll from "react-infinite-scroll-component";
import { memo } from "react";

const CardsSection = ({
  onSubmit,
}: {
  onSubmit: (fromStart: boolean) => void;
}) => {
  // info about search request
  const hasMore = useAppSelector(selectHasMore);
  const places = useAppSelector(selectItems);

  return (
    <Stack alignItems={"center"} justifyContent={"center"} mb={"2em"}>
      <InfiniteScroll
        style={{
          padding: "0 1em",
          paddingBottom: "2em",
          margin: "0 -1em",
        }}
        dataLength={places.length}
        next={() => onSubmit(false)}
        hasMore={hasMore}
        loader={<SearchResultsLoader />}
      >
        <Stack sx={searchResultsGridSx}>
          {places.map((place) => (
            <PlaceCard place={place} key={place.id} />
          ))}
        </Stack>
      </InfiniteScroll>
      <ScrollPositionTracker />
    </Stack>
  );
};

export default memo(CardsSection);
