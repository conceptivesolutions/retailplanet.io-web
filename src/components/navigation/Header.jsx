import * as React from 'react';
import { Image, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import ProfileSmall from './profile/ProfileSmall';
import css from './Header.scss';
import ANavDropdown from './dropdown/ANavDropdown';
import Searchbar from '../search/Searchbar';
import Language from './Language';

/**
 * props.withLogo = Wenn vorhanden dann wird ein Logo links oben reingerendert
 * props.fixedTop = Wenn vorhanden dann wird der Header mit einer absoluten top-position dargestellt
 *
 * @author w.glanzer, 14.01.2019
 */
export default class Header extends React.Component {
  renderLogo() {
    if (this.props.withLogo)
      return (
        <Link href="/">
          <a>
            <Image className={`${css.logo}`} src="/static/retailplanet-logo.svg" />
          </a>
        </Link>
      );

    return null;
  }

  /**
   * Rendert Custom Components
   */
  renderCustomComponents() {
    if (this.props.withSearch)
      return (
        <React.Fragment>
          <Nav.Item className="d-flex align-items-center mx-2">
            <Searchbar className={`${css.searchBar}`} />
          </Nav.Item>
          <Nav className="mr-auto" />
        </React.Fragment>
      );

    return null;
  }

  render() {
    return (
      <Navbar fixed={this.props.fixedTop ? 'top' : ''} bg="light" expand="lg"
        className={`${css.pageHeader} border-0 ${this.props.withSearch ? css.bgPageHeader : 'bg-transparent'}`}>
        {this.renderLogo()}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Item className="mx-2 border-left" />
            <Nav.Item>
              <ANavDropdown title="Elektronik" />
            </Nav.Item>
          </Nav>
          <Nav className="mr-auto" />
          {this.renderCustomComponents()}
          <Nav>
            <Nav.Item>
              <Language />
            </Nav.Item>
            <Nav.Item className="mx-2 border-left" />
            <Nav.Item>
              <ProfileSmall />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
