// Componente para crear un nuevo contacto

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { ListaContactos } from "./ListaContactos";
import "../../styles/crearContactos.css"


export const CrearContacto = props => {
	const { store, actions } = useContext(Context);

	/* Función propia de React-dom: se usa como el <Link>, nos manda a la dirección que le proporcionemos. 
	Lo usamos en la función handleSubmit para redireccionar al Home una que hayamos editado el contacto */
	const navigate = useNavigate(); 


	/**---------------------------bloque usado para editar el contacto !!!!---------------------------------------------
	 * useParams: recoge SÓLO EL ID que hemos pasado en el botón de moodificar contacto.
	 * 
	 * contactoAEditar: creamos esta variable para buscar en nuestra lista de contacto un contacto. 
	 * 		Comprueba si store.listaContactos es un array (store.listaContactos?.contacts ==> si listaContacto tiene dentro Contactos
	 * 		entonces sigue leyendo el código y ejecutándolo. Si no tuviera datos para la lectura cuando llega a la ? para evitar errores.
	 * 		 ? store.listaContactos.contacts ==> la interrogación que no está junto a una variable actua como si fuese un if (lo que se
	 * 		ejecuta dentro de las  llaves {}, se ejecuta el filter. )
	 * 		:null => si no se cumple la condición  Array.isArray(store.listaContactos?.contacts)  entonces se devuelve un null
	 * 
	 * inputContacto: setea inputContacto y lo inicializa:
	 * 			-si name tiene un dato(value) lo setea en inputContacto y lo muestra. 
	 * 			-O si no tiene dato lo deja como string vacío.
	 */
	const {id} = useParams(); 
	const contactoAEditar = Array.isArray(store.listaContactos?.contacts) 
		? store.listaContactos.contacts.filter(contactoX => contactoX.id === parseInt(id))[0]
		: null;

	const [inputContacto, SetInputContacto] = useState({
		name: contactoAEditar?.name || "",
		phone: contactoAEditar?.phone || "",
		email: contactoAEditar?.email || "",
		address: contactoAEditar?.address ||  ""
	})




	/**FUNCION HANDLCHANGE
	 * Esta función guarda los cambios recogidos en cada uno de los campos 
	 * @param {evento}  
	 * Crea las variables atributoCampo y valorDelCampo y recoge los datos que vengan del evento.target.
	 * con el setInputContacto recogemos los datos que haya guardados en copiaDelContacto (al principio no tiene nada) y 
	 * con ...copiaDelContacto le decimos que haga una copia de lo que tiene dentro para no perder los datos. 
	 * por ultimo pasamos el valor de cada campo (valorDelCampo)  a su campo correspondiente (atributoCampo)
	 */
	const handleChange = (evento) => {
		console.log('evento.target ', evento.target);
		const { id, value } = evento.target;  /* con const está creando un objeto que tiene una key y su valor. */
		SetInputContacto(copiaDelContacto => ({
			...copiaDelContacto,
			[id]: value
		}))
	};

	/**FUNCION HANDLESUBMIT
	 * Recoge la información guardada a través del botón Submit del formulario 
	 * @param {evento} 
	 */
	const handleSubmit = (evento) => {
		evento.preventDefault();
		console.log('id del usuario; ', id);

		if ((id ==="") || (id === undefined)) {
			actions.guardarContacto(store.miUsuario, inputContacto).then (() => {
				SetInputContacto({name: '', phone: '', email: '', address:''});
				window.location.reload()	
			});
		} else {
			actions.editarContacto(store.miUsuario, id, inputContacto).then (() => {	
				navigate('/listaContactos')	 /* redirige al Home (listaContactos) */ 		
				window.location.reload()	
			});
		}

	};



	return (
		<div className="container-fluid">
			<form onSubmit={handleSubmit}>
				<div className="mb-3">

					<label htmlFor="name" className="form-label">Nombre completo</label>
					<input type="text"
						className="form-control"
						value={inputContacto.name}
						onChange={handleChange}
						id="name"
						placeholder="Introduce tu nombre completo aquí" />
				</div>


				<div className="mb-3">
					<label htmlFor="email" className="form-label">Correo electrónico</label>

					<input type="text"
						className="form-control"
						id="email"
						value={inputContacto.email}
						onChange={handleChange}
						placeholder="Introduce el correo" />
				</div>

				<div className="mb-3">
					<label htmlFor="phone" className="form-label">Número de telefono</label>
					<input type="text"
						className="form-control"
						id="phone"
						value={inputContacto.phone}
						onChange={handleChange}
						placeholder="Introduce el telefono" />
				</div>

				<div className="mb-3">
					<label htmlFor="address" className="form-label">Dirección</label>

					<input type="text"
						className="form-control"
						id="address"
						value={inputContacto.address}
						onChange={handleChange}
						placeholder="Dirección postal" />
				</div>

				{/* BOTONES "GUARDAR" Y "REGRESAR" . PARTE INFERIOR */}
				<div>
					<button type="submit" className="btn btn-success guardarContacto">Guardar contacto</button>
				</div>
				
				<Link to="/">
					<span className="btn btn-primary btn-lg" href="#" role="button">
						Volver a lista de contactos
					</span>
				</Link>
			</form>
		</div>
	);
};

ListaContactos.propTypes = {
	match: PropTypes.object
};
