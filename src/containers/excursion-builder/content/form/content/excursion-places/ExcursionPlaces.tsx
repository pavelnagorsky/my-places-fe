import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeItem,
  selectItems,
  sortItems,
} from "@/store/excursion-builder-slice/excursion-builder.slice";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import SortableList, { SortableItem } from "react-easy-sort";
import { AnimatePresence, motion } from "framer-motion";
import CartItem from "@/components/search-cart/content/CartItem";
import Stepper from "@/containers/excursion-builder/content/form/content/excursion-places/stepper/Stepper";
import ControlButtons from "@/containers/excursion-builder/content/form/content/control-buttons/ControlButtons";
import ExcursionPlaceCard from "@/containers/excursion-builder/content/form/content/excursion-places/excursion-place-card/ExcursionPlaceCard";

const ExcursionPlaces = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);

  const onRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    dispatch(sortItems({ oldIndex, newIndex }));
  };

  return (
    <Stack
      direction={"row"}
      gap={{ xs: "1em", md: "2em" }}
      height={"100%"}
      sx={{ "& .drag-container": { width: "100%" } }}
    >
      {!isMobile && <Stepper />}
      <Stack gap={2} width={"100%"}>
        <SortableList
          onSortEnd={onSortEnd}
          draggedItemClassName="dragged"
          className={"drag-container"}
        >
          <Stack gap={"1em"} width={"100%"}>
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.5, x: -400 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: 200,
                    zIndex: 1,
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <SortableItem>
                    <Stack>
                      <ExcursionPlaceCard
                        place={item}
                        index={index}
                        onRemove={onRemove}
                      />
                    </Stack>
                  </SortableItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </Stack>
        </SortableList>
        <ControlButtons />
      </Stack>
    </Stack>
  );
};

export default ExcursionPlaces;
