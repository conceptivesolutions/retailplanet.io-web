import * as React from 'react';
import { NextAuth } from 'next-auth/client';
import SearchLayout from '../src/layouts/SearchLayout';
import ResultList from '../src/components/result/ResultList';

// noinspection JSUnusedGlobalSymbols
export default class Search extends React.Component {
  static buildQuery(pQuery, pSort) {
    let url = `/api/search?query=${pQuery}`;
    if (pSort) url = `${url}&sort=${pSort}`;
    return url;
  }

  // noinspection JSUnusedGlobalSymbols
  static async getInitialProps(pRequest) {
    return {
      session: await NextAuth.init({
        req: pRequest.req,
      }),
      query: pRequest.query,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      query: decodeURIComponent(this.props.query.query),
      results: null,
      session: this.props.session,
    };
  }

  componentDidMount() {
    this.loadSearchResults();
  }

  componentDidUpdate() {
    if (!this.state.results) this.loadSearchResults();
  }

  loadSearchResults() {
    const encodedQuery = encodeURIComponent(this.state.query);
    fetch(Search.buildQuery(encodedQuery))
      .then(response => response.json())
      .then((json) => {
        const data = {
          items: json.elements.map(pElement => ({
            name: pElement.name,
            price: pElement.price,
            image: pElement.previews ? pElement.previews[0] : '',
            source: 'TESTMARKET',
            rating: 3.5,
            ratingCount: 42,
          })),
        };

        this.setState(({
          results: data,
        }));
      });
  }


  render() {
    return (
      <SearchLayout
        session={this.state.session}
        query={this.state.query}
        onSubmit={e => this.setState({
          results: null,
          query: e.target.query.value,
        })}
      >
        <ResultList data={this.state.results} />
      </SearchLayout>
    );
  }
}
