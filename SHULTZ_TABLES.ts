if(!$){
    var jq = document.createElement('script');
    jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    // ... give time for script to load, then type (or see below for non wait option)
    jQuery.noConflict();
}

function getEls() {
    return {
        'START_BUTTON': $('input[name="starter"]'),
        'CLEAR_BUTTON': $('input[name="clearer"]'),
        'CREATE_BUTTON': $('form[name="clockform"] > input').first(), 
        'GAME': $('.wpb_wrapper div[align="center"]'),
        'GAME_STATUS': $('#game-status'),
        'CLOCK_INPUT' :$('input[name="clock"]'),
    }
}

function init() {
    $('.wpb_wrapper div[align="center"]').prepend(`<div id="game-status">ROUND: 0</div>`);
}


(()=>{
    
    
    console.clear()
    setTimeout(()=> {
        const CONIFG = {
            // SPACE_KEY_CODE
            CONTROLL_KEY: 32,
            TIME_LIMIT_MIN: 1,
        }
        const state = { 
            isDone: false,
            round: 0,
            best_time: CONIFG.TIME_LIMIT_MIN * 60,
            last_time: 0,
    
        };
        const { GAME, CREATE_BUTTON, START_BUTTON, CLEAR_BUTTON, GAME_STATUS, CLOCK_INPUT } = getEls();

        $(window).keydown(function(e) {
            // user has pressed space
            if(e.keyCode === CONIFG.CONTROLL_KEY){
               e.preventDefault();
               nextRound();
            }
        });

        scrollTo(GAME);
        init();
        start();

        function isEnd(){
            return Number(CLOCK_INPUT.val().split(':')[1]) >= CONIFG.TIME_LIMIT_MIN;
        }

        function getSeconds() {
             const [, MIN, SEC] = CLOCK_INPUT.val().split(':').map(v => Number(v));
             return MIN * 60 + Math.floor(SEC);
        }

        function getTime(total){
             let sec = total%60;
             let min = (total - sec)/60;

             min = (min<10) ? '0'+min : min;
             sec = (sec<10) ? '0'+sec : sec;

             return `${min}:${sec}`;
        }

        function getAverageTime(rounds){
             const seconds = getSeconds();
             let average = Math.floor(seconds / rounds);
             return getTime(average);
        }

        function getBestTime(best_time, last_time) {
            let current = getSeconds()
            let new_time = current - last_time;
            return (best_time < new_time) ? best_time : new_time;
        }

        function nextRound() {
            if(!isEnd()) {
                state.round = state.round + 1;
                state.best_time = getBestTime(state.best_time, state.last_time);
                state.last_time = getSeconds();
                
                CREATE_BUTTON.click();
                renderStatus(`ROUND: ${state.round}`);
               
               } else if(!state.isDone) {

                state.best_time = getBestTime(state.best_time, state.last_time);
                START_BUTTON.click();
                state.isDone = true;
                state.last_time  = 0;
                renderStatus(`
                    AVERAGE: ${getAverageTime(state.round)}   
                    BEST TIME: ${getTime(state.best_time)}`);
            } else {
                start();
            }
        }

        function start() {
            state.isDone = false;
            state.round = 0;
            state.best_time = CONIFG.TIME_LIMIT_MIN * 60;
            CLEAR_BUTTON.click();
            setTimeout(()=>{
                START_BUTTON.click();
                CREATE_BUTTON.click();
            },1000)
        }

        function renderStatus(text) {
            $('#game-status').empty();
            $('#game-status').text(text);
        }
    }, 3000)
})();

function scrollTo(ELEMENT){
    // scroll to game
    $([document.documentElement, document.body]).animate({
        scrollTop: ELEMENT.offset().top
    }, 500);
}
