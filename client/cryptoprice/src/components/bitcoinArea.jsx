import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { FormatDollar } from "../utils/currencyFormatter";
import { FaBitcoin } from "react-icons/fa";

const BitcoinArea = () => {
  const [btc, setBtc] = useState("");
  const[loading,setLoading]=useState(false)
  const btcUrl = process.env.REACT_APP_WEBSOCKET_URL;
  const { sendMessage, lastMessage, readyState } = useWebSocket(btcUrl, {
    onOpen: () => console.log("ws connection opened"),
    onClose: () => console.log("es connection clsoed"),
  });       
  useEffect(() => {
    if (lastMessage != null) {
        setLoading(false);
      setBtc(JSON.parse(lastMessage.data));
    }
  }, [lastMessage]);

  return (
    <>
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
            {
                loading?"Loading ...":FormatDollar(btc.bitcoin)
            }
           
          </span>
        </p>
        <div className="py-4 flex justify-center  relative gap-2">
          <FaBitcoin style={{ height: "30px", width: "30px" }} color="orange" />
          <span className="text-xl font-mono ">Bitcoin(BTC) </span>
        </div>
      </div>
    </>
  );
};
export default BitcoinArea;
