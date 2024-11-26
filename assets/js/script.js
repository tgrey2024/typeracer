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

    // Add event listener to update the text when the difficulty changes
    difficultySelect.addEventListener('change', updateSampleText);

    // Initialize with a random text based on the default selected difficulty
    updateSampleText();
});