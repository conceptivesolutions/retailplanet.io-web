import * as React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';
import css from './CountrySelection.scss';

/**
 * @author w.glanzer, 09.02.2019
 */
export default () => (
  <Form className={css.countryFilter}>
    <Form.Field>
      <Checkbox label="Deutschland" />
      <Checkbox label="Österreich" />
      <Checkbox label="Schweiz" />
    </Form.Field>
  </Form>
);
