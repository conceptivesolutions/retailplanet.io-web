import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Form, Input, Search } from 'semantic-ui-react';
import css from './HeaderSearchbar.scss';
import { runSearch } from '../../../reducers/searchReducer';

/**
 * @author w.glanzer, 24.03.2019
 */
class HeaderSearchbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onSearchSumit = this.onSearchSumit.bind(this);
  }

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
    return (
      <Form onSubmit={e => this.onSearchSumit(e)}>
        <Input
          name="query"
          className={`${css.searchField} ${this.props.className}`}
          icon="search"
          defaultValue={this.props.query} />
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  query: state.search.results.query,
});

const mapDispatchToProps = dispatch => ({
  onExecute: (userinput) => {
    dispatch(runSearch(userinput, 1));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderSearchbar));
