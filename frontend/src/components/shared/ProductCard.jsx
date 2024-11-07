import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useCartContext } from "../../context/CartContext";
import { FaBasketShopping } from "react-icons/fa6";

const ProductCard = ({ product = {} }) => {
  const { addToCart, cartItems, setOpenCart } = useCartContext();

  const handleQuickShop = (e) => {
    e.stopPropagation();
    addToCart(product);
    setOpenCart(true);
  };

  const productAddedToCart = cartItems.some(
    (item) => item.product.id === product.id
  );

  return (
    <div className="product-container hover:shadow-2xl">
      <div className="product-header">
        <Link
          to={`/${product.category}/${product.id}`}
          data-testid={`product-${product.name
            .replace(/\s+/g, "-")
            .toLowerCase()}`}
        >
          <img
            src={product.gallery[0]}
            alt={product.name}
            loading="lazy"
            className="min-w-full min-h-64 max-h-80"
          />
        </Link>
        {!product.inStock ? (
          <Link
            to={`/${product.category}/${product.id}`}
            className="outStock-message"
          >
            Out of Stock
          </Link>
        ) : (
          <button
            className={`${productAddedToCart ? 'quick-shop_product-added' : 'quick-shop'}`}
            onClick={handleQuickShop}
            // disabled={productAddedToCart}
            title={
              productAddedToCart
                ? `${product.name} Has Already Added to the Cart`
                : `Add ${product.name} to the Cart`
            }
          >
            {productAddedToCart ? <FaBasketShopping /> : <FaCartShopping />}
          </button>
        )}
      </div>
      <div className="product-body">
        <p>{product.name}</p>
        <p>
          {product.prices[0].currency.symbol}
          {product.prices[0].amount}
        </p>
      </div>
    </div>
  );
};

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
};

export default ProductCard;
