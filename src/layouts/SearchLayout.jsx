import * as React from 'react';
import { connect } from 'react-redux';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import LoadingIndicator from '../components/loading/LoadingIndicator';
import css from './SearchLayout.scss';
import ResultFilters from '../components/filters/ResultFilters';

class SearchLayout extends React.Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
  }

  renderContent() {
    const { loading, children } = this.props;
    let container = null;

    if (loading)
      container = (
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
          <LoadingIndicator />
        </div>
      );
    else
      container = children;

    return (
      <div className={css.content}>
        <ResultFilters className={css.filter} />
        <div className={css.container}>
          {container}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={css.page}>
        <Header withLogo withSearch />
        {this.renderContent()}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.search.loading,
});

export default connect(mapStateToProps)(SearchLayout);
