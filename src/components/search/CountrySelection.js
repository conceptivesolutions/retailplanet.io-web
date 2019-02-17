import * as React from "react";
import css from "./CountrySelection.scss";
import {Form, InputGroup} from "react-bootstrap";

/**
 * @author w.glanzer, 09.02.2019
 */
export default class CountrySelection extends React.Component
{
  render()
  {
    return <InputGroup className={css.countryFilter}>
      <Form.Check custom inline label="Deutschland" type="checkbox" id="custom-inline-checkbox1" defaultChecked/>
      <Form.Check custom inline disabled label="Österreich" type="checkbox" id="custom-inline-checkbox2"/>
      <Form.Check custom inline disabled label="Schweiz" type="checkbox" id="custom-inline-checkbox3"/>
    </InputGroup>
  }
}