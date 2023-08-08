import React from 'react';

import { connect } from 'react-redux';
import { selectCollectionPreview } from '../../redux/shop/shop.selector';
import { createStructuredSelector } from 'reselect';

import Collection from '../../components/collection-preview/collection-preview.component.jsx';

const CollectionOverview = ({ collections }) => (
  <div className='collection-overview'>
    {collections.map(({ id, ...collection }) => (
      <Collection key={id} {...collection} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionPreview,
});

export default connect(mapStateToProps)(CollectionOverview)
