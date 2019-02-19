import * as React from 'react';
import { push } from 'connected-next-router';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
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
      <Nav.Link className="text-white ml-3 mr-4" onClick={() => props.onLinkClicked('/imprint')}>
        Impressum
      </Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link className="text-white mr-4" onClick={() => props.onLinkClicked('/privacy')}>
        Datenschutz
      </Nav.Link>
    </Nav>
    <Nav className="mr-auto" />
    <Nav>
      <Nav.Item className="text-light">Copyright (C) 2019 by con.ceptive solutions e.K.</Nav.Item>
    </Nav>
  </Navbar>
);

const mapDispatchToProps = dispatch => ({
  onLinkClicked: (page) => {
    dispatch(push(page));
  },
});

export default connect(null, mapDispatchToProps)(Footer);
