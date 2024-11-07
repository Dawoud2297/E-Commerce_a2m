import PropTypes from 'prop-types';
import DispatchOrders from './DispatchOrders';
import ProductsInCart from './ProductsInCart';

function Cart({ cartItems = [] ,setOpenCart}) {
  const totalPrice = cartItems
    .reduce(
      (total, item) =>
        total + parseFloat(item.product?.prices[0]?.amount) * item.quantity,
      0
    ).toFixed(2);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <section 
    className={`absolute rounded-xl z-50 bg-white shadow-2xl transition-shadow -translate-x-4 right-1 top-1 w-420 py-6 px-4 overflow-y-auto`}
    data-testid="cart-overlay"
    >
      <h2 className="mb-6">
        <span className="font-bold">My Bag</span>
        {!!totalItems && `, ${totalItems} item${totalItems === 1 ? '' : 's'}`}
      </h2>
      {totalItems === 0 ? (
        <p className="mt-2 text-gray-500">Your bag is empty.</p>
      ) : (
        <>
          <div className="py-4 space-y-8 overflow-y-auto max-h-72">
            {cartItems.map((item) => (
              <ProductsInCart key={item.id} item={item} />
            ))}
          </div>

          <div className="pt-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold font-roboto">Total</h3>
              <div className="font-bold" data-testid="cart-total">
                {`${cartItems[0]?.product.prices[0].currency.symbol} ${totalPrice}`}
              </div>
            </div>

            <DispatchOrders setOpenCart={setOpenCart}/>
          </div>
        </>
      )}
    </section>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object),
  setOpenCart: PropTypes.func
};

export default Cart;