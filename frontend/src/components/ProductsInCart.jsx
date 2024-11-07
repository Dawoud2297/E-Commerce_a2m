import PropTypes from "prop-types";
import ProductAttributes from "./ProductAttributes";


function ProductsInCart({ item = {} }) {
  const productImage = item.product.gallery?.length
    ? item.product.gallery[0]
    : "";

  return (
    <div className="flex justify-between">
      <ProductAttributes
        isModalView={true}
        product={item.product}
        itemSelectedAttributes={item.selectedAttributes}
        itemId={item.id}
        itemQuantity={item.quantity}
        productImage = {productImage}
      />
    </div>
  );
}

ProductsInCart.propTypes = {
  item: PropTypes.object,
};

export default ProductsInCart;
