import React, {useEffect, useState} from 'react'
import { Redirect } from 'react-router';
import MyLoading from '../components/UI/loading/MyLoading';
import sendRequest from '../confiq/sentRequest';

function withLoading(Component, url) {

    return (props) => {

        const [isLoading, setIsLoading] = useState(false)
        const [data, setData] = useState(null)
      
        useEffect(() => {
          setIsLoading(true)
          async function fetchData() {
            const res = await sendRequest(`${url}/get.php`,{})
            setData(res)
            setIsLoading(false)
          }
          fetchData();
        }, []); 
      
        if(isLoading) {
          return <div>
            <h1>Loading...</h1>
            <MyLoading />
          </div>
        }
        if(data && data.props) {
          return <Redirect to='login'/>
        }
        return <Component {...props} data={data} />
    }
}

export default withLoading
