const registerForm = document.querySelector('.register-form');
const loginForm = document.querySelector('.login-form');
const profile = document.querySelector('.profile');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();
      const data = { name: e.target.name.value, password: e.target.password.value };
      const response = await fetch('/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      const result = await response.json();
      window.location = '/';
    } catch (error) {
      console.log('error: ', error);
    }
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();
      const data = { name: e.target.name.value, password: e.target.password.value };
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      const result = await response.json();
      if (result === 'User does not exist') {
        alert('User does not exist');
      } else if (result === 'Wrong name or password') {
        alert('Wrong password');
      } else {
        window.location = '/';
      }
    } catch (error) {
      console.log('error: ', error);
    }
  });
}

if (profile) {
  console.log('welcome to my profile!');
}
