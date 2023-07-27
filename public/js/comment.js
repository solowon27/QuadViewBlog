// Function to load comments for a specific blog post
async function loadComments(postId) {
  try {
    const response = await fetch(`/blogs/${postId}/comments`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch comments.');
    }

    const data = await response.json();
    const comments = data.comments;

    // Update the comments
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = ''; // Clear the current content

    if (comments.length > 0) {
      const commentsList = document.createElement('ul');
      comments.forEach((comment) => {
        const commentItem = document.createElement('li');
        // Check if the comment has a user before accessing the username property
        if (comment.user) {
          commentItem.textContent = `${comment.user.username}: ${comment.text}`;
        } else {
          commentItem.textContent = `Unknown User: ${comment.text}`;
        }
        commentsList.appendChild(commentItem);
      });
      commentsContainer.appendChild(commentsList);
    } else {
      commentsContainer.innerHTML = '<p>No comments yet.</p>';
    }
  } catch (error) {
    console.error(error);
    alert('Failed to fetch comments. Please try again.');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const postId = queryParams.get('id');
  await loadComments(postId);
});

// Submit new comment form
document.getElementById('commentForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const postId = event.target.dataset.blogId;
  const commentText = event.target.commentText.value;

  console.log("Comment Text:", commentText); 

  // Check if the comment text is empty or null
  if (!commentText) {
    alert('Please enter a valid comment.');
    return;
  }

  try {
    await fetch(`/blogs/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: commentText }),
    });

    // Reload comments after submitting a new comment
    await loadComments(postId);
  } catch (error) {
    console.error(error);
    alert('Failed to submit comment. Please try again.');
  }

  event.target.reset();
});
