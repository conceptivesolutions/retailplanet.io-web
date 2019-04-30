import React from 'react';
import InputRange from 'react-input-range';
import { connect } from 'react-redux';
import _ from 'lodash';
import css from './PriceFilter.scss';
import { rerunSearch, setFilter } from '../../../reducers/searchReducer';

/**
 * Filters the results with a price range
 */
class PriceFilter extends React.Component {
  static name = 'price';

  state = {
    auto: true,
    fullMin: null,
    fullMax: null,
    value: {
      min: 0,
      max: 0,
    },
  };

  static getDerivedStateFromProps({ min, max }, prevState) {
    let fullMin = _.round(min) || 0;
    let fullMax = _.round(max) || 0;
    let currMin = prevState.value.min;
    let currMax = prevState.value.max;

    if (fullMin > fullMax)
      fullMin = 0;
    if (fullMax < fullMin)
      fullMax = fullMin;
    if (!currMin)
      currMin = fullMin;
    if (!currMax)
      currMax = fullMax;
    if (currMin < fullMin)
      currMin = fullMin;
    if (currMax > fullMax)
      currMax = fullMax;

    const value = _.cloneDeep({
      min: prevState.auto ? fullMin : currMin,
      max: prevState.auto ? fullMax : currMax,
    });

    return {
      fullMin,
      fullMax,
      value,
    };
  }

  render() {
    if (!this.props.visible)
      return <React.Fragment />;

    return (
      <div className={css.filterContainer}>
        <b>Preis</b>
        <div className={css.rangeContainer}>
          <InputRange
            allowSameValues
            minValue={this.state.fullMin || 0}
            maxValue={this.state.fullMax || 1}
            value={this.state.value}
            onChange={(value) => {
              if (value.min >= this.state.fullMin && value.max <= this.state.fullMax)
                this.setState(prevState => ({
                  auto: !prevState.auto ? (value.min === prevState.fullMin && value.max === prevState.fullMax) : false,
                  value,
                }));
            }}
            onChangeComplete={({ min, max }) => this.props.onFilterChange(min, max)} />
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
