import React from 'react'

function DemandsFooter(props) {
    return (
        <div className="document-footer">
            <div className="text">
                <p className="amount">Məbləğ</p>
                <p className="profit">Qazanc</p>
            </div>
            <div className="create-button">
                <button onClick={props.handleClickOnPlusBtn}>
                    <p>+</p>
                </button>
            </div>
            <div className="number">
                <p className="amount">
                    {props.data ? props.data.AllProfit.toFixed(2) : 0}
                </p>
                <p className="profit">
                    {props.data ? props.data.AllSum.toFixed(2) : 0}
                </p>
            </div>
        </div>
    )
}

export default DemandsFooter
