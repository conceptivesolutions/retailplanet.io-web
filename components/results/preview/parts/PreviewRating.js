import {Component} from "react";

/**
 * Preview: Komponente, um ein Rating anzuzeigen -> ReadOnly
 *
 * @author w.glanzer, 20.01.2019
 */
export default class PreviewRating extends Component
{

  render()
  {
    return <div className="product-rating align-self-center mt-1">
      <span className="fa fa-star text-warning"/>
      <span className="fa fa-star text-warning"/>
      <span className="fa fa-star text-warning"/>
      <span className="fa fa-star text-secondary"/>
      <span className="fa fa-star text-secondary"/>
    </div>;
  }

}