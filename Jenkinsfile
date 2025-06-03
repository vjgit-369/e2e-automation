pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    environment {
        PLAYWRIGHT_BROWSERS_PATH = '0'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    try {
                        bat 'npx playwright test'
                    } catch (err) {
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
    }
} 