import { connectStateResults } from "react-instantsearch-dom";

const NotFound = ({ searchResults }: any) => {
  if (!searchResults || searchResults.nbHits > 0) {
    return null;
  }
  return (
    <div className="text-center">
      <p>Aw snap! No search results were found.</p>
    </div>
  );
};

export default connectStateResults(NotFound);
