import {Component} from "react";
import {Button} from "react-bootstrap";
import './PreviewWatch.scss'

/**
 * Preview: "Beobachten"-Link in einem Produkt
 *
 * @author w.glanzer, 20.01.2019
 */
export default class PreviewWatch extends Component
{

  render()
  {
    return <div className="d-flex justify-content-end product-favorite">
      <Button variant="link">Beobachten</Button>
    </div>
  }

}