const searchBar = document.getElementById("searchBar");
const searchButton = document.querySelector("button");
const containerUser = document.getElementById("containerUser");

const api = "https://api.github.com/";
const github = "https://github.com/";

async function getUserData() {
  let userName = searchBar.value.replace("https://github.com/", "");
  //   console.log(userName);

  if (searchBar.value !== "") {
    try {
      const response = await fetch(`${api}users/${userName}`);
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.log("Couldnt fetch", error);
    }
  }
  throw new Error("Not a valid link!");
}

function displayUser(userData) {
  containerUser.style.display = "flex";

  containerUser.innerHTML = "";

  // Username
  let user = document.createElement("h3");
  containerUser.appendChild(user);

  // Username as link
  let userLink = document.createElement("a");
  userLink.textContent = `@${userData.login}`;
  userLink.setAttribute("href", github + userData.login);
  userLink.setAttribute("target", "_blank");
  user.appendChild(userLink);

  // Name
  let userName = document.createElement("p");
  userName.textContent = `Name: ${userData.name}`;
  containerUser.appendChild(userName);

  // Image
  let userImage = document.createElement("img");
  userImage.src = userData.avatar_url;
  containerUser.appendChild(userImage);

  // Bio
  let userBio = document.createElement("p");
  if (userData.bio == null) {
    userBio.textContent = ` `;
  } else [(userBio.textContent = `Bio: ${userData.bio}`)];
  containerUser.appendChild(userBio);

  // Follower
  let userFollower = document.createElement("p");
  userFollower.textContent = `Follower: ${userData.followers}\n 
  Following: ${userData.following}`;
  containerUser.appendChild(userFollower);

  // Repos
  let userRepos = document.createElement("p");
  userRepos.textContent = `Public Repos: ${userData.public_repos}`;
  containerUser.appendChild(userRepos);

  //    closeBtn
  let closeBtn = document.createElement("span");
  closeBtn.setAttribute("id", "closeBtn");
  closeBtn.textContent = "X";
  containerUser.appendChild(closeBtn);

  closeBtn.addEventListener("click", hideUser);
}

function hideUser() {
  containerUser.style.display = "none";

  const newElements = containerUser.childNodes;

  newElements.forEach((element) => {
    if (element.nodeType != "span") {
      element.remove();
    }
  });
}

searchButton.addEventListener("click", async () => {
  const userData = await getUserData();

  console.log(userData);
  if (searchBar.value.length > 0) {
    searchBar.style.cssText = `
    border: 2px solid green;
    `;

    displayUser(userData);
  } else {
    console.log("error");
    searchBar.style.cssText = `
    border: 2px solid red;
    `;
    hideUser()
  }
});
