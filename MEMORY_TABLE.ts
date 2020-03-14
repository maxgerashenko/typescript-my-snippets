console.clear();
(()=>{

setTimeout(()=>{
  alert('Good Job')
}, 3*60*60);

const CONFIG = {
  LETTERS_COUNT: 3,
  NUMBER_LENGTH: 3,
  RANDOM_LETTERS: 1,
  RESULT_TIME_DELAY: 3000,
}

const MEMORY_MAP = {
    0: ["Oct",       "eat",    "Bland Apple"      ],
    1: ["Jan",       "drives", "A Fresh Car"      ],
    2: ["Feb",       "showes", "A Sour Tang"      ],
    3: ["March",     "wears",  "Salty Shoes"      ],
    4: ["April",     "plays",  "Juicy Music"      ],
    5: ["May",       "sings",  "Sweet Songs"      ],
    6: ["June",      "dances", "Spicy Moves"      ],
    7: ["July",      "jumps",  "A Cheesy Moon"    ],
    8: ["Augast",    "flyes",  "Crunchy Plains"   ],
    9: ["Sept",      "hides",  "A Ripe Bottom"    ],
}


function getRandom(max=CONFIG.LETTERS_COUNT){
  return Math.floor(Math.random() * Math.floor(max));
}


function getNumber(lettersCount=CONFIG.NUMBER_LENGTH, randomCount =CONFIG.RANDOM_LETTERS) {
  let number = '';
  let random = 0;
  for(let i=0; i < lettersCount; i++) {
    random = (randomCount - i) > 0 ? getRandom() : random;
    number += random;
  }

  return number;
}

function code(string){
  return string.split('').map( (l, i) => MEMORY_MAP[l][i%3]).join(" ")
}


  let number = getNumber();

  console.log(number);

  setTimeout(() => {
    console.log(code(number));
  }, CONFIG.RESULT_TIME_DELAY)
})();

