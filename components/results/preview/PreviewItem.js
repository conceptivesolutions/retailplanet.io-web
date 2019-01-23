import {Component} from "react";
import {Button, Image} from "react-bootstrap";
import './PreviewItem.scss'
import PreviewRating from "./parts/PreviewRating";
import PreviewWatch from "./parts/PreviewWatch";
import PreviewPrice from "./parts/PreviewPrice";
import PreviewImage from "./parts/PreviewImage";
import PreviewProperties from "./parts/PreviewProperties";
import PreviewTitle from "./parts/PreviewTitle";

/**
 * props.data = JSON-Data eines Elements
 *
 * @author w.glanzer, 15.01.2019
 */
export default class PreviewItem extends Component
{

  render()
  {
    return <div className="product rounded mb-2 p-3 d-flex flex-row flex-grow-0">
      <div className="product-col-left pr-3 mr-2 d-flex justify-content-center flex-grow-0 flex-shrink-0">
        <PreviewImage data={this.props.data.previews}/>
      </div>
      <div className="product-col-mid mx-3 d-flex flex-column flex-grow-1">
        <PreviewTitle data={this.props.data.name}/>
        <div className="product-props-parent d-flex flex-grow-2">
          <div className="product-props flex-grow-1">
            <PreviewProperties data={this.props.data.infos}/>
          </div>
        </div>
      </div>
      <div className="product-col-right-1 d-flex flex-column px-3">
        <Image className="product-source mt-1" src={this.props.data.source}/>
        <PreviewRating/>
        <div className="flex-grow-1"/>
        <PreviewPrice data={this.props.data.price}/>
      </div>
      <div className="product-col-right-2 d-flex flex-column pl-3">
        <PreviewWatch/>
        <div className="flex-grow-1"/>
        <Button variant="secondary">Details ></Button>
      </div>
    </div>
  }

}
