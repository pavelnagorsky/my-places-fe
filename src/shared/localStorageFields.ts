const localStorageFields = {
  token: "TOKEN",
  searchCart: "SEARCH_CART",
  cookieConfirm: "MY_PLACES_COOKIE_CONFIRM",
  // mm-dd-yyyy
  newsPopup: (date: string) => `news-popup-${date}`,
};

export default localStorageFields;
