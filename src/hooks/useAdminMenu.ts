const useAdminMenu = () => {
  return [
    {
      title: "Типы мест",
      href: "/administration/place-types",
    },
    {
      title: "Категории мест",
      href: "/administration/place-categories",
    },
  ] as { title: string; href: string }[];
};

export default useAdminMenu;
