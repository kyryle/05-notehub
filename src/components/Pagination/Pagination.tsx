import css from "./Pagination.module.css"
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import { type ComponentType } from "react";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  totalPages: number,
  onPageChange: (page: number) => void
  forcePage: number
}

export default function Pagination({ totalPages, onPageChange, forcePage }: PaginationProps) {

// onPageChange={({ selected }) => setCurrentPage(selected + 1)}
  const handlePageChange = ({ selected }: { selected: number }) => {
    const nextPage = selected + 1
    onPageChange(nextPage)
  }
  
  

  return (
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        containerClassName={css.pagination}
        activeClassName={css.active}
        renderOnZeroPageCount={null}
        forcePage={forcePage}
      />
  )
}