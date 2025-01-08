document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    const changingText = document.querySelector('.changing-text');
    const colors = ['#D35424', '#85A96A', '#5078A0', '#C96A87', '#865C9A', '#D1A741']; // Updated color palette

    // Word lists
    const rhymeWithJet = ['Bet', 'Met', 'Set', 'Let', 'Net', 'Get', 'Pet', 'Wet'];
    const rhymeWithBailey = ['Daily', 'Halley', 'Ralley', 'Shaley', 'Talley', 'Valley', 'Galley'];
    const specialChars = '$%^&*()_+@!#'; // Special characters to inject

    const randomizeCaseAndColor = (char) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomCase = Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
        return `<span style="color: ${randomColor};">${randomCase}</span>`;
    };

    const injectSpecialCharacters = (word, count) => {
        let wordArray = word.split('');
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * wordArray.length);
            const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
            wordArray[randomIndex] = randomSpecialChar;
        }
        return wordArray.join('');
    };

    const startConstantChangingText = () => {
        setInterval(() => {
            // Pick random words
            let word1 = rhymeWithJet[Math.floor(Math.random() * rhymeWithJet.length)];
            let word2 = rhymeWithBailey[Math.floor(Math.random() * rhymeWithBailey.length)];

            // Randomly replace 1-3 characters in each word with special characters
            word1 = injectSpecialCharacters(word1, Math.floor(Math.random() * 3) + 1);
            word2 = injectSpecialCharacters(word2, Math.floor(Math.random() * 3) + 1);

            // Apply random case and color
            const formattedWord1 = word1.split('').map(randomizeCaseAndColor).join('');
            const formattedWord2 = word2.split('').map(randomizeCaseAndColor).join('');

            changingText.innerHTML = `${formattedWord1} ${formattedWord2}`;
        }, 100); // Faster updates (100ms)
    };

    dropdowns.forEach((button) => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;

            // Close all other dropdowns
            document.querySelectorAll('.dropdown-content').forEach((otherContent) => {
                if (otherContent !== content) {
                    otherContent.style.display = 'none';
                }
            });

            // Toggle visibility of the clicked dropdown
            const isVisible = content.style.display === 'block';
            content.style.display = isVisible ? 'none' : 'block';

            // Start the constant changing text effect for "About"
            if (button.textContent.trim().toLowerCase() === 'about') {
                startConstantChangingText();
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.menu')) {
            document.querySelectorAll('.dropdown-content').forEach((content) => {
                content.style.display = 'none';
            });
        }
    });
});
