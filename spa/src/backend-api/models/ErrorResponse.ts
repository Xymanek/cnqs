/* tslint:disable */
/* eslint-disable */
/**
 * CloudNativeQuickShare API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * the dto used to send an error response to the client
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     * the http status code sent to the client. default is 400.
     * @type {number}
     * @memberof ErrorResponse
     */
    statusCode?: number;
    /**
     * the message for the error response
     * @type {string}
     * @memberof ErrorResponse
     */
    message?: string;
    /**
     * the collection of errors for the current context
     * @type {{ [key: string]: Array<string>; }}
     * @memberof ErrorResponse
     */
    errors?: { [key: string]: Array<string>; };
}

/**
 * Check if a given object implements the ErrorResponse interface.
 */
export function instanceOfErrorResponse(value: object): boolean {
    return true;
}

export function ErrorResponseFromJSON(json: any): ErrorResponse {
    return ErrorResponseFromJSONTyped(json, false);
}

export function ErrorResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'statusCode': json['statusCode'] == null ? undefined : json['statusCode'],
        'message': json['message'] == null ? undefined : json['message'],
        'errors': json['errors'] == null ? undefined : json['errors'],
    };
}

export function ErrorResponseToJSON(value?: ErrorResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'statusCode': value['statusCode'],
        'message': value['message'],
        'errors': value['errors'],
    };
}

