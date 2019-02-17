import * as React from 'react';
import { NextAuth } from 'next-auth/client';
import getConfig from 'next/config';
import Router from 'next/router';
import { Nav, NavDropdown } from 'react-bootstrap';
import css from './ProfileSmall.scss';
import ANavDropdown from '../dropdown/ANavDropdown';

/**
 * props.session = Die aktuelle Session (optional)
 *
 * @author w.glanzer, 27.01.2019
 */
export default class ProfileSmall extends React.Component {
  static handleSignOut(event) {
    event.preventDefault();
    NextAuth.signout()
      .then(() => {
        const { publicRuntimeConfig } = getConfig();
        Router.push(`${publicRuntimeConfig.keycloak_url}/auth/realms/${publicRuntimeConfig.keycloak_realm}`
          + `/protocol/openid-connect/logout?redirect_uri=${publicRuntimeConfig.logout_redirect_url}`);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      session: this.props.session,
    };
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  createUserComp() {
    return (
      <React.Fragment>
        <i className={`fa fa-dragon ${css.profilepic} mr-2 rounded-circle`} />
        {this.state.session.user.name}
      </React.Fragment>
    );
  }

  render() {
    if (this.state.session && this.state.session.user) {
      return (
        <ANavDropdown title={this.createUserComp()} alignRight>
          <NavDropdown.Item onClick={e => this.handleSignOut(e)}>Logout</NavDropdown.Item>
        </ANavDropdown>
      );
    }
    return <Nav.Link href="/auth/oauth/keycloak">Login</Nav.Link>;
  }
}
