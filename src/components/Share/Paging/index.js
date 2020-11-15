import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";

const Paging = ({ currentPage, countPage, setRequestedPage }) => {
  const [pagePreviousValue, setPagePreviousValue] = useState(null);
  const page1Value = "1";
  const [page2Value, setPage2Value] = useState(null);
  const [page3Value, setPage3Value] = useState(null);
  const [page4Value, setPage4Value] = useState(null);
  const [page5Value, setPage5Value] = useState(null);
  const [page6Value, setPage6Value] = useState(null);
  const [page7Value, setPage7Value] = useState(null);
  const [page8Value, setPage8Value] = useState(null);
  const [pageNextValue, setPageNextValue] = useState(null);

  useEffect(() => {
    const nbPages = Number(countPage) || 1;
    const crtPage = Number(currentPage) || 1;
    let ecart = 0;
    if (nbPages > crtPage) {
      ecart = nbPages - crtPage > 1 ? 2 : 1;
    }
    if (crtPage >= 6) {
      setPage2Value("...");
      setPage3Value(crtPage + ecart - 4);
      setPage4Value(crtPage + ecart - 3);
      setPage5Value(crtPage + ecart - 2);
      setPage6Value(crtPage + ecart - 1);
      setPage7Value(crtPage + ecart);
      setPage8Value(nbPages - crtPage > 2 ? "..." : null);
    } else {
      setPage2Value(crtPage === 2 || crtPage + ecart >= 2 ? 2 : null);
      setPage3Value(crtPage === 3 || crtPage + ecart >= 3 ? 3 : null);
      setPage4Value(crtPage === 4 || crtPage + ecart >= 4 ? 4 : null);
      setPage5Value(crtPage === 5 || crtPage + ecart >= 5 ? 5 : null);
      setPage6Value(crtPage === 6 || crtPage + ecart >= 6 ? 6 : null);
      setPage7Value(crtPage === 7 || crtPage + ecart >= 7 ? 7 : null);
      setPage8Value(nbPages > 7 ? "..." : null);
    }
    setPagePreviousValue(crtPage > 1 ? crtPage - 1 : null);
    setPageNextValue(nbPages > crtPage ? crtPage + 1 : null);
  }, [currentPage, countPage, setRequestedPage]);

  return (
    <div className="paging">
      <div>
        {pagePreviousValue && (
          <div
            className="page"
            onClick={() => {
              Number(pagePreviousValue) &&
                setRequestedPage(Number(pagePreviousValue));
            }}
          >
            <FontAwesomeIcon icon={faLessThan} />
          </div>
        )}
        {page1Value && (
          <div
            className={
              Number(currentPage) === Number(page1Value)
                ? "page selected"
                : "page"
            }
            onClick={() => {
              setRequestedPage(page1Value);
            }}
          >
            {page1Value}
          </div>
        )}
        {page2Value && (
          <div
            className={
              Number(currentPage) === Number(page2Value)
                ? "page selected"
                : "page"
            }
            onClick={() => {
              Number(page2Value) && setRequestedPage(Number(page2Value));
            }}
          >
            {page2Value}
          </div>
        )}
        {page3Value && (
          <div
            className={
              Number(currentPage) === Number(page3Value)
                ? "page selected"
                : "page"
            }
            onClick={() => {
              Number(page3Value) && setRequestedPage(Number(page3Value));
            }}
          >
            {page3Value}
          </div>
        )}
        {page4Value && (
          <div
            className={
              Number(currentPage) === Number(page4Value)
                ? "page selected"
                : "page"
            }
            onClick={() => {
              Number(page4Value) && setRequestedPage(Number(page4Value));
            }}
          >
            {page4Value}
          </div>
        )}
        {page5Value && (
          <div
            className={
              Number(currentPage) === Number(page5Value)
                ? "page selected"
                : "page"
            }
            onClick={() => {
              Number(page5Value) && setRequestedPage(Number(page5Value));
            }}
          >
            {page5Value}
          </div>
        )}
        {page6Value && (
          <div
            className={
              Number(currentPage) === Number(page6Value)
                ? "page selected"
                : "page"
            }
            onClick={() => {
              Number(page6Value) && setRequestedPage(Number(page6Value));
            }}
          >
            {page6Value}
          </div>
        )}
        {page7Value && (
          <div
            className={
              Number(currentPage) === Number(page7Value)
                ? "page selected"
                : "page"
            }
            onClick={() => {
              Number(page7Value) && setRequestedPage(Number(page7Value));
            }}
          >
            {page7Value}
          </div>
        )}
        {page8Value && (
          <div
            className={
              Number(currentPage) === Number(page8Value)
                ? "page selected"
                : "page"
            }
            onClick={() => {
              Number(page8Value) && setRequestedPage(Number(page8Value));
            }}
          >
            {page8Value}
          </div>
        )}
      </div>
      {pageNextValue && (
        <div
          className="page"
          onClick={() => {
            Number(pageNextValue) && setRequestedPage(Number(pageNextValue));
          }}
        >
          <FontAwesomeIcon icon={faGreaterThan} />
        </div>
      )}
    </div>
  );
};

export default Paging;
