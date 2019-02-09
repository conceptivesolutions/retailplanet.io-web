import * as React from 'react';
import {Button, FormControl, InputGroup} from 'react-bootstrap';
import css from './Searchbar.scss';

/**
 * @author w.glanzer, 14.01.2019
 */
export default class Searchbar extends React.Component
{

  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
        <InputGroup className={`${css.searchInput} shadow`}>
          <FormControl type="Query" placeholder="Durchsuchen Sie über 6.000.000 Produkte" name="inputQuery" className={css.searchField}/>
          <InputGroup.Append>
            <Button variant="primary" type="submit" className={`${css.searchButton} px-4 border-0`}>Suchen</Button>
          </InputGroup.Append>
        </InputGroup>
    );
  }

}