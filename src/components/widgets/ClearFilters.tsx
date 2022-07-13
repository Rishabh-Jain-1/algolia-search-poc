import { connectCurrentRefinements } from "react-instantsearch-dom";

const ClearFilters = ({ items, refine }: any) => (
  <>
    {!items.length ? null : (
      <button
        className="btn btn-sm btn-primary"
        onClick={() => refine(items)}
        disabled={!items.length}
      >
        Clear Filters
      </button>
    )}
  </>
);

export default connectCurrentRefinements(ClearFilters);
