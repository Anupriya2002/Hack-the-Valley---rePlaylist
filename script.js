const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector(".progress-bar"),
progressArea = wrapper.querySelector(".progress-area"),
musicList = wrapper.querySelector(".music-list"),
showMoreBtn= wrapper.querySelector("#more-music"),
hideMusicBtn = musicList.querySelector("#close");


let musicIndex = 2;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
})


function loadMusic (indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].img}`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}`;
}

//play music
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

//pause music
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

//function to play next song
function nextMusic(){
    musicIndex++;
    //currently,  there are only 5 songs in list, check if index out of range
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

//function to play previous song
function prevMusic(){
    musicIndex--;
    //currently,  there are only 5 songs in list, check if index out of range
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

//check if music is playing or is paused and play or pause accordingly
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
});


//play next song
nextBtn.addEventListener("click", ()=>{
    nextMusic();
});


//play previous song
prevBtn.addEventListener("click", ()=>{
    prevMusic();
});

//update song duration bar based on current time
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; //get the current passed in song
    const duration = e.target.duration; //get total duration of song
    let progressWidth =  (currentTime/duration) * 100;
    progressBar.style.width = `${progressWidth}%`; //update progress bar accordingly

    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration"); 

    mainAudio.addEventListener("loadeddata", ()=>{
        //update total song duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60); //convert and print as minutes
        let totalSec = Math.floor(audioDuration % 60); //convert and print as seconds
        if(totalSec < 10){ //adding 0-> eg. 3:08
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    //update current song's playing time-> how much of a song has already been played
    let currentMin = Math.floor(currentTime / 60); //convert and print as minutes
    let currentSec = Math.floor(currentTime % 60); //convert and print as seconds
    if(currentSec < 10){ //adding 0-> eg. 3:08
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    });

    //update song's current time according to progress bar's width
progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth; //get width of progress bar
    let clickedOffSetX = e.offsetX; //get x value of offset
    let songDuration = mainAudio.duration;
        
    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});


//repeating and shuffling music

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click",  ()=>{
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat": 
            repeatBtn.innerText = "repeat_one"; //repeat current value in innertext -> change icon to repeat once
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle"; //repeat current value in innertext, change repeat-one icon to shuffle
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat"; //change shuffle icon to repeat
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});

//after the current song ends
mainAudio.addEventListener("ended", ()=>{
    //check if the user wants to loop the song, else move on to next song
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat": //if user wants to play the next song
            nextMusic();
            break;
        case "repeat_one": //if user wants to play current song again
            mainAudio.currentTime = 0; //set currentTime to 0 to restart song
            loadMusic(musicIndex);
            playMusic();
            break; 
        case "shuffle": //if user wants to shuffle their playlist
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do{
                randIndex = Math.floor((Math.random() * allMusic.length) + 1); //find an in range randomm index that is not the current index
            } while(musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex); 
            playMusic(); //play random song 
            break;
    }
});

showMoreBtn.addEventListener("click", ()=>{
    //display all songs in playlist
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", ()=>{
    //hide all songs in playlist
    showMoreBtn.click();
    
});

const ulTag = wrapper.querySelector("ul");

for(let i = 0; i , allMusic.length; i++){

    let liTag = `<li li-index="${i}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}"></audio>
                    <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

 
}




/* <li>
                    <div class="row">
                        <span>Ikson Anywhere - Ikson</span>
                        <p>Audio Library</p>
                    </div>
                    <span class="audio-duration">3:40</span>
                </li>

                <li>
                    <div class="row">
                        <span>Ikson Anywhere - Ikson</span>
                        <p>Audio Library</p>
                    </div>
                    <span class="audio-duration">3:40</span>
                </li>

                <li>
                    <div class="row">
                        <span>Ikson Anywhere - Ikson</span>
                        <p>Audio Library</p>
                    </div>
                    <span class="audio-duration">3:40</span>
                </li>

                <li>
                    <div class="row">
                        <span>Ikson Anywhere - Ikson</span>
                        <p>Audio Library</p>
                    </div>
                    <span class="audio-duration">3:40</span>
                </li> */