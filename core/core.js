class Core {
    constructor() {
        if (!Core.instance) {
            Core.instance = {
                DATA: {},
                SYMBOLS: [],
                DATA_array:[],
                makeList: () => {
                    Core.instance.DATA_array = []
                    Core.instance.SYMBOLS = Object.keys(Core.instance.DATA);
                    Core.instance.SYMBOLS.forEach(s => {
                        let stock = Core.instance.DATA[s];
                        stock["s"] = s;
                        Core.instance.DATA_array.push(stock);
                    });
                },
                filter : ()=>{
                    Core.instance.DATA_array = Core.instance.DATA_array.filter((stock)=>{
                        
                        return (parseFloat(stock["bidSize"])>0 || parseFloat(stock["askSize"])>0) && parseFloat(stock["o"])<parseFloat(stock["p"]) && parseFloat(stock["p"])>5;
                    });
                },
                rankByPercentage:()=>{
                    Core.instance.DATA_array = Core.instance.DATA_array.sort(GetSortOrder("cp"));
                },
                rankByChange:()=>{
                    Core.instance.DATA_array = Core.instance.DATA_array.sort(GetSortOrder("c"));
                },
                rankByPercentageCustom:(p)=>{
                    Core.instance.DATA_array = Core.instance.DATA_array.sort(GetSortOrderCustom("cp",p));
                },
                getSymbolsFromArray:(DATA)=>{
                    let SYMBOLS = [];
                    DATA.forEach(stock => {
                        SYMBOLS.push(stock["s"]);
                    });
                    return SYMBOLS;
                }
            }
        }
        return Core.instance;
    }
}

//Comparer Function    
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (parseFloat(a[prop]) <  parseFloat(b[prop])) {    
            return 1;    
        } else if (parseFloat(a[prop]) > parseFloat(b[prop])) {    
            return -1;    
        }    
        return 0;    
    }    
} 

function GetSortOrderCustom(prop,p=0) {    
    return function(a, b) {    
        if (Math.abs(parseFloat(a[prop]) - p) < Math.abs(parseFloat(b[prop]) - p) ) {    
            return -1;    
        } else if (Math.abs(parseFloat(a[prop]) - p)  > Math.abs(parseFloat(b[prop]) - p) ) {    
            return 1;    
        }    
        return 0;    
    }    
} 

module.exports = Core;