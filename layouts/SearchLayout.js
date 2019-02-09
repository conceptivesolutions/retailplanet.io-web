import Header from '../components/navigation/Header.js';
import {Container} from 'react-bootstrap';

//noinspection JSUnusedGlobalSymbols
export default (props) => (
    <div>
      <Header session={props.session} query={props.query} onSubmit={props.onSubmit} withLogo withSearch/>
      <Container className="d-flex flex-column">
        {props.children}
      </Container>
    </div>
);