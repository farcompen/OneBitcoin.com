import { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_GLOBAL_URL;
const MarketNav=()=>{
    const[globalData,setGlobalData]=useState([{
        "coins_count":0,
        "total_mcap":0,
        "btc_d":0,
        "total_volume":0
    }]);
   
    useEffect(()=>{
        fetchGlobalData();
    },[])

    const fetchGlobalData = async()=>{
        const result = await fetch(apiUrl)
                            .then(res=>res.json())
          console.log("global result is ",result)                 
        setGlobalData(result.result);         
    }
    return(
        <>
        <header className="mb-2  px-9 shadow lg:block md:block lg:text-sm md:text-sm sm:text-xs xs:hidden  font-mono">
        <div class=" ml-36 font-semibold relative  flex max-w-screen-lg flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex">Cryptocurrencies: 
                    <h4 className="text-green-600 ml-1"> {globalData[0].coins_count}</h4>
                    </span>
                    <span className="flex ml-2">MarketCap: 
                    <h4 className="text-green-600 ml-1"> {(globalData[0].total_mcap/1000000000000).toFixed(2)}T</h4>
                    </span>
                   
                    <span className="flex ml-2">Total Volume: 
                    <h4 className="text-green-600 ml-1"> {(globalData[0].total_volume/1000000000).toFixed(2)} M</h4>
                    </span>
                    <span className="flex ml-2">BTC Dominance: 
                    <h4 className="text-green-600 ml-1">{globalData[0].btc_d}</h4>
                    </span>
                    <span className="flex ml-2">ETH Dominance: 
                    <h4 className="text-green-600 ml-1">{globalData[0].eth_d}</h4>
                    </span>
              
                

            </div>
        </header>
        </>
    )

}
export default MarketNav;