export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    cognito: {
        USER_POOL_ID: 'eu-central-1_V5TPV8THj',
        IDENTITY_POOL_ID: 'eu-central-1:0e87cae1-122b-4a88-b473-f9f3fc9f92ef',
        APP_CLIENT_ID: '1u8a4dvkn40q96rt2ri1cq9m6h',
        REGION: 'eu-central-1',
    },
    apiGateway: {
        URL: 'https://sfq0mtljbe.execute-api.eu-central-1.amazonaws.com/prod',
        REGION: 'eu-central-1',
    },
    s3: {
        EXERCISE_BUCKET: 'fit-exercise-images'
    },
    apiPath: {
        EXERCISES: '/exercises',
        PLANS: '/plans'
    }
};