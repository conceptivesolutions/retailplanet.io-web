import {Component} from "react";

/**
 * Preview: Titel eines Produkts
 *
 * props.data = Titel
 *
 * @author w.glanzer, 20.01.2019
 */
export default class PreviewTitle extends Component
{

  render()
  {
    if (!this.props.data)
      return <span/>;

    return <div className="product-title">
      <h5 className="d-lg-none">{this.props.data}</h5>
      <h2 className="d-none d-lg-block">{this.props.data}</h2>
    </div>;
  }

}