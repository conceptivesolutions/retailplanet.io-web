import * as React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
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
        <Form.Row>
          <Col>
            {/* todo GeoLocation Initial State */}
            <AsyncSelect className={css.editAddress} defaultOptions loadOptions={search} onChange={this.onGeoLocationChange} />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control className={css.dist} type="text" name="Dist" placeholder="Distance" defaultValue={dist} />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className={css.submitCol}>
            <Button variant="primary" type="submit" className={css.submit}>Accept</Button>
            <Button variant="secondary" onClick={() => this.props.onEdit(false)} className={css.cancel}>Cancel</Button>
          </Col>
        </Form.Row>
      </React.Fragment>
    );
  }

  renderShowState() {
    const { lat, lng, dist, name } = this.state;
    const display = !name ? `${lat}, ${lng}, ${dist}km` : `${name} (${dist}km)`;
    return (
      <Form.Row>
        <Col>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <Form.Label className={css.editLabel}>{display}</Form.Label>
        </Col>
      </Form.Row>
    );
  }

  render() {
    return (
      <Form className={css.filterContainer} onSubmit={this.props.isEditing ? this.onSubmit : null}>
        <Form.Row>
          <Col>
            <Form.Label>
              <b>Märkte in der Nähe</b>
              {!this.props.isEditing
                ? (<Button className={css.edit} variant="link" onClick={this.onEdit}>change</Button>)
                : null}
            </Form.Label>
          </Col>
        </Form.Row>
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
