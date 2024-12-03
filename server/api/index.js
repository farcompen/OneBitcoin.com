const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api");
const top_assets = require("./topAssets")
console.log(typeof(top_assets))
require("dotenv").config();
app.use(cors());
let prices = [];
let topAssets = [];
let globalData=[];
let exchangeList =[];
process.on("unhandledRejection", (error) => {
  console.log("unhandled rejection", error.message);
});

app.get("/up", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "service is up",
  });
});
//#region  Get prices of coins
app.get("/api/prices", async (req, res) => {
  if (prices.length === 0) {
    prices = await api.Prices();
  }
  res.status(200).send({
    status: "OK",
    queryDate: Date.now(),
    result: prices,
  });
});

//#endregion

//#region  topAssets
const getTopAssets = async () => {
 
  await checkIfEmpty();
 
  return topAssets.sort((a) => a.instId);
};

const checkIfEmpty = async () => {
  if (prices.length == 0) {
    prices = await api.Prices();
  }
  if (topAssets.length == 0) {
    topAssets = await prices.data.filter(function (item) {
      if (top_assets().some((a) => a.name == item.instId)) {
       const index = top_assets().findIndex(a=>a.name==item.instId);
        item.icon = top_assets()[index].icon; 
        item.fullName=top_assets()[index].fullName;
        return item;
      }
    });
  }
};

app.get("/api/topassets", async (req, res) => {
  try {
    console.log(top_assets())
    const result = await getTopAssets();

    res.status(200).send({
      status: "success",
      assets: result,
    });

  }
  catch(err){
    res.status(200).send({
      status:"error"+err,
      assets:[]
    })
  }
 
 
});

//#endregion

//#region btc price

app.get("/api/btc", async (req, res) => {
  try{
   
  let result = await getTopAssets();
  result=result.filter((a) => a.instId == "BTC-USDT");

  res.status(200).send({
    status: "success",
    result: result,
  });
 
}
catch(err){
  console.log(err)
  res.status(200).send({
    status:"error",
    result:[]
  })
}
  
  
});
//#endregion


//#region global data  
app.get("/api/global",async(req,res)=>{
  try{
    if(globalData.length==0){
      
      const globalResult = await api.GlobalData();
     
      res.status(200).send({
        status:"success",
        result:globalResult
      })
    }
    else {
      res.status(200).send({
        status:"success",
        result:globalData
      })
    }
  }catch(err){
    res.status(200).send({
      status:"error",
      result:[]
    })
  }
});

//#endregion

//#region trending
app.get("/api/trending",async(req,res)=>{
  const result = await api.TrendingList();
  try{
    res.status(200).send({
      status:"success",
      result:result
    })
  }
  catch(err){
    res.status(200).send({
      status:"error",
      result:[]
    })
  }
  
});
//#endregion

app.get("/api/exchange",async(req,res)=>{
 
try{
 if(exchangeList.length==0){
  console.log("exhange list is iempty")
  await setExhangeList();
 }
 
  res.status(200).send({
    status:"success",
    result:exchangeList
  })
}
catch(err){
res.status(200).send({
  status:"error",
  result:[]
})
}

});

const setExhangeList = async()=>{
  if(exchangeList.length==0){
    exchangeList= await api.Exchange();
   

  }
}

(async () => {
  setInterval(async () => {
    prices = await api.Prices();
    topAssets=[];
  //  console.log(await prices.data.filter((a)=>a.instId="BTC-USDT"))

  }, 180 * 1000);

  setInterval(async()=>{
    globalData= await api.GlobalData();


  },600*1000)

  setInterval(async()=>{
    await setExhangeList();

  },3600*1000)
})();

app.listen("6005", () => console.log("serivce started on 6005"));
