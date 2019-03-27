import * as React from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import SearchLayout from '../src/layouts/SearchLayout';
import ResultList from '../src/components/result/ResultList';
import { runSearch } from '../src/reducers/searchReducer';
import withAuth from '../src/auth/withAuth';
import ResultPagination from '../src/components/result/ResultPagination';

class Search extends React.Component {
  componentDidMount() {
    const { queryInURL, pageInURL, onExecuteSearch } = this.props;
    onExecuteSearch(queryInURL, pageInURL);
  }

  componentDidUpdate(prevProps) {
    const { queryInURL, pageInURL, isLoading, onExecuteSearch } = this.props;

    /* Only execute search if the results are not loading atm and only,
    if the query in the URL changed or the results were loaded for another query previously */
    if (!isLoading && (prevProps.queryInURL !== queryInURL || prevProps.pageInURL !== pageInURL))
      onExecuteSearch(queryInURL, pageInURL);
  }

  render() {
    return (
      <SearchLayout>
        <ResultList />
        <ResultPagination />
      </SearchLayout>
    );
  }
}

const mapStateToProps = state => ({
  queryInURL: parse(state.router.location.search).query,
  pageInURL: Number.parseInt(parse(state.router.location.search).page),
  isLoading: state.search.loading,
});

const mapDispatchToProps = dispatch => ({
  onExecuteSearch: (query, page = 0) => {
    dispatch(runSearch(query, page));
  },
});

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Search));
