# PruebaTecnicaAngularObjetivos:

En el siguiente listado encontrarás las tareas a realizar dentro del tiempo específicado:

Repositorio:

1) Tras clonar el repositorio, crear una nueva rama con la nomenclatura nombre-apellido.

2) Una vez termine la prueba debe subir el commit con el comentario "Prueba: NombreDelAspirante".

Prueba técnica:

1) Hacer que se vea el componente Home.

2) Hacer funcionar el formulario de login.

3) La única contraseña válida debe ser "1001853248"

4) Debe llevar al home al tener el botón válido.

5) Almacena las variables "usuario" y "contraseña" dentro del localStorage como un json en formato string cuya llave sea "authSession" (importante hacer esto, de lo contrario no va a funcionar el home).

6) Debe poder hacer un botón individual para la edición de cada uno de los campos (Tomar de referencia la imagen adjunta de nombre "Formulario"):

> El formulario debe ser flotante en medio de toda la pantalla (tomar de referencia el del login)
> El color de los títulos debe ser #00000073 con una opacidad del 45%
> El color del fondo de los campos debe ser #F0F1F5
> El color de TODOS los botones del formulario debe ser #1279AF
> El color del texto de TODOS los botones del formulario debe ser #FFFFFF
> El botón de envío del formulario debe ser del mismo ancho que el formulario
> El botón de envío del formulario debe tener 35px de alto y una curvatura en las puntas de 12px
> El botón de envío solo debe habilitarse si el campo tiene un valor distinto al inicial
> El botón de envío solo debe habilitarse si todos los campos tienen algo dentro de ellos
> El color del título debe cambiar a #EB5757 si el campo se encuentra totalmente vacío #EB5757

7) Se debe mostrar un botón tipo "popup" que pregunte al usuario si está seguro de actualizar o no, tras dar click sobre el botón de envío. Si la persona confirma, debe
enviarse efectivamente la petición al servidor y segundo popup con un mensaje "Información actualizada" que debe durar en pantalla 2 segundos; en caso opuesto, el el popup se debe cerrar y se deben restablecer los valores iniciales de cada campo (Tomar de referencia la imagen adjunta de nombre "Popup").

> El ícono debe ser de color #7AB7FF
> El tamaño de la fuente debe ser de 18px
> El color del texto de confirmación y del usuario debe ser de color #7AB7FF
> El color del texto de cancelación debe ser #EB5757
> El largo del popup debe ser de 150px y el ancho debe ser de 260px



⚙️ Instalación

Clona este repositorio:

https://github.com/DelahozLuz/PruebaTecnicaAngular.git

cd PruebaTecnicaAngular


Instala dependencias:

npm install


Levanta el servidor:

ng serve




