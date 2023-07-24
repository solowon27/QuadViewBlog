// Example JavaScript code for interactivity
document.addEventListener('DOMContentLoaded', () => {
  // Handle homepage and navigation link clicks
  const homepageLink = document.getElementById('homepageLink');
  const dashboardLink = document.getElementById('dashboardLink');
  homepageLink.addEventListener('click', showHomepage);
  dashboardLink.addEventListener('click', showDashboard);

  // Function to display the homepage
  function showHomepage() {
    // Fetch existing blog posts from the server using Fetch API
    fetch('/blogs')
      .then(response => response.json())
      .then(data => {
        const blogPostsList = document.getElementById('blogPosts');
        blogPostsList.innerHTML = ''; // Clear the list
        data.forEach(post => {
          const listItem = document.createElement('li');
          listItem.textContent = post.title;
          listItem.addEventListener('click', () => showBlogPost(post.id));
          blogPostsList.appendChild(listItem);
        });
      });
  }

  // Function to display a specific blog post
  function showBlogPost(postId) {
    // Fetch the blog post and its comments from the server using Fetch API
    fetch(`/blogs/${postId}`)
      .then(response => response.json())
      .then(data => {
        // Display blog post details
        document.getElementById('postTitle').textContent = data.title;
        document.getElementById('postContents').textContent = data.contents;
        document.getElementById('postCreator').textContent = data.creator;
        document.getElementById('postDate').textContent = data.date;

        // Display comments
        const commentsList = document.getElementById('comments');
        commentsList.innerHTML = ''; // Clear the list
        data.comments.forEach(comment => {
          const listItem = document.createElement('li');
          listItem.textContent = comment.text;
          commentsList.appendChild(listItem);
        });

        // Show the blog post view and hide other sections
        document.getElementById('homepage').style.display = 'none';
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('blogPostView').style.display = 'block';
      });
  }

  // Function to display the dashboard
  function showDashboard() {
    // Fetch user's created blog posts from the server using Fetch API
    fetch('/dashboard')
      .then(response => response.json())
      .then(data => {
        const userBlogPostsList = document.getElementById('userBlogPosts');
        userBlogPostsList.innerHTML = ''; // Clear the list
        data.forEach(post => {
          const listItem = document.createElement('li');
          listItem.textContent = post.title;
          listItem.addEventListener('click', () => showBlogPost(post.id));
          userBlogPostsList.appendChild(listItem);
        });
      });

    // Show the dashboard and hide other sections
    document.getElementById('homepage').style.display = 'none';
    document.getElementById('blogPostView').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  }

  // Additional code to handle user sign-up, sign-in, commenting, adding/editing blog posts, and deleting blog posts goes here.

  // Handle user sign-up
  const signupLink = document.getElementById('signupLink');
  const signupFormContainer = document.getElementById('signupFormContainer');

  signupLink.addEventListener('click', (event) => {
    event.preventDefault();
    signupFormContainer.style.display = 'block';
  });

  const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', signupUser);

  // Function to sign up a new user
  function signupUser(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    if (username && email && password) {
      fetch('/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      })
        // .then(response => response.json())
        // .then(data =>{
        //   console.log(data);
          if (response.ok) { 
            document.location.replace('/blogpost');
            alert('You have successfully signed up! Please sign in.');
          } else if (response.status === 422) {
            // This status code could indicate that the username or email is already taken.
            alert('Username or email is already taken. Please choose a different one.');
          } else {
            alert('Unable to sign up. Please try again.');
          }
        }
      }
    })
        .catch(err => {
          console.log(err);
          alert('Unable to sign up. Please try again.');
        });
      
  
  const loginLink = document.getElementById('loginLink');
  loginLink.addEventListener('click', goToLogin);
  
  // Function to navigate to the login page
  function goToLogin(event) {
    event.preventDefault();
    // Redirect the user to the login page
    window.location.href = '/login';
  }

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
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            throw new Error(data.message);
          }
          document.getElementById('signinUsername').value = '';
          document.getElementById('signinPassword').value = '';
          alert('You have successfully signed in!');
        })
        .catch(err => {
          console.log(err);
          alert('Unable to sign in. Please check your credentials and try again.');
        });
    }
  }
});
