import css from "./Pagination.module.css"
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import { useState, type ComponentType } from "react";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  totalPages: number,
  getPage: (page: number) => void
}

export default function Pagination({ totalPages, getPage }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1)


  const handlePageChange = ({ selected }: { selected: number }) => {
    const nextPage = selected + 1
    setCurrentPage(nextPage)
    getPage(nextPage)
    console.log(currentPage);
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
      />
  )
}