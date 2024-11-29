import { useState, useEffect } from "react";
import Navbar from "./navbar";
import AssetsTable from "./assetsTable";
import MarketNav from "./marketNav";
import { FormatDollar } from "../utils/currencyFormatter";
import { FaBitcoin } from "react-icons/fa";
import { MembersTable } from "./cryptoTable";
import { CalculateChanging } from "../utils/changeCalculater";
const Home = () => {
  const [topAssets, setTopAssets] = useState([]);
  const [assets, setAssets] = useState([]);
  const [showAllCoins, setShowALlCoins] = useState(false);
  const [btc, setBtc] = useState([]);
  const [renderedAssets, setRenderedAssets] = useState([]);
  const [sortedStatus, setSortedStatus] = useState(false);
  const topAssetsUrl = process.env.REACT_APP_TOPASSETS_URL;
  const assetsUrl = process.env.REACT_APP_ASSETS_URL;
  const btcUrl = process.env.REACT_APP_BTC_URL;
const liveAPiUrl = process.env.REACT_APP_LIVE_API_URL
  useEffect(() => {
    fetchAllAssets();
    fetchTopAssets();
    fetchBitcoin();
    //postLiveAPi();
    // fetchAllAssets();
    //fetchBitcoin();
  }, [sortedStatus]);

  const fetchTopAssets = async () => {
    const result = await fetch(topAssetsUrl).then((res) => res.json());
    setTopAssets(result.assets);
  };
  const handleRenderedAssets = async (ass) => {
    setRenderedAssets(ass);
  };

  const fetchAllAssets = async () => {
    const result = await fetch(assetsUrl).then((res) => res.json());
    setAssets(result.result.data);
    setShowALlCoins(true);
  };
// const postLiveAPi = async()=>{
//   const result = await fetch(liveAPiUrl,{
//     method:'POST',
//     headers:{
//       'content-type':'application/json',
//       'x-api-key':'4a2acc63-091d-452d-8ee8-3eca5759b393'

//     },
//     body:JSON.stringify({
//       currency: "USD",
//       sort: "rank",
//       order: "ascending",
//       offset: 0,
//       limit: 2,
//       meta: false,
//     })
//   }).then(res=>res.json())
//   console.log("live api reuslt is ",result);
// };

  const fetchBitcoin = async () => {
    const result = await fetch(btcUrl).then((res) => res.json());
    setBtc(result.result[0]);
    console.log("btc result is ", result.result[0].last);
  };

  const handleOrdered = (sorted) => {
    setSortedStatus(!sortedStatus);
    setRenderedAssets(sorted);
  };

  return (
    <>
      <Navbar />
      <MarketNav />
      <div className="w-screen">
        <div className="text-black font-bold py-4">
          <p>
            <span className="lg:text-6xl md:text-6xl xs:text-xl font-mono">
              One Bitcoin is{" "}
            </span>
          </p>
          <p>
            <span
              className="lg:text-8xl md:text-8xl xs:text-4xl"
              style={{ maxWidth: "" }}
            >
              {FormatDollar(btc.last)}
            </span>
          </p>
          <div className="py-4 flex justify-center  relative gap-2">
            <FaBitcoin
              style={{ height: "30px", width: "30px" }}
              color="orange"
            />
            <span className="text-xl font-mono ">Bitcoin(BTC)  </span>
            
          </div>
         
        </div>

        <div class="max-w-screen-md ml-6 ">
          <div class="rounded-lg  bg-white py-2 ">
            <nav class="flex flex-wrap gap-2 lg:text-sm md:text-sm sm:text-xs xs:text-xs ">
              <a
                onClick={() => handleRenderedAssets(topAssets)}
                class="whitespace-nowrap inline-flex rounded-lg py-2 px-3  text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900"
              >
                {" "}
                Popular{" "}
              </a>

              <a
                onClick={() => handleRenderedAssets(assets)}
                class="whitespace-nowrap inline-flex rounded-lg py-2 px-3  font-medium text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900"
              >
                {" "}
                All{" "}
              </a>

              <a
                href="/trending"
                class="whitespace-nowrap inline-flex rounded-lg py-2 px-3  font-medium text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900"
              >
                {" "}
                Trending{" "}
              </a>
              <a
                href="/exchanges"
                class="whitespace-nowrap inline-flex rounded-lg py-2 px-3  font-medium text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900"
              >
                {" "}
                Exchanges{" "}
              </a>
            </nav>
          </div>
        </div>

        <AssetsTable
          coins={renderedAssets.length == 0 ? topAssets : renderedAssets}
          handleOrder={(sortedCoins) => handleOrdered(sortedCoins)}
        />
      </div>
    </>
  );
};
export default Home;
