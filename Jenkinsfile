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
                    sh "docker build -t calculatrice ."
                    // Lancer le container → il démarre http-server + exécute test_calculatrice.js
                    sh "docker run -p 8003:8003 calculatrice"
                }    
            }
        }
        
        stage('Déployer en production') {
            steps {
                script{
                    // Poser la question : Voulez-vous déployer ? Oui/Non
              
                    // Supprimer un ancien container prod s’il existe
              
                    // Lancer l’appli en prod (pas les tests, juste le serveur statique)
                }
                 
            }
        }   
    }
}
