import * as React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import css from './GeoFilter.scss';
import { edit, rerunSearch, setFilter } from '../../../reducers/searchReducer';

/**
 * Filters the results with a geolocation search
 */
class GeoFilter extends React.Component {
  static name = 'geo';

  state = {
    lat: 48.491361,
    lng: 12.04127777,
    dist: 30,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderEditState = this.renderEditState.bind(this);
    this.renderShowState = this.renderShowState.bind(this);
  }

  componentWillMount() {
    this.props.onFilterChange(48.491361, 12.04127777, 30);
  }

  onSubmit(e) {
    e.preventDefault();
    const { Lat, Lng, Dist } = e.target;
    this.setState({
      lat: Lat.value,
      lng: Lng.value,
      dist: Dist.value,
    });
    this.props.onFilterChange(Lat.value, Lng.value, Dist.value);
  }

  renderEditState() {
    const { lat, lng, dist } = this.state;
    return (
      <React.Fragment>
        <Form.Row>
          <Col>
            <Form.Control type="text" name="Lat" placeholder="Latitude" defaultValue={lat} />
          </Col>
          <Col>
            <Form.Control type="text" name="Lng" placeholder="Longitude" defaultValue={lng} />
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
            <Button variant="secondary" onClick={() => this.props.onSwitchToEdit(false)} className={css.cancel}>Cancel</Button>
          </Col>
        </Form.Row>
      </React.Fragment>
    );
  }

  renderShowState() {
    const { lat, lng, dist } = this.state;
    return (
      <Form.Row>
        <Col>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <Form.Label className={css.editLabel}>{lat}, {lng}, {dist}km</Form.Label>
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
                ? (<Button className={css.edit} variant="link" onClick={() => this.props.onSwitchToEdit(true)}>change</Button>)
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
  onSwitchToEdit: (pEdit) => {
    dispatch(edit(pEdit ? GeoFilter.name : null));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GeoFilter);
