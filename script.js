document.addEventListener('DOMContentLoaded', () => {
    // 1. Get a reference to the form element
    const form = document.getElementById('dessertSurveyForm');

    // 2. Attach an event listener for when the form is submitted
    form.addEventListener('submit', function(event) {
        // Stop the form from performing its default action (reloading the page)
        event.preventDefault(); 
        
        // --- Data Collection ---
        
        // A new FormData object makes it easy to collect all data
        const formData = new FormData(form);
        const surveyData = {};

        // Loop through the collected data and store it in an object
        // NOTE: This handles text, select, and radio inputs correctly.
        for (let [key, value] of formData.entries()) {
            // Special handling for the 'toppings' (checkboxes) which can have multiple values
            if (key === 'toppings') {
                // If the key already exists (from a previous checkbox), convert to array and push
                if (surveyData[key]) {
                    if (Array.isArray(surveyData[key])) {
                        surveyData[key].push(value);
                    } else {
                        // If only one checkbox was checked before, convert to array first
                        surveyData[key] = [surveyData[key], value];
                    }
                } else {
                    // First time seeing this topping
                    surveyData[key] = value;
                }
            } else {
                // For all other inputs (name, dessert, temperature, rating)
                surveyData[key] = value;
            }
        }

        // --- Console Logging ---
        
        // Make the console log look cute and clear!
        console.groupCollapsed('💖 Sweet Treats Survey Submission! 🍬');
        console.log(`✨ Submitter: ${surveyData.name}`);
        console.log(`🎂 Ultimate Dessert: ${surveyData.favDessert}`);
        console.log(`🌡️ Preferred Temperature: ${surveyData.temperature}`);
        console.log(`🌟 Dessert Love Rating: ${surveyData.rating} out of 5`);
        
        // Check if toppings were selected
        if (surveyData.toppings) {
             // Handle both a single string or an array of strings for toppings
            const toppingsList = Array.isArray(surveyData.toppings) ? surveyData.toppings.join(', ') : surveyData.toppings;
            console.log(`🌈 Favorite Toppings: ${toppingsList}`);
        } else {
            console.log('🌈 Favorite Toppings: None Selected');
        }
        
        console.log('\n--- Raw Data Object ---');
        console.log(surveyData);
        console.groupEnd();
        
        // --- User Feedback ---

        // Give the user a cute message after submitting
        alert(`Thanks for sending your sweet data, ${surveyData.name}! Check the console for the results! 🥳`);
        
        // Optional: Reset the form after submission
        form.reset();
    });
});