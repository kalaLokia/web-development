buttonCount = document.querySelectorAll(".drum").length;
// console.log(buttonCount);




// From selecting/touching the button on the screen makes the sound
for (var i=0; i < buttonCount; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {  
        drumSounds(this.innerHTML);
    });
}

// From keyboard key press event makes the sound
document.addEventListener("keydown", (event)=> {
    drumSounds(event.key);
    
});

// Drum audio list
function drumSounds(drum) {
    switch (drum) {
        case "w":
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            break;
        case "a":
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
            break;
        case "s":
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
            break;
        case "d":
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
            break;
        case "j":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;
        case "k":
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
            break;
        case "l":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;

        default:
            console.log("Couldn't play the audio");
    }
}