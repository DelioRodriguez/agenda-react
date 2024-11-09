import React, { useState, useEffect } from 'react';
import ContactoForm from './ContactoForm';
import ContactoList from './ContactoList';

const apiUrl = 'https://cors-anywhere.herokuapp.com/http://www.raydelto.org/agenda.php';

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchContactos = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al obtener los contactos');
        const data = await response.json();
        setContactos(data);
      } catch (error) {
        console.error(error);
        alert('No se pudieron cargar los contactos.');
      } finally {
        setCargando(false);
      }
    };
    fetchContactos();
  }, []);

  const agregarContacto = async (contacto) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacto),
      });

      if (!response.ok) throw new Error('Error al agregar el contacto');
      setContactos((prevContactos) => [...prevContactos, contacto]);
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al agregar el contacto.');
    }
  };

  return (
    <div className="App">
      <h1>Agenda React</h1>
      <ContactoForm onAgregar={agregarContacto} />
      {cargando ? (
        <p>Cargando contactos...</p>
      ) : (
        <ContactoList contactos={contactos} />
      )}
    </div>
  );
}

export default App;
