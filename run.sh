#!/bin/bash

DIRECTORIO_BACK="/d/programacion/SprintJS/sprintjs-back"
DIRECTORIO_FRONT="/d/programacion/SprintJS/sprintjs"

ejecutar_npm () {

	DIR=$1
	if [ -d "$DIR" ]; then
  		echo "Accediendo al directorio: $DIR" 
		(
		  cd "$DIR" || exit 
		  echo "Iniciando el servidor con npm run dev"
		  npm run dev
		) &
	else
  		echo "El directorio no existe: $DIR"
  		exit 1
	fi
}

ejecutar_npm "$DIRECTORIO_BACK"
ejecutar_npm "$DIRECTORIO_FRONT"

wait

