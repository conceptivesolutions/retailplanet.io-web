import {Component} from "react";
import {NextAuth} from "next-auth/client";
import Router from "next/dist/lib/router";
import {Image, Nav, NavDropdown} from "react-bootstrap";
import "./ProfileSmall.scss"

/**
 * props.session = Die aktuelle Session (optional)
 *
 * @author w.glanzer, 27.01.2019
 */
export default class ProfileSmall extends Component
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
    if (this.state.session.user)
    {
      return (
          <NavDropdown title={this._createUserComp()} id="basic-nav-dropdown" alignRight>
            <NavDropdown.Item onClick={e => this._handleSignOut(e)}>Logout</NavDropdown.Item>
          </NavDropdown>
      )
    }
    else
      return <Nav.Link href="/auth/oauth/keycloak">Login</Nav.Link>;
  }

  _createUserComp()
  {
    return <span>
      <Image src="/static/dummies/def128x128.jpg" className="profilepic mr-2"/>
      {this.state.session.user.name}
    </span>
  }

  _handleSignOut(event)
  {
    console.log(event);
    event.preventDefault();
    NextAuth.signout()
        .then(() => {
          // Redirect aufs Callback, um neuen State zu propagieren
          Router.push('/auth/callback')
        })
  }

}