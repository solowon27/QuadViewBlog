const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Parse the response to get the data returned from the server
      const data = await response.json();

      // Set the user_id, username, and logged_in flag in the session
      req.session.user_id = data.user_id;
      req.session.username = data.username;
      req.session.logged_in = true;

      // Redirect to the dashboard if login is successful
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in.');
    }
  }
};
