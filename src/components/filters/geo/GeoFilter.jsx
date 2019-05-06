import * as React from 'react';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import { Button, Form, Input } from 'semantic-ui-react';
import css from './GeoFilter.scss';
import { edit, rerunSearch, setFilter } from '../../../reducers/searchReducer';
import { search, searchRev } from '../../../helpers/rest/geoLocationHelper';

/**
 * Filters the results with a geolocation search
 */
class GeoFilter extends React.Component {
  static name = 'geo';

  state = {
    lat: 48.491472,
    lng: 12.041074,
    name: '',
    dist: 30,
    input: {
      lat: 0,
      lng: 0,
      name: '',
    },
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onGeoLocationChange = this.onGeoLocationChange.bind(this);
    this.renderEditState = this.renderEditState.bind(this);
    this.renderShowState = this.renderShowState.bind(this);
  }

  componentWillMount() {
    this.props.onFilterChange(48.491472, 12.041074, 30);
    searchRev(48.491472, 12.041074)
      .then((result) => {
        if (result && result.length > 0)
          this.setState({
            name: result[0].label,
          });
      });
  }

  onSubmit(e) {
    e.preventDefault();
    const { Dist } = e.target;
    const { lat, lng, name } = this.state.input;
    this.setState({
      lat,
      lng,
      dist: Dist.value,
      name,
    });
    this.props.onFilterChange(lat, lng, Dist.value);
  }

  onEdit() {
    this.props.onEdit(true);
  }

  onGeoLocationChange(e) {
    if (e) {
      const { location } = e;
      if (location && location.length === 2) {
        this.setState({
          input: {
            lat: Number.parseFloat(location[1]),
            lng: Number.parseFloat(location[0]),
            name: e.label,
          },
        });
        return;
      }
    }

    this.setState({
      input: {
        lat: 0,
        lng: 0,
        name: '',
      },
    });
  }

  renderEditState() {
    const { dist } = this.state;
    return (
      <React.Fragment>
        <AsyncSelect className={css.editAddress} defaultOptions loadOptions={search} onChange={this.onGeoLocationChange} />
        <Input name="Dist" className={css.dist} placeholder="Distance" defaultValue={dist} />
        <Button className={css.submit}>Accept</Button>
        <Button onClick={() => this.props.onEdit(false)} className={css.cancel}>Cancel</Button>
      </React.Fragment>
    );
  }

  renderShowState() {
    const { lat, lng, dist, name } = this.state;
    const display = !name ? `${lat}, ${lng}, ${dist}km` : `${name} (${dist}km)`;
    return (
      <span>{display}</span>
    );
  }

  render() {
    return (
      <Form className={css.filterContainer} onSubmit={this.props.isEditing ? this.onSubmit : null}>
        <h5>Märkte in der Nähe</h5>
        {!this.props.isEditing
          ? (<Button className={css.edit} variant="link" onClick={this.onEdit}>change</Button>)
          : null}
        {this.props.isEditing ? this.renderEditState() : this.renderShowState()}
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  isEditing: state.search.filters.editing === GeoFilter.name,
});

const mapDispatchToProps = dispatch => ({
  onFilterChange: (pLat, pLng, pDist) => {
    dispatch(setFilter(true, {
      type: GeoFilter.name,
      values: [pLat, pLng, pDist],
    }));
    dispatch(rerunSearch());
  },
  onEdit: (pEdit) => {
    dispatch(edit(pEdit ? GeoFilter.name : null));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GeoFilter);
