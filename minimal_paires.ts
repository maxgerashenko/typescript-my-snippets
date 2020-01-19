CONFIG = {
    CORRECT_COLOR: '#2e7d32',
    INCORRECT_CLOLOR: '#b71c1c',
    HIDE_SOUNDS: false,
    NEXT_START_TIME: 1500,
    EXEPTIONS: {
        hill: 'hit' 
    },
    TIMER_MIN: 1,
    TIMER: true,
};


(()=>{
    
    // setTimer
    CONFIG.TIMER && setTimeout(() => {
        alert(`${CONFIG.TIMER_MIN} min passed. Well Done!`);
    }, CONFIG.TIMER_MIN * 1000 * 60);

    // FIX: Need to click first
    window.document.body.firstElementChild.click()
    
    // CLEAR
    clearAds();

    const all_control_paires = getAllControllPaires();
    const all_titles = getAllTitles();

    function START(all_titles, all_control_paires) {
        const {
            playbRandom, 
            playButtons,
            optionsTitles, 
            answer
        } = randomElements(all_control_paires, all_titles, 0);

        // Play
        playbRandom.click();

        // SHOW BUTTONS
        showOptions(options_title, answer, (title) => {            
            if(isCorrect(title, answer)){
                setTimeout(()=>{
                    START(all_titles, all_control_paires)
                }, CONFIG.NEXT_START_TIME)
            } else {
                playButtons[title].click();
            }
        });

        // LOG
        setTimeout( () => {
            console.warn('WORD:', answer.toUpperCase())
        }, 2000);
    }

    START(all_titles, all_control_paires);


    // HIDE ALL
    CONFIG.HIDE_SOUNDS && hideAll(getAudioBlock(), all_titles);
})()


// RANDOM LOGIC
function random(max, min = 0) { return Math.floor(Math.random() * (max - min) + min)};
function randomElement(array, min = 0) { return array[random(array.length, min)];}
function randomElements(controls, titles) { 
    
    let randomNumber = random(controls.length);



    let controls_pair = controls[randomNumber].childNodes;
    const control = randomElement(controls_pair);
    const playbRandom = getPlayButton(control);
    const playButtons = {};
    playButtons[getControlTitle(controls_pair[0])] = getPlayButton(controls_pair[0]);
    playButtons[getControlTitle(controls_pair[1])] = getPlayButton(controls_pair[1]);

    let title = titles[randomNumber];
    let optionsTitles = getOptionsTitle(title);

    const answer = getControlTitle(control);

    return {
        playbRandom,
        playButtons,
        optionsTitles,
        answer,
    }
}

// SHOW LOGIC
function createButton(title, index, callback) {
    var button = document.createElement("button");

    // left element;
    config = (index === 0) ? 
        // LEFT
        {
            margin:  "10px 1px 10px 20%",
            width: "calc(30% - 5px)",
            'border-radius': "10px 0 0 10px",
        } :
        // RIGHT
        {
            margin:  "10px 20% 10px 1px",
            width: "calc(30% - 5px)",
            'border-radius': "0 10px 10px 0"
        }
    
    button.innerHTML = CONFIG.EXEPTIONS[title] || title;
    button.addEventListener ("click", callback);
    button.style.width =  config.width;
    button.style.margin = config.margin;
    button.style['border-radius'] = config['border-radius'];
    button.style.outline = 'none'

    return button;
}

function showOptions(options, answer, callback) {
    let wrapper = document.createElement("div");
    document.getElementById("page-body-header").appendChild(wrapper);

    // clear
    wrapper.innerHTML = '';
    controls = document.createElement("div");
    let result = document.createElement("span");
    result.innerHTML = answer;

    // insert buttons
    options
        .map( (option, index) => createButton(option, index, event => {
            const color = isCorrect(option, answer) ? 
            CONFIG.CORRECT_COLOR : 
            CONFIG.INCORRECT_CLOLOR;
            event.target.style.background = color;
            event.target.style.color = 'white';
            
            // show result in buttons
            // wrapper.appendChild(result)
            callback && callback(event.target.innerHTML);
        }))
        .forEach( button => controls.appendChild(button));
   
    wrapper.appendChild(controls);
    window.scroll({
      top: controls.offsetTop - window.innerHeight /2, 
      left: 0, 
      behavior: 'smooth'
    });
}

function isCorrect(title, answer) {    
    return title === answer || CONFIG.EXEPTIONS[title] === answer;
}

// GETTERS
function getAudioBlock() {
    return document.getElementsByClassName('audio-block');
}

function getControlTitle(control) {
    return control.getElementsByClassName('audio-title')[0].innerHTML;
}

function getPlayButton(control) {
    return control.getElementsByClassName('controls')[0];
}

function getOptionsTitle(title) {
    elementText = title.children[0].children[0].innerText;
    options_title = elementText.split('.')[1].trim().split('—').map( v => v.trim());
    return options_title;
} 

function getAllControllPaires() {
    let miniPairs = document.getElementsByClassName("row");
    // clean up
    miniPairs = Array.prototype.slice.call(miniPairs, 0, miniPairs.length-1);
    miniPairs = Array.prototype.slice.call(miniPairs, 2);
    return miniPairs;
}

function getAllTitles() {
    let titles = document.getElementsByClassName("sqs-block-html");
    // clean up
    titles = Array.prototype.slice.call(titles, 1);
    return titles;
}

function hideAll(audioBlocks, all_titles){
    audioBlocks.forEach( el => el.style.display = "none" );
    all_titles.forEach( el => el.style.display = "none" );
}



// CLEAR ADD
function clearAds() {
    console.clear();
    document.body.click();
    const removeChild = el => {
        let elem = document.querySelector(el);
        elem && elem.parentNode && elem.parentNode.removeChild(elem);
    }

    // REMOVE ADD
    ['#page-footer-wrapper', 'ins', '#sidebar-one', 'adsbygoogle-noablate'].forEach(removeChild);
}
