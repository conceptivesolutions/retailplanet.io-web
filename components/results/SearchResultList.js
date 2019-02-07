import {Component} from "react";
import PreviewItem from "./preview/PreviewItem";
import './SearchResultList.scss'

/**
 * props.query = Der eingegebene Query
 * props.results = Results der Suche als JSON
 *
 * @author w.glanzer, 15.01.2019
 */
export default class SearchResultList extends Component
{

  render()
  {
    if (!this.props.results || !this.props.results.elements ||
        this.props.results.elements.length === 0)
      return <h2>no results for search "{this.props.query}"</h2>;

    return <div className={`${css.productList} d-flex flex-column flex-grow-1`}>
      {
        this.props.results.elements.map((pItem, pIndex) => {
          return <span key={pIndex}>{JSON.stringify(pItem)}</span>;
        })
      }
    </div>
  }

}