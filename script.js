console.log("welcome to spotfy");

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("music/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"ishq de Fanniyar", filePath:"music/1.mp3", coverPath:"song_img/img1.jpeg"},
    {songName:"Kina chir", filePath:"music/11.mpeg", coverPath:"song_img/img11.png"},
    {songName:"Ishqa ve", filePath:"music/22.mpeg", coverPath:"song_img/img22.png"},
    {songName:"Mann mera", filePath:"music/33.mpeg", coverPath:"song_img/img33.png"},
    {songName:"Tum ho toh", filePath:"music/44.mpeg", coverPath:"song_img/img44.png"},
    {songName:"Mahi aaja", filePath:"music/55.mpeg", coverPath:"song_img/img55.png"},
    {songName:"KALYANI", filePath:"music/66.mpeg", coverPath:"song_img/img66.png"},
    {songName:"Toota jo kabhi tara", filePath:"music/77.mpeg", coverPath:"song_img/img77.png"},
    {songName:"Chahun main ya naa", filePath:"music/88.mpeg", coverPath:"song_img/img88.png"},
    {songName:"Teri deewani", filePath:"music/99.mpeg", coverPath:"song_img/img99.png"}


]

songItems.forEach((Element, i)=>{
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

});

//audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
       // play song
        audioElement.play();

        // change icon to pause
        masterPlay.src = "pause.svg";
        gif.style.opacity = 1;

        updateCurrentSongButton();
             
    }else{
        // pause song
        audioElement.pause();

        //change to play
         masterPlay.src = "play.svg";
          gif.style.opacity = 0;

          makeAllPlays();
    }
});

//listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

audioElement.addEventListener('ended', () => {

    // Next song par jao
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    // Next song load karo
    audioElement.src = songs[songIndex].filePath;

    // Song name update
    masterSongName.innerText = songs[songIndex].songName;

    // Image update
    gif.src = songs[songIndex].coverPath;

    // Starting position
    audioElement.currentTime = 0;

    // Next song play
    audioElement.play();

    // Bottom pause icon
    masterPlay.src = "pause.svg";

    // GIF/image visible
    gif.style.opacity = 1;

    // Upar current song ke button ko pause icon
    updateCurrentSongButton();
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


const makeAllPlays = ()=>{
     Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element)=>{
        Element.src = "play.svg";
    });

};

const updateCurrentSongButton = () => {
    makeAllPlays();

    let currentButton = document.getElementById(String(songIndex + 1));

    if (currentButton) {
        currentButton.src = "pause.svg";
    }
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {

    Element.addEventListener('click', (e) => {

        let clickedIndex = parseInt(e.currentTarget.id) - 1;

        // Agar wahi song already chal raha hai
        if (songIndex === clickedIndex && !audioElement.paused) {

            audioElement.pause();

            e.currentTarget.src = "play.svg";
            masterPlay.src = "play.svg";
            gif.style.opacity = 0;

        } 
        
        // Naya song click kiya
        else {

            makeAllPlays();

            songIndex = clickedIndex;

            e.currentTarget.src = "pause.svg";

            audioElement.src = songs[songIndex].filePath;

            masterSongName.innerText = songs[songIndex].songName;

            gif.src = songs[songIndex].coverPath;

            audioElement.currentTime = 0;
            audioElement.play();

            masterPlay.src = "pause.svg";
            gif.style.opacity = 1;
        }
    });
});


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= songs.length - 1){
        songIndex = 0;
    }else{
        songIndex += 1;
    }

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    gif.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.src = "pause.svg";

    updateCurrentSongButton();
   

});


document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = songs.length - 1;
    }else{
        songIndex -= 1;
    }

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    gif.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.src = "pause.svg";

    updateCurrentSongButton();
    

});