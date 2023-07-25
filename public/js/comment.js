// Function to handle comment submission
document.getElementById('commentForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const commentText = document.getElementById('commentText').value.trim();
    const blogId = '{{ blog.id }}';
  
    if (commentText) {
      const response = await fetch('/comments', {
        method: 'POST',
        body: JSON.stringify({ commentText, blogId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // Refresh the page to show the new comment
        location.reload();
      } else {
        alert('Failed to submit the comment. Please try again.');
      }
    }
  });
  