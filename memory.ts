// https://www.memorylosstest.com/free-working-memory-tests-online/


// 1130 done 3
    // update checkbox
    // check result in time
// 1140 done 3
    // update checkbox
    //30min  // check result in time
// 1239 done 3 
    // update checkbox
    //60min  // check result in time


(function myCode(){
    function cleanPageAndConsole() {
    if($('.shtext')) {
        $('.shtext').remove();
    }
    console.clear();
    }

    function updatePage() {
        $('#start1 button').text("Start");
        $('#start1 button').css("background-color","green");
    }

    function getEls() {
        return {
            'EL_BOX': $('<div>').attr('id', 'checkbox-box'),
            'EL_GAME': $('#dspan'),
            'EL_START':  $('#start1 button'),
            'EL_NUM_PAD':  $('.shtab'),
            'EL_LEVEL': $('.shlast .svalue'),
            'EL_RESULTS': $('#results-0 div'),
        }
    }

    function createResultsBox(count, ) {
        const { EL_BOX, EL_GAME } = getEls();

        const createCheckBox = () => $('<input />', 
        { type: 'checkbox', value: true });
        const checkboxs = new Array(count).fill('');

        checkboxs.forEach( el => {
            $(EL_BOX)
            .prepend(createCheckBox())});

        // add checkboxs
        if(!$('#checkbox-box')[0]) {
            $(EL_GAME).prepend(EL_BOX);
        }
    }

// Adds listener to start button,
// wait a level amout of clicks
// and return result as promise
const checkResult = () => {
    const { 
         EL_BOX,
         EL_GAME,
         EL_START, 
         EL_LEVEL, 
         EL_NUM_PAD,
         EL_RESULTS,
    } = getEls();

    const isCorrect = () => EL_RESULTS.text() === 
        'You have entered correct numbers';

    return ((level, PAD) => {
        let inputCount = level + 1;
        PAD.unbind('click.pad');
        return () => {
            return new Promise( (resolve, reject) => {
                PAD.bind('click.pad', () => {
                    if(--inputCount === 0) {
                        resolve(isCorrect());
                        PAD.unbind('click.pad')
                    }
                });
            });
        }
    });
}




    
   //clean up the page
   cleanPageAndConsole();

    // define elements
   const { 
     EL_BOX,
     EL_GAME,
     EL_START, 
     EL_LEVEL, 
     EL_NUM_PAD,
    } = getEls();
   // create checkboxes
   createResultsBox(10);
    
    if($('#start1 button').text() !== 'Start') {
        EL_START.unbind('click.start');   
        EL_START.bind('click.start', function() {
            const VAL_LEVEL = +(EL_LEVEL.text());
            checkResult(VAL_LEVEL, EL_NUM_PAD)().then( (value) => {
                console.log('PROMIS RESOLED with ', value);
            });
        });
    }

    updatePage();
})();