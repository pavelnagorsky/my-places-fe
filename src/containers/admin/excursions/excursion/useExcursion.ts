import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import excursionsService from "@/services/excursions-service/excursions.service";

const useExcursion = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const query = router.query as { id: string };
  const [excursion, setExcursion] = useState<IExcursion | null>(null);

  const fetchExcursion = () => {
    excursionsService
      .getExcursionById(+query.id, i18n.language)
      .then(({ data }) => {
        setExcursion(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchExcursion();
  }, [i18n.language, query.id]);

  return { excursion, id: +query.id, fetchExcursion };
};

export default useExcursion;
