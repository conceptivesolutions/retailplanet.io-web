import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import css from './Navigation.scss';
import { rerunSearch, searchSort, setSorting } from '../../reducers/searchReducer';

/**
 * @author w.glanzer, 09.02.2019
 */
const Navigation = (props, context) => (
  <div className={`${css.navigation} ${props.className || ''}`}>
    <b className={css.searchLabel}>
      {context.t('results', {
        query: props.query, total: props.totalItems,
      })}
    </b>
    <span className={css.orderLabel}>{context.t('orderby')}</span>
    <select defaultValue={props.sorting} onChange={e => props.switchOrder(e.target.value)}>
      <option value={searchSort.RELEVANCE_DESC}>{context.t('sort').relevance}</option>
      <option value={searchSort.PRICE_DESC}>{context.t('sort').price_asc}</option>
      <option value={searchSort.PRICE_ASC}>{context.t('sort').price_desc}</option>
    </select>
  </div>
);

Navigation.contextTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  query: state.search.results.query,
  sorting: state.search.sorting,
  totalItems: state.search.results.total,
});

const mapDispatchToProps = dispatch => ({
  switchOrder: (sort) => {
    dispatch(setSorting(sort));
    dispatch(rerunSearch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
