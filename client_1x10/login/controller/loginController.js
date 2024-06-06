import { apiLogin } from '../api/api.js';

function login(cedula, contrasena) {
  const user = { cedula, contrasena };
  apiLogin(user)
   .then(response => {
      const token = response.token;
      const roleId = response.roleId;
      const email = response.email;
      // Guardar el token y el role_id en el almacenamiento local
      localStorage.setItem('token', token);
      localStorage.setItem('roleId', roleId);
      localStorage.setItem('email', email);
      
      if (roleId === 1) {
        window.location.href = './administracion'; // Redirect to admin page
      } else {
        console.log('Acceso Restringido'); // Redirect to user page
      }
    })
   .catch(error => {
      console.error('Error logging in:', error);
    });
}

export { login };