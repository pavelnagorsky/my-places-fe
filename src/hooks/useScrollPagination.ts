import { useState } from "react";
import { AxiosResponse } from "axios";
import utils from "@/shared/utils";
import {
  IPaginationRequest,
  IPaginationResponse,
  OrderDirectionsEnum,
} from "@/services/interfaces";

interface IUsePaginationProps<ItemType, OrderByType> {
  apiCall: (
    pagination: IPaginationRequest<OrderByType>
  ) => Promise<AxiosResponse<IPaginationResponse<ItemType>>>;
  defaultOrderBy: OrderByType;
  defaultOrderDirection?: OrderDirectionsEnum;
  pageSize: number;
}

const useScrollPagination = <ItemType = any, OrderByType = number>({
  defaultOrderBy,
  defaultOrderDirection,
  apiCall,
  pageSize,
}: IUsePaginationProps<ItemType, OrderByType>) => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [noItems, setNoItems] = useState(false);
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

  const changeOrderBy = (newOrderBy: OrderByType) => {
    setOrderBy(newOrderBy);
  };

  const fetch = (fromStart = true) => {
    setNoItems(false);
    setHasMore(true);
    if (fromStart) {
      setItems([]);
    }

    // calculate page for pagination
    const requestedPage = fromStart
      ? 0
      : utils.calculateCurrentScrollPage(items.length, pageSize);

    apiCall({
      pageSize: pageSize,
      page: requestedPage,
      orderBy: orderBy,
      orderAsc: orderDirection === OrderDirectionsEnum.ASC,
    })
      .then(({ data }) => {
        const updatedItems = fromStart ? data.items : items.concat(data.items);
        setNoItems(updatedItems.length === 0);
        setHasMore(data.totalPages > data.page + 1);
        setItems(updatedItems);
      })
      .catch((reason) => {
        setNoItems(items.length === 0);
        setHasMore(false);
      });
  };

  return {
    items,
    setItems,
    hasMore,
    noItems,
    orderBy,
    changeOrderBy,
    orderDirection,
    toggleOrderDirection,
    fetch,
  };
};

export default useScrollPagination;
