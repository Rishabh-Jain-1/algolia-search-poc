import React from "react";
import { connectAutoComplete } from "react-instantsearch-dom";

const AutoComplete = ({ hits, currentRefinement, refine }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "15px",
      }}
    >
      <div className="ais-SearchBox-form">
        <input
          id="product"
          list="products"
          type="search"
          className=""
          placeholder="Search Here..."
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />
      </div>
      <datalist id="products">
        {hits.length > 0 ? (
          hits.map((element: any) => (
            <>
              <option key={element.objectID}>{element.name}</option>

              <option disabled>_________</option>
            </>
          ))
        ) : (
          <option disabled>No Result Found</option>
        )}
      </datalist>
    </div>
  );
};

export default connectAutoComplete(AutoComplete);
