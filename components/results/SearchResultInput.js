import {Component} from "react";
import {Button, Form} from "react-bootstrap";
import Router from "next/dist/lib/router";

/**
 * props.query = Such-Query als String
 * props.onSubmit = todo
 *
 * @author w.glanzer, 15.01.2019
 */
export default class SearchResultInput extends Component
{

  render()
  {
    return (
        <Form className="d-flex flex-row mb-2" onSubmit={e => this.onSearch(e)}>
          <Form.Control type="Query" placeholder="Search" name="inputQuery" defaultValue={decodeURIComponent(this.props.query)}/>
          <Button variant="primary" type="submit" className="ml-2">Search</Button>
        </Form>
    );
  }


  /**
   * Wird aufgerufen, wenn die Suche gestartet werden soll
   *
   * @param pEvent Event
   */
  onSearch(pEvent)
  {
    pEvent.preventDefault();

    //noinspection JSUnresolvedVariable
    let inputQuery = pEvent.target.inputQuery.value;

    //noinspection JSUnresolvedVariable
    Router.push({pathname: '/search', query: {query: inputQuery}});

    this.props.onSubmit(pEvent);
  }

}