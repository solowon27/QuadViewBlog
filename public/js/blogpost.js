async function submitNewBlogPost(event) {
  event.preventDefault();

  // Get the form data
  const formData = new FormData(newBlogForm);
  const title = formData.get('title');
  const content = formData.get('content');

  // Get the logged-in user's ID from the session 
  const creator = req.session.user_id;

  // Send a POST request to create the new blog post with the creator value
  const response = await fetch('/blogs', {
    method: 'POST',
    body: JSON.stringify({ title, content, creator }), // Include the creator value
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    // Clear the form after successful submission
    newBlogForm.reset();
    // Load the updated blog posts
    await loadBlogPosts();
  } else {
    alert('Failed to create a new blog post. Please try again.');
  }
}
