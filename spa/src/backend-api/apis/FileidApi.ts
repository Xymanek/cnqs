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


import * as runtime from '../runtime';

export interface DownloadFileEndpointRequest {
    fileId: string;
}

/**
 * 
 */
export class FileidApi extends runtime.BaseAPI {

    /**
     */
    async downloadFileEndpointRaw(requestParameters: DownloadFileEndpointRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['fileId'] == null) {
            throw new runtime.RequiredError(
                'fileId',
                'Required parameter "fileId" was null or undefined when calling downloadFileEndpoint().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/l/{fileId}`.replace(`{${"fileId"}}`, encodeURIComponent(String(requestParameters['fileId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async downloadFileEndpoint(requestParameters: DownloadFileEndpointRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.downloadFileEndpointRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
