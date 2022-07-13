import algoliasearch from "algoliasearch";
import {
  Configure,
  CurrentRefinements,
  Highlight,
  Hits,
  HitsPerPage,
  InstantSearch,
  Pagination,
  Panel,
  RangeInput,
  RefinementList,
  SortBy,
  Stats,
} from "react-instantsearch-dom";

import CustomHit from "../Hit";
import CustomAutoComplete from "./AutoComplete";
import NotFound from "../widgets/NotFound";
import ClearFilters from "../widgets/ClearFilters";
import HitComponent from "../HitComponent";
import { useEffect } from "react";
import { dataObj } from "../../constants/mockData";

//init client
const client = algoliasearch(
  process.env.REACT_APP_APP_ID as string,
  process.env.REACT_APP_ADMIN_API_KEY as string
);

//init index
export const index = client.initIndex("dev_index");

const Search = () => {
  // useEffect(() => {
  // //  push data to algolia collection
  //   index.saveObjects(dataObj).then(() => {
  //     console.log("success");
  //   });

  // //  creating replicas of collection
  //   index
  //     .setSettings({
  //       replicas: ["dev_index_price_desc", "dev_index_price_asc"],
  //     })
  //     .then(() => {
  //       console.log("success");
  //     });
  // }, [index]);

  //To update any object partially
  // useEffect(() => {
  //   const objects = [
  //     {
  //       name: "Amazon - Fire TV Stick",
  //       objectID: "9999119",
  //     },
  //   ];

  //   index.partialUpdateObjects(objects).then(({ objectIDs }) => {
  //     console.log(objectIDs);
  //   });
  // }, []);

  const desc_index = client.initIndex("dev_index_price_desc");

  //categories on a select group of attributes,
  index.setSettings({
    attributesForFaceting: [
      "brand",
      "price",
      "hierarchicalCategories",
      "searchable(brand)",
      "categories",
    ],
  });

  desc_index.setSettings({
    attributesForFaceting: [
      "brand",
      "price",
      "hierarchicalCategories",
      "searchable(brand)",
      "categories",
    ],
    ranking: ["desc(price)"],
  });

  return (
    <div className="container mt-4 mb-5">
      <InstantSearch indexName="dev_index" searchClient={client}>
        {/* <Configure clickAnalytics /> */}
        <div className="container">
          <CustomAutoComplete />
          <div className="row">
            <div className="col-md-3">
              <div className="container">
                <h2>Filters</h2>
                <Panel header="Category">
                  {/* widget that lets users filter the dataset using multi-select facets */}
                  <RefinementList attribute="categories" />
                </Panel>
                <br />
                <Panel header="Brands">
                  <RefinementList
                    attribute="brand"
                    // searchable={true}
                    translations={{
                      placeholder: "Search for brands…",
                    }}
                  />
                </Panel>
                <br />
                <Panel header="Price">
                  <RangeInput
                    attribute="price"
                    translations={{
                      submit: "Submit",
                      separator: "-",
                    }}
                  />
                </Panel>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-4">
                  <Stats />
                </div>
                <div className="col-md-4">
                  <SortBy
                    defaultRefinement="dev_index"
                    items={[
                      { value: "dev_index", label: "Relevent" },
                      { value: "dev_index_price_desc", label: "Price desc." },
                    ]}
                  />
                </div>
              </div>
              <ClearFilters />
              <CurrentRefinements />
              <div>
                {/* hit widget that lets you display a list of results */}
                {/* <Hits hitComponent={HitComponent} /> */}
                <CustomHit />
                <NotFound />
              </div>
              <div className="d-flex justify-content-center">
                <Pagination
                  padding={2}
                  showFirst={true}
                  showLast={true}
                  translations={{
                    previous: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                      >
                        <g
                          fill="none"
                          fillRule="evenodd"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.143"
                        >
                          <path d="M9 5H1M5 9L1 5l4-4" />
                        </g>
                      </svg>
                    ),
                    next: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                      >
                        <g
                          fill="none"
                          fillRule="evenodd"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.143"
                        >
                          <path d="M1 5h8M5 9l4-4-4-4" />
                        </g>
                      </svg>
                    ),
                  }}
                />
              </div>
              <div className="d-flex justify-content-center">
                <HitsPerPage
                  items={[
                    {
                      label: "9 hits per page",
                      value: 9,
                    },
                    {
                      label: "18 hits per page",
                      value: 18,
                    },
                    {
                      label: "27 hits per page",
                      value: 27,
                    },
                  ]}
                  defaultRefinement={9}
                />
              </div>
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

export default Search;
