import { v4 as uuidv4 } from "uuid";
import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({ paginate, filteredMedia, itemsPerPage, currentPage }) => {
  return (
    <div className="layr-pagination">
    <BootstrapPagination>
      {Array.from({
        length: Math.ceil(filteredMedia.length / itemsPerPage),
      }).map((_, index) => (
        <BootstrapPagination.Item
          key={uuidv4()}
          active={currentPage === index + 1}
          onClick={() => paginate(index + 1)}
        >
          {index + 1}
        </BootstrapPagination.Item>
      ))}
    </BootstrapPagination>
    </div>
  );
};

export default Pagination;
