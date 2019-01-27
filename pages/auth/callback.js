import {Component} from 'react'
import Router from 'next/router'
import {NextAuth} from 'next-auth/client'
import './callback.scss'

//noinspection JSUnusedGlobalSymbols
export default class extends Component
{

  //noinspection JSUnusedGlobalSymbols
  static async getInitialProps({req})
  {
    return {
      session: await NextAuth.init({force: true, req: req})
    }
  }

  async componentDidMount()
  {
    // Neuen state fetchen
    await NextAuth.init({force: true});

    // weiterleiten
    Router.push('/')
  }

  render()
  {
    return (
        <a href="/" className="circle-loader">
          <svg className="circle" width="60" height="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="15"/>
          </svg>
          <noscript>
            Click here to continue
          </noscript>
        </a>
    )
  }
}