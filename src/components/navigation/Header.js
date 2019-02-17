import * as React from 'react';
import {Form, Image, Nav, Navbar} from "react-bootstrap";
import {NextAuth} from "next-auth/client";
import ProfileSmall from "./profile/ProfileSmall";
import css from './Header.scss'
import ANavDropdown from "./dropdown/ANavDropdown";
import Searchbar from "../search/Searchbar";

/**
 * props.withLogo = Wenn vorhanden dann wird ein Logo links oben reingerendert
 * props.fixedTop = Wenn vorhanden dann wird der Header mit einer absoluten top-position dargestellt
 * props.session = Die aktuelle Session
 * props.query (optional) = Der aktuelle Query
 * props.onSubmit (optional) = Aktion, die beim Suchen ausgeführt werden soll
 *
 * @author w.glanzer, 14.01.2019
 */
export default class Header extends React.Component
{
  render()
  {
    return (
        <Navbar fixed={this.props.fixedTop ? "top" : ""} bg="light" expand="lg" className={`${css.pageHeader} border-0`}>
          {this.renderLogo()}
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Item className="mx-2 border-left"/>
              <Nav.Item>
                <ANavDropdown title="Elektronik"/>
              </Nav.Item>
            </Nav>
            <Nav className="mr-auto"/>
            {this.renderCustomComponents()}
            <Nav>
              <Nav.Item>
                <ANavDropdown title={<React.Fragment>
                  <Image className={`${css.langFlag} mr-2`} src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"/>
                  Deutsch
                </React.Fragment>}/>
              </Nav.Item>
              <Nav.Item className="mx-2 border-left"/>
              <Nav.Item>
                <ProfileSmall session={this.props.session}/>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>);
  }

  renderLogo()
  {
    if (this.props.withLogo)
      return (<Navbar.Brand href="/"><Image src="/static/retailplanet-logo.svg"/></Navbar.Brand>);
  }

  /**
   * Rendert Custom Components
   */
  renderCustomComponents()
  {
    if (this.props.query && this.props.onSubmit)
      return <React.Fragment>
        <Nav.Item className="d-flex align-items-center mx-2">
          <Form onSubmit={this.props.onSubmit}>
            <Searchbar className={`${css.searchBar}`} query={this.props.query} onSubmit={this.props.onSubmit}/>
          </Form>
        </Nav.Item>
        <Nav className="mr-auto"/>
      </React.Fragment>
  }
}