import { useEffect, useState } from "react";
import { ISelect } from "@/shared/interfaces";
import citiesService from "@/services/cities-service/cities.service";
import { useTranslation } from "next-i18next";

const useCities = () => {
  const { i18n } = useTranslation();
  const [cities, setCities] = useState<ISelect[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = () => {
    if (loading) return;
    setLoading(true);
    citiesService
      .getAll(i18n.language)
      .then(({ data }) => {
        setCities(data.map((city) => ({ id: city.id, label: city.title })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCities();
  }, [i18n.language]);

  return { cities, fetchCities, loading };
};

export default useCities;
