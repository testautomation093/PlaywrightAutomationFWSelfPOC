/**********************************************************************************************
 *
 *                 ENTERPRISE PLAYWRIGHT + DEV APPLICATION CI/CD PIPELINE
 *
 *  Author  : Nishant Goel
 *  Purpose : Enterprise CI/CD Demonstration
 *
 *  Pipeline Flow
 *  -------------------------------------------------------------------------------------------
 *
 *  STEP 1  -> Build Application + Unit Tests
 *  STEP 2  -> Deploy to DEV (Simulation)
 *  STEP 3  -> Deploy to QA (Simulation)
 *  STEP 4  -> Execute QA Regression Tests (Playwright)
 *  STEP 5  -> Deploy to STAGE (Simulation)
 *  STEP 6  -> Execute STAGE Sanity Tests (Playwright)
 *  STEP 7  -> Deploy to PROD (Simulation)
 *  STEP 8  -> Publish HTML & Allure Reports
 *
 **********************************************************************************************/

pipeline {

    agent any

    /******************************************************************************************
     *
     * PARAMETERS
     *
     ******************************************************************************************/

    parameters {

        choice(
            name: 'ENVIRONMENT',
            choices: [
                'qa',
                'stage',
                'dev',
                'uat'
            ],
            description: 'Select Target Environment'
        )

    }

    /******************************************************************************************
     *
     * ENVIRONMENT VARIABLES
     *
     ******************************************************************************************/

    environment {

        DEV_REPOSITORY = 'https://github.com/jglick/simple-maven-project-with-tests.git'

        PLAYWRIGHT_REPOSITORY = 'https://github.com/testautomation093/PlaywrightAutomationFWSelfPOC.git'

        MAVEN_HOME = tool 'maven'

        NODEJS_HOME = tool 'NodeJs'
        
        JAVA_HOME  = tool 'jdk17'

    }

    /******************************************************************************************
     *
     * STAGES
     *
     ******************************************************************************************/

    stages {

        //==============================================================================
        // STEP 1
        // BUILD APPLICATION + UNIT TESTS
        //==============================================================================

        stage('STEP 1 : Build Application + Unit Tests') {

            steps {

                echo ""
                echo "==============================================================="
                echo "STEP 1 : BUILD APPLICATION"
                echo "==============================================================="

                dir('Application') {

                    git branch: 'main',
                        url: "${DEV_REPOSITORY}"

                    sh """

                        echo "Cleaning Previous Build..."

                        ${MAVEN_HOME}/bin/mvn clean

                        echo "Running Unit Tests..."

                        ${MAVEN_HOME}/bin/mvn test

                        echo "Packaging Application..."

                        ${MAVEN_HOME}/bin/mvn package

                    """

                }

            }

            post {

                always {

                    junit 'Application/target/surefire-reports/*.xml'

                    archiveArtifacts artifacts: 'Application/target/*.jar',
                                      fingerprint: true

                }

            }

        }

        //==============================================================================
        // STEP 2
        // DEPLOY TO DEV
        //==============================================================================

        stage('STEP 2 : Deploy Application to DEV') {

            steps {

                echo ""
                echo "==============================================================="
                echo "DEPLOYING APPLICATION TO DEV"
                echo "==============================================================="

                sh '''

                    echo ""
                    echo "Downloading Build Artifact..."

                    echo ""
                    echo "Application Successfully Deployed to DEV"

                    echo ""
                    echo "DEV URL"

                    echo "https://dev.company.com"

                    echo ""
                    echo "NOTE"

                    echo "No Automation Tests Executed on DEV"

                    echo ""
                    echo "Pipeline Moving to QA Deployment..."

                '''

            }

        }
		
	    //==============================================================================
        // STEP 3
        // DEPLOY TO QA
        //==============================================================================

        stage('STEP 3 : Deploy Application to QA') {

            steps {

                echo ""
                echo "==============================================================="
                echo "DEPLOYING APPLICATION TO QA"
                echo "==============================================================="

                sh '''

                    echo ""
                    echo "Application Successfully Deployed to QA"

                    echo ""
                    echo "QA URL"

                    echo "https://qa.company.com"

                    echo ""
                    echo "Pipeline Moving to QA Regression Testing..."

                '''

            }

        }

        //==============================================================================
        // STEP 4
        // QA REGRESSION TESTS
        //==============================================================================

        stage('STEP 4 : Execute QA Regression Tests') {

            steps {

                echo ""
                echo "==============================================================="
                echo "EXECUTING PLAYWRIGHT REGRESSION TESTS"
                echo "==============================================================="

                dir('PlaywrightAutomation') {

                    git branch: 'main',
                        url: "${PLAYWRIGHT_REPOSITORY}"

                    sh """

                        export PATH=${NODEJS_HOME}/bin:\$PATH

                        echo "=========================================="

                        echo "Installing NPM Dependencies"

                        npm ci

                        echo ""

                        echo "Installing Playwright Browsers"

                        npx playwright install --with-deps chromium

                        echo ""

                        echo "Running Regression Suite"

                        ENV=qa npx playwright test --project=chromium

                        echo ""

                        echo "Generating Allure Report"

                        npx allure generate allure-results \
                            --clean \
                            -o allure-report

                    """

                }

            }

            post {

                always {

                    archiveArtifacts artifacts: '''
                        PlaywrightAutomation/reports/html-report/**,
                        PlaywrightAutomation/allure-report/**
                    ''',
                    fingerprint: true

                    archiveArtifacts artifacts: '''
                        PlaywrightAutomation/allure-results/**
                    ''',
                    fingerprint: true

                    publishHTML(target: [

                        allowMissing: true,

                        alwaysLinkToLastBuild: true,

                        keepAll: true,

                        reportDir: 'PlaywrightAutomation/reports/html-report',

                        reportFiles: 'index.html',

                        reportName: 'QA Regression HTML Report'

                    ])

                    allure(

                        includeProperties: false,

                        jdk: '',

                        results: [[
                            path: 'PlaywrightAutomation/allure-results'
                        ]]

                    )

                }

            }

        }	
		
	    //==============================================================================
        // STEP 5
        // DEPLOY TO STAGE
        //==============================================================================

        stage('STEP 5 : Deploy Application to STAGE') {

            steps {

                echo ""
                echo "==============================================================="
                echo "DEPLOYING APPLICATION TO STAGE"
                echo "==============================================================="

                sh '''

                    echo ""
                    echo "Application Successfully Deployed to STAGE"

                    echo ""
                    echo "STAGE URL"

                    echo "https://stage.company.com"

                    echo ""
                    echo "Pipeline Moving to STAGE Sanity Testing..."

                '''

            }

        }

        //==============================================================================
        // STEP 6
        // STAGE SANITY TESTS
        //==============================================================================

        stage('STEP 6 : Execute STAGE Sanity Tests') {

            steps {

                echo ""
                echo "==============================================================="
                echo "EXECUTING PLAYWRIGHT SANITY TESTS"
                echo "==============================================================="

                dir('PlaywrightAutomation') {

                    sh """

                        export PATH=${NODEJS_HOME}/bin:\$PATH

                        echo "=========================================="

                        echo "Installing NPM Dependencies"

                        npm ci

                        echo ""

                        echo "Installing Playwright Browsers"

                        npx playwright install --with-deps chromium

                        echo ""

                        echo "Running STAGE Sanity Suite"

                        ENV=stage npx playwright test --grep @sanity --project=chromium

                        echo ""

                        echo "Generating Allure Report"

                        npx allure generate allure-results \
                            --clean \
                            -o allure-report

                    """

                }

            }

            post {

                always {

                    archiveArtifacts artifacts: '''
                        PlaywrightAutomation/reports/html-report/**,
                        PlaywrightAutomation/allure-report/**
                    ''',
                    fingerprint: true

                    archiveArtifacts artifacts: '''
                        PlaywrightAutomation/allure-results/**
                    ''',
                    fingerprint: true

                    publishHTML(target: [

                        allowMissing: true,

                        alwaysLinkToLastBuild: true,

                        keepAll: true,

                        reportDir: 'PlaywrightAutomation/reports/html-report',

                        reportFiles: 'index.html',

                        reportName: 'STAGE Sanity HTML Report'

                    ])

                    allure(

                        includeProperties: false,

                        jdk: '',

                        results: [[
                            path: 'PlaywrightAutomation/allure-results'
                        ]]

                    )

                }

            }

        }

        //==============================================================================
        // STEP 7
        // DEPLOY TO PROD
        // (SIMULATION ONLY)
        //==============================================================================

        stage('STEP 7 : Deploy Application to PROD') {

            steps {

                echo ""
                echo "==============================================================="
                echo "DEPLOYING APPLICATION TO PRODUCTION"
                echo "==============================================================="

                sh '''

                    echo ""
                    echo "Application Successfully Deployed to PROD"

                    echo ""
                    echo "Production URL"

                    echo "https://www.company.com"

                    echo ""
                    echo "NOTE"

                    echo "No Automation Tests Executed on PROD"

                    echo ""
                    echo "Pipeline Moving to Report Publishing..."

                '''

            }

        }

         }

    /******************************************************************************************
     *
     * PIPELINE POST ACTIONS
     *
     ******************************************************************************************/

    post {

        success {

            echo ""

            echo "======================================================================="
            echo "                    CI/CD PIPELINE EXECUTED SUCCESSFULLY"
            echo "======================================================================="

            echo ""
            echo "✔ STEP 1 : Build Application + Unit Tests"
            echo "✔ STEP 2 : Deploy Application to DEV"
            echo "✔ STEP 3 : Deploy Application to QA"
            echo "✔ STEP 4 : QA Regression Tests Completed"
            echo "✔ STEP 5 : Deploy Application to STAGE"
            echo "✔ STEP 6 : STAGE Sanity Tests Completed"
            echo "✔ STEP 7 : Deploy Application to PROD"

            echo ""
            echo "Reports Published Successfully"

            echo ""
            echo "Available Reports"

            echo "• HTML Report"
            echo "• Allure Report"

            echo ""
            echo "Pipeline Completed Successfully"

            echo "======================================================================="

        }

        failure {

            echo ""

            echo "======================================================================="
            echo "                      PIPELINE EXECUTION FAILED"
            echo "======================================================================="

            echo ""
            echo "Please review the failed stage."

            echo ""
            echo "Possible Reasons"

            echo "- Build Failure"
            echo "- Unit Test Failure"
            echo "- Playwright Test Failure"
            echo "- Deployment Failure"
            echo "- Environment Issue"

            echo ""
            echo "Refer Jenkins Console Output"

            echo "======================================================================="

        }

        always {

            echo ""

            echo "======================================================================="
            echo "Cleaning Jenkins Workspace"
            echo "======================================================================="

            cleanWs()

            echo ""
            echo "Workspace Cleaned Successfully"

            echo "======================================================================="

        }

    }

}