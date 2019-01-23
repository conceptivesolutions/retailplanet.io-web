import SearchLayout from "../layouts/SearchLayout";
import {Component} from "react";
import SearchResultInput from "../components/results/SearchResultInput";
import SearchResultList from "../components/results/SearchResultList";

//noinspection JSUnusedGlobalSymbols
export default class Search extends Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      query: decodeURIComponent(this.props.query.query),
      results: null
    }
  }

  componentDidMount()
  {
    this._loadSearchResults();
  }

  componentDidUpdate(prevProps, prevState, snapshot)
  {
    if (!this.state.results)
      this._loadSearchResults();
  }

  render()
  {
    return (
        <SearchLayout>
          <SearchResultInput query={this.state.query} onSubmit={e => this.setState({results: null, query: e.target.inputQuery.value})}/>
          <div className="d-flex flex-row">
            <SearchResultList query={this.state.query} results={this.state.results}/>
          </div>
        </SearchLayout>
    )
  }

  _loadSearchResults()
  {
    let encodedQuery = encodeURIComponent(this.state.query);
    fetch(Search.buildQuery(encodedQuery))
        .then(response => response.json())
        .then(json => {
          this.setState(({results: json}))
        });
  }

  static buildQuery(pQuery, pSort)
  {
    let url = "/api/search?query=" + pQuery;
    if (pSort)
      url = url + "&sort=" + pSort;
    return url;
  }

  //noinspection JSUnusedGlobalSymbols
  static getInitialProps({query})
  {
    return {query};
  }

}