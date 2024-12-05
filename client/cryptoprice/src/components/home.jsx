import { useState, useEffect } from "react";
import Navbar from "./navbar";
import AssetsTable from "./assetsTable";
import MarketNav from "./marketNav";
import { FormatDollar } from "../utils/currencyFormatter";
import { FaBitcoin } from "react-icons/fa";
import { CalculateChanging } from "../utils/changeCalculater";
import BitcoinArea from "./bitcoinArea";
const Home = () => {
  const [topAssets, setTopAssets] = useState([]);
  const[btc,setBtc]=useState("");
  const [assets, setAssets] = useState([]);
  const [showAllCoins, setShowALlCoins] = useState(false);
  const [renderedAssets, setRenderedAssets] = useState([]);
  const [sortedStatus, setSortedStatus] = useState(false);
  const topAssetsUrl = process.env.REACT_APP_TOPASSETS_URL;
  const assetsUrl = process.env.REACT_APP_ASSETS_URL;
  const liveAPiUrl = process.env.REACT_APP_LIVE_API_URL;
  useEffect(() => {
    fetchAllAssets();
    fetchTopAssets();
fetchBtcValue();
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

  const handleOrdered = (sorted) => {
    setSortedStatus(!sortedStatus);
    setRenderedAssets(sorted);
  };
  const fetchBtcValue = async ()=>{
    const value = await fetch(process.env.REACT_APP_BTC_URL)
                  .then(res=>res.json())
                  console.log("btc is",value.result[0].last);
          setBtc(value.result[0].last)        

  }
  
  return (
    <>
      <Navbar />
      <MarketNav />
      <div className="w-screen">
        <BitcoinArea btcValue={btc}/>

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
