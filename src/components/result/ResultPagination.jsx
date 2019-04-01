import * as React from 'react';
import { Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import css from './ResultPagination.scss';
import { runSearch } from '../../reducers/searchReducer';

const maxPagesPerSide = 3;
const maxPagesComplete = maxPagesPerSide * 2 + 1;

class ResultPagination extends React.Component {
  constructor(props) {
    super(props);
    this.switchPage = this.switchPage.bind(this);
    this.createPages = this.createPages.bind(this);
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

  /**
   * @returns {Array} Array with Pagination-Items
   */
  createPages() {
    const { currentPage, pageCount } = this.props;
    const result = [];
    const start = Math.max(currentPage - maxPagesPerSide, 0);
    const end = Math.min(Math.max(currentPage + maxPagesPerSide + 1, maxPagesComplete), pageCount);
    for (let i = start; i < end; i++)
      result.push(<Pagination.Item key={i} active={currentPage === i} onClick={() => this.switchPage(i)}>{i + 1}</Pagination.Item>);
    return result;
  }

  render() {
    const { currentPage, pageCount } = this.props;
    if (pageCount <= 1)
      return <React.Fragment />;

    return (
      <Pagination className={css.pagination}>
        <Pagination.First onClick={() => this.switchPage(0)} />
        <Pagination.Prev onClick={() => this.switchPage(Math.max(currentPage - 1, 0))} />
        {this.createPages()}
        <Pagination.Next onClick={() => this.switchPage(Math.min(currentPage + 1, pageCount - 1))} />
        <Pagination.Last onClick={() => this.switchPage(pageCount - 1)} />
      </Pagination>
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
