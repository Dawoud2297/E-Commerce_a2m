import { useOutletContext } from "react-router-dom";
import ProductCard from "../../components/shared/ProductCard";

const Products = () => {
  const {products} = useOutletContext();
  
  console.log(products);
  

  return (
    <main>
      <div className="products-contaienr">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </main>
  );
};

export default Products;
