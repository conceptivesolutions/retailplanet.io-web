import * as React from 'react';
import { push } from 'connected-next-router';
import { connect } from 'react-redux';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { parse } from 'query-string';
import css from './Searchbar.scss';
import { runSearch } from '../../reducers/searchReducer';

/**
 * @author w.glanzer, 14.01.2019
 */
class Searchbar extends React.Component {
  render() {
    return (
      <Form onSubmit={(e) => {
        e.preventDefault();
        this.props.onExecute(e.target.query.value);
      }}
      >
        <InputGroup className={this.props.className}>
          <FormControl
            type="Query"
            placeholder="Durchsuchen Sie über 6.000.000 Produkte"
            name="query"
            className={`${css.searchField}`}
            defaultValue={this.props.query}
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
  query: parse(state.router.location.search).query,
});

const mapDispatchToProps = dispatch => ({
  onExecute: (userinput) => {
    dispatch(push({
      pathname: '/search',
      query: {
        query: userinput,
      },
    }));
    dispatch(runSearch(userinput));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
