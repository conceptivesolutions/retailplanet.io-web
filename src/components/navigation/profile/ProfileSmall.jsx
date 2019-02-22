import * as React from 'react';
import { NextAuth } from 'next-auth/client';
import getConfig from 'next/config';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'connected-next-router';
import Link from 'next/link';
import css from './ProfileSmall.scss';
import ANavDropdown from '../dropdown/ANavDropdown';

/**
 * props.session = Die aktuelle Session (optional)
 *
 * @author w.glanzer, 27.01.2019
 */
class ProfileSmall extends React.Component {
  createUserComp() {
    return (
      <React.Fragment>
        <i className={`fa fa-dragon ${css.profilepic} mr-2 rounded-circle`} />
        {this.props.user.name}
      </React.Fragment>
    );
  }

  render() {
    if (this.props.user) {
      return (
        <ANavDropdown title={this.createUserComp()} alignRight>
          <NavDropdown.Item onClick={e => this.props.logout(e)}>Logout</NavDropdown.Item>
        </ANavDropdown>
      );
    }
    return (
      <Link href="/auth/oauth/keycloak">
        <a className="nav-link">Login</a>
      </Link>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  logout: (event) => {
    event.preventDefault();
    NextAuth.signout()
      .then(() => {
        const { publicRuntimeConfig } = getConfig();
        dispatch(push(
          `${publicRuntimeConfig.keycloak_url}/auth/realms/${publicRuntimeConfig.keycloak_realm}`
          + `/protocol/openid-connect/logout?redirect_uri=${publicRuntimeConfig.logout_redirect_url}`,
        ));
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSmall);
