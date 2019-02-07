import {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap"
import css from './PageFooter.scss'

/**
 * Genereller Footer
 *
 * @author w.glanzer, 14.01.2019
 */
export default class PageFooter extends Component
{
  render()
  {
    return (
        <Navbar fixed="bottom" variant="dark" expand="lg" className={`${css.pageFooter} border-0`}>
          <Nav>
            <Nav.Link className="text-white ml-3 mr-4" href="/" disabled>Impressum</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="text-white mr-4" href="/" disabled>Datenschutz</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="text-white" href="/" disabled>Nutzungsbedingungen</Nav.Link>
          </Nav>
          <Nav className="mr-auto"/>
          <Nav>
            <Nav.Item className="text-light">Copyright (C) 2019 by retailplanet.io</Nav.Item>
          </Nav>
        </Navbar>
    )
  }
}