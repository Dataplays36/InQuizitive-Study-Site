//calls the history fetch function when the document loads, if the user is logged in 
document.addEventListener('DOMContentLoaded', () => {
    fetch('/check-auth')
      .then(response => response.json())
      .then(data => {
        if (data.loggedIn) {
          fetchRecentStudySets();
        } else {
          console.log('User is not logged in');
        }
      })
      .catch(error => {
        console.error('Error checking authentication:', error);
      });
  });

//fetches and displays the recent history 
function fetchRecentStudySets() {
    fetch('/recent-study-sets')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        const studySetsList = document.getElementById('visitHistory');
        if (!studySetsList) {
            console.error('Element with ID "visitHistory" not found');
            return;
        }
        
        studySetsList.innerHTML = '';
        
        data.forEach(set => {
            const listItem = document.createElement('li');
            listItem.classList.add('styled-list-item'); // Add a class to the list item
            // Create a span to hold the study set name
            const setNameSpan = document.createElement('span');
            setNameSpan.textContent = set.set_name;
            setNameSpan.style.cursor = 'pointer';
            setNameSpan.onclick = () => {
                window.location.href = `studySetTemplate.html?id=${set.set_id}`;
            };

            // Append the span and button to the list item
            listItem.appendChild(setNameSpan);

            studySetsList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching study sets:', error);
    });
}
