// logout.js

document.addEventListener('DOMContentLoaded', () => {
    // Handle user sign-out
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', logoutUser);
  
    // Function to sign out the user
    function logoutUser() {
      fetch('/logout', {
        method: 'POST',
      })
        .then(response => {
          if (response.ok) {
            alert('You have successfully logged out.');
            // Optionally, you can redirect the user to the homepage or another page after successful logout.
          } else {
            alert('Unable to log out. Please try again.');
          }
        })
        .catch(err => {
          console.log(err);
          alert('Unable to log out. Please try again.');
        });
    }
  });
  