/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AccessToken = {
    /**
     * Use this when requesting authenticated API endpoints
     */
    readonly access_token?: string;
    /**
     * Number of seconds before the access_token expires
     */
    readonly expires_in?: number;
    /**
     * Token type. Will always be bearer
     */
    token_type?: string;
};
