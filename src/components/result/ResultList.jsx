import * as React from 'react';
import { connect } from 'react-redux';
import ResultItem from './ResultItem';

/**
 * @author w.glanzer, 10.02.2019
 */
const ResultList = (props) => {
  if (!props.results || props.results.length === 0) return <span>No data</span>;

  return (
    <div className="d-flex flex-wrap mb-3 mr-3">
      {/* eslint-disable-next-line react/no-array-index-key */}
      {props.results.map((pItem, pIndex) => (
        <ResultItem className="ml-3 mt-3" data={pItem} key={pIndex} />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  results: state.search.results,
});

export default connect(mapStateToProps)(ResultList);
