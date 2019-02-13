import * as React from "react";
import css from "./FilterList.scss";

/**
 * @author w.glanzer, 12.02.2019
 */
export default class FilterList extends React.Component
{

  render()
  {
    return <div className={`${css.filterContainer} d-flex flex-column`}>
      {this.props.children}
    </div>
  }

}