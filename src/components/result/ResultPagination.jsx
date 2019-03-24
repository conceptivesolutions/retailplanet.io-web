import * as React from 'react';
import { Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import css from './ResultPagination.scss';

class ResultPagination extends React.Component {

  /**
   * @returns {Array} Array with Pagination-Items
   */
  createPages() {
    const { currentPage, pageCount } = this.props;
    const result = [];
    for (let i = 0; i < pageCount; i++)
      result.push(<Pagination.Item active={currentPage === i}>{i + 1}</Pagination.Item>);
    return result;
  }

  render() {
    return (
      <Pagination className={css.pagination}>
        <Pagination.First />
        <Pagination.Prev />
        {this.createPages()}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    );
  }
}

const mapStateToProps = ({ search: { results } }) => ({
  currentPage: results.page.current,
  pageCount: results.page.count,
});

export default connect(mapStateToProps)(ResultPagination);
