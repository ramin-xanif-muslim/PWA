import React, { useEffect, useState } from "react";
import Document from "./Document";

function DocumentList({ list, from, fetchData }) {
    const [isShowButton, setIsShowButton] = useState(true)
    const [page, setPage] = useState(1)
    const getMore = () => {
        fetchData(page)
        setPage(page + 1)
    }
    console.log(list)
    return (
        <div className="demands_wrapper">
            {list
                ? list.map((item, index) => {
                      return (
                          <Document
                              key={item.Id}
                              item={item}
                              index={index + 1}
                              from={from}
                          />
                      );
                  })
                : ""}
                {isShowButton && <button onClick={getMore}>Daha çox məhsul</button>}
        </div>
    );
}

export default DocumentList;
