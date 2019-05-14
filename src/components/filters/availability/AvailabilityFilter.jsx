import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import css from './AvailabilityFilter.scss';
import { Availability, rerunSearch, setFilter } from '../../../reducers/searchReducer';

/**
 * Filters the results with an availability type
 */
class AvailabilityFilter extends React.Component {
  static name = 'availability';

  constructor(props, context) {
    super(props, context);
    this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
  }

  onCheckboxChanged(type, { checked }) {
    const { values } = this.props;
    if (checked && _.indexOf(values, type) === -1)
      values.push(type);
    else if (!checked && _.indexOf(values, type) > -1)
      _.remove(values, n => n === type);
    else
      return;

    if (values.length === 0)
      values.push(Availability.AVAILABLE);

    this.props.onFilterChange(values);
  }

  render() {
    const { t } = this.context;

    return (
      <div className={css.filterContainer}>
        <b>Availability</b>
        <Checkbox onChange={(e, v) => this.onCheckboxChanged(Availability.AVAILABLE, v)} label={t('availability_AVAILABLE')}
          checked={_.indexOf(this.props.values, Availability.AVAILABLE) > -1} />
        <Checkbox onChange={(e, v) => this.onCheckboxChanged(Availability.ORDERABLE, v)} label={t('availability_ORDERABLE')}
          checked={_.indexOf(this.props.values, Availability.ORDERABLE) > -1} />
        <Checkbox onChange={(e, v) => this.onCheckboxChanged(Availability.UNAVAILABLE, v)} label={t('availability_NOT_AVAILABLE')}
          checked={_.indexOf(this.props.values, Availability.UNAVAILABLE) > -1} />
      </div>
    );
  }
}

AvailabilityFilter.contextTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.search.loading,
  values: state.search.filters.pos.availability,
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
