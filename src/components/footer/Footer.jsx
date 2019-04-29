import * as React from 'react';
import { Image, Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import Link from 'next/link';
import css from './Footer.scss';

/**
 * props.fixedBottom = If set, the footer will be fixed bottom
 * props.withLogo = If set, the logo will be shown
 *
 * @author w.glanzer, 14.01.2019
 */
class Footer extends React.Component {
  static renderLogo() {
    return (
      <React.Fragment>
        <Nav className="mr-auto" />
        <Nav>
          <Nav.Item className="text-light">
            <Image className={css.logo} src="https://www.conceptive.io/static/logo/symbol_text/300_dark.png" />
          </Nav.Item>
        </Nav>
      </React.Fragment>
    );
  }

  render() {
    const { fixedBottom, withLogo, className } = this.props;

    return (
      <Navbar fixed={fixedBottom ? 'bottom' : ''} variant="dark" expand="lg" className={`${css.pageFooter} border-0 ${className || ''}`}>
        <Nav>
          <Link href="/imprint">
            <a className="nav-link text-white mr-4">Impressum</a>
          </Link>
        </Nav>
        <Nav>
          <Link href="/privacy">
            <a className="nav-link text-white mr-4">Datenschutz</a>
          </Link>
        </Nav>
        {withLogo ? Footer.renderLogo() : ''}
      </Navbar>
    );
  }
}

export default connect()(Footer);
