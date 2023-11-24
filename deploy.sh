#!/bin/bash

# Tirer la nouvelle image Docker
docker pull ala91/clockbox:latest

# Arrêter et supprimer le conteneur existant s'il y en a un
docker stop clockbox-container
docker rm clockbox-container

# Lancer un nouveau conteneur avec la nouvelle image
docker run -d --name=clockbox-container -p 8080:80 ala91/clockbox:latest
