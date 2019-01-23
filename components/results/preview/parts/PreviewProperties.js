import {Component} from "react";

/**
 * Preview: Zusatzinformationen zu einem Produkt
 *
 * props.data = Properties als String
 *
 * @author w.glanzer, 20.01.2019
 */
export default class PreviewProperties extends Component
{

  render()
  {
    let infos = this.props.data;
    if (infos)
    {
      return <table className="product-props-table">
        <tbody>{
          Object.entries(infos)
              .map(([key, value]) => {
                return <tr key={key}>
                  <td className="pr-2">{key}</td>
                  <td>{value}</td>
                </tr>
              })
        }</tbody>
      </table>
    }

    return <div/>
  }

}