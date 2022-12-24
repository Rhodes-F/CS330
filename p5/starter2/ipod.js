// Create your global variables below:
var tracklist = ["Let It Happen", "Nangs", "The Moment", "Yes I'm Changing", "Eventually", "Gossip", "The Less I Know The Better", "Past Life", "Disciples", "'Cause I'm A Man"];
var volLevels = [];
var volume_level = 0;
var song_time = 0;
var playing = null;

//fillign the timer blocks
function init() {
	for (let i = 0; i < 6; i++){
		volLevels.push(document.getElementById("vl"+i))
	}

	for (let i = 0; i < 3; i++){
		volLevels[i].classList.toggle("turn-on")
		volume_level = i
	}
};


//turns up the volume if its not at 5
function volUp() {
	if (volume_level < 5){
		volLevels[volume_level + 1].classList.toggle("turn-on")
		volume_level = volume_level + 1
	}
};
//turns up the volume if its not at 0
function volDown() {
	if (volume_level >= 0){
		volLevels[volume_level].classList.toggle("turn-on")
		volume_level = volume_level - 1
	}
};

//turns the play button into a pause button or vice versa when clicked
function switchPlay() {
	let button = document.getElementById("play-button")
	if (!playing){
		button.innerHTML = `<i class="material-icons">pause</i>`

		playing = setInterval(playingBar, 1000);
	} else {
		button.innerHTML = `<i class="material-icons">play_arrow</i>`
		clearInterval(playing)
		playing = null
	}
}

//makes the player bar move 
function playingBar(){
	let bar = document.getElementById("player-bar");
	let time_elapsed = document.getElementById("time-elapsed");
	if ( song_time < 180) {
		song_time = song_time + 1
		bar.innerHTML = `<input type="range" value="${song_time}" min="0" max="180" class="time-slider"></input>`
		time_elapsed.innerHTML = secondsToMs(song_time)
	} else { 
		nextSong()
	}
	
}

// skips to the next song in the list. will loop around
function nextSong() {
	timer_reset()

	let song_title_container = document.getElementById("player-album-name");
	let song_name = song_title_container.textContent;
	
	const isSong = (e) => e === song_name;

	let song_index = tracklist.findIndex(isSong);
	let next_index = song_index + 1;

	if (song_index == tracklist.length - 1){
		next_index = 0
	}

	song_title_container.innerHTML = tracklist[next_index]

}


// skips to the previous song in the list. will loop around
function prevSong() {
	timer_reset()

	let song_title_container = document.getElementById("player-album-name");
	let song_name = song_title_container.textContent;
	
	const isSong = (e) => e === song_name;

	let song_index = tracklist.findIndex(isSong);
	let prev_index = song_index - 1;

	if (song_index == 0){
		prev_index = tracklist.length - 1
	}

	song_title_container.innerHTML = tracklist[prev_index]

}

//brings the timer bar back to zero. used when you get a new song
function timer_reset(){
	let bar = document.getElementById("player-bar");
	let time_elapsed = document.getElementById("time-elapsed");

	song_time = 0 

	bar.innerHTML = `<input type="range" value="${song_time}" min="0" max="180" class="time-slider"></input>`
	time_elapsed.innerHTML = secondsToMs(song_time)
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();