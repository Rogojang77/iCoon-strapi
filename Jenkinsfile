pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS = 'docker-hub-credentials'
        RANCHER_API_TOKEN = credentials('rancher-api-key') 
        RANCHER_URL = 'https://apps.inft.ro'
        CLUSTER_ID = 'local'
        PROJECT_ID = 'p-rbxbc'
        WORKLOAD_ID = 'deployment:default:icoon-frontend'
    }
    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }
        stage('Build image') {
            steps {
                script {
                    // Build the Docker image
                    app = docker.build("insightfeatures/insightfeatures:icoon-frontend", ".")
                }
            }
        }
        stage('Push image') {
            steps {
                script {
                    // Push the Docker image to Docker Hub
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_CREDENTIALS) {
                        app.push("icoonfrontend_latest")
                    }
                }
            }
        }
        stage('Rancher Redeploy') {
            steps {
                sh '''
                curl -s -X PUT \
                -H "Authorization: Bearer $RANCHER_API_TOKEN" \
                -H "Content-Type: application/json" \
                --data '{"annotations":{"cattle.io/timestamp":"'$(date +%s)'"}}' \
                "$RANCHER_URL/v3/project/$CLUSTER_ID:$PROJECT_ID/workloads/$WORKLOAD_ID?action=redeploy"
                '''
            }
        }
    }
}
