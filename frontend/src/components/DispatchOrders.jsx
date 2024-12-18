import { Component } from 'react'
import withGraphql from '../HOCs/withGraphql'
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { IoWarningOutline } from "react-icons/io5";
import withCart from '../HOCs/withCart';
import { MAKE_ORDER } from "../graphql/mutations";

class DispatchOrders extends Component {
    handleDispatchOrders = async () => {
        const { emptyCart,setOpenCart } = this.props.cart;
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
        if (!cartItems.length) {
          return toast.error("Cart is empty! 🛒");
        }
    
        const orderInput = {
          items: cartItems.map((item) => {
            return {
              productId: item.product.id,
              quantity: item.quantity,
              attributeValues: item.selectedAttributes.map((attr) => ({
                id: attr.id,
                value: attr.value,
              })),
            };
          }),
        };
    
        try {
          const { data } = await this.props.makeOrder({
            variables: { orderInput },
          });
    
          emptyCart();
          setOpenCart(false);
          toast.success(`${data.makeOrder.message} with ID ${data.makeOrder.orderId}`);
        
        } catch (err) {
          if (err.graphQLErrors && err.graphQLErrors.length > 0) {
            const errorMessage = err.graphQLErrors[0].message;
            return toast.error(`Error dispatching order 1: ${errorMessage}`);
          }
    
          if (
            err.networkError &&
            err.networkError.result &&
            err.networkError.result.error
          ) {
            const errorMessage = err.networkError.result.error;
            return toast.error(`Error dispatching order 2: ${errorMessage}`);
          }
          toast.error("Error...dispatching order. Please try again later.");
        }
      };
    
    clearCart = () =>{
      const { emptyCart,setOpenCart } = this.props.cart;
      emptyCart();
      setOpenCart(false);
    }

    render() {

        return (
            <div className="flex flex-col gap-5 mt-8">
            <button
              type="button"
              className="bg-green-600 text-light-1 font-bold text-xl rounded-xl py-3 flex items-center justify-center disabled:opacity-70"
              onClick={this.handleDispatchOrders}
              data-testid="place-order-btn"
            >
              Dispatch Order
            </button>
            <button 
            type="button"
            className="bg-red-700 text-light-1 font-bold text-xl rounded-xl py-3 flex items-center justify-center gap-1 disabled:opacity-70"
            onClick={this.clearCart}
            >
              Clear the Cart
              <span className="text-2xl text-black" aria-label="Warning">
                 <IoWarningOutline fontSize="1.75rem"/>
                </span>
              </button>
              </div>
          );
  }
}

DispatchOrders.propTypes = {
    cart : PropTypes.object,
    makeOrder : PropTypes.func
}

export default withGraphql(withCart(DispatchOrders),"mutation",MAKE_ORDER);
