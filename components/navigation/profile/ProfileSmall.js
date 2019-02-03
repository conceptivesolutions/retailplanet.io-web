import * as React from "react";
import {NextAuth} from "next-auth/client";
import getConfig from 'next/config';
import Router from "next/dist/lib/router";
import {Nav, NavDropdown} from "react-bootstrap";
import "./ProfileSmall.scss"
import ANavDropdown from "../../abstract/ANavDropdown";

/**
 * props.session = Die aktuelle Session (optional)
 *
 * @author w.glanzer, 27.01.2019
 */
export default class ProfileSmall extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      session: this.props.session
    };
    this._handleSignOut = this._handleSignOut.bind(this)
  }

  render()
  {
    if (this.state.session && this.state.session.user)
    {
      return (
          <ANavDropdown title={this._createUserComp()} alignRight>
            <NavDropdown.Item onClick={e => this._handleSignOut(e)}>Logout</NavDropdown.Item>
          </ANavDropdown>
      )
    }
    else
      return <Nav.Link href="/auth/oauth/keycloak">Login</Nav.Link>;
  }

  _createUserComp()
  {
    return <React.Fragment>
      <i className="fa fa-dragon profilepic mr-2 rounded-circle"/>
      {this.state.session.user.name}
    </React.Fragment>
  }

  _handleSignOut(event)
  {
    event.preventDefault();
    NextAuth.signout()
        .then(() => {
          const {publicRuntimeConfig} = getConfig();
          Router.push(publicRuntimeConfig.keycloak_url + "/auth/realms/" + publicRuntimeConfig.keycloak_realm +
                          "/protocol/openid-connect/logout?redirect_uri=" + publicRuntimeConfig.logout_redirect_url);
        })
  }

}