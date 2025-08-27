pipeline {
    agent any

    stages {
        stage('Cloner le code') {
            steps {
                 git branch: 'main', url: "https://github.com/thithuyvyle/CalculatriceJenkins"
            }
        }

        stage('Construire et tester') {
            steps {
                script {
                    // Construire l'image
                    bat "docker build -t calculatrice ."
                    // Lancer le container → il démarre http-server + exécute test_calculatrice.js
                    bat "docker run -p 8003:8003 calculatrice"
                }   
            }
        }
        
        stage('Déployer en production') {
            steps {
                script{
                    // Poser la question : Voulez-vous déployer ? Oui/Non
                    def deploy = input message: 'Voulez-vous déployer en production ?', ok: 'Oui'
                    if (deploy) {
                        // Supprimer un ancien container prod s’il existe
                        bat "docker rm -f ${PROD_CONTAINER_NAME} || true"
                        // Lancer l’appli en prod (pas les tests, juste le serveur statique)
                        bat """
                        docker run -d --name ${PROD_CONTAINER_NAME} \
                        -p ${PORT_PROD}:${PORT_TEST} \
                        ${IMAGE_NAME} bat -c "npx http-server -p ${PORT_TEST}"
                        """
                    }
                }
            }
        }   
    }
}
