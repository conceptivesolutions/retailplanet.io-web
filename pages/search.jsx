import * as React from 'react';
import { NextAuth } from 'next-auth/client';
import { connect } from 'react-redux';
import SearchLayout from '../src/layouts/SearchLayout';
import ResultList from '../src/components/result/ResultList';
import { setSession } from '../src/reducers/sessionReducer';

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
  onSetSession: (session) => {
    dispatch(setSession(session));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
