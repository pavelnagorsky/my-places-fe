import { Variants } from "framer-motion";

const animationVariants = {
  defaultContainerVariant: {
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  } as Variants,

  defaultItemVariant: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  } as Variants,
};

export default animationVariants;
