import * as React from 'react';
import { connect } from 'react-redux';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import LoadingIndicator from '../components/loading/LoadingIndicator';
import css from './SearchLayout.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.renderContentIfFinished = this.renderContentIfFinished.bind(this);
  }

  renderContentIfFinished() {
    if (this.props.loading)
      return (
        <div className={`${css.container} d-flex flex-column`}>
          <div className={`${css.filterContainer} d-flex flex-column`} />
          <div className="d-flex flex-column align-items-center">
            <LoadingIndicator />
          </div>
        </div>
      );

    return (
      <React.Fragment>
        <div className={`${css.filterContainer} d-flex flex-column`} />
        <div className={`${css.container} d-flex flex-column`}>{this.props.children}</div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <Header withLogo fixedTop />
        {this.renderContentIfFinished()}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.search.loading,
});

export default connect(mapStateToProps)(Layout);
