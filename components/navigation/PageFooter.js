import {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap"
import './PageFooter.scss'

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
        <Navbar fixed="bottom" variant="dark" expand="lg" className="pageFooter border-0">
          <Nav>
            <Nav.Link className="text-white ml-3 mr-4" href="/">About</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="text-white mr-4" href="/">Privacy Policy</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="text-white" href="/">Terms of Use</Nav.Link>
          </Nav>
          <Nav className="mr-auto"/>
          <Nav>
            <Nav.Item className="text-light">Copyright (C) 2019 by retailplanet.io</Nav.Item>
          </Nav>
        </Navbar>
    )
  }
}