// Function to load all blogs for the dashboard
async function loadBlogs() {
  try {
    const response = await fetch('/blogs'); // Fetch all blogs from the server
    const data = await response.json();
    const blogs = data.blogs;

    // Update the blogs in the dashboard
    const dashboardContainer = document.getElementById('dashboardContainer');
    dashboardContainer.innerHTML = ''; // Clear the current content

    if (blogs.length > 0) {
      const blogsList = document.createElement('ul');
      blogs.forEach((blog) => {
        const blogItem = document.createElement('li');
        const blogLink = document.createElement('a');
        blogLink.href = `/blogpost.html?id=${blog.id}`; // Navigate to the specific blog post page
        blogLink.textContent = blog.title;
        blogItem.appendChild(blogLink);
        blogsList.appendChild(blogItem);
      });
      dashboardContainer.appendChild(blogsList);
    } else {
      dashboardContainer.innerHTML = '<p>No blogs found.</p>';
    }
  } catch (error) {
    console.error(error);
    document.location.replace('/dashboard'); 
  }
}

// Function to handle form submission for creating a new blog post
async function handleFormSubmit(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  try {
    // Send a POST request to create a new blog post
    const response = await fetch('/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error('Failed to create a new blog post.');
    }
    // Reload the blogs for the dashboard after creating a new blog post
    await loadBlogs();
  } catch (error) {
    console.error(error);
    alert('Failed to create a new blog post. Please try again.');
  }
}

// Add event listener to the form for form submission
const newBlogForm = document.getElementById('newBlogForm');
newBlogForm.addEventListener('submit', handleFormSubmit);
