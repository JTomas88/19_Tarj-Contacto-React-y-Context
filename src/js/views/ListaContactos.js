import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/listaContactos.css"

export const ListaContactos = () => {

	const { store, actions } = useContext(Context);

	const contactos = store.listaContactos?.contacts;
	console.log('lista de contactos: ', contactos);



	const handleClick = (id) => {
		console.log("hola");
		actions.actualizarContacto()
		console.log('Se ha clicado en el id: ', id);
	}


	const eliminarContacto = (contacto) => {
		actions.eliminarContacto(store.miUsuario, contacto.id);
		window.location.reload()
	}

	if (contactos && contactos.length > 0) {
		return (
			<div className="container">

				<ul className="list-group container-fluid">
					{contactos.map((item, index) => (
						<li key={index} className="list-group-item filas">
							<div className="espacioFoto">
							</div>
							<div className="espacioDatos">
								<h4>{item.name}</h4>
								<p className="datoTelephone"><i class="fa-solid fa-envelope"></i> {item.phone}</p>
								<p className="datoEmail"><i class="fa-solid fa-phone"></i> {item.email}</p>
								<p className="datoAddress"> <i class="fa-solid fa-location-dot"></i> {item.address}</p>
							</div>

							{/* BOTONES PARA EDITAR CONTACTO Y ELIMINAR CONTACTO */}
							<div className="iconos">

								{/* Con link to le indicamos que tiene que ir al componente de crearContacto/id del contacto que queramos
								modificar */}
								<Link
									to={`/crearcontactos/${item.id}`}>
									<button type="button" class="btn btn-light">
										<i class="fa-solid fa-pencil fa-2x"></i>
									</button>
								</Link>

								<button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
									<i class="fa-solid fa-trash-can fa-2x"></i>
								</button>


								<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<h1 class="modal-title fs-5" id="exampleModalLabel">Atención!</h1>
												<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
											</div>
											<div class="modal-body">
												¿Deseas eliminar el contacto {item.name}?
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No, cancelar</button>
												<button onClick={() => eliminarContacto(item)} type="button" class="btn btn-primary">Si, eliminar</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
				<br />
				<div>
				</div>

			</div>
		);
	} else {
		return (
			<div className="container">
				<p>No hay contactos para mostrar.</p>
			</div>
		);
	}
}

export default ListaContactos;

<Link to="/">
	<button className="btn btn-primary">Back home</button>
</Link>

