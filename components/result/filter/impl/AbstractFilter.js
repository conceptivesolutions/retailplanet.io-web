import * as React from "react";
import css from "./AbstractFilter.scss";

/**
 * @author w.glanzer, 12.02.2019
 */
export default class AbstractFilter extends React.Component
{

  constructor(props)
  {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  render()
  {
    return <div className={`${css.container} d-flex flex-column`}>
      <span className={css.title}>{this.getTitle()}</span>
      <div>
        {this.renderComponent()}
      </div>
    </div>
  }

  renderComponent()
  {
  }

  getTitle()
  {
  }

}