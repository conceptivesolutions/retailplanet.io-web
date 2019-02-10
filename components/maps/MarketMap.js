import React, {Component} from 'react'
import {geolocated} from 'react-geolocated';
import {Map, Marker, TileLayer} from "react-leaflet";
import './MarketMap.scss'
import * as L from "leaflet";

class MarketMap extends Component
{

  state = {
    markets: []
  };

  async componentDidMount()
  {
    //let query = "/solr/mysql_db/select?fl=*,calculatedDistance%3Ageodist()&q=*%3A*&fq=%7B!geofilt%7D&pt=48.544193,12.146853&sfield=shop_location&d=1000&sort=geodist()%20asc";
    let query = "/solr/mysql_db/select?q=market_id%3A*&qf=name&rows=2147483647";
    fetch(query)
        .then(pResult => pResult.json())
        .then(pJson => {
          let marketsArr = [];
          pJson.response.docs.forEach(pValue => {
            let split = pValue.shop_location.split(",");
            let arr = [];
            arr[0] = +split[0];
            arr[1] = +split[1];
            arr[2] = pValue.datasource_id;
            marketsArr.push(arr);
          });

          console.log(marketsArr);

          this.setState({markets: marketsArr});
        })
  }

  render()
  {
    let lat = this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords ? this.props.coords.latitude : 52.520008;
    let lng = this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords ? this.props.coords.longitude : 13.404954;

    return <Map center={[lat, lng]} zoom={10}>
      <TileLayer url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'/>
      {this._getMarkers()}
    </Map>
  }

  _getMarkers()
  {
    return this.state.markets.map((pValue, pIndex) => {
      let pos = [];
      pos[0] = pValue[0];
      pos[1] = pValue[1];
      if (pValue[2] === "MediaMarktDataSource")
      {
        let icon = L.icon({
                            iconUrl: '/static/marker-icon-red.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                          });
        return <Marker key={pIndex} position={pos} icon={icon}/>
      }

      return <Marker key={pIndex} position={pos}/>
    })
  }

}

export default geolocated({positionOptions: {enableHighAccuracy: false,}, userDecisionTimeout: 5000})(MarketMap);