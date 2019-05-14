import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Checkbox } from 'semantic-ui-react';
import css from './AvailabilityFilter.scss';
import { rerunSearch, setFilter } from '../../../reducers/searchReducer';

/**
 * Filters the results with an availability type
 */
class AvailabilityFilter extends React.Component {
  static name = 'availability';

  state = {
    values: [],
  };

  constructor(props, context) {
    super(props, context);
    this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
  }

  onCheckboxChanged(type, { checked }) {
    const { values } = this.state;
    if (checked && _.indexOf(values, type) === -1)
      values.push(type);
    else if (!checked && _.indexOf(values, type) > -1)
      _.remove(values, n => n === type);
    else
      return;

    this.setState({
      values,
    });
    this.props.onFilterChange(values);
  }

  render() {
    return (
      <div className={css.filterContainer}>
        <b>Availability</b>
        <Checkbox onChange={(e, v) => this.onCheckboxChanged('available', v)} label="Available" />
        <Checkbox onChange={(e, v) => this.onCheckboxChanged('orderable', v)} label="Orderable" />
        <Checkbox onChange={(e, v) => this.onCheckboxChanged('unavailable', v)} label="Unavailable" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.search.loading,
});

const mapDispatchToProps = dispatch => ({
  onFilterChange: (values) => {
    dispatch(setFilter(true, {
      type: AvailabilityFilter.name,
      values,
    }));
    dispatch(rerunSearch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityFilter);
