import react from "react";
import { Pagination } from "react-bootstrap";

const generatePagination = (props) => {
  let arr = [];
  for (let number = 1; number <= props.count; number++) {
    arr.push(
      <Pagination.Item
        key={number}
        active={number === props.page}
        onClick={() => props.onChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return arr;
};
export const PaginationCustom = (props) => {
  const items = generatePagination(props);
  return <Pagination>{items}</Pagination>;
};
