import { ExcursionTypesEnum } from "@/services/excursions-service/interfaces/excursion-types.enum";

const useExcursionTypes = () => {
  const options = [
    { id: ExcursionTypesEnum.Overview, label: "Обзорная" },
    { id: ExcursionTypesEnum.Region, label: "По региону" },
  ];

  return options;
};

export default useExcursionTypes;
