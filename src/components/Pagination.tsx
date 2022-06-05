import { SetStateAction, useEffect, useState } from "react";
import { usePagination, DOTS } from "../hooks/usePagination";
import "./Pagination.css";

interface Props {
  onPageChange: React.Dispatch<SetStateAction<number>>;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  last: number;
}
const Pagination = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 4,
    currentPage,
    pageSize,
    last,
  } = props;

  const [pagination, setPagination] = useState({
    totalCount: 0,
    currentPage: 0,
    pageSize: 0,
    last: 0,
  });

  useEffect(() => {
    return setPagination({
      totalCount: totalCount,
      currentPage: currentPage,
      pageSize: pageSize,
      last: last,
    });
  }, [last, totalCount, currentPage, pageSize]);

  const paginationRange = usePagination({
    currentPage: pagination.currentPage,
    totalCount: pagination.totalCount,
    siblingCount,
    pageSize: pagination.pageSize,
  });

  if (pagination.currentPage === 0 || !paginationRange?.length) {
    return null;
  }

  const onNext = () => {
    onPageChange(pagination.currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(pagination.currentPage - 1);
  };

  return (
    <div className="flex flex-col  items-start my-6 px-5">
      <ul className="hidden md:flex text-gray-700 w-96">
        <div className="h-8 w-8 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
          <button
            className="hover:border-0"
            disabled={pagination.currentPage === 1}
            onClick={onPrevious}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-left w-4 h-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
        <div className="flex h-8 font-medium rounded-full px-6 bg-gray-200">
          {paginationRange?.map((pageNumber, index) => (
            <li
              key={index}
              className={
                (pagination.currentPage === pageNumber
                  ? "bg-blue-400 text-white"
                  : "") +
                " w-8 md:flex justify-center items-center hidden  cursor-pointer leading-4 transition duration-150 ease-in  rounded-full"
              }
              onClick={() =>
                pageNumber !== DOTS && onPageChange(Number(pageNumber))
              }
            >
              {pageNumber}
            </li>
          ))}
        </div>
        <div className="h-8 w-8 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
          <button disabled={pagination.currentPage === last} onClick={onNext}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-right w-4 h-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </ul>
      <div className="flex md:hidden">
        <button
          disabled={pagination.currentPage === 1}
          onClick={onPrevious}
          className="bg-blue-400 text-white font-semibold text-sm rounded py-2 px-8"
        >
          Prev
        </button>
        <button
          disabled={pagination.currentPage === last}
          onClick={onNext}
          className="bg-blue-400 text-white font-semibold text-sm rounded py-2 ml-6 px-8"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
