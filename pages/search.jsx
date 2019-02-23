import * as React from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import SearchLayout from '../src/layouts/SearchLayout';
import ResultList from '../src/components/result/ResultList';
import { runSearch } from '../src/reducers/searchReducer';

class Search extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) this.props.onExecuteSearch(this.props.query);
  }

  render() {
    return (
      <SearchLayout>
        <ResultList />
      </SearchLayout>
    );
  }
}

const mapStateToProps = state => ({
  query: parse(state.router.location.search).query,
});

const mapDispatchToProps = dispatch => ({
  onExecuteSearch: (query) => {
    dispatch(runSearch(query));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
