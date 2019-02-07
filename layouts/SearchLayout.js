import PageHeader from "../components/navigation/PageHeader.js";
import {Container} from "react-bootstrap";

//noinspection JSUnusedGlobalSymbols
export default (props) => (
    <div>
      <PageHeader session={props.session} query={props.query} onSubmit={props.onSubmit} fixedTop withLogo withSearch/>
      <Container className="d-flex flex-column">
        {props.children}
      </Container>

      <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
      }
    `}</style>
    </div>
);