import React from "react";
import Document from "./Document";

function DocumentList({ list, from }) {
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
        </div>
    );
}

export default DocumentList;
