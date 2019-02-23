import * as React from 'react';
import { NextAuth } from 'next-auth/client';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import SearchLayout from '../src/layouts/SearchLayout';
import ResultList from '../src/components/result/ResultList';
import { setSession } from '../src/reducers/sessionReducer';
import { runSearch } from '../src/reducers/searchReducer';

class Search extends React.Component {
  // noinspection JSUnusedGlobalSymbols
  static async getInitialProps({ req }) {
    return {
      session: await NextAuth.init({
        req,
      }),
    };
  }

  componentDidMount() {
    this.props.onSetSession(this.props.session);
  }

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
  onSetSession: (session) => {
    dispatch(setSession(session));
  },
  onExecuteSearch: (query) => {
    dispatch(runSearch(query));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
