import * as React from 'react';
import { NavDropdown } from 'react-bootstrap';
import css from './ANavDropdown.scss';

/**
 * Komponente für ein Dropdown-Feld mit custom Aufklapp-Pfeil
 *
 * props.title = Komponente zum Rendern der aktuellen Selektion
 */
export default (props) => {
  const { title, children, className, ...other } = props;
  const disabled = !children || children.length === 0;
  return (
    <NavDropdown
      className={`${css.innerDrop} d-flex align-items-center ${className}`}
      title={(
        <React.Fragment>
          {title}
          <i className={`${css.dropdownToggleCustom} fa fa-angle-down ${disabled ? css.dropdownDisabled : ''}`} />
        </React.Fragment>
      )}
      disabled={disabled}
      id="basic-nav-dropdown"
      {...other}
    >
      {props.children}
    </NavDropdown>
  );
};
