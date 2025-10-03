import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TikHubApi implements ICredentialType {
	name = 'tikHubApi';
	displayName = 'TikHub API';
	documentationUrl = 'https://api.tikhub.io/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your TikHub API key. Get it from the <a href="https://api.tikhub.io" target="_blank">TikHub Dashboard</a>.',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.tikhub.io',
			required: true,
			description: 'TikHub API base URL. Use the default unless instructed otherwise.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/v1/health/check',
			method: 'GET',
		},
	};
}
