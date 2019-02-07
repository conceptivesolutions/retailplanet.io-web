import {Component} from "react";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import Router from "next/dist/lib/router";
import css from './SearchResultInput.scss'

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
        <Form className="w-100 mt-auto" onSubmit={e => this.onSearch(e)}>
          <InputGroup className={`${css.searchInputResult} shadow`}>
            <FormControl type="Query" placeholder="Durchsuchen Sie über 6.00.000 Produkte" name="inputQuery" className="searchField"
                         defaultValue={decodeURIComponent(this.props.query)}/>
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