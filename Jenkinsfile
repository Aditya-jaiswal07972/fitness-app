pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_HUB_USERNAME = 'aditya14rudra'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Aditya-jaiswal07972/fitness-app.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_HUB_USERNAME/fitness-app-backend:latest -f Dockerfile.backend .'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_HUB_USERNAME/fitness-app-frontend:latest -f Dockerfile.frontend .'
            }
        }

        stage('Push Backend Docker Image') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-credentials', url: '']) {
                    sh 'docker push $DOCKER_HUB_USERNAME/fitness-app-backend:latest'
                }
            }
        }

        stage('Push Frontend Docker Image') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-credentials', url: '']) {
                    sh 'docker push $DOCKER_HUB_USERNAME/fitness-app-frontend:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'ansible-playbook -i /etc/ansible/hosts ansible/deploy.yaml'
            }
        }
    }
}
