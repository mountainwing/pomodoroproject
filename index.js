let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let decreaseBtn = document.getElementById('decreaseBtn');
let increaseBtn = document.getElementById('increaseBtn');
let bookBtn = document.getElementById('bookBtn');
let totalElapsedTimeStudy = 0;     // Variable to store total elapsed time (in milliseconds)
let logResult = document.getElementById('logrecord-container'); //Showing the analysis
let tabtimer = document.getElementById('tabtimer');
let calculationPerformedStudy = false;
let alertSound = document.getElementById('alert-sound'); // Select the audio element
let messageElement = document.getElementById('endMessage-container'); // Assuming you have a message element (optional)
let studymode = true;
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`; // making 24:59 +1 so display will be 25:00
const popup = document.getElementById('popup');
const openPopupBtn = document.getElementById('openPopup');
const studyTimeSelect = document.getElementById('studyTimeSelect');

// Audio files
let startSoundeffect = new Audio("pedro_pedro_pe.mp3");
let endSoundeffect = new Audio("file1.mp3");
let takebreakSoundEffect = new Audio("limbehbreak.mp3");

const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

// resetFunctionality
reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

//focusFunctionality
focusButton.addEventListener("click", () => {
  studymode = true;
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  console.log("Focus mode");
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});


//shortbreakFunctionality
shortBreakButton.addEventListener("click", () => {
  active = "short";
  studymode = false;
  removeFocus();
  console.log("Break mode");
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
  logResult.classList.toggle("hide");
});


//longbreakFunctionality
longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  studymode = false;
  console.log("Break mode");
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
  logResult.classList.toggle("hide");
});


//pauseFuncitonality
pause.addEventListener("click", (pauseTimer = () => {

  pauseTimeValue = resumeTimeStudy();
  paused = true;
  clearInterval(set);
  if(!calculationPerformedStudy) {
    intervalSumStudy();
    calculationPerformedStudy = true; //toggle back
  }
  startBtn.classList.remove("hide");
  bookBtn.classList.remove("hide");
  // increaseBtn.classList.remove("hide");
  // decreaseBtn.classList.remove("hide");
  pause.classList.remove("show");
  reset.classList.remove("hide");
  openPopupBtn.classList.remove("hide");
}
));

//startFunctionality MAIN FUNCTION
startBtn.addEventListener("click", () => {

//on focus mode
  if(calculationPerformedStudy){
    calculationPerformedStudy = false;
  }
  if (studymode) {
    startSoundeffect.play();
  }
  else if (!studymode) {
    takebreakSoundEffect.play();
  }

  currentTimeValue = startTimerStudy();

  openPopupBtn.classList.remove("show");
  openPopupBtn.classList.add("hide");
  reset.classList.remove("show");
  reset.classList.add("hide");
  pause.classList.add("show");
  bookBtn.classList.add("hide");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  // increaseBtn.classList.remove("show");
  // decreaseBtn.classList.remove("show");
  bookBtn.classList.remove("show");
  messageElement.classList.add("hide");

  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0 ) {
          minCount--;
          count = 60;
        }
        else {
          clearInterval(set);
          endSoundeffect.play();
          messageElement.classList.remove("hide");
        }
      }
      // titlebar live clock
      tabtimer.innerHTML = `${minCount.toString().padStart(2, '0')}:${count.toString().padStart(2, '0')} || studywithwing`;
    }, 1000);
  }
}
  
);

// //for clicking functionality
// increaseBtn.addEventListener("click", function() {
//   // Single click: Increment count once
//   count = Math.min(count + 1, 59);
//   // Check and update minCount if needed
//   if (count === 59) {
//     count = 0;
//     minCount++;
//   }
//   time.textContent = `${minCount}:${count.toString().padStart(2, '0')}`;
// });

// //for click-and-hold
// let isHolding = false; // Flag to track if the button is being held

// increaseBtn.addEventListener("mousedown", function() {
//   isHolding = true; // Set flag to true when mousedown occurs

//   const increaseInterval = setInterval(() => {
//     // Increment count and limit it to a maximum of 59
//     count = Math.min(count + 1, 59);

//     // Check if count reached 59 (reset count and increment minCount)
//     if (count === 59) {
//       count = 0;
//       minCount++;
//     }

//     time.textContent = `${minCount}:${count.toString().padStart(2, '0')}`;
//   }, 100); // Adjust interval as needed (lower value for faster increase)

//   // Clear the interval when the button is released (mouseup)
//   increaseBtn.addEventListener("mouseup", function() {
//     isHolding = false;
//     clearInterval(increaseInterval);
//   });
// });

// //decrease click functionality
// decreaseBtn.onclick = function(){
//   // Increment count but limit it to a maximum of 59
//   count = Math.max(count -1, 0);
//   // Check if count reached 0 (reset count and increment minCount)
//   if (count === 0) {
//     count = 59;
//     minCount--;
//   }
//   time.textContent = `${minCount}:${count.toString().padStart(2,'0')}`;
// }

// //decrease click and hold function
// let isHoldingDecrease = false; // Flag to track hold state for decrease button

// decreaseBtn.addEventListener("mousedown", function() {
//   isHoldingDecrease = true; // Set flag to true when mousedown occurs

//   const decreaseInterval = setInterval(() => {
//     // Decrement count and limit it to a minimum of 0
//     count = Math.max(count - 1, 0);

//     // Check if count reached 0 (reset count and decrement minCount)
//     if (count === 0) {
//       count = 59;
//       minCount--;
//     }

//     time.textContent = `${minCount}:${count.toString().padStart(2, '0')}`;
//   }, 100); // Adjust interval as needed (lower value for faster decrease)

//   // Clear the interval when the button is released (mouseup)
//   decreaseBtn.addEventListener("mouseup", function() {
//     isHoldingDecrease = false;
//     clearInterval(decreaseInterval);
//   });
// });

function resumeTimeStudy() {

  const pauseTimeStudy = performance.now();
  console.log(`Pause Time Study: ${pauseTimeStudy}`);

  return pauseTimeStudy;
}

function startTimerStudy() {

  const currentTimeStudy = performance.now();
  console.log(`Start Time Study: ${currentTimeStudy}`);
  return currentTimeStudy;
}

function intervalSumStudy() {
  if (studymode) {
    const intervalTimeStudy = (pauseTimeValue - currentTimeValue) / 60000;
    console.log(`Interval time for study: ${intervalTimeStudy}`);
  
    totalElapsedTimeStudy += intervalTimeStudy;
    console.log(`Total study time: ${totalElapsedTimeStudy}`);
  
  return totalElapsedTimeStudy;
  }
}

bookBtn.addEventListener('click', function() {
  logResult.classList.toggle("hide");
  
  // To display results in html div
  const studyAnalysis = document.getElementById("logResult");
  //return results to html
  studyAnalysis.innerHTML = `
  <h2>Study Analysis</h2>
  <h3>Total study time: ${Math.round(totalElapsedTimeStudy)} minutes.</h3>
  <h3>加油哦 	＼(≧▽≦)／</h3>
  `
})

// Event listener to toggle the popup and confirm the study time
openPopupBtn.addEventListener('click', () => {

  // Get the study time value from the input field
  const studyTime = parseInt(studyTimeSelect.value, 10);
  minCount = studyTime - 1;
  count = 59;
  console.log(minCount);
  
  // Toggle the display property of the popup
  if (popup.style.display === 'block') {
    time.textContent = `${minCount + 1}:00`; //change dispay timer 
    popup.style.display = 'none'; // Hide the popup
  } else {
    popup.style.display = 'block'; // Show the popup
  }
  
  
});


// JavaScript code to keep the tab active
function keepTabActive() {
  // Focus on the window whenever it loses focus
  window.addEventListener('blur', function() {
      window.focus();
  });
}

// Call the function to keep the tab active
keepTabActive();

