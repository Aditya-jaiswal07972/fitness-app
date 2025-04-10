pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_HUB_USERNAME = 'aditya14rudra'
    }

    stages {

        stage('Build Backend Docker Image') {
            steps {
                bat 'docker build -t aditya14rudra/fitness-app-backend:latest -f Dockerfile.backend .'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                bat 'docker build -t aditya14rudra/fitness-app-frontend:latest -f Dockerfile.frontend .'
            }
        }

        stage('Push Backend Docker Image') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-credentials', url: '']) {
                    bat 'docker push aditya14rudra/fitness-app-backend:latest'
                }
            }
        }

        stage('Push Frontend Docker Image') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-credentials', url: '']) {
                    bat 'docker push aditya14rudra/fitness-app-frontend:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ansible-key', keyFileVariable: 'KEY_FILE')]) {
                    bat '''
                        REM Set custom filename to use for deployment
                        set KEY_COPY=key_temp.pem

                        REM Copy the Jenkins temp key to working directory
                        copy %KEY_FILE% %KEY_COPY%

                        REM Apply correct permissions for Jenkins user
                        icacls %KEY_COPY% /inheritance:r
                        icacls %KEY_COPY% /grant:r "krishn\\hp:R"

                        REM Run remote deploy command using SSH
                        ssh -i %KEY_COPY% -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@18.234.61.171 ^
                        "cd /home/ubuntu/fitness-app && git pull && kubectl apply -f k8s/"

                        REM Optional: Clean up the copied key file
                        del /f %KEY_COPY%
                    '''
                }
            }
        }
    }
}
