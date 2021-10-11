import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { fetchProductsStart } from "../../redux/products/products.actions";
import FormSelect from "../Forms/FormSelect";
import Product from "./Product";
import "./styles.scss";

export default function ProductResults() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();

  const products = useSelector((state) => state.productsData.products);
  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType, dispatch]);

  const handleFilter = (e) => {
    const nextEvent = e.target.value;
    history.push(`/search/${nextEvent}`);
  };

  if (Array.isArray(products)) return null;

  if (products.length < 1) {
    return (
      <div className="products">
        <p>No Search Results</p>
      </div>
    );
  }

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Mens",
        value: "mens",
      },
      {
        name: "Womens",
        value: "womens",
      },
    ],
    handleChane: handleFilter,
  };
  return (
    <div className="products">
      <h1>Browse Products</h1>
      <FormSelect {...configFilters} />
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
