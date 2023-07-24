// Function to handle comment submission
document.getElementById('commentForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const commentText = document.getElementById('commentText').value.trim();
    const blogsId = '{{ blogs.id }}';
  
    if (commentText) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ commentText, blogsId }),
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
  