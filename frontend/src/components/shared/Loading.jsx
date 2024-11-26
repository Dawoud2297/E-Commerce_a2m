import { Component } from "react";
import PropTypes from "prop-types";
import { FaBasketShopping } from "react-icons/fa6";

class Loading extends Component {
  render() {
    const { intro,logo } = this.props;
    return (
      <div
        className={`absolute top-0 flex flex-col justify-center items-center z-50 h-full w-full ${
          intro ? "bg-dark-2" : "flex flex-col justify-center items-center"
        }`}
      >
        <div className={`text-green-500 animate-pulse ${intro ? "text-[9rem]" : "text-[2rem]"}`}>
          <FaBasketShopping />
        </div>
        <p className={`bg-gradient-to-r from-blue-700 via-green-400 to-dark-7 text-transparent bg-clip-text bg-200% tracking-tight animate-gradient ${intro ? "text-[10rem]" : "text-[1rem]"}`}>
          {logo}
        </p>
      </div>
    );
  }
}

Loading.propTypes = {
  intro: PropTypes.bool,
  logo : PropTypes.string
};

export default Loading;
