let  symbols = {
    "XOF": '$',
    "EUR":'€',
    "USD":'$',
    "MUR":"'₨",
    "MXN":'$',
    "MNT":'₮',
    "XCD":'$',
    "MZN":'MT',
    "NAD":'$',
    "ZAR":'R',
    "AUD":'$',
    "NPR":'₨',
    "NZD":"$",
    "NIO":"C$",
    "NGN":"₦",
    "OMR":"﷼",
    "PKR":"₨",
    "PAB":"B/.",
    "PYG":"Gs",
    "PEN":'S/.',
    "PHP":'₱',
    "PLN":'zł',
    "QAR":"﷼",
    "RON":"lei",
    "RUB":"₽",
    "SHP":'£',
    "SOS":'S',
    "SAR":'﷼',
    "RSD":'Дин',
    "SCR":'₨',
    "SGD":"$",
    "ANG":"ƒ",
    "SBD":'$',
    "LKR":'₨',
    "SRD":'$',
    "NOK":'kr',
    "SEK":"kr",
    "CHF":"CHF",
    "SYP":"£",
    "TWD":"NT$",
    "THB":'฿',
    "TTD":"TT$",
    "UAH":'₴',
    "GBP":'£',
    "UYU":'$U',
    "UZS":'лв',
    "VEF":'Bs',
    "VND":'₫',
    "YER":"﷼",
} ;

let  arr =  [];

for( var symbol in symbols){
    arr.push(symbol)
}

export const currency = arr.filter((item, pos) => {
  return arr.indexOf(item) == pos;
});;


export const getCurrencySymbol =(currency)=>{
    return symbols[currency];
};

