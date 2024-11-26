import { Component } from "react";
import withCart from "../../HOCs/withCart";
import PropTypes from "prop-types";
import withRoute from "../../HOCs/withRoute";
import { categories } from "../../constants";
import { NavLink } from "react-router-dom";
import { FaBasketShopping, FaCartShopping } from "react-icons/fa6";
import Cart from "../Cart";

class Header extends Component {
  constructor(props) {
    super(props);
    this.delayClosing = null;
  }

  handleCategories = (category) => {
    this.props.fetchProducts({ variables: { category: category } });
  };

  handleModel = (e) => {
    e.stopPropagation();
    const { openCart, setOpenCart } = this.props.cart;
    setOpenCart(!openCart);
  };

  logoNav = () => {
    const { category } = this.props.params;
    if (category !== "all") this.props.navigate("/all");
  };

  handleCloseModel = () => {
    const { openCart, setOpenCart } = this.props.cart;
    if (openCart) {
      setOpenCart(false);
    }
  };

  componentDidUpdate() {
    const { openCart, setShowCart } = this.props.cart;

    if (this.delayClosing) {
      clearTimeout(this.delayClosing);
    }

    if (openCart) {
      setShowCart(true);
    } else {
      this.delayClosing = setTimeout(() => setShowCart(false), 500);
    }
  }

  componentWillUnmount() {
    if (this.delayClosing) {
      clearTimeout(this.delayClosing);
    }
  }

  render() {
    const { category } = this.props.params;
    const { cartItems, openCart, setOpenCart, showCart } = this.props.cart;

    return (
      <div className="sticky top-0 bg-light-2 z-50 w-screen">
        <div
          className="px-[3rem] flex justify-between items-center"
          onClick={this.handleCloseModel}
        >
          <ul className="body-bold flex gap-2">
            {categories.map((cat) => {
              const active = category === cat.category;
              return (
                <NavLink
                  to={`/${cat.category}`}
                  key={cat.category}
                  className={`text-dark-4 px-5 py-5 cursor-pointer ${
                    active
                      ? "border-b-2 border-green-600 text-green-600"
                      : "text-green-500"
                  }`}
                  onClick={() => this.handleCategories(cat.category)}
                  data-testid={
                    active ? "active-category-link" : "category-link"
                  }
                >
                  {cat.name}
                </NavLink>
              );
            })}
          </ul>
          <div
            onClick={this.logoNav}
            className="flex flex-col items-center gap-2 text-4xl text-green-600 cursor-pointer"
          >
            <FaBasketShopping />
            <span className="text-xl text-green-600 font-bold">SCANDIWEB</span>
          </div>
          <div>
            <button
              onClick={this.handleModel}
              className={`relative flex justify-center items-center gap-2 text-green-600 cursor-pointer px-5 py-3 ${
                openCart
                  ? "bg-light-1 rounded-xl shadow-2xl transition-shadow"
                  : ""
              }`}
              data-testid="cart-btn"
            >
              {cartItems.length > 0 ? (
                <span className="absolute left-1 top-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                </span>
              ) : (
                ""
              )}
              <span className="text-3xl">
                <FaCartShopping />
              </span>
              <div className="hidden md:flex flex-col items-center font-bold text-sm">
                <span>
                  {cartItems.length > 0
                    ? cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )
                    : 0}
                </span>
                <span>{cartItems.length > 1 ? "Items" : "Item"}</span>
              </div>
            </button>
          </div>
        </div>
        {showCart && (
          <div
            className={`relative ${
              openCart ? " animate-fadeInDown" : "animate-fadeOutRight"
            }`}
          >
            <Cart cartItems={cartItems} setOpenCart={setOpenCart} />
            <div
              onClick={this.handleCloseModel}
              className="absolute top-full w-full bg-dark-7 opacity-80 h-screen bg-clickable"
            ></div>
          </div>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  fetchProducts: PropTypes.func,
  cart: PropTypes.object,
  params: PropTypes.object,
  navigate: PropTypes.func,
};

export default withRoute(withCart(Header));
