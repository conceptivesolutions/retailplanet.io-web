import {Component} from 'react';
import Router from 'next/router'
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import './SearchInput.scss'

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
          <InputGroup className="searchInput mb-3 shadow">
            <FormControl type="Query" placeholder="Dursuchen Sie über 300.000 Produkte" name="inputQuery" className="searchField"/>
            <InputGroup.Append>
              <Button variant="primary" type="submit" className="px-4 border-0 searchButton">Suchen</Button>
            </InputGroup.Append>
          </InputGroup>
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