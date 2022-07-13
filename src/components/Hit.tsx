import { connectStateResults } from "react-instantsearch-dom";
import { Link } from "react-router-dom";

const CustomHit = ({ searchResults }: any) => {
  return (
    <div className="row mt-4">
      {searchResults?.hits.length > 0 &&
        searchResults?.hits.map((hit: any, index: number) => (
          <div className="col-md-4 mb-3">
            <div className="card" style={{ height: "100%" }}>
              <div className="card-header">
                <img
                  alt="product"
                  height={"150"}
                  width={"100%"}
                  src={hit.image}
                  style={{ objectFit: "contain" }}
                ></img>
              </div>
              <div className="card-body">
                <h6>{hit.name}</h6>
                <p>
                  {hit.description.length > 100
                    ? hit.description.slice(0, 100) + "..."
                    : hit.description}
                </p>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between">
                  <Link to={hit.objectID}>View</Link>
                  <div>{`Price : $${hit.price}`}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default connectStateResults(CustomHit);
