import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Form, Input } from 'semantic-ui-react';

/**
 * @author w.glanzer, 14.01.2019
 */
class Searchbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.router.push({
      pathname: '/search',
      query: {
        query: e.target.query.value,
      },
    });
  }

  render() {
    const { className, query, children } = this.props;
    return (
      <Form className={this.props.className || ''} onSubmit={this.onSubmit}>
        <Input
          name="query"
          className={className || ''} defaultValue={query || ''}
          icon={{
            name: 'search',
            link: true,
            onClick: this.onSubmit,
          }} />
        {children}
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  query: state.search.results.query,
});

export default withRouter(connect(mapStateToProps)(Searchbar));
