#!/bin/bash

# Tirer la nouvelle image Docker (j'ai mis la platforme sinon sa ne marche pas comme je suis sur mac m1 ( stackoverflow ))
docker pull ala91/priceapi:latest --platform linux/amd64

# Arrêter et supprimer le conteneur existant s'il y en a un
docker stop priceapi-container
docker rm priceapi-container

# Lancer un nouveau conteneur avec la nouvelle image
docker run -d --name=priceapi-container -p 3001:3001 ala91/priceapi:latest
