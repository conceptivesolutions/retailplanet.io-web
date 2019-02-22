import * as React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import Link from 'next/link';
import css from './Footer.scss';

/**
 * Genereller Footer
 * props.fixedBottom = gesetzt, wenn er unten fixiert sein soll
 *
 * @author w.glanzer, 14.01.2019
 */
const Footer = props => (
  <Navbar fixed={props.fixedBottom ? 'bottom' : ''} variant="dark" expand="lg" className={`${css.pageFooter} border-0`}>
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
    <Nav className="mr-auto" />
    <Nav>
      <Nav.Item className="text-light">Copyright (C) 2019 by con.ceptive solutions e.K.</Nav.Item>
    </Nav>
  </Navbar>
);

export default connect()(Footer);
