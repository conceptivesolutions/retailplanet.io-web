import {Component} from "react";
import './PreviewImage.scss'
import {Image} from "react-bootstrap";

/**
 * Preview: Vorschaubild eines Produkts
 *
 * props.data = URL-Array
 *
 * @author w.glanzer, 20.01.2019
 */
export default class PreviewImage extends Component
{

  render()
  {
    let previewURL = "";
    let previews = this.props.data;
    if (previews && previews.length > 0)
      previewURL = previews[0];

    return <Image src={previewURL} className="product-photo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/static/dummies/def240x240.jpg"
                  }}/>
  }

}