import { IPaginationRequest, IPaginationResponse } from "@/services/interfaces";
import { AxiosResponse } from "axios";
import { useState } from "react";
import utils from "@/shared/utils";
import { SearchOrderByEnum } from "@/services/places-service/interfaces/interfaces";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentSearchPage,
  setCurrentPage,
} from "@/store/search-slice/search.slice";

interface IUseSearchPaginationProps<ItemType, OrderByType> {
  apiCall: (
    pagination: IPaginationRequest<OrderByType>
  ) => Promise<AxiosResponse<IPaginationResponse<ItemType>>>;
  pageSize: number;
}

const useSearchPagination = <
  ItemType = ISearchPlace,
  OrderByType = SearchOrderByEnum
>({
  apiCall,
  pageSize,
}: IUseSearchPaginationProps<ItemType, OrderByType>) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentSearchPage);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ItemType[]>([]);
  const [isInitialRequest, setIsInitialRequest] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = utils.calculateTotalPages(totalItems, pageSize);

  const changeCurrentPage = (page: number) => {
    fetch(page);
  };

  const fetch = (pageParam = 0) => {
    const page = isInitialRequest ? currentPage : pageParam;
    setLoading(true);
    apiCall({
      pageSize: pageSize,
      page: page,
    })
      .then(async ({ data }) => {
        setItems(data.items);
        dispatch(setCurrentPage(data.page));
        setTotalItems(data.totalItems);
      })
      .catch((reason) => {
        setItems([]);
      })
      .finally(() => {
        setIsInitialRequest(false);
        setLoading(false);
      });
  };

  return {
    items,
    setItems,
    currentPage,
    totalItems,
    totalPages,
    loading,
    fetch,
    changeCurrentPage,
  };
};

export default useSearchPagination;
