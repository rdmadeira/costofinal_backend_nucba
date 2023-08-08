let pw1 = window.prompt('Ingrese la nueva contraseña');
let pw2 = window.prompt('Confirme la nueva contraseña');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const email = urlParams.get('email');
const token = urlParams.get('token');

if (!pw1) {
  alert('Ingrese una contraseña');
}

if (pw1 !== pw2) {
  alert('La contraseña confirmada no es igual');
}

// const baseUrl = 'http://localhost:8001/api/v1/';
fetch(
  `https://costofinal-backend-810debfecaf4.herokuapp.com/api/v1/auth/reset-password`,
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    method: 'post',
    body: JSON.stringify({ email: email, password: pw1 }),
  }
)
  .then((res) => res.json())
  .then((data) => {
    alert(data.message);
    location.href = 'https://costofinal-frontend-nucba.vercel.app/';
  })
  .catch((err) => {
    console.log('err', err);
    let errorsMessage = '';
    err.errors.forEach((errItem) => (errorsMessage += '. ' + errItem.message));
    alert('Ocurrió un error al cambiar la contraseña. ' + errorsMessage);
  });
