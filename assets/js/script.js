document.addEventListener('DOMContentLoaded', function() {
    // Define sample texts for each difficulty level
    const texts = {
        easy: [
            "The cat sat on the mat.",
            "A quick brown fox jumps over the lazy dog.",
            "She sells seashells by the seashore."
        ],
        medium: [
            "To be or not to be, that is the question.",
            "All that glitters is not gold.",
            "A journey of a thousand miles begins with a single step."
        ],
        hard: [
            "It was the best of times, it was the worst of times.",
            "In the beginning God created the heavens and the earth.",
            "The quick brown fox jumps over the lazy dog, while the dog barks loudly."
        ]
    };

    // Get references to the select element and the sample text div
    const difficultySelect = document.getElementById('difficultySelect');
    const sampleTextDiv = document.getElementById('sample-text');
    const startButton = document.getElementById('start-btn');
    const stopButton = document.getElementById('stop-btn');
    const userInput = document.getElementById('user-input');
    const timeDisplay = document.getElementById('time');
    const levelDisplay = document.getElementById('level');
    const wpmDisplay = document.getElementById('wpm');

    let startTime, endTime;

    // Function to get a random text from an array
    function getRandomText(textArray) {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        return textArray[randomIndex];
    }

    // Function to update the sample text based on the selected difficulty
    function updateSampleText() {
        const selectedDifficulty = difficultySelect.value;
        const selectedText = getRandomText(texts[selectedDifficulty]);
        sampleTextDiv.textContent = selectedText;
    }

    // Function to calculate WPM
    function calculateWPM() {
        const sampleText = sampleTextDiv.textContent;
        const userText = userInput.value;
        const sampleWords = sampleText.split(' ');
        const userWords = userText.split(' ');

        let correctWords = 0;
        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        const timeTaken = (endTime - startTime) / 1000 / 60; // time in minutes
        const wpm = Math.round(correctWords / timeTaken);
        return wpm;
    }

   // Function to start the test
    function startTest() {
        startTime = new Date();
        startButton.disabled = true;
        stopButton.disabled = false;
        userInput.disabled = false;
        userInput.value = '';
        userInput.focus();
    }

    // Function to stop the test
    function stopTest() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000;
        timeDisplay.textContent = timeTaken.toFixed(2);
        startButton.disabled = false;
        stopButton.disabled = true;
        userInput.disabled = true;

        const wpm = calculateWPM();
        wpmDisplay.textContent = wpm;
        levelDisplay.textContent = difficultySelect.value.charAt(0).toUpperCase() + difficultySelect.value.slice(1);
    }
    
    // Function to initialize the page
    function initializePage() {
        userInput.disabled = true;
        updateSampleText();
    }
    // Add event listeners to buttons
    startButton.addEventListener('click', startTest);
    stopButton.addEventListener('click', stopTest);

    // Add event listener to update the text when the difficulty changes
    difficultySelect.addEventListener('change', updateSampleText);

    // Initialize with a random text based on the default selected difficulty
    updateSampleText();
    // Initialize the page when it loads
    initializePage();
});