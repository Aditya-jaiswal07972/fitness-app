pipeline {
    agent any

    environment {
        ANSIBLE_HOST = "ubuntu@54.196.240.72"
        SSH_KEY_ID = "ansible-key"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/Aditya-jaiswal07972/fitness-app.git'
            }
        }

        stage('Copy Code to Ansible Server') {
            steps {
                sshagent (credentials: ["${SSH_KEY_ID}"]) {
                    sh """
                    scp -o StrictHostKeyChecking=no -r * ${ANSIBLE_HOST}:~/fitness-app/
                    """
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                sshagent (credentials: ["${SSH_KEY_ID}"]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${ANSIBLE_HOST} '
                      cd fitness-app &&
                      ansible-playbook deploy.yml
                    '
                    """
                }
            }
        }
    }
}
