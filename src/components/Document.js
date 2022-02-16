import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../config/context";
import { ConvertFixedTable } from "../functions/index";

function Document(props) {
    const { item, index, from } = props;
    const { getDocumentsItem, putFrom } = useGlobalContext();
    const { CustomerName, Name, Amount, Moment, Id, Status } = item;
    const [isPermmision, setIPermision] = useState(false)
    const permission = ['supplies','supplyreturns','demands','demandreturns','enters','losses']

    useEffect(() => {
        let isLink = permission.includes(from)
        setIPermision(isLink)
    },[from])
    const onClick = () => {
        getDocumentsItem(item);
        putFrom(from);
    };

    if (from === "products") {
        return <DocumentForProduct {...props} onClick={onClick} />;
    }
    if (from === "stockbalance") {
        return <DocumentForStockbalance {...props} onClick={onClick} />;
    }
    if (from === "customers" || from === "salepoints") {
        return <DocumentForCustomers {...props} onClick={onClick} />;
    }

    return (
        <Link key={Id} to={isPermmision ? "/document" : `/${from}`} style={{ color: "inherit" }}>
            <div className={Status === 1 ? 'demand' : 'demand demand-deactive'} onClick={onClick}>
                <div className="index">
                    <p>{index}</p>
                </div>
                <hr></hr>
                <div className="demand-inner">
                    <div className="demand-text">
                        <p className="name">{CustomerName}</p>
                        <div>
                            <p className="moment">{Moment}</p>
                            <p className="no">№{Name}</p>
                        </div>
                    </div>
                    <div className="demand-price">
                        <p className="amount">
                            {Math.round(Amount * 100) / 100}
                            <sub>₼</sub>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Document;

const DocumentForProduct = ({ item, index, from, onClick }) => {
    const { BarCode, Name, Price, Moment, OwnerId } = item;
    return (
        <Link key={OwnerId} to="/document_product" style={{ color: "inherit" }}>
            <div className="demand" onClick={onClick}>
                <div className="index">
                    <p>{index}</p>
                </div>
                <hr></hr>
                <div className="demand-inner">
                    <div className="demand-text">
                        <p className="name">{Name}</p>
                        <div>
                            <p className="no">№{BarCode}</p>
                        </div>
                    </div>
                    <div className="demand-price">
                        <p className="amount">
                            {Price ? ConvertFixedTable(Price) : 0}
                            <sub>₼</sub>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};
const DocumentForStockbalance = ({ item, index, from, onClick }) => {
    const { BarCode, ProductName, Quantity, Moment, OwnerId } = item;
    return (
        // <Link key={OwnerId} to="/document" style={{ color: "inherit" }}>
        <div className="demand" onClick={onClick}>
            <div className="index">
                <p>{index}</p>
            </div>
            <hr></hr>
            <div className="demand-inner">
                <div className="demand-text">
                    <p className="name">{ProductName}</p>
                    <div>
                        <p className="no">№{BarCode}</p>
                    </div>
                </div>
                <div className="demand-price">
                    <p className="amount">Qalıq </p>
                    <p className="amount">{ConvertFixedTable(Quantity)}</p>
                </div>
            </div>
        </div>
        // </Link>
    );
};
const DocumentForCustomers = ({ item, index, from, onClick }) => {
    const { BarCode, Name, Price, Moment, OwnerId } = item;
    return (
        <Link key={OwnerId} to="/document" style={{ color: "inherit" }}>
            <div className="demand" onClick={onClick}>
                <div className="index">
                    <p>{index}</p>
                </div>
                <hr></hr>
                <div className="demand-inner">
                    <div className="demand-text">
                        <p className="name">{Name}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};
