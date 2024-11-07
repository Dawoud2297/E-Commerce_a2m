import { NavLink, useNavigate, useParams } from "react-router-dom";
import { categories } from "../../constants";
import { FaBasketShopping, FaCartShopping } from "react-icons/fa6";
import { useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import PropTypes from "prop-types";
import Cart from "../Cart";

const Header = ({ fetchProducts }) => {
  const { cartItems, openCart, setOpenCart, showCart, setShowCart } =
    useCartContext();
  const { category } = useParams();
  const navigate = useNavigate();

  const handleCategories = (category) => {
    fetchProducts({ variables: { category: category } });
  };

  const handleModel = (e) => {
    e.stopPropagation();
    setOpenCart(!openCart);
  };

  const logoNav = () => {
    if (category !== "all") navigate("/all");
  };

  const handleCloseModel = () => {
    if (openCart) {
      setOpenCart(false);
    }
  };

  useEffect(() => {
    if (openCart) {
      setShowCart(true);
    } else {
      const delayClosing = setTimeout(() => setShowCart(false), 500);
      return () => clearTimeout(delayClosing);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCart]);

  return (
    <div className="header-container">
      <div className="header-container_inner" onClick={handleCloseModel}>
        <ul className="header-navbar">
          {categories.map((cat) => {
            const active = category === cat.category;
            return (
              <NavLink
                to={`/${cat.category}`}
                key={cat.category}
                className={`${active ? "active-nav" : "text-green-500"}`}
                onClick={() => handleCategories(cat.category)}
                data-testid={active ? "active-category-link" : "category-link"}
              >
                {cat.name}
              </NavLink>
            );
          })}
        </ul>
        <div onClick={logoNav} className="header-logo">
          <FaBasketShopping />
          <span>SCANDIWEB</span>
        </div>
        <div>
          <button
            onClick={handleModel}
            className={`header-cart-btn ${
              openCart ? "header-open_cart-btn" : ""
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
            <span className="header-cart_icon">
              <FaCartShopping />
            </span>
            <div className="hidden md:flex flex-col items-center font-bold text-sm">
              <span>
                {cartItems.length > 0
                  ? cartItems.reduce((total, item) => total + item.quantity, 0)
                  : 0}
              </span>
              <span>{cartItems.length > 1 ? "Items" : "Item"}</span>
            </div>
          </button>
        </div>
      </div>
      {showCart && (
        <div className={`relative ${openCart ? "fadeInDown" : "fadeOutRight"}`}>
          <Cart cartItems={cartItems} setOpenCart={setOpenCart} />
          <div onClick={handleCloseModel} className="bg-clickable"></div>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  fetchProducts: PropTypes.func,
  openCart: PropTypes.bool,
  setOpenCart: PropTypes.func,
  showCart: PropTypes.bool,
  setShowCart: PropTypes.func,
};

export default Header;
