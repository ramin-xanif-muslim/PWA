import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../config/context';

function Document(props) {
    const { item, index, from } = props
	const { getDocumentsItem, putBarckTo } = useGlobalContext();
	const { CustomerName, Name, Amount, Moment } = item;

	const onClick = () => {
		getDocumentsItem(item);
        putBarckTo(from)
	};

    if(from === "products") { return <DocumentForProduct { ...props} onClick={onClick} />}
    if(from === "stockbalance") { return <DocumentForStockbalance { ...props} onClick={onClick} />}
    if(from === "customers" || from === "salepoints") { return <DocumentForCustomers { ...props} onClick={onClick} />}

	return (
		<Link key={Name} to="/document" style={{ color: "inherit" }}>
			<div className="demand" onClick={onClick}>
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
};

export default Document

const DocumentForProduct = ({ item, index, from, onClick }) => {
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
                        <div>
                            <p className="no">№{BarCode}</p>
                        </div>
                    </div>
                    <div className="demand-price">
                        <p className="amount">
                            {Price ? Price.toFixed(2) : 0}
                            <sub>₼</sub>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
const DocumentForStockbalance = ({ item, index, from, onClick }) => {
    const { BarCode, ProductName, Price, Moment, OwnerId } = item;
    return (
        <Link key={OwnerId} to="/document" style={{ color: "inherit" }}>
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
                        <p className="amount">
                            {Price ? Number(Price).toFixed(2) : 0}
                            <sub>₼</sub>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
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
}
