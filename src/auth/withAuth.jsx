import React from 'react';
import Router from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateUser } from '../reducers/userReducer';

let globalUser = null;

/**
 * HOC to populate user in redux store and check the login-status
 *
 * @param loginRequired true, if the user has to be logged in to view the given page
 * @param logoutRequired true, if the user must not be logged in to view the given page
 */
const withAuth = (Page, { loginRequired = false, logoutRequired = false } = {}) => class BaseComponent extends React.Component {
  componentDidMount() {
    const { user, isFromServer } = this.props;

    if (isFromServer) {
      globalUser = user;
    }

    if (loginRequired && !logoutRequired && !user) {
      Router.push('/login');
      return;
    }

    if (logoutRequired && user) {
      Router.push('/logout');
      return;
    }

    // Populate new/updated user in store
    this.props.updateUser(user);
  }

  static async getInitialProps(ctx) {
    const isFromServer = !!ctx.req;
    const user = ctx.req ? ctx.req.user : globalUser;

    const props = {
      user,
      isFromServer,
    };

    if (Page.getInitialProps) {
      Object.assign(props, (await Page.getInitialProps(ctx)) || {});
    }

    return props;
  }

  render() {
    // eslint-disable-next-line
    const { user, dispatch, updateUser, ...rest } = this.props;

    if (loginRequired && !logoutRequired && !user) {
      return null;
    }

    if (logoutRequired && user) {
      return null;
    }

    return <Page {...rest} />;
  }
};

const mapDispatchToProps = dispatch => ({
  updateUser: (pUser) => {
    dispatch(updateUser(pUser));
  },
});

export default compose(
  connect(null, mapDispatchToProps),
  withAuth,
);
