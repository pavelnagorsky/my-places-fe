import { Stack } from "@mui/material";
import { IExcursionSearchItem } from "@/services/excursions-service/interfaces/excursion-search-item.interface";
import { searchResultsGridSx } from "@/containers/excursions/excursions-catalog/content/cards-section/content/loader/SearchResultsLoader";
import ExcursionCard from "@/containers/excursions/excursions-catalog/content/cards-section/content/excursion-card/ExcursionCard";
import ScrollToTopButton from "@/components/scroll-to-top-button/ScrollToTopButton";

const CardsSection = ({ items }: { items: IExcursionSearchItem[] }) => {
  return (
    <Stack alignItems={"center"} justifyContent={"center"} mb={"2em"}>
      <Stack sx={searchResultsGridSx}>
        {items.map((excursion) => (
          <ExcursionCard excursion={excursion} key={excursion.id} />
        ))}
      </Stack>
      <ScrollToTopButton />
    </Stack>
  );
};

export default CardsSection;
