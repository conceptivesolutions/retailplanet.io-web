import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Pagination } from 'semantic-ui-react';
import css from './ResultPagination.scss';
import { runSearch } from '../../reducers/searchReducer';

class ResultPagination extends React.Component {
  constructor(props) {
    super(props);
    this.switchPage = this.switchPage.bind(this);
  }

  switchPage(pPage) {
    this.props.onSwitchPage(this.props.query, pPage);
    this.props.router.push({
      pathname: '/search',
      query: {
        query: this.props.query,
        page: pPage,
      },
    });
  }

  render() {
    const { currentPage, pageCount } = this.props;
    if (pageCount <= 1)
      return <React.Fragment />;

    return (
      <div className={css.pagination}>
        <Pagination
          boundaryRange={0}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={3}
          defaultActivePage={currentPage}
          onPageChange={(e, { activePage }) => this.switchPage(activePage)}
          totalPages={pageCount} />
      </div>
    );
  }
}

const mapStateToProps = ({ search: { results } }) => ({
  query: results.query,
  currentPage: results.page.current,
  pageCount: results.page.count,
});

const mapDispatchToProps = dispatch => ({
  onSwitchPage: (query, pPage) => {
    dispatch(runSearch(query, pPage));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResultPagination));
