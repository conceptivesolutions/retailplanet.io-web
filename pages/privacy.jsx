/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { NextAuth } from 'next-auth/client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextOnlyLayout from '../src/layouts/TextOnlyLayout';
import { setSession } from '../src/reducers/sessionReducer';

class Privacy extends React.Component {
  // noinspection JSUnusedGlobalSymbols
  static async getInitialProps({ req }) {
    return {
      session: await NextAuth.init({
        req,
      }),
    };
  }

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.onSetSession(this.props.session);
  }

  render() {
    return (
      <TextOnlyLayout>
        <div dangerouslySetInnerHTML={{
          __html: this.context.t('privacy'),
        }}
        />
      </TextOnlyLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(Privacy);
