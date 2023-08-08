/* let pw1 = window.prompt('Ingrese la nueva contraseña');
let pw2 = window.prompt('Confirme la nueva contraseña'); */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const email = urlParams.get('email');
const token = urlParams.get('token');
const form = document.getElementById('45vcrfg');

const fetchPostHandle = (pw) => {
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    method: 'post',
    body: JSON.stringify({ email: email, password: pw }),
  };

  fetch(
    'https://costofinal-backend-810debfecaf4.herokuapp.com/api/v1/auth/reset-password',
    fetchOptions
  )
    .then((res) => {
      console.log('res', res);
      /* if (!res.ok) {
      return res.text().then((resp) => {
        console.log('resp', resp);
        throw new Error(resp);
      });
    } */
      return res.json();
    })
    .then((data) => {
      console.log('data', data);
      if (data.errors) {
        let errorsString = '';
        data.errors.forEach((err) => (errorsString += '. ' + err.message));

        alert(
          'Ocurrió un error al cambiar la contraseña: ' +
            errorsString +
            'Solicite un nuevo link'
        );
        return (location.href =
          'https://costofinal-frontend-nucba.vercel.app/');
      }

      alert(data.message);
      return (location.href = 'https://costofinal-frontend-nucba.vercel.app/');
    })
    .catch((err) => {
      console.log('err', err);

      alert('Ocurrió un error al cambiar la contraseña. ' + err.message);
    });
};

const submitHandle = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  let formDataObj = {};
  formData.forEach((value, key) => {
    formDataObj[key] = value;
  });

  if (!formDataObj.password) {
    alert('Ingrese una contraseña');
  }

  if (formDataObj.password === formDataObj.confirm) {
    fetchPostHandle(formDataObj.password);
  } else {
    alert('La contraseña confirmada no es igual');
  }
};

form.addEventListener('submit', submitHandle);

//`http://localhost:8001/api/v1/auth/reset-password`,
