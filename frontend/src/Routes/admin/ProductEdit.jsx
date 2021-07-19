import React, { useEffect, useState } from "react";
import LoadingBox from "../../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../components/MessageBox";
import {
  detailsProduct,
  updateProductAction,
} from "../../redux/actions/productActions";
import { useParams } from "react-router-dom";
import CONSTANTS from "../../redux/constants/allConstance";
import axios from "axios";
function ProductEdit(props) {
  //   const productId = props.params.Id;

  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productList");
    }
  }, [dispatch, successUpdate, props.history]);
  useEffect(() => {
    if (!product || product._id !== id || successUpdate) {
      dispatch({ type: CONSTANTS.product.PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [dispatch, setName, id, product]);
  const submitHadler = (e) => {
    e.preventDefault();
    dispatch(
      updateProductAction({
        _id: product._id,
        name,
        price,
        image,
        category,
        countInStock,
        brand,
        description,
      })
    );
  };
  const [loadingUpload, SetLoadingUpload] = useState(false);

  const [errorUpload, setErrorUpload] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    SetLoadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      SetLoadingUpload(false);
    } catch (error) {
      SetLoadingUpload(false);
      setErrorUpload(error.message);
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHadler}>
        <div>
          <h1>Edit Product: {id}</h1>
        </div>

        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                defaultValue={name}
                id="name"
                type="text"
                placeholder="enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                defaultValue={price}
                id="price"
                type="number"
                placeholder="enter Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                defaultValue={image}
                id="image"
                type="text"
                placeholder="set Image"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                id="imageFile"
                label="Choose Image File"
                type="file"
                onChange={uploadFileHandler}
              />
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                defaultValue={category}
                id="category"
                type="text"
                placeholder="set Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                defaultValue={brand}
                id="brand"
                type="text"
                placeholder="set brand"
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="count">Count in stock</label>
              <input
                defaultValue={countInStock}
                id="count"
                type="number"
                placeholder="Count"
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="des">Description</label>
              <textarea
                defaultValue={description}
                id="des"
                rows="3"
                type="text"
                placeholder="enter description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className="primary block" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ProductEdit;
