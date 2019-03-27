import * as React from 'react';
import { Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import css from './ResultPagination.scss';
import { runSearch } from '../../reducers/searchReducer';

const maxPagesCount = 3;

class ResultPagination extends React.Component {
  constructor(props) {
    super(props);
    this.switchPage = this.switchPage.bind(this);
    this.createPages = this.createPages.bind(this);
  }

  switchPage(pPage) {
    this.props.onSwitchPage(this.props.query, pPage);
  }

  /**
   * @returns {Array} Array with Pagination-Items
   */
  createPages() {
    const { currentPage, pageCount } = this.props;
    const result = [];
    const start = Math.max(currentPage - maxPagesCount, 0);
    const end = Math.min(currentPage + maxPagesCount + 1, pageCount);
    if (currentPage > maxPagesCount)
      result.push(<Pagination.Ellipsis key="before" disabled />);
    for (let i = start; i < Math.max(end, maxPagesCount * 2 + 1); i++)
      result.push(<Pagination.Item key={i} active={currentPage === i} onClick={() => this.switchPage(i)}>{i + 1}</Pagination.Item>);
    if (pageCount >= currentPage + maxPagesCount)
      result.push(<Pagination.Ellipsis key="after" disabled />);
    return result;
  }

  render() {
    const { currentPage, pageCount } = this.props;

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

export default connect(mapStateToProps, mapDispatchToProps)(ResultPagination);
