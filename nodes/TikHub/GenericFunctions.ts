import {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	JsonObject,
	NodeApiError,
} from 'n8n-workflow';

/**
 * Make an API request to TikHub
 */
export async function tikHubApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('tikHubApi');

	const options: IHttpRequestOptions = {
		method,
		body,
		qs,
		url: `${credentials.baseUrl}${endpoint}`,
		json: true,
	};

	try {
		return await this.helpers.httpRequestWithAuthentication.call(this, 'tikHubApi', options);
	} catch (error: any) {
		// Enhanced error handling
		if (error.response?.body) {
			const errorBody = error.response.body;
			const errorMessage =
				errorBody.message || errorBody.error || errorBody.detail || JSON.stringify(errorBody);
			throw new NodeApiError(this.getNode(), error as JsonObject, {
				message: `TikHub API Error: ${errorMessage}`,
				description: `Endpoint: ${method} ${endpoint}`,
			});
		}
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: `TikHub API request failed: ${error.message}`,
		});
	}
}

/**
 * Make an API request and return all items (handle pagination)
 */
export async function tikHubApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	cursorField: string = 'cursor',
): Promise<any[]> {
	const returnData: any[] = [];
	let cursor: string | number | undefined;
	let hasMore = true;

	do {
		if (cursor !== undefined) {
			qs[cursorField] = cursor;
		}

		const responseData = await tikHubApiRequest.call(this, method, endpoint, body, qs);

		// Handle different response structures
		if (responseData.data) {
			if (Array.isArray(responseData.data)) {
				returnData.push(...responseData.data);
			} else {
				returnData.push(responseData.data);
			}

			// Check for pagination
			cursor = responseData.cursor || responseData.next_cursor || responseData.max_cursor;
			hasMore = responseData.has_more ?? (cursor !== undefined && cursor !== null);
		} else if (Array.isArray(responseData)) {
			returnData.push(...responseData);
			hasMore = false;
		} else {
			returnData.push(responseData);
			hasMore = false;
		}
	} while (hasMore);

	return returnData;
}
