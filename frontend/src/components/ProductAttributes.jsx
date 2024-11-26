import { Component } from "react";
import withCart from "../HOCs/withCart";
import PropTypes from "prop-types";

class ProductAttributes extends Component {
  constructor(props) {
    super(props);

    const { itemSelectedAttributes = [] } = this.props;
    this.state = {
      selectedAttributes: itemSelectedAttributes,
    };
  }

  handleAttributeClick = (attribute) => {
    const existingIndex = this.state.selectedAttributes.findIndex(
      (attr) => attr.attributeId === attribute.attribute_id
    );

    const updatedSelectedAttributes = [...this.state.selectedAttributes];

    if (existingIndex !== -1) {
      updatedSelectedAttributes[existingIndex] = {
        id: attribute.id,
        attributeId: attribute.attribute_id,
        value: attribute.value,
      };
    } else {
      updatedSelectedAttributes.push({
        id: attribute.id,
        attributeId: attribute.attribute_id,
        value: attribute.value,
      });
    }

    this.setState({ selectedAttributes: updatedSelectedAttributes });
    if (this.props.isModalView) {
      this.props.cart.updateCartItemAttribute(
        this.props.product,
        this.state.selectedAttributes,
        updatedSelectedAttributes
      );
    }
  };

  isAttributeValueSelected = (attribute) => {
    return this.state.selectedAttributes.some(
      (attr) =>
        attribute.attribute_id === attr.attributeId &&
        attribute.value === attr.value
    );
  };

  handleAddToCart = () => {
    const { addToCart, setOpenCart } = this.props.cart;

    addToCart(this.props.product, true, this.state.selectedAttributes);
    setOpenCart(true);
  };

  render() {
    const { product, isModalView, itemId, itemQuantity, productImage, cart } =
      this.props;

    const { updateCartItemQuantity } = cart;

    const totalPrice =
      product.prices && product.prices.length > 0
        ? `${product.prices[0].currency.symbol} ${(
            parseFloat(product.prices[0]?.amount) * (product.quantity ?? 1)
          ).toFixed(2)}`
        : null;

    return (
      <div
        className={`${
          isModalView ? "pr-4 overflow-x-hidden" : "w-full"
        } flex flex-col gap-2`}
      >
        <div className={isModalView ? "flex justify-between w-full" : ""}>
          <span
            className={`capitalize ${
              isModalView ? "font-bold text-lg" : "font-extrabold text-4xl"
            }`}
          >
            {product.name}
          </span>
          {isModalView ? (
            <div className="flex items-center justify-between gap-5 font-bold ml-20">
              <button
                className="bg-green-600 px-2 text-lg rounded-[5px]"
                onClick={() => updateCartItemQuantity(itemId, 1)}
                data-testid="cart-item-amount-increase"
              >
                +
              </button>
              <span data-testid="cart-item-amount">{itemQuantity}</span>
              <button
                className="bg-green-600 px-2 text-lg rounded-[5px]"
                onClick={() => updateCartItemQuantity(itemId, -1)}
                data-testid="cart-item-amount-decrease"
              >
                -
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className={`${isModalView ? "flex justify-between" : "flex "} ${
            product.inStock ? "" : " opacity-60"
          }`}
        >
          <div className={!isModalView ? "flex flex-col gap-4" : ""}>
            {isModalView && (
              <div className="my-2 font-bold text-green-2">{totalPrice}</div>
            )}

            {product.attributes?.map((attributeSet) => (
              <div
                key={attributeSet.id}
                className="mt-4"
                data-testid={`${
                  isModalView ? "cart-item" : "product"
                }-attribute-${attributeSet.name?.replace(/\s+/g, "-")}`}
              >
                <h3
                  className={`${
                    isModalView
                      ? "font-semibold font-sm"
                      : "font-bold uppercase"
                  } capitalize mb-1`}
                >
                  {attributeSet.name}:
                </h3>

                <div
                  className={`${
                    isModalView ? "gap-x-2" : "gap-x-3"
                  } flex flex-wrap gap-y-2`}
                >
                  {attributeSet.items.map((attribute) =>
                    attributeSet.type?.toLowerCase() === "swatch" &&
                    attributeSet.name?.toLowerCase() === "color" ? (
                      <button
                        type="button"
                        key={attribute.id}
                        className={`relative ${
                          isModalView ? "w-5 h-5" : "w-8 h-8"
                        } ${
                          this.isAttributeValueSelected(attribute)
                            ? "border-primary"
                            : "border-white"
                        } border ${
                          product.inStock ? "hover:border-primary" : ""
                        } transition-colors`}
                        style={{ backgroundColor: attribute.value }}
                        title={attribute.display_value}
                        onClick={() => this.handleAttributeClick(attribute)}
                        disabled={!product.inStock}
                        data-testid={`${
                          isModalView ? "cart-item" : "product"
                        }-attribute-${attributeSet.name?.replace(
                          /\s+/g,
                          "-"
                        )}-${
                          isModalView
                            ? attribute.display_value?.replace(/\s+/g, "-")
                            : attribute.value
                        }${
                          this.isAttributeValueSelected(attribute) &&
                          isModalView
                            ? "-selected"
                            : ""
                        }`}
                      >
                        <div className="absolute inset-0 border border-gray-200"></div>
                      </button>
                    ) : (
                      <button
                        type="button"
                        key={attribute.id}
                        className={`${
                          isModalView
                            ? "min:w-6 min:h-6 text-sm"
                            : "min:w-20 min:h-10"
                        } ${
                          this.isAttributeValueSelected(attribute)
                            ? "bg-green-500 text-white"
                            : "bg-white"
                        } px-1 flex items-center justify-center transition-colors border ${
                          product.inStock
                            ? "hover:bg-green-600 hover:text-light-1 font-semibold border-green-600 rounded-lg py-2 px-5"
                            : ""
                        } border-gray-800`}
                        disabled={!product.inStock}
                        onClick={() => this.handleAttributeClick(attribute)}
                        data-testid={`${
                          isModalView ? "cart-item" : "product"
                        }-attribute-${attributeSet.name?.replace(
                          /\s+/g,
                          "-"
                        )}-${attribute.display_value?.replace(/\s+/g, "-")}${
                          this.isAttributeValueSelected(attribute)
                            ? "-selected"
                            : ""
                        }`}
                      >
                        {attribute.display_value}
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}

            {!isModalView && (
              <span>
                <p className=" body-bold capitalize font-roboto">Price:</p>
                <div className=" text-xl font-bold flex gap-2 font-mono">
                  {product.prices && product.prices.length > 0 && (
                    <>
                      <span className="text-green-2">
                        {product.prices[0]?.currency.symbol}
                      </span>
                      <span>{product.prices[0]?.amount}</span>
                    </>
                  )}
                </div>
              </span>
            )}

            {!isModalView && product.inStock && (
              <button
                type="button"
                className="py-2 w-96 rounded-lg bg-green-500 text-light-1 font-bold text-lg"
                onClick={this.handleAddToCart}
                disabled={
                  product.attributes.length !==
                  this.state.selectedAttributes?.length
                }
                data-testid="add-to-cart"
              >
                Add to Cart
              </button>
            )}

            {!isModalView && (
              <div className="flex flex-col gap-2">
                <p className="body-bold">Description</p>
                <div
                  className="text-sm font-semibold font-roboto"
                  data-testid="product-description"
                >
                  {product.description}
                </div>
              </div>
            )}
          </div>
          {isModalView ? (
            <div className="w-[40%] h-[60%]">
              <img
                src={productImage}
                alt={product.name}
                className="object-contain rounded-xl"
              />
            </div>
          ) : (
            ""
          )}
        </div>
        {isModalView && (
          <div className="border-b-2 border-green-2 w-1/2 self-center opacity-20 my-2"></div>
        )}
      </div>
    );
  }
}

ProductAttributes.propTypes = {
  product: PropTypes.object.isRequired,
  isModalView: PropTypes.bool,
  itemSelectedAttributes: PropTypes.array,
  itemId: PropTypes.string,
  itemQuantity: PropTypes.number,
  productImage: PropTypes.string,
  cart: PropTypes.object,
};
export default withCart(ProductAttributes);