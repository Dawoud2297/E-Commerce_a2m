import { useCartContext } from "../context/CartContext";

const withCart = (Component) => {
  const CartHoc = (props) => {
    const cart = useCartContext();
    return <Component {...props} cart={cart} />;
  };
  
  return CartHoc;
};

export default withCart;
