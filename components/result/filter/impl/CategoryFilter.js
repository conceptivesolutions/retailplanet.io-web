import * as React from "react"
import AbstractFilter from "./AbstractFilter";

/**
 * @author w.glanzer, 12.02.2019
 */
export default class CategoryFilter extends AbstractFilter
{

  renderComponent()
  {
    return <span>neueComponent</span>
  }

  getTitle()
  {
    return "Category"
  }

}