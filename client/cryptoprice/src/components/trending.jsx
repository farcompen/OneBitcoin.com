import { useEffect, useState } from "react";
import Navbar from "./navbar";
import MarketNav from "./marketNav";
import { FormatDollar } from "../utils/currencyFormatter";
import ChartComponent from "./chart";
const apiUrl = process.env.REACT_APP_LIVE_API_URL
const Trending = ()=>{
    const[trending,setTrending]=useState([])
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
      setLoading(true);
        fetchTrending();
    },[])

    const fetchTrending = async()=>{
        const result = await fetch(apiUrl)
                            .then(res=>res.json())
                 setTrending(result.result.data); 
                 setLoading(false);
                 console.log(result.result.data)

    }
    
    return(
        <>
        <Navbar/>
        <MarketNav/>
<p className="flex items-center justify-center"> Trending List</p>
        <div class=" flex items-center  justify-center px-4 sm:px-8">
        <div class="flex items-center justify-between pb-6">
          <div>
            {/* <h2 class="font-semibold text-gray-700">All Coins Table</h2>
            <span class="text-xs text-gray-500"></span> */}
          </div>
          <div class="flex items-center justify-between"></div>
        </div>
        <div class="overflow-y-hidden rounded-lg ">
          <div class="overflow-x-auto">
            <table class="border font-mono  ">
              <thead className="border ">
                <tr class="bg-slate-100 text-left lg:text-sm md:text-base sm:text-base xs:text-xs font-semibold  tracking-widest text-black-400 xs:text-left">
                  <th class="px-5 py-3  text-left">#</th>
                  <th class="px-5 py-3 text-left">Rank</th>
                  <th class="px-5 py-3 text-left">Coin</th>
                  <th class="px-5 py-3 text-left">Price</th>
                  <th
                    class="px-5 py-3 text-left"
                  
                  >
                    MarketCap
                  </th>
                  <th class="px-5 py-3 text-left">Favorites</th>
                  <th class="px-5 py-3 text-left">Daily</th>
                 
                </tr>
              </thead>
              <tbody class="text-black-400 lg:text-base md:text-base sm:text-base  xs:text-xs">
                {
                loading?(<div className="text-black-300">loading ...</div>):
               
                trending.map((coin, index) => (
                  <tr className="xs:text-left">
                    <td class="text-center border-b border-gray-100 bg-white px-0 py-0  ">
                      <p class="whitespace-no-wrap">{index + 1}</p>
                    </td>
                    <td class="text-left border-b border-gray-100 bg-white px-0 py-0  ">
                      <p class="whitespace-no-wrap">{coin.rank}</p>
                    </td>

                    <td class=" text-left border-b border-gray-100 bg-white px-5 py-5  ">
                      <p class="whitespace-no-wrap flex gap-2">
                        {coin.icon ? (
                          <img src={coin.icon} height={5} width={20}></img>
                        ) : null}

                      {
                        coin.code.replaceAll("_","")
                      }
                      </p>
                    </td>
                    <td class=" text-left border-b border-gray-100 bg-white px-5 py-5  ">
                      <p class="whitespace-no-wrap">
                      {FormatDollar(coin.price)}
                      </p>
                    </td>
                    
                    <td class="text-left border-b border-gray-100 bg-white px-5 py-5 ">
                      <p class="whitespace-no-wrap">
                      {FormatDollar(coin.totalCap)}
                      </p>
                    </td>
                    <td class="text-left border-b border-gray-100 bg-white px-5 py-5 ">
                      <p class="whitespace-no-wrap">
                      {coin.favorites}
                      </p>
                    </td>
                    <td class="text-left border-b border-gray-100 bg-white px-5 py-5">
                     <ChartComponent values = {coin.plot.day}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span class="text-xs text-gray-600 sm:text-sm">
              {" "}
              Showing {trending.length} coins{" "}
            </span>
            <div class="mt-2 inline-flex sm:mt-0">
              <button class="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Prev
              </button>
              <button class="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
       

        </>
    )

}
export default Trending;