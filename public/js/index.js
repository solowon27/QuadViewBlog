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

    const responseData = await response.json(); // Parse the JSON response

    if (response.ok) {
      // Redirect to the dashboard if login is successful
      document.location.replace('/dashboard');
    } else {
      // Show the error message on the page
      const errorMessage = responseData.message || 'Failed to log in.';
      alert(errorMessage);
    }
  }
};
