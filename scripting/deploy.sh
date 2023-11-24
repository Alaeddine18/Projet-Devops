#!/bin/bash

# Tirer la nouvelle image Docker
docker pull ala91/priceapi:latest/x86_64

# Arrêter et supprimer le conteneur existant s'il y en a un
docker stop priceapi-container
docker rm priceapi-container

# Lancer un nouveau conteneur avec la nouvelle image
docker run -d --name=priceapi-container -p 3001:3001 ala91/priceapi:latest
