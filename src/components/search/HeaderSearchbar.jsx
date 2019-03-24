import * as React from 'react';
import { push } from 'connected-next-router';
import { connect } from 'react-redux';
import { FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { parse } from 'query-string';
import css from './HeaderSearchbar.scss';

/**
 * @author w.glanzer, 24.03.2019
 */
class HeaderSearchbar extends React.Component {
  onSearchSumit(e) {
    e.preventDefault();
    const { onExecute, query } = this.props;
    onExecute(query);
  }

  render() {
    const { className, query } = this.props;
    return (
      <Form onSubmit={e => this.onSearchSumit(e)}>
        <InputGroup className={className}>
          <FormControl type="Query" name="query" className={`${css.searchField}`} defaultValue={query} />
        </InputGroup>
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
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchbar);
