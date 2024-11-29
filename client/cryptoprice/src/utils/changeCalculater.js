export function CalculateChanging(last,open24h){
    const result = (((last - open24h) / open24h) * 100).toFixed(2);
    return result;
}