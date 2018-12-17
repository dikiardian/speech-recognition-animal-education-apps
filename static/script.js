var audioAnjing = new Audio('../static/suara-anjing.mp3');
var audioAyam = new Audio('../static/suara-ayam.mp3');
var audioKambing = new Audio('../static/suara-kambing.mp3');
var audioKucing = new Audio('../static/suara-kucing.mp3');
var audioSapi = new Audio('../static/suara-sapi.mp3');
var audioUlar = new Audio('../static/suara-ular.mp3');

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
        resampler = new Resampler(44100, 16000);
        input.connect(resampler);
        resampler.connect(audio_context.destination);
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

    // $('#button-record').attr('class', 'button is-primary is-rounded is-loading');
 
    rec.stop();
 
    //stop microphone access
    gumStream.getAudioTracks()[0].stop();
 
    //create the wav blob and pass it
    rec.exportWAV(upload);

}

function getResult(data) {
    if (data.includes('lihat anjing')){
        $('#modal-image-dom').attr('src','../static/anjing.jpg');
        $('#modal-image').attr('class', 'modal is-active');
    } else if (data.includes('lihat ayam')) {
        $('#modal-image-dom').attr('src','../static/ayam.jpg');
        $('#modal-image').attr('class', 'modal is-active');
    } else if (data.includes('lihat kambing')) {
        $('#modal-image-dom').attr('src','../static/kambing.jpg');
        $('#modal-image').attr('class', 'modal is-active');
    } else if (data.includes('lihat kucing')) {
        $('#modal-image-dom').attr('src','../static/kucing.jpg');
        $('#modal-image').attr('class', 'modal is-active');
    } else if (data.includes('lihat sapi')) {
        $('#modal-image-dom').attr('src','../static/sapi.jpg');
        $('#modal-image').attr('class', 'modal is-active');
    } else if (data.includes('lihat ular')) {
        $('#modal-image-dom').attr('src','../static/ular.jpg');
        $('#modal-image').attr('class', 'modal is-active');
    } else if (data.includes('apa itu anjing')) {
        $('#modal-text-title').html('Anjing');
        $('#modal-text-content').html('Anjing adalah mamalia yang telah mengalami domestikasi dari serigala sejak 15.000 tahun yang lalu atau mungkin sudah sejak 100.000 tahun yang lalu berdasarkan bukti genetik berupa penemuan fosil dan tes DNA.');
        $('#modal-text').attr('class', 'modal is-active');
    } else if (data.includes('apa itu ayam')) {
        $('#modal-text-title').html('Ayam');
        $('#modal-text-content').html('Ayam adalah hewan aves atau unggas. bernafas dengan paru paru, tudak bisa terbang, memiliki paruh, memiliki 2 kaki yg fungsinya untuk mengais tanah agar bisa mencari makanan.');
        $('#modal-text').attr('class', 'modal is-active');
    } else if (data.includes('apa itu kambing')) {
        $('#modal-text-title').html('Kambing');
        $('#modal-text-content').html('Kambing adalah salah satu jenis ternak penghasil daging dan susu yang sudah lama dikenal petani dan memiliki potensi sebagai komponen usaha tani yang penting di berbagai agri-ekosistem.');
        $('#modal-text').attr('class', 'modal is-active');
    } else if (data.includes('apa itu kucing')) {
        $('#modal-text-title').html('Kucing');
        $('#modal-text-content').html('Kucing adalah sejenis mamalia karnivora dari keluarga Felidae. ... Kucing juga memiliki sebutan kucing domestik atau kucing rumah (Nama Ilmiah Kucing yaitu Felis silvestris catus atau Felis Catus) merupakan nama latin kucing.');
        $('#modal-text').attr('class', 'modal is-active');
    } else if (data.includes('apa itu Sapi')) {
        $('#modal-text-title').html('Sapi');
        $('#modal-text-content').html('Sapi adalah hewan ternak anggota suku Bovidae dan anak suku Bovinae. Sapi yang telah dikebiri dan biasanya digunakan untuk membajak sawah dinamakan Lembu. Sapi dipelihara terutama untuk dimanfaatkan susu dan dagingnya sebagai pangan manusia.');
        $('#modal-text').attr('class', 'modal is-active');
    } else if (data.includes('apa itu ular')) {
        $('#modal-text-title').html('Ular');
        $('#modal-text-content').html('Ular adalah reptilia tak berkaki yang bertubuh panjang. Ular memiliki sisik seperti kadal dan sama-sama digolongkan ke dalam reptil bersisik (Squamata). Perbedaannya adalah kadal pada umumnya berkaki, memiliki lubang telinga, dan kelopak mata yang dapat dibuka tutup.');
        $('#modal-text').attr('class', 'modal is-active');
    } else if (data.includes('suara anjing')) {
        $('#modal-text-title').html('Suara Anjing');
        $('#modal-text-content').html('Dengarkan suara ini... <br> <a class="button is-primary" onclick="audioAnjing.play()">Putar lagi</a> ');
        $('#modal-text').attr('class', 'modal is-active');
        audioAnjing.play();
    } else if (data.includes('suara ayam')) {
        $('#modal-text-title').html('Suara Ayam');
        $('#modal-text-content').html('Dengarkan suara ini... <br> <a class="button is-primary" onclick="audioAyam.play()">Putar lagi</a> ');
        $('#modal-text').attr('class', 'modal is-active');
        audioAyam.play();
    } else if (data.includes('suara kambing')) {
        $('#modal-text-title').html('Suara Kambing');
        $('#modal-text-content').html('Dengarkan suara ini... <br> <a class="button is-primary" onclick="audioKambing.play()">Putar lagi</a> ');
        $('#modal-text').attr('class', 'modal is-active');
        audioKambing.play();
    } else if (data.includes('suara kucing')) {
        $('#modal-text-title').html('Suara Kucing');
        $('#modal-text-content').html('Dengarkan suara ini... <br> <a class="button is-primary" onclick="audioKucing.play()">Putar lagi</a> ');
        $('#modal-text').attr('class', 'modal is-active');
        audioKucing.play();
    } else if (data.includes('suara Sapi')) {
        $('#modal-text-title').html('Suara Sapi');
        $('#modal-text-content').html('Dengarkan suara ini... <br> <a class="button is-primary" onclick="audioSapi.play()">Putar lagi</a> ');
        $('#modal-text').attr('class', 'modal is-active');
        audioSapi.play();
    } else if (data.includes('suara ular')) {
        $('#modal-text-title').html('Suara Ular');
        $('#modal-text-content').html('Dengarkan suara ini... <br> <a class="button is-primary" onclick="audioUlar.play()">Putar lagi</a> ');
        $('#modal-text').attr('class', 'modal is-active');
        audioUlar.play();
    } 
    
    $('#text-state').html('Klik tombol di bawah dan katakan apa yang ingin kamu tahu!');
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
            $('#text-state').html('Aku mendengar darimu : <strong>'+ data.result +'</strong> <br> Tunggu.');
            setTimeout(function() {
                $('#text-state').html('Aku mendengar darimu : <strong>'+ data.result +'</strong> <br> Tunggu..');
            }, 700);
            setTimeout(function() {
                $('#text-state').html('Aku mendengar darimu : <strong>'+ data.result +'</strong> <br> Tunggu...');
            }, 1400);
            setTimeout(function() {
                getResult(data.result);
            }, 2000);
        },
        error: function() {
            alert('Ups, Coba ulangi lagi ya');
            $('#text-state').html('Klik tombol di bawah dan katakan apa yang ingin kamu tahu!');
        },
        complete: function() {
            // $('#text-state').html('Klik tombol di bawah dan katakan apa yang ingin kamu tahu!');
            // $('#button-record').attr('class', 'button is-primary is-rounded');
        }
    });
}

$('document').ready(function() {
    $('#button-record-img').click(function() {
        const src = $('#button-record-img').attr('src');
        if (src === '../static/microphone.png') {
            startRecording();
        } else {
            stopRecording();
        }
    });

    $('#modal-image-close').click(function() {
        $('#modal-image').attr('class', 'modal');
    });

    $('#modal-text-close').click(function() {
        $('#modal-text').attr('class', 'modal');
    });
});