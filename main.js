var Price = document.querySelector('.Price');
var open = document.querySelector('.Open');
var load = document.querySelector('.progress')
var high = document.querySelector('.High');
var low = document.querySelector('.Low');
var open24 = document.querySelector('.Open24');
var high24 = document.querySelector('.High24');
var low24 = document.querySelector('.Low24');
var last_Volume = document.querySelector('.last_volume');
var Volume_24 = document.querySelector('.volume_24');
var Volume_Day = document.querySelector('.volume_day');
var last_id = document.querySelector('.last_id');
var last_update = document.querySelector('.last_update');
var BitCoin = document.querySelector('.BitCoin').addEventListener('click', bitCoin);
var LiteCoin = document.querySelector('.LiteCoin').addEventListener('click', liteCoin);
var Bitcoin_cash = document.querySelector('.BitCoin_Cash').addEventListener('click', bitcoin_cash);
var Monero = document.querySelector('.Monero').addEventListener('click', monero);
var DashCoin = document.querySelector('.DashCoin').addEventListener('click', dashCoin);
var Ethereum = document.querySelector('.Ethereum').addEventListener('click', ethereum);
var BitCoin_Gold = document.querySelector('.BitCoin_Gold').addEventListener('click', bitCoin_Gold);
var NEO = document.querySelector('.NEO').addEventListener('click', Neo);
var Zcash = document.querySelector('.Zcash').addEventListener('click', ZCash);
var IOTA = document.querySelector('.IOTA').addEventListener('click', Iota);
var CryptoCurrency = document.querySelector('.CryptoCurrency');
var Alogrithm = document.querySelector('.Alogrithm');
var ProofType = document.querySelector('.ProofType');
var BlockNumber = document.querySelector('.BlockNumber');
var NetHashPerSecond = document.querySelector('.NetHashPerSecond');

var Grey = document.querySelectorAll('.grey');
var Buy = document.querySelector('.buy');
var get_number = document.querySelector('.get_number');
var dollars = document.querySelector('.dollars');
var button = document.querySelector('.button').addEventListener('click', send);
var _crypto = document.querySelector('.crypto');
Buy.href = "https://bitcoin.org/en/buy";
//console.log("Value in textView " + get_number.placeholder);
var MyDate;
var name_currency;




function Coin() {


}

Coin.prototype.Graph = function (currency, To_Mined) {

    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.responseText);
            var new_idea={_12currency:"."+currency};
            //console.log(new_idea['_12currency']);
            
            var idea=response.RAW[currency].USD;
            //console.log(idea);
             var TotalCoinedMined = idea.SUPPLY;
             //console.log(TotalCoinedMined);
            // var AgrigatedData = response.Data.AggregatedData;
             var Price_Coin = idea.PRICE;
             var OpenDay = idea.OPENDAY;
             var HighDay = idea.HIGHDAY;
             var LowDay = idea.LOWDAY;
             var Open24Houe = idea.OPEN24HOUR;
             var High24Houe = idea.HIGH24HOUR;
             var Low24Houe = idea.LOW24HOUR;
             var LastVolume = idea.LASTVOLUME;
             var Volume24 = idea.VOLUME24HOUR;
             var VolumeDay = idea.VOLUMEDAY;
             var LastId = idea.LASTTRADEID;
             var LastUpdate = idea.LASTUPDATE;
             var _Algorathem = idea.LASTMARKET;
             var _ProofType = idea.MKTCAP;
             var _BlockNumber = idea.CHANGEDAY;
             var _NetHashPerSecond = idea.CHANGEPCT24HOUR;
            // var _BlockReward = response.Data.BlockReward;

            // console.log(response);
             Price.textContent = "$ " + Price_Coin;
             open.textContent = "$ " + OpenDay;
             high.textContent = '$ ' + HighDay;
             low.textContent = '$ ' + LowDay;
             open24.textContent = "$ " + Open24Houe;
             high24.textContent = "$ " + High24Houe;
             low24.textContent = "$ " + Low24Houe;
             last_Volume.textContent = LastVolume;
             Volume_24.textContent = Math.round(Volume24);
             Volume_Day.textContent = Math.round(VolumeDay);
             last_id.textContent = LastId;
             MyDate = new Date(LastUpdate * 1000)
             last_update.textContent = MyDate.toLocaleString();
             Alogrithm.textContent = _Algorathem;
             ProofType.textContent = _ProofType;
             BlockNumber.textContent = _BlockNumber;
             NetHashPerSecond.textContent = _NetHashPerSecond;
            // BlockReward.textContent = _BlockReward;

             Pie_Graph(TotalCoinedMined, To_Mined);

        } else {
            //console.log(response);
        }
    };
    
    xhttp.open("GET", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+currency+"&tsyms=USD", true);
    xhttp.send();

};

Coin.prototype.OHLC = function (currency_name, _title) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.responseText);
            var Data = response.Data;
            var Open_array = [Data.length];
            var high_array = [Data.length];
            var low_array = [Data.length];
            var close_array = [Data.length];
            var time_date = [Data.length];
            var myDate = [Data.length];
            var My_volume = [Data.length];

            for (var i = 0; i < Data.length; i++) {
                Open_array[i] = Data[i].open;
                high_array[i] = Data[i].high;
                low_array[i] = Data[i].low;
                close_array[i] = Data[i].close;
                time_date[i] = Data[i].time;
                myDate[i] = new Date(time_date[i] * 1000);
                My_volume[i] = Data[i].volumeto;


            }

            OHLC_Graph(Open_array, high_array, low_array, close_array, myDate, _title);
            Line_Graph(Open_array, high_array, low_array, close_array, myDate)
            bar_Graph(myDate, My_volume);
            

            load.remove();

        }
    };
    xhttp.open("GET", "https://min-api.cryptocompare.com/data/histohour?fsym=" + currency_name + "&tsym=USD&limit=60&aggregate=1&e=Bitfinex", true);
    xhttp.send();
};


var _coin = new Coin();

_coin.Graph("BTC", 21000000);
_coin.OHLC("BTC", 'BitCoin');
Price_Data();

function OHLC_Graph(_open, _high, _low, _close, _myDate, Title) {
    

    Plotly.purge('plotly-div');
    var trace1 = {
        x: _myDate,
        close: _close,
        decreasing: { line: { color: '#f50057' } },
        high: _high,
        increasing: { line: { color: '#00b0ff ' } },
        line: { color: 'rgba(50,189,189,189)' },
        low: _low,
        open: _close,
        type: 'ohlc',
        xaxis: 'x',
        yaxis: 'y'
    };


    var data = [trace1];

    var layout = {
        dragmode: 'zoom',
        margin: {
            r: 10,
            t: 25,
            b: 40,
            l: 60
        },
        showlegend: false,
        xaxis: {
            autorange: true,
            //rangeslider: {range: ['2017-01-17 12:00', '2017-02-10 12:00']}, 
            title: Title,
            type: 'date'
        },
        yaxis: {
            autorange: true,
            type: 'linear'
        }
    };

    Plotly.plot('plotly-div', data, layout);




}

function Pie_Graph(TotalMined, ToBeMined) {
    var ultimateColors = [
        ['rgb(245,0,87)', 'rgb(238,238,238)']];
    var data = [{
        values: [TotalMined, ToBeMined],
        labels: ['Total Coin Mined', 'To Be Mined'],
        type: 'pie',
        marker: {
            colors: ultimateColors[0]
        }
    }];


    Plotly.newPlot('myDiv', data);

}



function Line_Graph(_open, _high, _low, _close, _myDate) {

    var trace1 = {
        x: _myDate,
        y: _open,
        type: 'scatter',
        name: 'Low',
        line: {
            shape: 'spline',
            smoothing: 1.8,
            color: 'rgb(245,0,87)',

        }

    };
    var trace2 = {
        x: _myDate,
        y: _high,
        type: 'scatter',
        name: 'High',
        line: {
            shape: 'spline',
            smoothing: 1.8,
            color: 'rgb(33,33,33)',

        }

    };
    var trace3 = {
        x: _myDate,
        y: _low,
        type: 'scatter',
        name: 'Close',
        line: {
            shape: 'spline',
            smoothing: 1.8,
            color: 'rgb(105,240,174)',

        }

    };
    var trace4 = {
        x: _myDate,
        y: _close,
        name: 'Open',
        type: 'scatter',
        line: {
            shape: 'spline',
            smoothing: 1.8,
            color: 'rgb(224,64,251)',

        }

    };
    var layout = {

    };

    var data = [trace1, trace2, trace3, trace4];
    Plotly.newPlot('myDiv_Line', data, layout);

}



function bar_Graph(_myDate, Volume) {

    var data = [{
        x: _myDate,
        y: Volume,
        type: 'bar',
        marker: {
            color: 'rgb(245,0,87)',
            opacity: 0.6
        }
    }];
    var layout = {
        title: 'Volume',


    };

    Plotly.newPlot('myDiv_Bar', data, layout);

}

function Price_Data() {
    //console.log("in price data");
    get_number.placeholder = "1";
    var xmlhttp = new XMLHttpRequest();
    get_number.value = "";

    name_currency = _crypto.textContent;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xmlhttp.responseText);
            var num = get_number.placeholder;
            var _num = 1;

            var _price = response.USD;
            var _dollar = _price * _num;
            //console.log("In Price data _price " + _price);
            dollars.textContent = Math.round(_dollar);
            //console.log(" Price Data text content " + dollars.textContent);

        }
    };
    xmlhttp.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=" + name_currency + "&tsyms=USD", true);
    xmlhttp.send();

}

function send(e) {
    var xmlhttp = new XMLHttpRequest();

    name_currency = _crypto.textContent;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xmlhttp.responseText);
            var num = get_number.value;
            console.log("Value fromtext view" + num);
            var _price = response.USD;

            var _dollar = _price * num;
            console.log("Answer " + _dollar);
            dollars.textContent = Math.round(_dollar);
            console.log(name_currency);

        }
    };
    xmlhttp.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=" + name_currency + "&tsyms=USD", true);
    xmlhttp.send();
}



function bitCoin(e) {

    Buy.href = "https://bitcoin.org/en/buy";
    _crypto.textContent = "BTC";
    //e.target.style.backgroundColor = '#f50057';
    _coin.Graph("BTC", 21000000);
    _coin.OHLC("BTC", 'BitCoin');
    CryptoCurrency.textContent = 'BitCoin Price';
    Price_Data();
}

function liteCoin(e) {

    Buy.href = "https://litecoin.com/";
    _crypto.textContent = "LTC";
    //e.target.style.backgroundColor = '#f50057';
    _coin.Graph("LTC", 84000000);
    _coin.OHLC("LTC", 'LiteCoin');
    CryptoCurrency.textContent = 'LiteCoin Price';
    Price_Data();
}
function bitcoin_cash(e) {

    Buy.href = "https://www.bitcoincash.org/";
    _crypto.textContent = "BCH";
    // e.target.style.backgroundColor = '#f50057';
    _coin.Graph("BCH", 21000000);
    _coin.OHLC("BCH", 'BitCoin Cash');
    CryptoCurrency.textContent = 'BitCoin Cash Price';
    Price_Data();
}
function monero(e) {

    Buy.href = "https://www.monero.how/how-to-buy-monero";
    _crypto.textContent = "XMR";
    // e.target.style.backgroundColor = '#f50057';
    _coin.Graph("XMR", 18300000);
    _coin.OHLC("XMR", 'Monero');
    CryptoCurrency.textContent = 'Monero Price';
    Price_Data();
}
function dashCoin(e) {

    Buy.href = "https://www.dash.org/";
    _crypto.textContent = "DASH";
    // e.target.style.backgroundColor = '#f50057';
    _coin.Graph("DASH", 18446000);
    _coin.OHLC("DASH", 'DashCoin');
    CryptoCurrency.textContent = 'DashCoin Price';
    Price_Data();
}

function ethereum(e) {

    Buy.href = "http://ethereum.com/";
    _crypto.textContent = "ETH";
    // e.target.style.backgroundColor = '#f50057';
    _coin.Graph("ETH", 97017191.75);
    _coin.OHLC("ETH", 'Ethereum');
    CryptoCurrency.textContent = 'Ethereum Price';
    Price_Data();
}

function bitCoin_Gold(e) {

    Buy.href = "https://bitcoingold.org/";
    _crypto.textContent = "BTG";
    //e.target.style.backgroundColor = '#f50057';
    _coin.Graph("BTG", 21000000);
    _coin.OHLC("BTG", 'BitCoin Gold');
    CryptoCurrency.textContent = 'BitCoin Gold Price';
    Price_Data();
}

function Neo(e) {

    Buy.href = "https://www.coinbase.com/join";
    _crypto.textContent = "NEO";
    // e.target.style.backgroundColor = '#f50057';
    _coin.Graph("NEO", 100000000);
    _coin.OHLC("NEO", 'NEO');
    CryptoCurrency.textContent = 'NEO Price';
    Price_Data();
}

function ZCash(e) {

    Buy.href = "https://z.cash/";
    _crypto.textContent = "ZEC";
    // e.target.style.backgroundColor = '#f50057';
    _coin.Graph("ZEC", 21000000);
    _coin.OHLC("ZEC", 'ZCash');
    CryptoCurrency.textContent = 'Zcash Price';
    Price_Data();
}

function Iota(e) {

    Buy.href = "http://iota.org/";
    _crypto.textContent = "IOT";
    // e.target.style.backgroundColor = '#f50057';
    _coin.Graph("IOT", 2779530283277761);
    _coin.OHLC("IOT", 'IOTA');
    CryptoCurrency.textContent = 'IOTA Price';
    Price_Data();
}





var url = 'http://api.alice.com/cors';
var xhr = createCORSRequest('GET', url);
xhr.send();


function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
    // This is a sample server that supports CORS.
    var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function () {
        var text = xhr.responseText;
        var title = getTitle(text);
        alert('Response from CORS request to ' + url + ': ' + title);
    };

    xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();
}