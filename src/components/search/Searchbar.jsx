import * as React from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'next/router';
import css from './Searchbar.scss';

/**
 * @author w.glanzer, 14.01.2019
 */
const Searchbar = ({ router, className, query, children }) => (
  <Form onSubmit={(e) => {
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: {
        query: e.target.query.value,
      },
    });
  }}>
    <InputGroup className={className}>
      <FormControl type="Query" placeholder="Durchsuchen Sie über 6.000.000 Produkte" name="query" className={`${css.searchField}`}
        defaultValue={query || ''} />
      <InputGroup.Append>
        <Button variant="primary" type="submit" className={`${css.searchButton} px-4 border-0`}>
          Suchen
        </Button>
      </InputGroup.Append>
    </InputGroup>
    {children}
  </Form>
);

const mapStateToProps = state => ({
  query: state.search.results.query,
});

export default withRouter(connect(mapStateToProps)(Searchbar));
