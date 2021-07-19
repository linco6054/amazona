import React, { useEffect } from "react";
import LoadingBox from "./../components/LoadingBox";
import { useDispatch } from "react-redux";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import { listProducts } from "../redux/actions/productActions";
import { useSelector } from "react-redux";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default HomeScreen;
