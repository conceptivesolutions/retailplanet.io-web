import * as React from 'react';
import { NextAuth } from 'next-auth/client';
import { connect } from 'react-redux';
import IndexLayout from '../src/layouts/IndexLayout';
import Searchbar from '../src/components/search/Searchbar';
import css from './index.scss';
import CountrySelection from '../src/components/search/CountrySelection';
import { setSession } from '../src/reducers/sessionReducer';

class Index extends React.Component {
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
      <IndexLayout>
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-12">
              <div className={css.phrase}>
                Search for specific Items.
                <br />
                <b>Buy from a local store</b>
              </div>
              <Searchbar>
                <CountrySelection />
              </Searchbar>
            </div>
          </div>
        </div>
      </IndexLayout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSetSession: (session) => {
    dispatch(setSession(session));
  },
});

export default connect(null, mapDispatchToProps)(Index);
