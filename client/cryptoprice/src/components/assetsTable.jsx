import React, { useEffect, useState } from "react";
import { FormatDollar } from "../utils/currencyFormatter";
const AssetsTable = ({ coins, isHide, handleOrder }) => {
  const [diff, setDiff] = useState(0);
  const [sorted, setSorted] = useState(coins);
  const [loading, setLoading] = useState(true);
  //const [assets,setAssets]=useState([coins]);
  useEffect(() => {
    console.log("assets effected");
    setSorted(coins);
    setLoading(true);
    if (coins.length > 0) {
      setLoading(false);
    }
  }, [coins]);
  const handleDifference = (last, open) => {
    const result = (((last - open) / open) * 100).toFixed(2);
    return result;
  };

  const orderByChange = () => {
    let ordered = [];
    coins.map(async (c, key) => {
      sorted[key].change = handleDifference(c.last, c.open24h);
    });

    ordered = sorted.sort(function (a, b) {
      return b.change - a.change;
    });

    handleOrder(ordered);
  };
  return (
    <>
      <div class="mx-auto px-4 sm:px-8 block w-full">
        <div class="flex items-center justify-between pb-6">
          <div>
            {/* <h2 class="font-semibold text-gray-700">All Coins Table</h2>
            <span class="text-xs text-gray-500"></span> */}
          </div>
          <div class="flex items-center justify-between"></div>
        </div>
        <div class="overflow-y-hidden rounded-lg ">
          <div class="overflow-x-auto">
            <table class="w-full border font-mono">
              <thead className="border ">
                <tr class="bg-slate-100 text-left lg:text-base md:text-base sm:text-base xs:text-xs font-semibold  tracking-widest text-black-400 xs:text-left">
                  <th class="px-5 py-3  text-center">#</th>
                  <th class="px-5 py-3 text-center">Coin</th>
                  <th class="px-5 py-3 text-right">Price</th>
                  <th
                    class="px-5 py-3 text-right"
                    onClick={() => orderByChange()}
                  >
                    <u>Change</u>
                  </th>
                  <th class="px-5 py-3 text-right">Open24h</th>
                  <th class="px-5 py-3 text-right">high24h</th>
                  <th class="px-5 py-3 text-right">low24h</th>
                </tr>
              </thead>
              <tbody class="text-black-400 lg:text-base md:text-base sm:text-base  xs:text-xs">
                {loading ? (
                  <div className="text-center text-black-300">loading...</div>
                ) : (
                  coins.map((coin, index) => (
                    <tr className="xs:text-left">
                      <td class="text-center border-b border-gray-100 bg-white px-0 py-0  ">
                        <p class="whitespace-no-wrap">{index + 1}</p>
                      </td>

                      <td class=" text-center border-b border-gray-100 bg-white px-5 py-5  ">
                        <p class="whitespace-no-wrap flex gap-2">
                          {coin.icon ? (
                            <img src={coin.icon} height={5} width={20}></img>
                          ) : null}

                          {coin.fullName ? coin.fullName : coin.instId}
                        </p>
                      </td>
                      <td class=" text-right border-b border-gray-100 bg-white px-5 py-5  ">
                        <p class="whitespace-no-wrap">
                          {FormatDollar(coin.last)}
                        </p>
                      </td>
                      {handleDifference(coin.last, coin.open24h) < 0 ? (
                        <td className="text-right border-b border-gray-100 bg-white px-5 py-5 text-red-600">
                          {handleDifference(coin.last, coin.open24h)}
                        </td>
                      ) : (
                        <td className="text-right border-b border-gray-100 bg-white px-5 py-5 text-green-600">
                          {handleDifference(coin.last, coin.open24h)}
                        </td>
                      )}

                      <td class="text-right border-b border-gray-100 bg-white px-5 py-5 ">
                        <p class="whitespace-no-wrap">
                          {FormatDollar(coin.open24h)}
                        </p>
                      </td>
                      <td class="text-right border-b border-gray-100 bg-white px-5 py-5 ">
                        <p class="whitespace-no-wrap">
                          {FormatDollar(coin.high24h)}
                        </p>
                      </td>
                      <td class="text-right border-b border-gray-100 bg-white px-5 py-5">
                        <p class="whitespace-no-wrap">
                          {FormatDollar(coin.low24h)}
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
              Showing {coins.length} coins{" "}
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
export default AssetsTable;
