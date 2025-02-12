document.addEventListener('DOMContentLoaded', function() //makes sure the content is loaded first
{
    console.log('signup.js is loaded'); //debug statement to make sure this file is loaded 

    // Form submission event listener
    const signupForm = document.getElementById('signupForm');
    if (signupForm) 
    {
        signupForm.addEventListener('submit', function(event) //when user presses submit
        {
            event.preventDefault(); // Prevents the default form submission behavior

            // Grab the values entered by the user
            const username = document.getElementById('signup_username').value;
            const password = document.getElementById('signup_password').value;

            // Log the values to the console for debugging
            console.log('Username:', username);
            console.log('Password:', password);

            // Submit the data using fetch and the backend route 
            fetch('/add-user', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password: password }), //generates parameters from the json sent
            })
            .then(response => response.json())
            .then(data => 
            {
                console.log('Success:', data);
                // will eventually redirect to another page or display a success message
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
});
