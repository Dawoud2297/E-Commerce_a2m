import { useEffect, useState } from "react";
import Header from "../components/shared/Header";
import { Outlet, useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import Loading from "../components/shared/Loading";

const RootLayout = () => {
  const [products, setProducts] = useState([]);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  

  const [fetchProducts, { loading }] = useLazyQuery(GET_PRODUCTS, {
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
    onCompleted: (data) => setProducts(data),
  });
  const { category } = useParams();

  useEffect(() => {
    fetchProducts({ variables: { category } });
  }, [category, fetchProducts]);

  useEffect(() => {
    if (showSplashScreen) {
      const splashScreenTimer = setTimeout(
        () => setShowSplashScreen(false),
        3000
      );
      return () => clearTimeout(splashScreenTimer);
    }
  }, [showSplashScreen]);

  if (showSplashScreen) {
    return <Loading intro={true} />;
  }

  return (
    <div>
      <Header
        fetchProducts={fetchProducts}
        loading={loading}
      />
      {loading ? (
        <Loading />
      ) : (
        <main className="h-full mt-14">
          <Outlet context={{ products: products?.products }} />
        </main>
      )}
    </div>
  );
};

export default RootLayout;
