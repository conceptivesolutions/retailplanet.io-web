import React from 'react';
import PriceFilter from './price/PriceFilter';
import GeoFilter from './geo/GeoFilter';

/**
 * Simple container component which contains
 * all available filters in search-state
 *
 * @author w.glanzer, 27.04.2019
 */
export default props => (
  <div className={props.className}>
    <GeoFilter />
    <PriceFilter />
  </div>
);
