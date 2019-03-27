import * as React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import SearchLayout from '../src/layouts/SearchLayout';
import ResultList from '../src/components/result/ResultList';
import { runSearch } from '../src/reducers/searchReducer';
import withAuth from '../src/auth/withAuth';
import ResultPagination from '../src/components/result/ResultPagination';

class Search extends React.Component {
  componentDidMount() {
    const { query } = this.props.router.query;
    let { page } = this.props.router.query;

    if (!page)
      page = 0;
    else
      // eslint-disable-next-line radix
      page = Number.parseInt(page);

    this.props.onExecuteSearch(query, page);
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

const mapDispatchToProps = dispatch => ({
  onExecuteSearch: (query, page = 0) => {
    dispatch(runSearch(query, page));
  },
});

export default withRouter(withAuth(connect(null, mapDispatchToProps)(Search)));
