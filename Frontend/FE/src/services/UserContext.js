import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Cargar el usuario desde localStorage al iniciar la aplicación
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/login', {
        identificacion: username,
        clave: password,
      });

      if (response.status !== 200) {
        setError("Error al iniciar sesión");
        throw new Error("Por favor revise sus datos de inicio de sesión");
      }

      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data)); // Almacenar usuario en localStorage
      setError(null);
      return response;
    } catch (error) {
      setError("Por favor revise sus datos de inicio de sesión");
      throw error;
    }
  };

  const updateUserPolizas = (newPolizas) => {
    if (user) {
      const updatedUser = { ...user, listaPolizas: newPolizas };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };


  const logout = () => {
    setUser(null); // Borra los datos del usuario
    localStorage.removeItem('user'); // Borra los datos del usuario del almacenamiento local
  };

  return (
    <UserContext.Provider value={{ user, setUser, error, login, logout, updateUserPolizas }}>
      {children}
    </UserContext.Provider>

  );
};
