pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
    }

    stages {
        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/Aditya-jaiswal07972/fitness-app.git', branch: 'main'
            }
        }

        stage('Copy Code to Ansible Server') {
            steps {
                sshagent (credentials: ['ansible-key']) {
                    sh '''
                    scp -o StrictHostKeyChecking=no -r \
                    Dockerfile.backend Dockerfile.frontend Jenkinsfile LICENSE README.md \
                    ansible backend deploy.yml frontend  k8s \
                    ubuntu@54.196.240.72:~/fitness-app/
                    '''
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                sshagent (credentials: ['ansible-ec2-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@54.196.240.72 '
                        cd fitness-app &&
                        echo "$DOCKER_HUB_CREDENTIALS_PSW" | docker login -u "$DOCKER_HUB_CREDENTIALS_USR" --password-stdin &&
                        ansible-playbook deploy.yml
                    '
                    '''
                }
            }
        }
    }
}
