import * as React from "react";
import ResultItem from "./ResultItem";

/**
 * props.data = Daten-Objekt
 *
 * @author w.glanzer, 10.02.2019
 */
export default class ResultList extends React.Component
{

  render()
  {
    return <div className={"d-flex flex-wrap mb-3 mr-3"}>
      {this.props.data.items.map((pItem, pIndex) => {
        return <ResultItem className={`ml-3 mt-3`} data={pItem} key={pIndex}/>
      })}
    </div>
  }

}