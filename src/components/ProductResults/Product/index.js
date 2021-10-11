import React from "react";
import Button from "../../Forms/Button";

export default function Product({
  productThumbnail,
  productName,
  productPrice,
}) {
  if (!productName || !productThumbnail || typeof productPrice !== "undefined")
    return null;

  const configAddToCart = {
    type: "button",
  };
  return (
    <div className="product">
      <div className="thumb">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="details">
        <ul>
          <li>
            <span className="name">{productName}</span>
          </li>
          <li>
            <span className="price">${productPrice}</span>
          </li>
          <li>
            <div className="addtocart">
              <Button {...configAddToCart}>Add to Cart </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
