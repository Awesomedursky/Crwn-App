import { createSelector } from 'reselect';

const shop = (state) => state.shop;

export const selectCollections = createSelector(
  [shop],
  (shop) => shop.collections
);

export const selectCollectionPreview =
  createSelector(
    [selectCollections],
    (collections) =>
      Object.keys(collections).map(
        (key) => collections[key]
      )
  );

export const selectCollection = (
  collectionUrlParam
) =>
  createSelector(
    [selectCollections],
    (collections) =>
      collections[collectionUrlParam]
  );
