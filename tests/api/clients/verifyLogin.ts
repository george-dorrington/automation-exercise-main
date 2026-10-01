import type { APIRequestContext, APIResponse } from '@playwright/test';

const endpoint = 'verifyLogin';

type LoginForm = {
    email?: string;
    password?: string;
};

export function postVerifyLogin(request: APIRequestContext, form: LoginForm): Promise<APIResponse> {
    return request.post(endpoint, { form });
}

export function deleteVerifyLogin(request: APIRequestContext, form: LoginForm): Promise<APIResponse> {
    return request.delete(endpoint, { form });
}