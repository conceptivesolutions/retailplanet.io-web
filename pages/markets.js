import React, {Component} from "react";
import dynamic from 'next/dynamic'
import Head from 'next/head'
import SearchLayout from "../layouts/SearchLayout";

const MarketMap = dynamic(() => import('../components/maps/MarketMap'), {
  ssr: false
});

//noinspection JSUnusedGlobalSymbols
export default class Markets extends Component
{
  render()
  {
    return <SearchLayout>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
              integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
              crossOrigin=""/>
        <title>Test</title>
      </Head>
      <MarketMap/>
    </SearchLayout>
  }
}