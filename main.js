var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function run(event) {
    console.log(event);

    var content = event.results[0][0].transcript;
    console.log(content);
    document.getElementById("textbox").innerHTML = content;
    if (content == "take my selfie") {
        console.log("Taking selfie - ");
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;

    console.log("synth = " + synth);

    speak_data = " Taking your Selfie in 5 seconds ";

    console.log("speak_data = " + speak_data);

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    console.log("utterthis = " + utterThis);

    synth.speak(utterThis);
    
    Webcam.attach(camera);

    setTimeout(function(){
        take_snapshot();
        save();
    },5000);
}

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("cam");

function take_snapshot(){
    console.log("take_snapshot");
    Webcam.snap(function(data_uri){
        console.log("data_uri = " + data_uri);
        document.getElementById("result").innerHTML = '<img id ="selfie_image" src = "' + data_uri + '">';
    });
}

function save(){
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}