import {
  IPaginationRequest,
  IPaginationResponse,
  OrderDirectionsEnum,
} from "@/services/interfaces";
import { AxiosResponse } from "axios";
import { useState } from "react";
import utils from "@/shared/utils";

interface IUsePaginationProps<ItemType, OrderByType> {
  apiCall: (
    pagination: IPaginationRequest<OrderByType>
  ) => Promise<AxiosResponse<IPaginationResponse<ItemType>>>;
  defaultOrderBy: OrderByType;
  defaultOrderDirection?: OrderDirectionsEnum;
  pageSize: number;
  defaultItems?: ItemType[];
  defaultTotalItems?: number;
  // do not set items to 0 when page changes. DEFAULT = false
  keepItems?: boolean;
}

const usePagination = <ItemType = any, OrderByType = number>({
  defaultOrderBy,
  defaultOrderDirection,
  apiCall,
  pageSize,
  defaultItems,
  defaultTotalItems,
  keepItems,
}: IUsePaginationProps<ItemType, OrderByType>) => {
  const [loading, setLoading] = useState(
    !(!!defaultItems && defaultItems.length > 0)
  );
  const [items, setItems] = useState<ItemType[]>(defaultItems || []);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(defaultTotalItems || 0);
  const totalPages = utils.calculateTotalPages(totalItems, pageSize);

  const [orderBy, setOrderBy] = useState<OrderByType>(defaultOrderBy);
  const [orderDirection, setOrderDirection] = useState<OrderDirectionsEnum>(
    defaultOrderDirection ?? OrderDirectionsEnum.DESC
  );

  const toggleOrderDirection = () => {
    if (orderDirection === OrderDirectionsEnum.DESC) {
      setOrderDirection(OrderDirectionsEnum.ASC);
    } else {
      setOrderDirection(OrderDirectionsEnum.DESC);
    }
  };

  const changeCurrentPage = (page: number) => {
    fetch(page);
  };

  const changeOrderBy = (newOrderBy: OrderByType) => {
    setOrderBy(newOrderBy);
  };

  const fetch = (page = 0) => {
    setLoading(true);
    if (!keepItems) setItems([]);
    apiCall({
      pageSize: pageSize,
      page: page,
      orderBy: orderBy,
      orderAsc: orderDirection === OrderDirectionsEnum.ASC,
    })
      .then(async ({ data }) => {
        setItems(data.items);
        setCurrentPage(data.page);
        setTotalItems(data.totalItems);
      })
      .catch((reason) => {
        setItems([]);
      })
      .finally(() => setLoading(false));
  };

  return {
    items,
    setItems,
    currentPage,
    totalItems,
    totalPages,
    loading,
    orderBy,
    changeOrderBy,
    orderDirection,
    toggleOrderDirection,
    fetch,
    changeCurrentPage,
  };
};

export default usePagination;
