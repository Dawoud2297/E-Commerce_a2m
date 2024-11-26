import { Component } from "react";
import withGraphql from "../../HOCs/withGraphql";
import { GET_PRODUCTS } from "../../graphql/queries";
import ProductCard from "../../components/ProductCard";
import PropTypes from "prop-types";

class Products extends Component {
  render() {
    const { data } = this.props;

    return (
      <main>
        <div className="grid grid-cols-3 gap-10 justify-items-start pl-[3rem] pr-1 mb-5 w-auto">
          {data?.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    );
  }
}

Products.propTypes = {
  data: PropTypes.object,
};

export default withGraphql(Products,"query",GET_PRODUCTS);

