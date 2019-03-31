import * as React from 'react';
import { Image, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import ProfileSmall from './profile/ProfileSmall';
import css from './Header.scss';
import Language from './Language';
import HeaderSearchbar from '../search/HeaderSearchbar';

/**
 * props.withLogo = If set, the retailplanet logo will be rendered at the left upper corner
 * props.withSearch = If set, a searchbar will be presented
 * props.fixedTop = If set, the header will be fixed at top (css)
 * props.transparent = If set, the header will be transparent (css)
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

  renderCustomComponents() {
    if (this.props.withSearch)
      return (
        <React.Fragment>
          <Nav.Item className="d-flex align-items-center mx-2">
            <HeaderSearchbar className={`${css.searchBar}`} />
          </Nav.Item>
          <Nav className="mr-auto" />
        </React.Fragment>
      );

    return null;
  }

  render() {
    return (
      <Navbar fixed={this.props.fixedTop ? 'top' : ''} bg="light" expand="lg"
        className={`${css.pageHeader} ${this.props.transparent ? 'bg-transparent' : css.bgPageHeader} header`}>
        {this.renderLogo()}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Item className="mx-2 border-left" />
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
