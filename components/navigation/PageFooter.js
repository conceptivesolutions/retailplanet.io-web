import {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap";

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
        <Navbar fixed="bottom" bg="light" expand="lg" className="border-0">
          <Nav>
            <Nav.Link className="disabled">Impressum</Nav.Link>
          </Nav>
        </Navbar>
    )
  }
}