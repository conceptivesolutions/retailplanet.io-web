import {Container} from 'react-bootstrap';
import SearchHeader from "../components/search/SearchHeader";

//noinspection JSUnusedGlobalSymbols
export default (props) => (
    <div>
      <SearchHeader session={props.session} query={props.query} onSubmit={props.onSubmit} withLogo/>
      <Container className="d-flex flex-column">
        {props.children}
      </Container>
    </div>
);