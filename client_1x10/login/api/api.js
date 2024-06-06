function apiLogin(user) {
    const apiUrl = 'http://localhost:3000/api/login';
    const userData = {
      cedula: parseInt(user.cedula, 10),
      contrasena: user.contrasena
    };
  
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (response.ok) {
        return response.json().then(data => ({ email: data.email, token: data.token, roleId: data.role_id }));
      } else {
        throw new Error('Error al loguearse');
      }
    });
  }
  
  export { apiLogin };