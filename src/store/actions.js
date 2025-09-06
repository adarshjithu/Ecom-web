export * from "./Category/actions"
export * from "./Address/actions";
export * from "./Product/actions";
export * from "./Wishlilst/actions";
export * from "./Auth/actions";
export * from "./Home/actions";
export const UPDATE_PRODUCT_WISHLIST_STATUS = 'UPDATE_PRODUCT_WISHLIST_STATUS';
export const updateProductWishlistStatus = (productId, inWishlist) => ({
  type: UPDATE_PRODUCT_WISHLIST_STATUS,
  payload: { productId, inWishlist },
});


