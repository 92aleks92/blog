/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Tenant = {
    readonly tenantId?: string;
    /**
     * API key to be used in the `api-key` header
     */
    readonly apiKey?: string;
    /**
     * Human readable name of the tenant
     */
    name?: string;
    /**
     * Authentication password of the tenant
     */
    password?: string;
    readonly createdAt?: string;
    readonly lastUsedAt?: string;
};
