FROM selenium/standalone-chrome:latest

USER root
RUN apt-get update && apt-get install -y curl gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copier les fichiers
COPY . .

# Installer les dépendances
RUN npm install selenium-webdriver http-server

# Exposer le port utilisé par http-server
EXPOSE 8080

# Démarrer le serveur HTTP et lancer le script de test
CMD ["sh", "-c", "npx http-server -p 8080 & sleep 5 && node test_calculatrice.js"]
