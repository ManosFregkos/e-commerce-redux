import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/products/products.actions";
import Product from "./Product";
import "./styles.scss";

export default function ProductResults() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productsData.products);
  useEffect(() => {
    dispatch(fetchProductsStart());
  });

  if (Array.isArray(products)) return null;

  if (products.length < 1) {
    return (
      <div className="products">
        <p>No Search Results</p>
      </div>
    );
  }
  return (
    <div className="products">
      <h1>Browse Products</h1>
      <div className="productResults">
        {products.map((product, idx) => {
          const { productThumbnail, productName, productPrice } = product;
          if (
            !productName ||
            !productThumbnail ||
            typeof productPrice !== "undefined"
          )
            return null;

          const configProduct = { productThumbnail, productName, productPrice };
          return <Product {...configProduct} />;
        })}
      </div>
    </div>
  );
}
