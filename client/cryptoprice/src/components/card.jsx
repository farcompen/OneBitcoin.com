import { useEffect, useState } from "react";

const Card = ({ item }) => {
    const difference =  (((item.last-item.open24h)/item.open24h)*100).toFixed(2)
    const [diffClass,setDiffClass]=useState("");
    useEffect(()=>{
        if(difference<0){
            setDiffClass("float-right rounded-full bg-rose-100 px-1 text-sm font-medium text-rose-600")
        }
        else {
            setDiffClass("float-right rounded-full bg-green-100 px-1 text-sm font-medium text-green-600")
        }
    },[])
    return (
    <>
   
      {
        <div className="max-w-md rounded-lg border px-6 pt-6 pb-5">
          <div className="inline-block rounded-full border-8 border-white  p-2 text-emerald-500">
            {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg> */}
            {/* <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <image
                href="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=035"
                x="0"
                y="0"
                height="1000"
                width="1000"
              />
            </svg> */}
          <img src={item.icon} height={30} width={30} ></img>
          </div>
          
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="float-right h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
          <p className="text-sm font-medium text-gray-600">{item.fullName}</p>
          <p className="text-sm font-medium text-gray-600">{item.instId}</p>
          <p class="text-xl font-medium text-gray-800">{item.last}</p>
          <span className={diffClass}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline h-4 w-4 pb-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 13l-5 5m0 0l-5-5m5 5V6"
              />
            </svg>
            {
                difference
            }
          </span>
        </div>
      }
    </>
  );
};
export default Card;
