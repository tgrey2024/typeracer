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
    const userInput = document.getElementById('user-input');
    const timeDisplay = document.getElementById('time');
    const levelDisplay = document.getElementById('level');
    const wpmDisplay = document.getElementById('wpm');

    let startTime, endTime;
    let testStarted = false;

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
        testStarted = true;
        userInput.disabled = false;
        userInput.value = '';
        userInput.focus();
    }

    // Function to stop the test
    function stopTest() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000;
        timeDisplay.textContent = timeTaken.toFixed(2);
        userInput.disabled = true;

        const wpm = calculateWPM();
        wpmDisplay.textContent = wpm;
        levelDisplay.textContent = difficultySelect.value.charAt(0).toUpperCase() + difficultySelect.value.slice(1);
    }
    
    // Function to highlight typed words
    function highlightTypedWords() {
        const sampleText = sampleTextDiv.textContent;
        const userText = userInput.value;
        const sampleWords = sampleText.split(' ');
        const userWords = userText.split(' ');

        let highlightedText = '';
        for (let i = 0; i < sampleWords.length; i++) {
            if (userWords[i] === undefined) {
                highlightedText += `<span>${sampleWords[i]}</span> `;
            } else if (userWords[i] === sampleWords[i]) {
                highlightedText += `<span style="color: blue;">${sampleWords[i]}</span> `;
            } else {
                highlightedText += `<span style="color: red;">${sampleWords[i]}</span> `;
            }
        }
        sampleTextDiv.innerHTML = highlightedText.trim();
    }

    // Function to handle keydown events
    function handleKeydown(event) {
        if (event.key === 'Enter') {
            stopTest();
        }
    }

    // Function to initialize the page
    function initializePage() {
        userInput.disabled = true;
        updateSampleText();
    }

    // Add event listener to update the text when the difficulty changes
    difficultySelect.addEventListener('change', updateSampleText);

    // Add event listener to highlight typed words in real time
    userInput.addEventListener('input', highlightTypedWords);

    // // Initialize with a random text based on the default selected difficulty
    // updateSampleText();

    // Initialize the page when it loads
    initializePage();
});