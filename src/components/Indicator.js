import React from "react";


export default function Indicator(props) {
    console.log(props.data.cards)
    const {
      CashesBalance,
      LastCashesBalance,
      LastProfit,
      LastSales,
      LastSalesCount,
      LastStockBalance,
      Profit,
      Sales,
      SalesCount,
      StockBalance,
    } = props.data.cards    
	return(
    <> 
        <div className="indicator">
            <div>
                <strong>SATIŞLAR</strong>
                <p>
                  Bu gün: {SalesCount}
                </p>
                <p>
                  Dünən: {LastSales}
                </p>
            </div>
        </div>
        <div className="indicator">
            <div>
                <strong>MALİYYƏ</strong>
                <p>
                  Balans: {CashesBalance} ₼
                </p>
                <p>
                  Kassalar:: {CashesBalance}
                </p>
            </div>
        </div>
        <div className="indicator">
            <div>
                <strong>ANBAR QALIĞI</strong>
                <p>
                  Maya: {}
                </p>
                <p>
                  Miqdar:: {}
                </p>
            </div>
        </div>
        <div className="indicator">
            <div>
                <strong>GƏLİR</strong>
                <p>
                  Bu gün: {}
                </p>
                <p>
                  Dünən: {}
                </p>
            </div>
        </div>
    </>
	)
  }