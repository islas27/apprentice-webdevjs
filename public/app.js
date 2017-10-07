// The code goes here
// Here's a little help, all the elements you will need are stored in the
// following constants
const btnSubmit = document.getElementById('btn-submit');
const btnRequest = document.getElementById('btn-request');
const btnLink = document.querySelector('.btn, .btn-primary, .btn-xs');
const inputName = document.getElementById('input-name');
const inputEmail = document.getElementById('input-email');
const listNode = document.getElementById('user-list');
const userNode = document.getElementById('user');

// Hack a bit into the elements
// Change the text in the submit button for example
// Here's an example to change css classes
btnSubmit.classList.remove('btn-primary');
btnSubmit.classList.add('btn-success');
btnSubmit.style.textTransform = 'capitalize';
btnLink.style.borderRadius = '50%';
btnLink.style.textTransform = 'lowercase';
btnSubmit.innerHTML = 'submit';

// Intercept the submit (or click) event and save the user somewhere
btnSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  // Here you can do the magic
  const newUser = { name: inputName.value, email: inputEmail.value };
  sendUser(newUser, userSaved);
  inputName.value = '';
  inputEmail.value = '';
  // Don't forget to clean the form!
});

function userSaved(user) {
  // How to know if the page saved the user? Hm..
  const userJSON = JSON.stringify(user);
  console.log(`Success! Saved user ${userJSON}`);
}

function sendUser(newUser, onSuccess) {
  const xhttp = new XMLHttpRequest();
  xhttp.open('POST', 'http://localhost:3000/users', true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.onreadystatechange = function cb() {
    // If we are saving a user/creating it in the server, what code status should we use?
    if (this.readyState === 4 && this.status === 201) {
      onSuccess(newUser);
    }
  };
  // Here the method only takes a string, so you need to convert newUser to a string
  xhttp.send(JSON.stringify(newUser));

  // Example using the axios library
  // axios.post('http://localhost:3000/users', newUser)
  //   .then(response => console.log(response))
  //   .catch(error => console.log(error));

  // Example using the jQuery library
  // $.ajax({
  //   url: 'http://localhost:3000/users',
  //   data: newUser,
  //   success: response => console.log(response)
  //   error: error => console.log(error)
  // })
}

// Final exercise - retrieve a list of users and hack the userList to display it
btnRequest.addEventListener('click', (event) => {
  event.preventDefault();
  getUsers(writeUsersToPage);
});

function writeUsersToPage(users) {
  const keys = Object.keys(users);
  listNode.innerHTML = '';
  for (let i = 0; i < keys.length; i += 1) {
    const id = keys[i];
    const user = users[id];
    const newNode = userNode.cloneNode(true);
    newNode.id += id;
    // You've got a estructure where to display the user: newNode
    // Navigate it and set the innerHTML to values you want
    newNode.firstElementChild.firstElementChild.innerHTML = user.name;
    newNode.lastElementChild.innerHTML = user.email;
    listNode.appendChild(newNode);
  }
}

function getUsers(onSuccess) {
  // Do an AJAX request to get the users
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'http://localhost:3000/users', true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.onreadystatechange = function cb() {
    if (this.readyState === 4 && this.status === 200) {
      const json = JSON.parse(xhttp.responseText);
      onSuccess(json);
    }
  };
  xhttp.send();
}
