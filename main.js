const posts = [
  {
    id: 1,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/300?image=171",
    author: {
      name: "Phil Mangione",
      image: "https://unsplash.it/300/300?image=15",
    },
    likes: 80,
    created: "2021-06-25",
  },
  {
    id: 2,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=112",
    author: {
      name: "Sofia Perlari",
      image: "https://unsplash.it/300/300?image=10",
    },
    likes: 120,
    created: "2021-09-03",
  },
  {
    id: 3,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=234",
    author: {
      name: "Chiara Passaro",
      image: "https://unsplash.it/300/300?image=20",
    },
    likes: 78,
    created: "2021-05-15",
  },
  {
    id: 4,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=24",
    author: {
      name: "Luca Formicola",
      image: null,
    },
    likes: 56,
    created: "2021-04-03",
  },
  {
    id: 5,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=534",
    author: {
      name: "Alessandro Sainato",
      image: "https://unsplash.it/300/300?image=29",
    },
    likes: 95,
    created: "2021-03-05",
  },
];

let likedPosts = [];

const container = document.querySelector("#container");
for (let i = 0; i < posts.length; i++) {
  const post = document.querySelector("#tpl-post").content.cloneNode(true);
  post.querySelector(".post-meta__icon img").src = posts[i].author.image;
  post.querySelector(".post-meta__icon img").alt = posts[i].author.name;
  post.querySelector(".post-meta__author").innerHTML = posts[i].author.name;
  post.querySelector(".post__text").innerHTML = posts[i].content;
  post.querySelector(".post__image img").src = posts[i].media;
  post.querySelector(".like-button").setAttribute("data-postid", posts[i].id);
  post.querySelector(".js-likes-counter").innerHTML = posts[i].likes;
  container.append(post);
}

const postElements = document.querySelectorAll(".post");
for (let i = 0; i < postElements.length; i++) {
  const post = postElements[i];

  const likeBtn = post.querySelector(".like-button");
  const likeCounter = post.querySelector(".js-likes-counter");
  const postId = likeBtn.getAttribute("data-postid");

  likeBtn.addEventListener("click", function () {
    if (likeBtn.classList.contains("like-button--liked")) {
      likedPosts = likedPosts.filter((id) => id !== postId);
      likeBtn.classList.remove("like-button--liked");
      likeCounter.innerHTML--;
    } else {
      likedPosts.push(postId);
      likeBtn.classList.add("like-button--liked");
      likeCounter.innerHTML++;
    }
  });
}
