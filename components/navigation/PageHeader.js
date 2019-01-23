import {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap";

/**
 * props.withLogo = Wenn vorhanden dann wird ein Logo links oben reingerendert
 * props.fixedTop = Wenn vorhanden dann wird der Header mit einer absoluten top-position dargestellt
 *
 * @author w.glanzer, 14.01.2019
 */
export default class PageHeader extends Component
{
  render()
  {
    return (
        <Navbar fixed={this.props.fixedTop ? "top" : ""} bg="light" expand="lg" className="border-0">
          {this.renderLogo()}
          <Nav.Link className="disabled" href="/">About</Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"/>
            {/*<Nav.Link href="#home">Home</Nav.Link>*/}
            <Nav>
              {/*<NavDropdown title="Deutsch" id="basic-nav-dropdown" alignRight>*/}
              {/*<NavDropdown.Item className="disabled">No other languages available</NavDropdown.Item>*/}
              {/*<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
              {/*<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
              {/*<NavDropdown.Divider />*/}
              {/*<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
              {/*</NavDropdown>*/}
              <Nav.Link className="disabled" href="/">Deutsch</Nav.Link>
              <Nav.Link className="disabled" href="/">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>);
  }

  renderLogo()
  {
    if (this.props.withLogo)
      return (<Navbar.Brand href="/"><i className="fa fa-shopping-cart mr-2"/>retailplanet.io</Navbar.Brand>);
  }
}