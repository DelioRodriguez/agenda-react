import React from 'react';

function ContactoList({ contactos }) {
  return (
    <ul>
      {contactos.map((contacto, index) => (
        <li key={index}>
          {contacto.nombre} {contacto.apellido} - {contacto.telefono}
        </li>
      ))}
    </ul>
  );
}

export default ContactoList;
