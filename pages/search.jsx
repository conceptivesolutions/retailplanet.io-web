import * as React from 'react';
import { NextAuth } from 'next-auth/client';
import { connect } from 'react-redux';
import SearchLayout from '../src/layouts/SearchLayout';
import ResultList from '../src/components/result/ResultList';
import { runSearch } from '../src/reducers/searchReducer';

class Search extends React.Component {
  // noinspection JSUnusedGlobalSymbols
  static async getInitialProps(pRequest) {
    return {
      session: await NextAuth.init({
        req: pRequest.req,
      }),
    };
  }

  componentDidMount() {
    this.props.onRunSearch();
  }

  // componentDidUpdate() {
  //   if (!this.state.results) this.loadSearchResults();
  // }

  render() {
    return (
      <SearchLayout>
        <ResultList />
      </SearchLayout>
    );
  }
}

const mapStateToProps = state => ({
  query: state.search.query,
});

const mapDispatchToProps = dispatch => ({
  onRunSearch: () => {
    dispatch(runSearch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
