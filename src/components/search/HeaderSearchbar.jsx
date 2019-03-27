import * as React from 'react';
import { connect } from 'react-redux';
import { FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'next/router';
import css from './HeaderSearchbar.scss';
import { runSearch } from '../../reducers/searchReducer';

/**
 * @author w.glanzer, 24.03.2019
 */
class HeaderSearchbar extends React.Component {
  onSearchSumit(e) {
    e.preventDefault();
    this.props.onExecute(e.target.query.value);
    this.props.router.push({
      pathname: '/search',
      query: {
        query: e.target.query.value,
      },
    });
  }

  render() {
    const { className, query } = this.props;
    return (
      <Form onSubmit={e => this.onSearchSumit(e)}>
        <InputGroup className={className}>
          <FormControl type="Query" name="query" className={`${css.searchField}`} defaultValue={query || ''} />
        </InputGroup>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  query: state.search.results.query,
});

const mapDispatchToProps = dispatch => ({
  onExecute: (userinput) => {
    dispatch(runSearch(userinput, 0));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderSearchbar));
