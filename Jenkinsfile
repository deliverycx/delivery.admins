pipeline {
    agent any
    options {
        timestamps()
    }
    stages {
        stage("Init") {
            steps {
                sh "ls"
            }
						steps {
                sh "make"
            }
        }
    }
}