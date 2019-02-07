import {Component} from 'react';
import Router from 'next/router'
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import css from './SearchInput.scss'

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
        <Form className="col-12" onSubmit={e => SearchInput.onSearch(e)}>
          <div className={css.phrase}>Search for specific Items.<br/><b>Buy from a local store</b></div>
          <InputGroup className={`${css.searchInput} shadow`}>
            <FormControl type="Query" placeholder="Durchsuchen Sie über 6.00.000 Produkte" name="inputQuery" className={css.searchField}/>
            <InputGroup.Append>
              <Button variant="primary" type="submit" className={`${css.searchButton} px-4 border-0`}>Suchen</Button>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup className={css.countryFilter}>
            <Form.Check custom inline label="Deutschland" type="checkbox" id="custom-inline-checkbox1" defaultChecked/>
            <Form.Check custom inline disabled label="Österreich" type="checkbox" id="custom-inline-checkbox2"/>
            <Form.Check custom inline disabled label="Schweiz" type="checkbox" id="custom-inline-checkbox3"/>
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