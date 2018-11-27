
//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;
    
var gumStream; //stream from getUserMedia()
var rec; //Recorder.js object
var input; //MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext; //new audio context to help us record

function startRecording() {
    console.log("recordButton clicked");
 
    var constraints = { audio: true, video:false }

    $('#button-record').css('display', 'none');
    $('#button-stop').css('display', 'inline-block');
 
    /*
    We're using the standard promise based getUserMedia()
    https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    */
 
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
        rec = new Recorder(input,{numChannels:1})
 
        //start the recording process
        rec.record()
 
        console.log("Recording started");
 
    }).catch(function(err) {
        //enable the record button if getUserMedia() fails
        alert('Ups, Coba ulangi lagi ya');
        $('#button-stop').css('display', 'none');
        $('#button-record').css('display', 'inline-block');
    });
}

function stopRecording() {
    console.log("stop button clicked");
 
    //disable the stop button, enable the record too allow for new recordings
    $('#button-stop').css('display', 'none');
    $('#button-record').css('display', 'inline-block');

    
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
            $('#button-record').attr('class', 'button is-primary is-rounded');
        }
    });

}

$('document').ready(function() {
    $('#button-record').click(function() {
        startRecording();
    });

    $('#button-stop').click(function() {
        stopRecording();
        // after click
        // $('#button-stop').attr('class', 'button is-primary is-rounded is-loading');
    });
});