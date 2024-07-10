const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			miUsuario: "tom",

			camposDelContacto: {
				name: "",
				phone: "",
				email: "",
				address: ""
			},

			listaContactos: {},

			contactoVacio: {},
		},



		actions: {

			crearUsuario: (slug) => {
				return fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
					method: 'POST',
				}).then(respuesta => {
					if (!respuesta.ok) {
						throw new Error('No fue ok ' + respuesta.statusText)
					}
					return respuesta.json()

				}).then(datosRespuesta => {
					console.log('respuesta del servicio: ', datosRespuesta);
					setStore({ listaContactos: datosRespuesta });
					return datosRespuesta;
				})
					.catch(esError => {  //catch captura el error del if si fueserroneo, no es obligatorio pero si buena práctica
						console.log('Error: ' + esError);
					})
			},





			/**
			 * llamamos al servicio para obtener la agenda dentro de una función
			 * @param {slug}  recibe el nombre del usuario. 
			 * @returns la lista de contacto que tenga mi usuario (slug) asignada. 
			 */
			obtenerListaContactos: (slug) => {
				return fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {

					method: 'GET',
				}).then(respuesta => {
					if (!respuesta.ok) {
						throw new Error('No fue ok ' + respuesta.statusText)
					}
					return respuesta.json()

				}).then(datosRespuesta => {
					console.log('respuesta del servicio: ', datosRespuesta);
					setStore({ listaContactos: datosRespuesta });
					return datosRespuesta;
				})
					.catch(esError => {  //catch captura el error del if si fueserroneo, no es obligatorio pero si buena práctica
						console.log('Error: ' + esError);
					})
			},




			actualizarContacto: (campo, datosDelCampo) => {
				const pasarDatos = getStore(); /*getStore - obtiene las variables del apartado store */
				const actualizado = {
					...pasarDatos.camposDelContacto, /* ... -> guarda una copia del objeto, de los datos que obtenga en los campos (camposDelContacto)  */
					[campo]: datosDelCampo /* pasa el valor de cada campo (ej: "Juan" en el name) al atributo campo que es cada atributo del objeto (name, email...)*/
				};
				setStore({ camposDelContacto: actualizado }); /* guarda con setStore los campos que tenga actualizado a cada uno de los campos de camposDelContacto */
			},

			guardarContacto: (slug, contacto) => {
				return fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
					method: 'POST',
					headers: { 								/* configuaración que permite el acceso correcto a la API */
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(contacto) /* body requerido: contacto sería el objeto */


				}).then(respuesta => {
					if (!respuesta.ok) {
						throw new Error('No fue ok ' + respuesta.statusText)
					}
					return respuesta.json();
				}).then(datosRespuesta => {
					console.log('respuesta del servicio: ', datosRespuesta);
					setStore({ listaContactos: datosRespuesta });
				}).catch(esError => {
					console.log('Error: ' + esError);
				});
			},


			eliminarContacto: (slug, contact_id) => {
				return fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contact_id}`, {
					method: 'DELETE',

				}).then(respuesta => {
					if (!respuesta.ok) {
						throw new Error('No fue ok ' + respuesta.statusText)
					}
					return respuesta.json();
				}).then(datosRespuesta => {
					console.log('respuesta del servicio: ', datosRespuesta);
				}).catch(esError => {
					console.log('Error: ' + esError);
				})
			},


			editarContacto: (slug, idContact, contacto) => {
				return fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${idContact}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(contacto)
				}).then(respuesta => {
					if (!respuesta.ok) {
						throw new Error('No fue ok ' + respuesta.statusText)
					}
					return respuesta.json();
				}).then(datosRespuesta => {
					console.log('respuesta del servicio: ', datosRespuesta);
				}).catch(esError => {
					console.log('Error: ' + esError);
				})
			},


			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};


export default getState;
