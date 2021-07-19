import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "./../../components/MessageBox";
import {
  createProductAction,
  deleteProductAction,
  listProducts,
} from "../../redux/actions/productActions";
import CONSTANTS from "../../redux/constants/allConstance";
function ProductList(props) {
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  useEffect(() => {
    if (successCreate) {
      dispatch({
        type: CONSTANTS.product.PRODUCT_CREATE_RESET,
      });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: CONSTANTS.product.PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [dispatch, successCreate, createdProduct, props.history, successDelete]);

  const deleteHandler = (product) => {
    //todo
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductAction(product._id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProductAction());
  };
  return (
    <div>
      <div className="row">
        <h1>Products </h1>
        <button
          type="button"
          className="primary"
          onClick={() => createProductHandler()}
        >
          Create Product
        </button>
      </div>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>COUNT</th>
              <th>REVIEWS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => [
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.countInStock}</td>
                <td>{product.numReviewes}</td>
                <td>
                  <button
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                    type="button"
                    className="small"
                  >
                    Eddit
                  </button>

                  <button
                    className="small"
                    type="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>,
            ])}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;
