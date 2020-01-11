// https://pronuncian.com/long-e-short-i-1

(()=>{
    // CLEAR
    console.clear();
    document.body.click();
    const removeChild = el => {
        let elem = document.querySelector(el);
        elem && elem.parentNode && elem.parentNode.removeChild(elem);
    }

    const random = (max, min = 0) => {
        return Math.floor(Math.random() * (max - min) + min)
    }

    const randomElement = (array, min = 0) => array[random(array.length, min)];

    // REMOVE ADD
    ['#page-footer-wrapper', 'ins', '#sidebar-one'].forEach(removeChild);

    let miniPairs = document.getElementsByClassName("row");
    const row = randomElement(miniPairs, 1);
    const controls = row.childNodes;


    const color = row.style.background;
    row.style.background = 'green';
    setTimeout( () => {
        row.style.background = color;
    }, 500)

    const control = randomElement(controls);
    const playbButton = control.getElementsByClassName('controls')[0];
    const title = control.getElementsByClassName('audio-title')[0].innerHTML;
    
     setTimeout( () => {
        console.log('WORD:', title.toUpperCase())
    }, 2000)

    playbButton.click();
    control.scrollIntoView();

    // HIDE ALL
//     const audioBlocks = document.getElementsByClassName('audio-block');
//     audioBlocks.forEach( el => el.style.display = "none" );
})()