import React, { useEffect, useReducer } from 'react';
import { JuegoReducer } from '../reducers/JuegoReducer';

const init = () => JSON.parse(localStorage.getItem('juegos')) || [];

export const MisJuegos = () => {

  const [juegos, dispatch] = useReducer(JuegoReducer, [], init);

  useEffect(() => {
    localStorage.setItem('juegos', JSON.stringify(juegos));
  }, [juegos]);

  const conseguirDatosForm = (e) => {
    e.preventDefault();
    let juego = {
      id: new Date().getTime(),
      titulo: e.target.titulo.value,
      descripcion: e.target.descripcion.value,
    };
    const accion = { type: 'crear', payload: juego, };
    dispatch(accion);
  };

  const borrar = (id) => {
    const accion = { type: 'borrar', payload: id };
    dispatch(accion);
  };

  const editar = (e, juego) => {
    let juegoEdit = {
      id: juego.id,
      titulo: juego.titulo,
      descripcion: e.target.value,
    };
    const accion = { type: 'editar', payload: juegoEdit };
    dispatch(accion);
  };

  return (
    <div>
      <h1>Mis Juegos</h1>
      <p>Número de videojuegos: {juegos.length}</p>
      <ul>
        {juegos.map((juego) => {
          return (
            <li key={juego.id}>
              {juego.titulo} | {juego.descripcion}
              &nbsp; &nbsp;
              <button onClick={(e) => borrar(juego.id)}>🗑️</button>
              <input
                type='text'
                onBlur={(e) => editar(e, juego)}
                onKeyPress={((e) => (e.key == 'Enter') && editar(e, juego))}
              ></input>
            </li>
          );
        })}
      </ul>
      <br />
      <h3>Agregar Juego</h3>
      <form onSubmit={conseguirDatosForm} className='form-add-game'>
        <input type='texto' name='titulo' placeholder='Titulo' />
        <textarea name='descripcion' placeholder='Descripcion' />
        <input type='submit' value='Guardar' />
      </form>
    </div>
  );
}