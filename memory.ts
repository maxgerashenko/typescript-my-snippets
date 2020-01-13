// https://www.memorylosstest.com/free-working-memory-tests-online/

// update checkbox 1h
// update checkbox 30h
(function myCode() {
    const CONFIG = {
        STEP_FORWARD: 1,
        STEP_BACK: 2,
        STEPS: 5,
    }

    function cleanPageAndConsole() {
        const remove = ['#masthead', '#menu-top', '.shtext', '#secondary', '.entry-content p:first', ]
        remove.forEach(el=>{
            $(el).remove();
        }
        )
        console.clear();
    }

    // Prepair page
    function updatePageAndSettings() {
        const {EL_MINUS, EL_FAST, EL_LEVEL, EL_GAME, EL_MAIN} = getEls();

        // center
        EL_MAIN.css({
            'display': 'flex',
            'justify-content': 'center',
        });

        $(window).scrollTop(0);
        // scroll to game
        $([document.documentElement, document.body]).animate({
            scrollTop: EL_GAME.offset().top - 20
        }, 500);

        //adjust result
        $('#results-0').css('height','30px');
        $('center.hide-it').css('height','10px');

        // make button green
        $('#start1 button').text("Start");
        $('#start1 button').css("background-color", "green");
        $('#dspan').css('padding-top','0');

        // reset level
        while (Number(EL_LEVEL.text()) > 3) {
            EL_MINUS.click();
        }

        // select fast
        EL_FAST.click();
    }

    function getEls() {
        return {
            'EL_BOX': $('<div>').attr('id', 'status-box'),
            'EL_GAME': $('#dspan'),
            'EL_START': $('#start1 button'),
            'EL_NUM_PAD': $('.shtab'),
            'EL_LEVEL': $('.svalue'),
            'NAME_RESULT': '#results-0 div',
            'EL_PLUS': $('#plus'),
            'EL_MINUS': $('#minus'),
            'EL_FAST': $('input[value="500"'),
            'EL_SLOW': $('input[value="1000"'),
            'EL_MAIN': $('#main'),
        }
    }

    function createResultsBox(count, ) {
        const {EL_BOX, EL_GAME} = getEls();

        const createCheckBox = ()=>$('<input />', {
            type: 'checkbox',
            value: true
        });
        const checkboxs = new Array(count).fill('');

        checkboxs.forEach(el=>{
            $(EL_BOX).prepend(createCheckBox())
        }
        );

        // add checkboxs
        if (!$('#status-box')[0]) {
            $(EL_GAME).append(EL_BOX);
        }
    }

    // Adds listener to start button,
    // wait a level amout of clicks
    // and return result as promise
    const checkResult = (()=>{
        const {EL_LEVEL, EL_NUM_PAD, NAME_RESULT, } = getEls();

        console.log('0 ', EL_LEVEL)

        const isCorrect = ()=>$(NAME_RESULT).text() === 'You have entered correct numbers';

        return ((level)=>{
            let inputCount = level + 1;
            EL_NUM_PAD.unbind('click.pad');
            return new Promise((resolve,reject)=>{
                EL_NUM_PAD.bind('click.pad', ()=>{
                    if (--inputCount === 0) {
                        setTimeout(()=>{
                            resolve(isCorrect());
                        }
                        );
                        EL_NUM_PAD.unbind('click.pad')
                    }
                }
                );
            }
            );
        }
        );
    }
    )();

    const onBindResult = (handler)=>{
        const {EL_LEVEL, EL_START, } = getEls();

        let promise = {};

        EL_START.unbind('click.start');
        EL_START.bind('click.start', ()=>{
            const VAL_LEVEL = Number(EL_LEVEL.text());
            checkResult(VAL_LEVEL).then(handler);
        }
        );
    }

    // define elements
    const {EL_BOX, EL_GAME, EL_START, EL_LEVEL, EL_NUM_PAD, EL_MINUS, EL_PLUS, } = getEls();
            
    // create checkboxes
    createResultsBox(CONFIG.STEPS);
    //clean up the page
    cleanPageAndConsole();
    // set labels and set level to 3
    updatePageAndSettings();

    const status = {
        level: 0,
        speed: 0,
        current: 1,
    };

    const updateCheckboxs = function(number) {
        Array.prototype.forEach.call($("#status-box input"), (e,i)=>{
            $(e).prop("checked", i < number);
        }
        );
    }

    const resultHandler = result=>{
        const current = status.current;

        const {EL_PLUS, } = getEls();

        if (result) {
            // PLUS
            if (status.current === CONFIG.STEPS) {
                status.current = 0;
                status.level++;
                EL_PLUS.click();
            } else {
                status.current += CONFIG.STEP_FORWARD;
            }

        } else {
            // MUNIS
            //add level logic
            status.current = (current - CONFIG.STEP_BACK > 0) ? current - CONFIG.STEP_BACK : 0;
            if (current - CONFIG.STEP_BACK > 0) {
                status.current = current - CONFIG.STEP_BACK;
            } else if (status.level - 1 > 3) {
                EL_MINUS.click();
                status.level--;
            }
        }

        updateCheckboxs(status.current);
    }

    onBindResult(resultHandler);

}
)();
