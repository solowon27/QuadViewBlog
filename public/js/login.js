// login.js

document.addEventListener('DOMContentLoaded', () => {
    // Handle user sign-in
    const signinForm = document.getElementById('signinForm');
    signinForm.addEventListener('submit', signinUser);
  
    // Function to sign in an existing user
    function signinUser(event) {
      event.preventDefault();
      const username = document.getElementById('signinUsername').value.trim();
      const password = document.getElementById('signinPassword').value.trim();
      if (username && password) {
        fetch('/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(response => {
            if (response.ok) {
              document.getElementById('signinUsername').value = '';
              document.getElementById('signinPassword').value = '';
              alert('You have successfully signed in!');
              // Optionally, you can redirect the user to the dashboard or another page after successful sign-in.
            } else {
              alert('Unable to sign in. Please check your credentials and try again.');
            }
          })
          .catch(err => {
            console.log(err);
            alert('Unable to sign in. Please check your credentials and try again.');
          });
      }
    }
  });
  