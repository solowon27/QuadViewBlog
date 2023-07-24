// blogpost.js
document.addEventListener('DOMContentLoaded', async () => {
  
    const commentForm = document.getElementById('commentForm');
  const loggedInUser = document.getElementById('loggedInUser').value;

  if (loggedInUser) {
    commentForm.style.display = 'block'; // Show the comment form if the user is logged in
    commentForm.addEventListener('submit', submitComment);
  }

  async function submitComment(event) {
    async function submitComment(event) {
      event.preventDefault();
      const commentText = document.getElementById('commentText').value.trim();
  
      if (commentText) {
        const blogId = window.location.pathname.split('/').pop();
        const response = await fetch(`/blogs/${blogId}/comments`, {
          method: 'POST',
          body: JSON.stringify({ text: commentText }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // Clear the comment input and refresh the comments section
          document.getElementById('commentText').value = '';
          await loadComments();
        } else {
          alert('Failed to submit comment. Please try again.');
        }
      }
    }
  
    async function loadComments() {
      const blogId = window.location.pathname.split('/').pop();
      const response = await fetch(`/blogs/${blogId}`);
      const blogData = await response.json();
  
      const commentsElement = document.getElementById('comments');
      commentsElement.innerHTML = '';
  
      // Display comments
      if (blogData.comments && blogData.comments.length > 0) {
        blogData.comments.forEach(comment => {
          const commentElement = document.createElement('li');
          commentElement.textContent = `${comment.text} - by ${comment.user.username}`;
          commentsElement.appendChild(commentElement);
        });
      }
    }
  
    await loadComments();
  }
});
  