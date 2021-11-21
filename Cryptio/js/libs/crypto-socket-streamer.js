/* Веб-сокет */
var SocketStreamer = function(config){
    this.init(config);
};

SocketStreamer.prototype = {
    currentPrice: {},
    config: {
        socket_url: 'https://streamer.cryptocompare.com/',
        tsym: 'USD',
        display_mode: 'index',
        coins: '',
        courses: {
            usdrur: 0,
            usdeur: 0
        },
        currency_codes: {
            rur: '&#8381;',
            eur: '&#8364;'
        }
    },

    init: function(config){
        extend(this.config, config);

        if( CCC === undefined ){ return false; }
        if( !this.config.coins.length ){ return false; }
        var subscription = [];
        var coins = this.config.coins.split(',');
        for( var i = 0, c = coins.length; i < c; i++ ){
            subscription.push('5~CCCAGG~'+ coins[i] +'~'+ this.config.tsym);
        }

        var that = this;
        var socket = io.connect(this.config.socket_url);
        socket.emit('SubAdd', { subs: subscription });
        socket.on("m", function(message){
            var messageType = message.substring(0, message.indexOf("~"));
            if( messageType == CCC.STATIC.TYPE.CURRENTAGG ){
                that.dataUnpack(CCC.CURRENT.unpack(message));
            }
        });
    },


    dataUnpack: function(data){
        var pair = data['FROMSYMBOL'] + data['TOSYMBOL'];

        if( !this.currentPrice.hasOwnProperty(pair) ){
            this.currentPrice[pair] = {};
        }

        if( data['FLAGS'] == undefined ){ return false; }

        for( var key in data ){
            this.currentPrice[pair][key] = data[key];
        }

        this.currentPrice[pair]['CHANGE24HOUR'] = (this.currentPrice[pair]['PRICE'] - this.currentPrice[pair]['OPEN24HOUR']).toFixed(2);
        this.currentPrice[pair]['CHANGE24HOURPCT'] = (this.currentPrice[pair]['CHANGE24HOUR'] / this.currentPrice[pair]['OPEN24HOUR'] * 100).toFixed(2);
        this.displayData(this.currentPrice[pair]);
        //console.log(this.currentPrice[pair]);
    },


    displayData: function(current){
        //console.log(current);
        var from = current.FROMSYMBOL;
        var priceDirection = parseInt(current.FLAGS);
        var v = '';

        switch( this.config.display_mode ){
            case 'index':
                for( var key in current ){
                    if( key == 'CHANGE24HOUR' || key == 'CHANGE24HOURPCT' ){
                        //v = this.getSign(current[key]) + parseFloat(CCC.convertValueToDisplay('', current[key])).toFixed(2) + (key == 'CHANGE24HOUR' ? '$' : '%');
                        v = this.getSign(current[key]) + CCC.convertValueToDisplay('', current[key]) + (key == 'CHANGE24HOUR' ? ' $' : ' %');
                    }
                    else if( key == 'PRICE' ){
                        v = CCC.convertValueToDisplay('', current[key]) +' $';
                    }
                    else if( key == 'VOLUME24HOURTO' ){
                        v = CCC.convertValueToDisplay('', current[key].toFixed(0)) +'$';
                    }
                    else{
                        v = CCC.convertValueToDisplay('', current[key]);
                    }
                    let el = document.querySelector('[data-coin=' + key + '_' + from +']');
                    if (el) {
                        el.textContent = v;
                    }
                }

                let elCoinFrom = document.querySelector('[data-coin=PRICE_' + from +']');
                let elCoinRowFrom = document.querySelector('.coin_row_'+ from);
                if (elCoinFrom) {
                    elCoinFrom.classList.remove('up', 'down');
                }
                if (elCoinRowFrom) {
                    elCoinRowFrom.classList.remove('row_up', 'row_down', 'row_unchange')
                }
                if( priceDirection == 1 ){
                    if (elCoinFrom) {
                        elCoinFrom.classList.add("up");
                    }
                    if (elCoinRowFrom) {
                        elCoinRowFrom.classList.add('row_up')
                    }
                }
                else if( priceDirection == 2 ){
                    if (elCoinFrom) {
                        elCoinFrom.classList.add("down");
                    }
                    if (elCoinRowFrom) {
                        elCoinRowFrom.classList.add("row_down");
                    }
                }

                setTimeout(function(){
                    if (elCoinRowFrom) {
                        elCoinRowFrom.classList.remove('row_up', 'row_down', 'row_unchange')
                    }
                }, 1000);

                let elCoinTrendFrom = document.querySelector('[data-coin=trend_' + from +']');
                if (elCoinTrendFrom) {
                    elCoinTrendFrom.classList.remove('triangle_up', 'triangle_down')
                }
                let elCoinChange24Hour =document.querySelector('[data-coin=CHANGE24HOURPCT_' + from +']');
                if (elCoinChange24Hour) {
                    elCoinChange24Hour.classList.remove('up', 'down');
                }

                if( current['PRICE'] > current['OPEN24HOUR'] ){
                    if (elCoinTrendFrom) {
                        elCoinTrendFrom.classList.add('triangle_up')
                    }
                    if (elCoinChange24Hour) {
                        elCoinChange24Hour.classList.add('up');
                    }
                }
                else if( current['PRICE'] < current['OPEN24HOUR'] ){
                    if (elCoinTrendFrom) {
                        elCoinTrendFrom.classList.add('triangle_down')
                    }
                    if (elCoinChange24Hour) {
                        elCoinChange24Hour.classList.add('down');
                    }
                }
                let elPriceRur = document.querySelector('.price_rur_'+ from);
                let elPriceEur = document.querySelector('.price_eur_'+ from);
                if (elPriceRur) {
                    elPriceRur.textContent = CCC.convertValueToDisplay('', (current['PRICE'] * this.config.courses.usdrur).toFixed(2)) +' '+ this.config.currency_codes.rur;
                }
                if (elPriceEur) {
                    elPriceEur.textContent = CCC.convertValueToDisplay('', (current['PRICE'] * this.config.courses.usdeur).toFixed(2)) +' '+ this.config.currency_codes.eur;
                }
                break;
            default:
                return false;
                break;
        }
    },


    getSign: function(d){
        return d > 0 ? '+' : '';
    }
};
// end


new SocketStreamer({
    coins:"BTC,ETH,LTC,DASH"
});
