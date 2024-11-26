import { Component } from "react";
import withGraphql from "../../HOCs/withGraphql";
import PropTypes from "prop-types";
import ProductImages from "../../components/ProductImages";
import ProductAttributes from "../../components/ProductAttributes";
import Loading from "../../components/shared/Loading";
import { GET_ONE_PRODUCT } from "../../graphql/queries";

class ProductDetails extends Component {
  render() {
    const product = this.props.data?.product;

    return (
      <div>
        {product ? (
          <main
            className="relative h-full mt-14 flex justify-around items-center gap-5 mb-10"
            data-testid={`product-${product.name
              ?.replace(/\s+/g, "-")
              .toLowerCase()}`}
          >
            <ProductImages gallery={product?.gallery} />
            <ProductAttributes product={product} />
          </main>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  data: PropTypes.object,
};

export default withGraphql(ProductDetails,"query",GET_ONE_PRODUCT,"one");
