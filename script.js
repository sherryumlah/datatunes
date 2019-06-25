// HOWLER JS SET UP FOR SOUND CONTROL

var soundDir = "sounds/";
var note = new Howl({  urls: [soundDir+'silence.mp3', 'silence.ogg']});
var soundPlaylist = [];
var beat = 300;
var stopper = false;

var addtoPlaylist=function(note, position){
  	soundPlaylist[position] = {};
    soundPlaylist[position].name = note;
    soundPlaylist[position].mp3 = soundDir + soundPlaylist[position].name + '.mp3';
    soundPlaylist[position].ogg = soundDir + soundPlaylist[position].name +'.ogg';
    soundPlaylist[position].control = new Howl({ urls: [soundPlaylist[position].mp3, soundPlaylist[position].ogg], buffer:false, volume: 40.0, loop:false});
};

var startPlay = function(playlist, index){
	// function gets called once after for loop
	// playlist and [0] 
	// take soundplaylist as one parameter index as another
	// increment index
	if (index < playlist.length && stopper==false){
		window.setTimeout(function(){
			playlist[index].control.play();
			index++;
			startPlay(playlist, index);
		}, beat);
		$('#playlist').attr('disabled',true);
	} else {
		$('.play').removeClass('disabled');
		$('#playlist').attr('disabled',false);
	};
};



$('.play').on('click', function(e){
	console.log(beat);
	if ($(this).hasClass('disabled')) {
		return;
	} else {
		$(this).addClass('disabled');
		e.preventDefault();
		stopper=false;
		soundPlaylist=[];
		var songSrc =  $('#text').val();
		songSrc = songSrc.split('');
		for (var i = 0; i < songSrc.length; i++){
			
			switch (songSrc[i]){			
				case "z":
					addtoPlaylist('c_low',i);
					break;
				case "3":
					addtoPlaylist('silence',i);
					break;
				case "c":
					addtoPlaylist('c_med',i);
					break;
				case "t":
					addtoPlaylist('c_med',i);
					break;
				case "!":
					addtoPlaylist('c_high',i);
					break;
				case "4":
					addtoPlaylist('d_low',i);
					break;
				case "d":
					addtoPlaylist('d_med',i);
					break;
				case "$":
					addtoPlaylist('d_high',i);
					break;
				case "5":
					addtoPlaylist('e_low',i);
					break;
				case "e":
					addtoPlaylist('e_med',i);
					break;
				case "#":
					addtoPlaylist('e_high',i);
					break;
				case "6":
					addtoPlaylist('f_low',i);
					break;
				case "Y":

					addtoPlaylist('f_med_low',i);
					break;
				case "X":
				case "f":
					addtoPlaylist('f_med',i);
					break;
				case "^":
					addtoPlaylist('f_high',i);
					break;
				case "Z":	
				case "7":
					addtoPlaylist('g_low',i);
					break;
				case "g":
				case "h":
					addtoPlaylist('g_med',i);
					break;
				case "%":
					addtoPlaylist('g_high',i);
					break;
				
				case "8":
				case "1":
					addtoPlaylist('a_low',i);
					break;
				case "a":
					addtoPlaylist('a_med',i);
					break;
				case "p":
				case "q":
				case "*":
					addtoPlaylist('a_high',i);
					break;
				case "2":
				case "9":			
					addtoPlaylist('b_low',i);
					break;
				case "b":
				case "o":
					addtoPlaylist('b_med',i);
					break;
				case "@":
					addtoPlaylist('b_high',i);
					break;
				case "B":
					addtoPlaylist('b_chord1',i);
					break;
				case "&":	
				case "C":
				case "N":
				case "O":
				case "R":			
					addtoPlaylist('c_chord1',i);
					break;
				case "H":
				case "P":
				case "i":
				case "I":
				case "S":
					addtoPlaylist('c_chord2',i);
					break;
				case "Q":
					addtoPlaylist('c_chord3',i);
					break;
				case "D":
				case "j":
				case "s":
					addtoPlaylist('d_chord1',i);
					break;
				case "J":

				case "T":
				case "U":
				case "k":
					addtoPlaylist('d_chord2',i);
					break;
				case "E":
				case "V":
				case "l":
					addtoPlaylist('e_chord1',i);
					break;
				case "K":
				case "W":
				case "u":
					addtoPlaylist('e_chord2',i);
					break;
				case "F":
				case "v":
					addtoPlaylist('f_chord1',i); 
					break;
				case "L":
				case "w":
					addtoPlaylist('f_chord2',i);
					break;
				case "G":
				case "x":	
				case "r":	
				case "m":		
					addtoPlaylist('g_chord2',i);
					break;
				case "M":
				case "y":
				case "n":	
					addtoPlaylist('g_chord2',i);
					break;		
				case "A":
					addtoPlaylist('a_chord2',i);
					break;								
				default:
					addtoPlaylist('silence',i);
			}; // end switch
		}; // end for loop
		startPlay(soundPlaylist, 0);
	};
});

$('.stop').on('click',function(e){
	e.preventDefault();
	stopper=true;
	$('.play').removeClass('disabled');
	$('#playlist').attr("disabled", false);
	

});

$('#playlist').on('change',function(e){
	e.preventDefault();
	if ($(this).val()!=='default'){
		console.log("change song");
		$('#text').val($(this).val());
		$('.play').trigger('click');
		$(this).attr("disabled", true);
		$('.play').addClass('disabled');
		
	};
});

$('#tempo').on('change', function(e){
	beat = $(this).val();
});