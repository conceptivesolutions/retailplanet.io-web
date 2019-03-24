import * as React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import css from './CountrySelection.scss';

/**
 * @author w.glanzer, 09.02.2019
 */
export default () => (
  <InputGroup className={css.countryFilter}>
    <Form.Check custom inline label="Deutschland" type="checkbox"
      id="custom-inline-checkbox1" defaultChecked />
    <Form.Check custom inline disabled label="Österreich"
      type="checkbox" id="custom-inline-checkbox2" />
    <Form.Check custom inline disabled label="Schweiz"
      type="checkbox" id="custom-inline-checkbox3" />
  </InputGroup>
);
