import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../config/context';
import sendRequest from '../config/sentRequest';
import { ConvertFixedTable } from '../functions/indexs'


const Debt = ({ isNew }) => {

	const { documentsItem, hideFooter } = useGlobalContext();

	const [debt, setDebt] = useState();

	useEffect(async () => {
        if(!isNew) {
            let obj = { id: documentsItem && documentsItem.CustomerId };
            let res = await sendRequest("customers/getdata.php", obj);
            setDebt(res.Debt);
        } 
	}, []);

    return (
        <div className="debt">
            <p>
                Qalıq borc:
                <strong>
                    {ConvertFixedTable(debt)} <sub>₼</sub>
                </strong>
            </p>
        </div>
    )
}

export default Debt
