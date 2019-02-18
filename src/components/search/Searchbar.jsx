import * as React from 'react';
import { push } from 'connected-next-router';
import { connect } from 'react-redux';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import css from './Searchbar.scss';
import { runSearch, setQuery } from '../../reducers/searchReducer';

/**
 * @author w.glanzer, 14.01.2019
 */
class Searchbar extends React.Component {
  render() {
    return (
      <Form onSubmit={(e) => {
        e.preventDefault();
        this.props.onExecute(this.props.query);
      }}
      >
        <InputGroup className={this.props.className}>
          <FormControl
            type="Query"
            placeholder="Durchsuchen Sie über 6.000.000 Produkte"
            name="query"
            className={`${css.searchField}`}
            onChange={e => this.props.onSetQuery(e.target.value)}
            defaultValue={this.props.query ? this.props.query : ''}
          />
          <InputGroup.Append>
            <Button variant="primary" type="submit" className={`${css.searchButton} px-4 border-0`}>
              Suchen
            </Button>
          </InputGroup.Append>
        </InputGroup>
        {this.props.children}
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  query: state.search.query,
});

const mapDispatchToProps = dispatch => ({
  onSetQuery: (userinput) => {
    dispatch(setQuery(userinput));
  },
  onExecute: (query) => {
    dispatch(push(`/search?query=${encodeURIComponent(query)}`));
    dispatch(runSearch(query));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
