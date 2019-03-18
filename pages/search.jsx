import * as React from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import SearchLayout from '../src/layouts/SearchLayout';
import ResultList from '../src/components/result/ResultList';
import { runSearch } from '../src/reducers/searchReducer';
import withAuth from '../src/auth/withAuth';

class Search extends React.Component {
  componentDidUpdate(prevProps) {
    const { query, token, onExecuteSearch } = this.props;
    if (prevProps.query !== query) onExecuteSearch(query, token);
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
  token: state.user.tokens ? state.user.tokens.accessToken : null,
});

const mapDispatchToProps = dispatch => ({
  onExecuteSearch: (query, token) => {
    dispatch(runSearch(query, token));
  },
});

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Search));
