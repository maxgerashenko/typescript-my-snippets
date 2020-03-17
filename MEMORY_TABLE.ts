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
    0: ["Nuton",      "eats",   "Bland Apple"    ],
    1: ["Tesla",      "drives", "A Fresh Car"    ],
    2: ["Einstein",   "showes", "A Sour Tang"    ],
    3: ["Chaplin",    "wears",  "Salty Shoes"    ],
    4: ["Mozart",     "plays",  "Juicy Music"    ],
    5: ["Elvis",      "sings",  "Sweet Songs"    ],
    6: ["Jackson",    "dances", "Spicy Moves"    ],
    7: ["Armstrong",  "jumps",  "A Cheesy Moon"  ],
    8: ["Wright",     "flyes",  "Crunchy Plains" ],
    9: ["Marilyn",    "hides",  "A Ripe Bottom"  ],
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

