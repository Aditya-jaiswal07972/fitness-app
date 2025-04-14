pipeline {
    agent any

    environment {
        ANSIBLE_HOST = "ubuntu@54.196.240.72"
        ANSIBLE_KEY = "ubuntu" // Credential ID in Jenkins
        DOCKER_HUB_CREDENTIALS = "docker-hub-credentials" // <-- Your Docker Hub creds ID
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Copy Code to Ansible Server') {
            steps {
                sshagent (credentials: [env.ANSIBLE_KEY]) {
                    sh '''
                        scp -o StrictHostKeyChecking=no -r * $ANSIBLE_HOST:~/fitness-app/
                    '''
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                sshagent (credentials: [env.ANSIBLE_KEY]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no $ANSIBLE_HOST '
                            cd ~/fitness-app &&
                            ansible-playbook deploy.yml --extra-vars "dockerhub_username=${DOCKER_HUB_USERNAME}" --extra-vars "dockerhub_password=${DOCKER_HUB_PASSWORD}"
                        '
                    """
                }
            }
        }
    }

    environment {
        DOCKER_HUB_USERNAME = credentials('docker-hub-credentials').usr
        DOCKER_HUB_PASSWORD = credentials('docker-hub-credentials').psw
    }
}
