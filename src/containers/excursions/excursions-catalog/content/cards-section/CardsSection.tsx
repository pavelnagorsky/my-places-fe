import { Stack } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { memo } from "react";
import ScrollToTopButton from "@/components/scroll-to-top-button/ScrollToTopButton";
import {
  selectHasMore,
  selectItems,
} from "@/store/excursions-slice/excursions.selectors";
import SearchResultsLoader, {
  searchResultsGridSx,
} from "./content/loader/SearchResultsLoader";
import ExcursionCard from "@/containers/excursions/excursions-catalog/content/cards-section/content/excursion-card/ExcursionCard";
import ScrollPositionTracker from "@/containers/excursions/excursions-catalog/content/cards-section/content/ScrollPositionTracker";

const CardsSection = ({
  onSubmit,
}: {
  onSubmit: (fromStart: boolean) => void;
}) => {
  // info about search request
  const hasMore = useAppSelector(selectHasMore);
  const items = useAppSelector(selectItems);

  return (
    <Stack alignItems={"center"} justifyContent={"center"} mb={"2em"}>
      <InfiniteScroll
        style={{
          padding: "0 1em",
          paddingBottom: "2em",
          margin: "0 -1em",
        }}
        dataLength={items.length}
        next={() => {
          if (!items.length) return;
          onSubmit(false);
        }}
        hasMore={hasMore}
        loader={<SearchResultsLoader />}
      >
        <Stack sx={searchResultsGridSx}>
          {items.map((excursion) => (
            <ExcursionCard excursion={excursion} key={excursion.id} />
          ))}
        </Stack>
      </InfiniteScroll>
      <ScrollToTopButton />
      <ScrollPositionTracker />
    </Stack>
  );
};

export default memo(CardsSection);
