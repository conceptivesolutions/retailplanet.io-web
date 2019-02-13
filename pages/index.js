import * as React from "react";
import {Component} from "react";
import {NextAuth} from "next-auth/client";
import IndexLayout from "../layouts/IndexLayout";
import {Form} from "react-bootstrap";
import Searchbar from "../components/search/Searchbar";
import Router from "next/router";
import css from "./index.scss"
import CountrySelection from "../components/search/CountrySelection";

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
              <Form className="col-12" onSubmit={e => Index.onSearch(e)}>
                <div className={css.phrase}>Search for specific Items.<br/><b>Buy from a local store</b></div>
                <Searchbar className={"shadow"}/>
                <CountrySelection/>
              </Form>
            </div>
          </div>
        </IndexLayout>
    )
  }

  /**
   * Wird aufgerufen, wenn die Suche gestartet werden soll
   *
   * @param pEvent Event
   */
  static onSearch(pEvent)
  {
    pEvent.preventDefault();

    //noinspection JSUnresolvedVariable
    let inputQuery = encodeURIComponent(pEvent.target.query.value);

    //noinspection JSUnresolvedVariable
    Router.push({pathname: '/search', query: {query: inputQuery}});
  }
}