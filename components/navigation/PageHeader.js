import * as React from 'react';
import {Image, Nav, Navbar} from "react-bootstrap";
import {NextAuth} from "next-auth/client";
import ProfileSmall from "./profile/ProfileSmall";
import './PageHeader.scss'
import ANavDropdown from "../abstract/ANavDropdown";
import SearchResultInput from "../results/SearchResultInput"

/**
 * props.withLogo = Wenn vorhanden dann wird ein Logo links oben reingerendert
 * props.fixedTop = Wenn vorhanden dann wird der Header mit einer absoluten top-position dargestellt
 *
 * @author w.glanzer, 14.01.2019
 */
export default class PageHeader extends React.Component
{
  render()
  {
    return (
        <Navbar fixed={this.props.fixedTop ? "top" : ""} bg="light" expand="lg" className="pageHeader border-0">
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
            {this.renderSearchBar()}
            <Nav>
              <Nav.Item>
                <ANavDropdown title={<React.Fragment>
                  <Image className="lang-flag mr-2" src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"/>
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

  renderSearchBar()
  {
    if (this.props.withSearch)
    {
      return <React.Fragment>
        <Nav.Item className="mx-2">
          <SearchResultInput query={this.props.query} onSubmit={this.props.onSubmit}/>
        </Nav.Item>
        <Nav className="mr-auto"/>
      </React.Fragment>
    }
  }
}