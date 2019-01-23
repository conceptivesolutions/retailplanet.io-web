import {Container} from "react-bootstrap";
import PageHeader from "../components/navigation/PageHeader.js";
import PageFooter from "../components/navigation/PageFooter.js";
import './IndexLayout.scss'

/**
 * Layout für die Index-Seite mit der Haupt-Suche
 *
 * @author w.glanzer, 14.01.2019
 */
export default (props) => (
    <div>
      <PageHeader fixedTop/>
      <Container className="h-100">
        {props.children}
      </Container>
      <PageFooter/>
    </div>
);