fetch('blogs.json')
    .then(response => response.json())
    .then(data => {
        const blogPostsContainer = document.getElementById('blogPosts');
        const searchInput = document.getElementById('searchInput');

        function displayPosts(posts) {
            blogPostsContainer.innerHTML = '';
            posts.forEach(post => {
                const postHTML = `
                    <div class="col-md-4 blog-post">
                        <div class="card mb-4">
                            <div class="card-img-container">
                                <img src="${post.image}" class="card-img-top" alt="${post.title}">
                                <div class="image-popup">
                                    <img src="${post.image}" alt="${post.title}">
                                </div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${post.content.substring(0, 100)}...</p>
                                <button class="btn btn-primary read-more-btn" data-target="#${post.title.replace(/\s/g, '')}" aria-expanded="false">
                                    Read More
                                </button>
                                <div class="collapse" id="${post.title.replace(/\s/g, '')}">
                                    <p>${post.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                blogPostsContainer.innerHTML += postHTML;
            });
        }

        displayPosts(data);

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredPosts = data.filter(post => post.title.toLowerCase().includes(searchTerm) || post.content.toLowerCase().includes(searchTerm));
            displayPosts(filteredPosts);
        });

       
        const readMoreButtons = document.querySelectorAll('.read-more-btn');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');
                const targetCollapse = document.getElementById(targetId.substring(1));
                const parentPost = button.closest('.blog-post');
                
                if (!targetCollapse.classList.contains('show')) {
                    parentPost.classList.add('expanded');
                } else {
                    parentPost.classList.remove('expanded');
                }
            });
        });
    })
    .catch(error => console.error('Error fetching blog data:', error));
