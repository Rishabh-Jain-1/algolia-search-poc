import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RelatedProducts } from "@algolia/recommend-react";
import recommend from "@algolia/recommend";
import { index } from "../search";

function RelatedItem({ item }: any) {
  return (
    <div className="row">
      <div className="mb-3">
        <div className="card">
          <div className="card-body">
            <img
              alt="product"
              height={"150"}
              width={"100%"}
              src={item.image}
              style={{ objectFit: "contain" }}
            ></img>
            <p className="short-descrtiption">{item.description}</p>
          </div>
          <div className="card-footer d-flex justify-content-between">
            {item.price}
          </div>
        </div>
      </div>
    </div>
  );
}

const Product = () => {
  const { id } = useParams<any>();

  const [product, setProduct] = useState<any>(null);

  const recommendClient = recommend(
    process.env.REACT_APP_APP_ID as string,
    process.env.REACT_APP_ADMIN_API_KEY as string
  );

  useEffect(() => {
    index.getObject(id).then((object) => {
      setProduct(object);
    });
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          {product && (
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <img
                      alt="product"
                      height={150}
                      width={"100%"}
                      src={product.image}
                      style={{ objectFit: "contain" }}
                    ></img>
                  </div>
                  <div className="col-md-6">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="card">
                      <div className="card-body">
                        <h4>Price : ${product.price}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Highlight attribute="name" hit={element.hit} /> */}
              </div>
            </div>
          )}
        </div>
        <div
          className="col-md-4"
          style={{ maxHeight: "500px", overflowY: "scroll" }}
        >
          <RelatedProducts
            recommendClient={recommendClient}
            indexName={"dev_index"}
            objectIDs={[id]}
            itemComponent={RelatedItem}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
