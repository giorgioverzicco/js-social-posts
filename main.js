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
const postTpl = document.querySelector("#tpl-post").content;

for (let i = 0; i < posts.length; i++) {
  // template element
  const post = postTpl.cloneNode(true);
  const { id, content, media, author, likes, created } = posts[i];

  // set all user data
  setUserImage(author, post);
  post.querySelector(".post-meta__author").innerHTML = author.name;
  post.querySelector(".post__text").innerHTML = content;
  post.querySelector(".post__image img").src = media;
  post.querySelector(".like-button").dataset.postid = id;
  post.querySelector(".js-likes-counter").innerHTML = likes;

  // format date to match italian format
  post.querySelector(".post-meta__time").innerHTML = italianDateFormat(created);

  // add event to make like buttons interactive
  addLikeBtnEvent(post);

  // append the entire post to the container
  container.append(post);
}

// GLOBAL FUNCTIONS
function setUserImage(author, post) {
  if (!author.image) {
    // remove the img block inside the template
    const img = post.querySelector(".post-meta__icon img");
    img.parentElement.removeChild(img);

    post.querySelector(".post-meta__icon").innerHTML += `
      <div class="profile-pic-default">
        <span>${getNameInitials(author.name)}</span>
      </div>
    `;
  } else {
    // if everything is ok then set up the user image
    post.querySelector(".post-meta__icon img").src = author.image;
    post.querySelector(".post-meta__icon img").alt = author.name;
  }
}

function getNameInitials(name) {
  const arr = name.split(" ");

  let initials = "";
  let i = 0;
  while (i < arr.length && i < 2) {
    initials += arr[i][0];
    i++;
  }

  return initials;
}

function italianDateFormat(date) {
  return date.split("-").reverse().join("/");
}

function addLikeBtnEvent(post) {
  const likeBtn = post.querySelector(".like-button");
  const likeCounter = post.querySelector(".js-likes-counter");
  // take the post id from the data attribute of the like button
  const postId = likeBtn.dataset.postid;

  // attach the click event on every single like button
  likeBtn.addEventListener("click", function (e) {
    e.preventDefault();

    this.classList.toggle("like-button--liked");

    if (likedPosts.includes(postId)) {
      // we use filter to reassign the array without the post id
      // that we need to remove, because we dont have an incremental
      // index that matches the post id to use Array.splice.
      likedPosts = likedPosts.filter((id) => id !== postId);
      likeCounter.innerHTML--;
    } else {
      likedPosts.push(postId);
      likeCounter.innerHTML++;
    }
  });
}
