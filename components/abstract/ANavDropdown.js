import * as React from "react";
import {NavDropdown} from "react-bootstrap";
import css from './ANavDropdown.scss'

/**
 * Komponente für ein Dropdown-Feld mit custom Aufklapp-Pfeil
 *
 * props.title = Komponente zum Rendern der aktuellen Selektion
 */
export default class ANavDropdown extends React.Component
{

  render()
  {
    //noinspection JSUnusedLocalSymbols
    let {title, children, className, ...other} = this.props;
    let disabled = !this.props.children || this.props.children.length === 0;
    return (
        <NavDropdown className={`${css.innerDrop} d-flex align-items-center ${className}`} title={ANavDropdown._createComp(title, disabled)}
                     disabled={disabled} id="basic-nav-dropdown" {...other}>
          {this.props.children}
        </NavDropdown>
    )
  }

  static _createComp(pTitleComp, pDisabled)
  {
    return <React.Fragment>
      {pTitleComp}
      <i className={`${css.dropdownToggleCustom} fa fa-angle-down ${pDisabled ? css.dropdownDisabled : ""}`}/>
    </React.Fragment>
  }

}