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
 * 
 * @export
 * @interface UploadFileResponse
 */
export interface UploadFileResponse {
    /**
     * 
     * @type {string}
     * @memberof UploadFileResponse
     */
    viewUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof UploadFileResponse
     */
    shareUrl?: string;
}

/**
 * Check if a given object implements the UploadFileResponse interface.
 */
export function instanceOfUploadFileResponse(value: object): boolean {
    return true;
}

export function UploadFileResponseFromJSON(json: any): UploadFileResponse {
    return UploadFileResponseFromJSONTyped(json, false);
}

export function UploadFileResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UploadFileResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'viewUrl': json['viewUrl'] == null ? undefined : json['viewUrl'],
        'shareUrl': json['shareUrl'] == null ? undefined : json['shareUrl'],
    };
}

export function UploadFileResponseToJSON(value?: UploadFileResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'viewUrl': value['viewUrl'],
        'shareUrl': value['shareUrl'],
    };
}
