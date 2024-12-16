import { useEffect, useState } from "react";
import Navbar from "./navbar";
import MarketNav from "./marketNav";
import { FormatDollar } from "../utils/currencyFormatter";
const exchangeApiUrl = process.env.REACT_APP_EXCHANGES_API_URL;
const Exchanges = () => {
  const [exc, setExc] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchExchanges();
  }, []);
  const fetchExchanges = async () => {
    const result = await fetch(exchangeApiUrl).then((res) => res.json());
    setLoading(false);
    setExc(result.result);
  };
  return (
    <>
      <Navbar />
      <MarketNav />
      <p className="flex items-center justify-center"> Exchange List</p>
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
                <tr class="bg-slate-50 text-left lg:text-sm md:text-base sm:text-base xs:text-xs font-semibold  tracking-widest text-black-400 xs:text-left">
                  <th class="px-5 py-3  text-left">#</th>
                  <th class="px-5 py-3 text-left">Code</th>
                  <th class="px-5 py-3 text-left">Name</th>
                  <th class="px-5 py-3 text-left">Markets</th>
                  <th class="px-5 py-3 text-left">Volume</th>
                </tr>
              </thead>
              <tbody class="text-black-400 lg:text-base md:text-base sm:text-base  xs:text-xs">
                {loading ? (
                  <div className="text-black-300">loading ...</div>
                ) : (
                  exc.map((coin, index) => (
                    <tr className="xs:text-left">
                      <td class="text-center border-b border-gray-100 bg-white px-0 py-0  ">
                        <p class="whitespace-no-wrap">{index + 1}</p>
                      </td>
                      <td class="text-left border-b border-gray-100 bg-white px-0 py-0  ">
                        <p class="whitespace-no-wrap">{coin.code}</p>
                      </td>

                      <td class=" text-left border-b border-gray-100 bg-white px-5 py-5  ">
                        <p class="whitespace-no-wrap flex gap-2">
                          <img src={coin.png64} height={5} width={20}></img>

                          {coin.name}
                        </p>
                      </td>
                      <td class=" text-left border-b border-gray-100 bg-white px-5 py-5  ">
                        <p class="whitespace-no-wrap">{coin.markets}</p>
                      </td>

                      <td class="text-left border-b border-gray-100 bg-white px-5 py-5 ">
                        <p class="whitespace-no-wrap">
                          {FormatDollar(coin.volume)}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div class="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span class="text-xs text-gray-600 sm:text-sm">
              {" "}
              Showing {exc.length} coins{" "}
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
  );
};

export default Exchanges;
