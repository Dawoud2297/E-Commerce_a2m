import { useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_ONE_PRODUCT } from "../../graphql/queries";
import { useEffect, useState } from "react";
import ProductAttributes from "../../components/ProductAttributes";
import ProductImages from "../../components/ProductImages";
import Loading from "../../components/shared/Loading";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  

  

  const [fetchProduct] = useLazyQuery(GET_ONE_PRODUCT, {
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
    onCompleted: (data) => setProduct(data.product),
  });

  useEffect(() => {
    fetchProduct({ variables: { id } });
  }, [fetchProduct, id]);

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
          <ProductAttributes product={product}/>
        </main>
      ) : (
        <Loading/>
      )}
    </div>
  );
};

export default ProductDetails;
