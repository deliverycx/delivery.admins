pipeline {
    agent any
    options {
        timestamps()
    }
    stages {
        stage("Init") {
            steps {
                sh "docker-compose -v"
            }
        }
    }
}