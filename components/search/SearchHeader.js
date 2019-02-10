import * as React from "react";
import Header from "../navigation/Header";
import {Form, Nav} from "react-bootstrap";
import Searchbar from "./Searchbar";
import css from "./SearchHeader.scss"

/**
 * @inheritDoc
 *
 * props.query = Der aktuelle Query
 * props.onSubmit = Aktion, die beim Suchen ausgeführt werden soll
 *
 * @author w.glanzer, 10.02.2019
 */
export default class SearchHeader extends Header
{

  renderCustomComponents()
  {
    return <React.Fragment>
      <Nav.Item className="d-flex align-items-center mx-2">
        <Form onSubmit={this.props.onSubmit}>
          <Searchbar className={`${css.searchBar}`} query={this.props.query} onSubmit={this.props.onSubmit}/>
        </Form>
      </Nav.Item>
      <Nav className="mr-auto"/>
    </React.Fragment>
  }
}