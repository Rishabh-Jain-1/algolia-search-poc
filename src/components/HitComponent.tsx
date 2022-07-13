import { Highlight } from "react-instantsearch-dom";
import { Link } from "react-router-dom";

const HitComponent = ({ hit }: any) => {
  return (
    <div className="mb-3">
      <div className="card ">
        <div className="row">
          <div className="col-md-3">
            <img
              alt="product"
              height={"150"}
              width={"100%"}
              src={hit.image}
              style={{ objectFit: "contain" }}
            ></img>
          </div>
          <div className="col-md-7">
            <div className="card-body ">
              <h6>
                <Highlight attribute="name" hit={hit} />
              </h6>
              <p>
                {hit.description.length > 100
                  ? hit.description.slice(0, 100) + "..."
                  : hit.description}
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between">
            <Link to={hit.objectID}>View</Link>
            <div>{`Price : $${hit.price}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HitComponent;
