import * as React from 'react';
import ResultItem from './ResultItem';

/**
 * props.data = Daten-Objekt
 *
 * @author w.glanzer, 10.02.2019
 */
export default (props) => {
  if (!props.data || !props.data.items) return <span>No data</span>;

  return (
    <div className="d-flex flex-wrap mb-3 mr-3">
      {/* eslint-disable-next-line react/no-array-index-key */}
      {props.data.items.map((pItem, pIndex) => <ResultItem className="ml-3 mt-3" data={pItem} key={pIndex} />)}
    </div>
  );
};
