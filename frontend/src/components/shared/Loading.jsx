import PropTypes from "prop-types";
import { FaBasketShopping } from "react-icons/fa6";

const Loading = ({ intro }) => {
  return (
    <div
      className={`loading-container ${intro ? "intro-container" : "loader-container"}`}
    >
      <div className={`icon ${intro ? "intro-icon" : "loader-icon"}`}>
        <FaBasketShopping />
      </div>
      <p className={`logo ${intro ? "intro-logo" : "loader-logo"}`}>SCANDIWEB</p>
    </div>
  );
};

Loading.propTypes = {
  intro: PropTypes.bool,
};

export default Loading;