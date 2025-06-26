import { useRouter } from "next/router";

const useRouterPathWithoutQuery = () => {
  const { asPath } = useRouter();
  const pathWithoutQuery = asPath.split("?")[0];
  return pathWithoutQuery;
};

export default useRouterPathWithoutQuery;
