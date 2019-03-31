import * as React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import css from './GeoFilter.scss';
import { rerunSearch, setFilter } from '../../../reducers/searchReducer';

/**
 * Filters the results with a geolocation search
 */
class GeoFilter extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { Lat, Lng, Dist } = e.target;
    this.props.onSubmit(Lat.value, Lng.value, Dist.value);
  }

  render() {
    return (
      <Form className={css.filterContainer} onSubmit={this.onSubmit}>
        <Form.Row>
          <Col>
            <Form.Label><b>Umkreis</b></Form.Label>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control type="text" name="Lat" placeholder="Latitude" defaultValue="48.491361" />
          </Col>
          <Col>
            <Form.Control type="text" name="Lng" placeholder="Longitude" defaultValue="12.04127777" />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control className={css.dist} type="text" name="Dist" placeholder="Distance" defaultValue="30" />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className={css.submitCol}>
            <Button variant="primary" type="submit" className={css.submit}>Accept</Button>
            <Button variant="secondary" className={css.cancel}>Cancel</Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: (pLat, pLng, pDist) => {
    dispatch(setFilter(true, {
      type: 'geo',
      values: [pLat, pLng, pDist],
    }));
    dispatch(rerunSearch());
  },
});

export default connect(null, mapDispatchToProps)(GeoFilter);
