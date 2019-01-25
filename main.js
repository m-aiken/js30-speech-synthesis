const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
    voices = this.getVoices();
    // Populate voices dropdown
    voicesDropdown.innerHTML = voices
        // Filter for English
        .filter(voice => voice.lang.includes('en'))
        // Display as: Name (language)
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

function setVoice() {
    // Set utterance voice to voice selected in dropdown
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

// Flag of startOver = true automatically restarts speech upon change of parameter
function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

function setOption() {
    // console.log(this.name, this.value);
    // Hook up the controls - Set which property changed and its new value
    msg[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));