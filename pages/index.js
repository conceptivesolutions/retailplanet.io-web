import IndexLayout from "../layouts/IndexLayout";
import {Component} from "react";
import SearchInput from "../components/SearchInput";

//noinspection JSUnusedGlobalSymbols
export default class Index extends Component
{
  render()
  {
    return (
        <IndexLayout>
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <SearchInput/>
            </div>
          </div>
        </IndexLayout>
    )
  }
}