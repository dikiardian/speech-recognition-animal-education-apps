var gumStream; //stream from getUserMedia()
var rec; //Recorder.js object
var input; //MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext; //new audio context to help us record

function startRecording() {
    console.log("recordButton clicked");
 
    var constraints = { audio: true, video:false };

    // change image
    $('#button-record-img').attr('src', '../static/stop.png');
    $('#text-state').html('Aku mendengarmu.... <br> Tekan tombol di bawah untuk mendapatkan yang kamu inginkan.');

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
 
        /* assign to gumStream for later use */
        gumStream = stream;
 
        /* use the stream */
        input = audioContext.createMediaStreamSource(stream);
 
        /* 
        Create the Recorder object and configure to record mono sound (1 channel)
        Recording 2 channels  will double the file size
        */
        rec = new Recorder(input,{numChannels:1});
 
        //start the recording process
        rec.record();
 
        console.log("Recording started");
    }).catch(function(err) {
        alert('Ups, Coba ulangi lagi ya');
        $('#button-record-img').attr('src', '../static/microphone.png');
        $('#text-state').html('Klik tombol di bawah dan katakan apa yang ingin kamu tahu!');
    });
}

function stopRecording() {
    console.log("stop button clicked");
 
    //disable the stop button, enable the record too allow for new recordings
    $('#button-record-img').attr('src', '../static/microphone.png');
    $('#text-state').html('Aku berfikir dulu ya...');
    setTimeout(function() {
        $('#text-state').html('Hmm, susah juga ternyata...');
    }, 3000);
    setTimeout(function() {
        $('#text-state').html('Sepertinya suaramu tadi tidak terlalu jelas...');
    }, 6000);

    
    // $('#button-record').attr('class', 'button is-primary is-rounded is-loading');
 
    rec.stop();
 
    //stop microphone access
    gumStream.getAudioTracks()[0].stop();
 
    //create the wav blob and pass it
    rec.exportWAV(upload);

}

function upload(blob) {

    var filename = new Date().toISOString(); //filename to send to server without extension

    var formData = new FormData();
    formData.append("audio_data", blob, filename);

    $.ajax({
        url : '/predict',
        type : 'POST',
        data : formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        success : function(data) {
            // $('#result').css('display', 'block');
            // $('.rate-off').css('display', 'inline-block');
            // $('.rate-on').css('display', 'none');
            // for (var i=1; i<=data.rating; i++) {
            //     console.log('masuk');
            //     $('#rate'+ i + '-off').css('display', 'none');
            //     $('#rate'+ i + '-on').css('display', 'inline-block');
            // }
        },
        error: function() {
            alert('Ups, Coba ulangi lagi ya');
        },
        complete: function() {
            // $('#button-record').attr('class', 'button is-primary is-rounded');
        }
    });

}

$('document').ready(function() {
    $('#button-record-img').click(function() {
        // const text = $('#text-state').html();
        const src = $('#button-record-img').attr('src');
        // if (text === "Aku berfikir dulu ya..." || text === "Aku berfikir dulu ya...") {
        //     return;
        // }
        if (src === '../static/microphone.png') {
            startRecording();
        } else {
            stopRecording();
        }
    });
});