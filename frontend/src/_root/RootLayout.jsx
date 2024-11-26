import { Component } from "react";
import withGraphql from "../HOCs/withGraphql";
import { GET_PRODUCTS } from "../graphql/queries";
import Header from "../components/shared/Header";
import Loading from "../components/shared/Loading";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

class RootLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSplashScreen: true,
    };
    this.splashScreenTimer = null;
  }
  componentDidMount() {
      this.splashScreenTimer = setTimeout(
        () => this.setState({ showSplashScreen: false }),
        3000
      );
  }
  componentWillUnmount() {
    if (this.splashScreenTimer) {
      clearTimeout(this.splashScreenTimer);
    }
  }
  render() {
    if (this.state.showSplashScreen) {
      return <Loading intro={true} logo="SCANDIWEB"/>;
    }

    return (
      <div>
        <Header fetchProducts={this.props.fetchData} />
        {this.props.loading ? (
          <Loading />
        ) : (
          <main className="h-full mt-14">
            <Outlet />
          </main>
        )}
      </div>
    );
  }
}

RootLayout.propTypes = {
  fetchData: PropTypes.func,
  loading: PropTypes.bool,
};

export default withGraphql(RootLayout,"query", GET_PRODUCTS);