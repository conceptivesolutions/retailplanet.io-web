import * as React from 'react';
import { NextAuth } from 'next-auth/client';
import { connect } from 'react-redux';
import SearchLayout from '../src/layouts/SearchLayout';
import ResultList from '../src/components/result/ResultList';

class Search extends React.Component {
  // noinspection JSUnusedGlobalSymbols
  static async getInitialProps(pRequest) {
    return {
      session: await NextAuth.init({
        req: pRequest.req,
      }),
    };
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
  query: state.search.query,
});

export default connect(mapStateToProps)(Search);
