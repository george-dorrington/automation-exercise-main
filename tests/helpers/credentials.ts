type Credentials = {
    email: string;
    password: string;
};

export function getCredentials(environment: unknown): Credentials {
    if (environment !== 'dev' && environment !== 'test') {
        throw new Error('Please provide an environment');
    }

    let credentialPrefix: 'DEV' | 'TEST';

    if (environment === 'dev') {
        credentialPrefix = 'DEV';
    } else {
        credentialPrefix = 'TEST';
    }

    const email = process.env[`${credentialPrefix}_EMAIL`];
    const password = process.env[`${credentialPrefix}_PASSWORD`];

    if (!email || !password) {
        throw new Error(`email and password need to be set in the .env file. See GETTING_STARTED.md if you're not sure how to do this.`);
    }

    return { email, password };
}
