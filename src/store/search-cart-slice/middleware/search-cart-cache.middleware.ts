import { Middleware } from "@reduxjs/toolkit";
import {
  removeCartItem,
  sortItems,
} from "@/store/search-cart-slice/search-cart.slice";

import {
  saveCartToLocalStorageThunk,
  togglePlaceIdInCartThunk,
} from "@/store/search-cart-slice/thunks/thunks";

// This middleware is needed to save cart place ids in the local storage after some actions are fulfilled
const searchCartCacheMiddleware: Middleware<{}, any, any> =
  (store) => (next) => (action) => {
    const result = next(action);
    if (
      togglePlaceIdInCartThunk.fulfilled.match(action) ||
      removeCartItem.match(action) ||
      sortItems.match(action)
    ) {
      store.dispatch(saveCartToLocalStorageThunk());
    }
    return result;
  };

export default searchCartCacheMiddleware;
