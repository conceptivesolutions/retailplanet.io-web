import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import CurrencyFormat from 'react-currency-format';
import css from './PriceFilter.scss';
import { rerunSearch, setFilter } from '../../../reducers/searchReducer';

/**
 * Filters the results with a price range
 */
class PriceFilter extends React.Component {
  static name = 'price';

  constructor(props, context) {
    super(props, context);
    this.onPriceChanged = this.onPriceChanged.bind(this);
  }

  onPriceChanged(e) {
    let { min, max } = this.props;
    if (e.target.name === 'min')
      min = e.target.value;
    else
      max = e.target.value;
    this.props.onFilterChange(min, max);
  }

  render() {
    if (!this.props.visible)
      return <React.Fragment />;

    return (
      <div className={css.filterContainer}>
        <b>Preis</b>
        <div className={css.rangeContainer}>
          <CurrencyFormat
            customInput={Input}
            name="min"
            decimalScale={2}
            className={css.range}
            value={this.props.min || 0}
            isNumericString
            onBlur={this.onPriceChanged}
            icon="euro" />
          <div className={css.separator}>
            <span>-</span>
          </div>
          <CurrencyFormat
            customInput={Input}
            name="max"
            decimalScale={2}
            className={css.range}
            value={this.props.max || 0}
            isNumericString
            onBlur={this.onPriceChanged}
            icon="euro" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.search.results.filters && state.search.results.filters.price,
  min: state.search.results.filters && state.search.results.filters.price ? state.search.results.filters.price[0] : null,
  max: state.search.results.filters && state.search.results.filters.price ? state.search.results.filters.price[1] : null,
});

const mapDispatchToProps = dispatch => ({
  onFilterChange: (pMin, pMax) => {
    dispatch(setFilter(true, {
      type: PriceFilter.name,
      values: [pMin, pMax],
    }));
    dispatch(rerunSearch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceFilter);
