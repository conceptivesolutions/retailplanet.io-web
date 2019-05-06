import * as React from 'react';
import { connect } from 'react-redux';
import ResultItem from './ResultItem';
import css from './ResultList.scss';

/**
 * @author w.glanzer, 10.02.2019
 */
const ResultList = (props) => {
  // Should not happen!
  if (!props.results || props.results.length === 0)
    return <span>No data</span>;
  return (
    <div className={css.list}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      {props.results.map((pItem, pIndex) => (
        <ResultItem className={css.item} data={pItem} key={pIndex} />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  results: state.search.results.items,
});

export default connect(mapStateToProps)(ResultList);
