import React from "react";
import paginatorNext from "../static/paginatorNext.svg";
import { useAppDispatch } from "../lib/store/hooks";
import { setCurrentPage } from "../lib/store/ProductReducer";

type P = {
  currentPage: number
  perPage: number
  totalItems: number
}

export const Paginator: React.FC<P> = ({ currentPage, perPage, totalItems }) => {

  const dispatch = useAppDispatch();

  const [pageState, setPageState] = React.useState(currentPage);

  const pagesCount: number = Math.ceil(totalItems / perPage);
  const pages: string[] = [];

  if (pagesCount > 10) {
    if (currentPage > 5) {
      for (let i = currentPage - 4; i <= currentPage + 5; i++) {
        pages.push(`${i}`);
        if (i == pagesCount) break;
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        pages.push(`${i}`);
        if (i == pagesCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(`${i}`);
    }
  }

  if (pages[0] !== "1") pages.unshift("prev");

  if (pages[4] > "4") pages.push("next");

  React.useEffect(() => {
    dispatch(setCurrentPage(pageState));
  }, [pageState]);

  return <div className={"paginator-wrapper"}>
    {pages.map((page, i) => {
      if (page === "prev") {
        return <img
          key={i}
          onClick={() => setPageState(p => p - 1)}
          className={"paginator-page paginator-back"}
          src={paginatorNext}
          alt={""}
        />;
      }
      if (page === "next") {
        return <img
          key={i}
          onClick={() => setPageState(p => p + 1)}
          className={"paginator-page paginator-next"}
          src={paginatorNext}
          alt={""}
        />;
      }
      return <span
        key={i}
        onClick={() => setPageState(+page)}
        className={pageState === +page ? "paginator-active-page paginator-page" : "paginator-page"}
      >
        {page}
      </span>;
    })}
  </div>;
};