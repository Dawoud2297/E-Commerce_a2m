import { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaBasketShopping } from "react-icons/fa6";
import withCart from "../HOCs/withCart";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.product = this.props?.product;
  }

  handleQuickShop = (e) => {
    e.stopPropagation();

    const { addToCart, setOpenCart } = this.props.cart;
    addToCart(this.product);
    setOpenCart(true);
  };

  render() {
    const productAddedToCart = this.props.cart.cartItems.some(
      (item) => item.product.id === this.product.id
    );

    return (
      <div className="group flex flex-col items-start p-4 overflow-hidden transition-all shadow-lg ease-linear translate-x-2 duration-500 hover:shadow-2xl">
        <div className="relative mb-2">
          <Link
            to={`/${this.product.category}/${this.product.id}`}
            data-testid={`product-${this.product.name
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
          >
            <img
              src={this.product.gallery[0]}
              alt={this.product.name}
              loading="lazy"
              className="min-w-full min-h-64 max-h-80"
            />
          </Link>
          {!this.product.inStock ? (
            <Link
              to={`/${this.product.category}/${this.product.id}`}
              className="absolute inset-0 flex items-center justify-center px-2 py-1 text-2xl text-green-600 uppercase bg-white bg-opacity-60"
            >
              Out of Stock
            </Link>
          ) : (
            <button
              className={`absolute group-hover:opacity-100 bottom-0 right-[-1rem] p-3 rounded-full text-2xl text-light-1 transition-opacity duration-300 transform translate-y-1 opacity-0 ${
                productAddedToCart ? "bg-light-4" : "bg-green-600"
              }`}
              onClick={this.handleQuickShop}
              title={
                productAddedToCart
                  ? `${this.product.name} Has Already Added to the Cart`
                  : `Add ${this.product.name} to the Cart`
              }
            >
              {productAddedToCart ? <FaBasketShopping /> : <FaCartShopping />}
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1 base-semibold text-green-600">
          <p className="capitalize">{this.product.name}</p>
          <p className="opacity-75">
            {this.product.prices[0].currency.symbol}
            {this.product.prices[0].amount}
          </p>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.string.isRequired,
    prices: PropTypes.arrayOf(
      PropTypes.shape({
        currency: PropTypes.shape({
          symbol: PropTypes.string.isRequired,
        }).isRequired,
        amount: PropTypes.string.isRequired,
      })
    ).isRequired,
    inStock: PropTypes.bool.isRequired,
  }),
  cart: PropTypes.object,
};

export default withCart(ProductCard);