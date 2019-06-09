import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import InputRange from 'react-input-range';
import css from './PriceFilter.scss';
import { rerunSearch, setFilter } from '../../../reducers/searchReducer';

/**
 * Filters the results with a price range
 */
class PriceFilter extends React.Component {
  static name = 'price';

  state = {
    value: {
      min: null,
      max: null,
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.rangeMin || !nextProps.rangeMax)
      return {};

    const userdefined = prevState.value.min !== nextProps.rangeMin || prevState.value.max !== nextProps.rangeMax;
    return {
      min: userdefined && prevState.min !== undefined ? Math.max(prevState.min, nextProps.rangeMin) : nextProps.rangeMin,
      max: userdefined && prevState.max !== undefined ? Math.min(prevState.max, nextProps.rangeMax) : nextProps.rangeMax,
    };
  }

  constructor(props, context) {
    super(props, context);
    this.onPriceChanged = this.onPriceChanged.bind(this);
  }

  onPriceChanged() {
    const { value: { min, max } } = this.state;
    this.props.onFilterChange(min, max);
  }

  render() {
    if (!this.props.rangeMin || !this.props.rangeMax)
      return <span>nix</span>;

    return (
      <div className={css.filterContainer}>
        <b>Preis</b>
        <div className={css.rangeContainer}>
          <InputRange
            minValue={this.props.rangeMin}
            maxValue={this.props.rangeMax}
            value={this.state.value.min && this.state.value.max ? this.state.value : {
              min: this.props.rangeMin,
              max: this.props.rangeMax,
            }}
            onChange={(value) => {
              if (value.min >= this.props.rangeMin && value.max <= this.props.rangeMax)
                this.setState({
                  value: {
                    min: value.min,
                    max: value.max,
                  },
                });
            }}
            onChangeComplete={this.onPriceChanged} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rangeMin: Math.floor(_.get(state.search, 'results.filters.price[0]')),
  rangeMax: Math.ceil(_.get(state.search, 'results.filters.price[1]')),
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
