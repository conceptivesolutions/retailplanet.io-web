import * as React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
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
        <div className={css.filterContainer}>
          <Link href="/">
            <a>
              <Image className={`${css.logo}`} src="/static/retailplanet-logo.svg" />
            </a>
          </Link>
          <ResultFilters className={css.filter} />
        </div>
        <div className={css.container}>
          {container}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={css.page}>
        <Header withSearch />
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
