import {Component} from "react";
import './PreviewPrice.scss'

/**
 * Preview: Preis eines Produkts
 *
 * props.data = Preis als Float
 *
 * @author w.glanzer, 20.01.2019
 */
export default class PreviewPrice extends Component
{

  render()
  {
    let priceString = "0,00";
    let price = this.props.data;
    if (price && price > -1)
      priceString = price.toLocaleString("de-DE", {minimumFractionDigits: 2});

    let digits = priceString.split(",");
    if (digits.length === 2)
      return <span className="product-price">{digits[0]}<sup>{digits[1]}</sup></span>;
    return <span className="product-price">{priceString}</span>;
  }

}