pipeline {
    agent any
    options {
        timestamps()
    }
    stages {
        stage("Init") {
            steps {
                sh "docker-compose -f docker-compose.dev.yml up -d --build"
            }
        }
    }
}