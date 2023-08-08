import React from 'react';
import './collection-preview.scss';
import CollectionItem from '../collection-item/collection-item.component';

const Collection = ({ title, items }) => (
  <div className='collection-preview'>
    <h1 className='title'>
      {title.toUpperCase()}
    </h1>
    <div className='preview'>
      {items
        .filter((i, idx) => idx < 4)
        .map((item) => (
          <CollectionItem
            key={item.id}
            item={item}
          />
        ))}
    </div>
  </div>
);

export default Collection;
