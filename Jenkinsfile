pipeline {
    agent any
    stages ('Install Dependencies'){
        steps {
            bat 'npm ci'
        }
    }
    stage('Start API & Run Cypress'){
        steps{
            withCredentials([
                string(credentialsId: 'MONGODB_ACCESS', variable: 'MONGODB_ACCESS'),
                string(credentialsId: 'MONGODB_HOST',   variable: 'MONGODB_HOST')
        ])
                writeFile file: '.env'
                        text: "DB_CONNECT=mongodb+srv://${MONGODB_ACCESS}${MONGODB_HOST}?retryWrites=true&w=majority&appName=Cluster0\r\n"
                bat 'npm run test:api'
        }
    }
}