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
                        whoami > whoami.txt
                        set /p JENKINS_USER=<whoami.txt
                        icacls %KEY_FILE% /inheritance:r
                        icacls %KEY_FILE% /grant:r "%JENKINS_USER%:R"
                        ssh -i %KEY_FILE% -o IdentitiesOnly=yes -o StrictHostKeyChecking=no ubuntu@18.234.61.171 ^
                        "cd /home/ubuntu/fitness-app && git pull && ansible-playbook -i /etc/ansible/hosts ansible/deploy.yaml"
                    '''
                }
            }
        }
    }
}
