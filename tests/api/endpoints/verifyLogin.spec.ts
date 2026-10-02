import { test, expect } from '@playwright/test';
import { getCredentials } from '../../../support/credentials';
import { deleteVerifyLogin, postVerifyLogin } from '../clients/VerifyLogin';

test.describe('verifyLogin endpoint', () => {

    test('scenario 7 - endpoint returns 200 when valid credentials are submbitted', async ({ request }, testInfo) => {
        const credentials = getCredentials(testInfo.project.metadata.environment);

        const response = await postVerifyLogin(request, {
            email: credentials.email,
            password: credentials.password
        });

        const responseBody = await response.json();

        expect(response.status()).toBe(200);

        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User exists!');
    });

    test('scenario 8 - endpoint returns 400 when a login is submitted without an email', async ({ request }, testInfo) => {
        const credentials = getCredentials(testInfo.project.metadata.environment);

        const response = await postVerifyLogin(request, {
            password: credentials.password
        });

        const responseBody = await response.json();

        expect(response.status()).toBe(200); // This should porbably be a HTTP 400

        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
    });

    test('scenario 9 - endpoint returns 405 when a login when the http method is DELETE', async ({ request }, testInfo) => {
        const credentials = getCredentials(testInfo.project.metadata.environment);

        const response = await deleteVerifyLogin(request, {
            email: credentials.email,
            password: credentials.password
        });

        const responseBody = await response.json();

        expect(response.status()).toBe(200); // This should probably be a HTTP 405

        expect(responseBody.responseCode).toBe(405);
        expect(responseBody.message).toBe('This request method is not supported.');
    });

    test('scenario 10 - endpoint returns 404 when invalid login details are submitted ', async ({ request }) => {
    
        const response = await postVerifyLogin(request, {
            email: "invalid@email.com",
            password: "invalidpassword"
        });

        const responseBody = await response.json();

        expect(response.status()).toBe(200); // This should probably be a HTTP 404

        expect(responseBody.responseCode).toBe(404);
        expect(responseBody.message).toBe('User not found!');
    });
});