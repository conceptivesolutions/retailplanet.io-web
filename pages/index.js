import {Component} from "react";
import {NextAuth} from "next-auth/client";
import IndexLayout from "../layouts/IndexLayout";
import SearchInput from "../components/SearchInput";

//noinspection JSUnusedGlobalSymbols
export default class Index extends Component
{

  //noinspection JSUnusedGlobalSymbols
  static async getInitialProps({req})
  {
    return {
      session: await NextAuth.init({req}),
    }
  }

  render()
  {
    return (
        <IndexLayout session={this.props.session}>
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <SearchInput/>
            </div>
          </div>
        </IndexLayout>
    )
  }
}