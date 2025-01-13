import { Stack, useMediaQuery, useTheme } from "@mui/material";
import SortableList, { SortableItem } from "react-easy-sort";
import CartItem from "@/components/search-cart/content/CartItem";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeItem,
  selectItems,
  sortItems,
} from "@/store/route-builder-slice/route-builder.slice";
import StartEndSelection from "@/containers/route-builder/content/form/sections/start-end-selection/StartEndSelection";
import Stepper from "@/containers/route-builder/content/form/sections/Stepper";
import ControlButtons from "@/containers/route-builder/content/form/sections/control-buttons/ControlButtons";
import { AnimatePresence, motion, Reorder } from "framer-motion";

const Form = () => {
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
    <Stack>
      <Stack
        direction={"row"}
        gap={{ xs: "1em", md: "2em" }}
        height={"100%"}
        px={{ xs: "1em", md: "2em" }}
        pb={"1em"}
        sx={{ "& .drag-container": { width: "100%" } }}
      >
        {!isMobile && <Stepper />}
        <Stack gap={4} width={"100%"}>
          <StartEndSelection />
          <SortableList
            onSortEnd={onSortEnd}
            draggedItemClassName="dragged"
            className={"drag-container"}
          >
            <Stack gap={"1em"} width={"100%"}>
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
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
                        <CartItem place={item} onRemove={onRemove} />
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
    </Stack>
  );
};

export default Form;
