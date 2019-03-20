import * as React from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import SearchLayout from '../src/layouts/SearchLayout';
import ResultList from '../src/components/result/ResultList';
import { runSearch } from '../src/reducers/searchReducer';
import withAuth from '../src/auth/withAuth';

class Search extends React.Component {
  componentDidMount() {
    const { queryInURL, token, onExecuteSearch } = this.props;
    onExecuteSearch(queryInURL, token);
  }

  componentDidUpdate(prevProps) {
    const { queryInURL, queryForCurrentResults, isLoading, token, onExecuteSearch } = this.props;

    /* Only execute search if the results are not loading atm and only,
    if the query in the URL changed or the results were loaded for another query previously */
    if (!isLoading && (prevProps.queryInURL !== queryInURL || queryInURL !== queryForCurrentResults))
      onExecuteSearch(queryInURL, token);
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
  queryInURL: parse(state.router.location.search).query,
  queryForCurrentResults: state.search.results.query,
  isLoading: state.search.isLoading,
  token: state.user.tokens ? state.user.tokens.accessToken : null,
});

const mapDispatchToProps = dispatch => ({
  onExecuteSearch: (query, token) => {
    dispatch(runSearch(query, token));
  },
});

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Search));
