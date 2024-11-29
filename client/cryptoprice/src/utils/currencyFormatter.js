export function FormatDollar(value=0){

    let usdFormatter = new Intl.NumberFormat('en-US',{
        currency:'USD',
        style:'currency',
        maximumFractionDigits:6
    });
    
    return usdFormatter.format(value);

}