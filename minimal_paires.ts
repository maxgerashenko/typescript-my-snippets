// https://pronuncian.com/long-e-short-i-1

function createButton(title, callback) {
    var button = document.createElement("button");
    
    button.innerHTML = title;
    button.addEventListener ("click", callback);

    return button;
}

function showOptions(options, wrapper, answer) {
    // clear
    wrapper.innerHTML = '';
    controls = document.createElement("div");
    let result = document.createElement("span");
    result.innerHTML = answer;



    // insert buttons
    options
        .map( option => createButton(option, event => {
            const color = (answer === option) ? 'green' : 'red';
            event.target.style.background = color;
            event.target.style.color = 'white';

            wrapper.appendChild(result)
        }))
        .forEach( button => controls.appendChild(button));
   
    wrapper.appendChild(controls);
}

function random(max, min = 0) { return Math.floor(Math.random() * (max - min) + min)};
function randomElement(array, min = 0) {
    return array[random(array.length, min)];
}
function randomElements(controls, titles, min = 0) { 
    let randomNumber = random(controls.length, min);
    return [controls[randomNumber], titles[randomNumber]]; 
}

function clearAds() {
    console.clear();
    document.body.click();
    const removeChild = el => {
        let elem = document.querySelector(el);
        elem && elem.parentNode && elem.parentNode.removeChild(elem);
    }

    // REMOVE ADD
    ['#page-footer-wrapper', 'ins', '#sidebar-one'].forEach(removeChild);
}

(()=>{
    // FIX: Need to click first
    window.document.body.firstElementChild.click()
    // CLEAR
    clearAds();

    let titles = document.getElementsByClassName("sqs-block-html");
    titles = Array.prototype.slice.call(titles, 1);
    let miniPairs = document.getElementsByClassName("row");
    miniPairs = Array.prototype.slice.call(miniPairs, 2);
    miniPairs = Array.prototype.slice.call(miniPairs, 0, miniPairs.length-1);
    const [row, title] = randomElements(miniPairs,titles , 0);
    let controls = row.childNodes;
    controls = Array.prototype.slice.call(controls, 1);

    elementText = title.children[0].children[0].innerText;
    let options = elementText.split('.')[1].trim().split('—').map( v => v.trim());

    // HIGHLITH CONTROLL
    const color = row.style.background;
    row.style.background = 'green';
    setTimeout( () => {
        row.style.background = color;
    }, 500)
    
    const control = randomElement(controls);
    const playbButton = control.getElementsByClassName('controls')[0];
    const answer = control.getElementsByClassName('audio-title')[0].innerHTML;
    const audioBlocks = document.getElementsByClassName('audio-block');

    // SHOW BUTTONS
    let testWrapper = document.createElement("div");
    document.getElementById("page-body-header").appendChild(testWrapper);
    showOptions(options, testWrapper, answer);

    
    // LOG
    setTimeout( () => {
        console.log('WORD:', answer.toUpperCase())
    }, 2000)

    playbButton.click();
    control.scrollIntoView();

//        HIDE ALL
 audioBlocks.forEach( el => el.style.display = "none" );
 titles.forEach( el => el.style.display = "none" );  
})()