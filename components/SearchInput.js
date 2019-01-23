import {Component} from 'react';
import Router from 'next/router'
import {Button, Form, Image, Row} from "react-bootstrap";

/**
 * SearchInput = EingabeFeld auf der Startseite
 *
 * @author w.glanzer, 14.01.2019
 */
export default class SearchInput extends Component
{

  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
        <Form className="col-8" onSubmit={e => SearchInput.onSearch(e)}>
            <Row className="justify-content-center px-5 pb-4 justify-content-center">
                <Image src="/static/retailplanet-logo.svg"/>
          </Row>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="Query" placeholder="Search" name="inputQuery"/>
          </Form.Group>
          <Row className="justify-content-center mb-5">
            <Button variant="primary" type="submit" className="px-5 py-2">Search</Button>
          </Row>
        </Form>
    );
  }

  /**
   * Wird aufgerufen, wenn die Suche gestartet werden soll
   *
   * @param pEvent Event
   */
  static onSearch(pEvent)
  {
    pEvent.preventDefault();

    //noinspection JSUnresolvedVariable
    let inputQuery = encodeURIComponent(pEvent.target.inputQuery.value);

    //noinspection JSUnresolvedVariable
    Router.push({pathname: '/search', query: {query: inputQuery}});
  }

}