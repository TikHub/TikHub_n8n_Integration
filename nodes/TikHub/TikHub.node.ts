import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { tikHubApiRequest } from './GenericFunctions';

export class TikHub implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'TikHub',
		name: 'tikHub',
		icon: 'file:tikhub.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with TikHub API (TikTok, Instagram, YouTube, Twitter)',
		defaults: {
			name: 'TikHub',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'tikHubApi',
				required: true,
			},
		],
		properties: [
			// Resource selector
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'TikTok',
						value: 'tiktok',
					},
					{
						name: 'Instagram',
						value: 'instagram',
					},
					{
						name: 'YouTube',
						value: 'youtube',
					},
					{
						name: 'Twitter',
						value: 'twitter',
					},
				],
				default: 'tiktok',
				description: 'Social media platform to interact with',
			},

			// ============================================================
			// TikTok Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tiktok'],
					},
				},
				options: [
					{
						name: 'Get Video',
						value: 'getVideo',
						description: 'Retrieve a single TikTok video by video ID',
						action: 'Get a TikTok video',
					},
					{
						name: 'Get Video by Share URL',
						value: 'getVideoByShareUrl',
						description: 'Retrieve a TikTok video using its share URL',
						action: 'Get TikTok video by share URL',
					},
					{
						name: 'Get Multiple Videos',
						value: 'getMultipleVideos',
						description: 'Retrieve multiple TikTok videos in a single request',
						action: 'Get multiple TikTok videos',
					},
					{
						name: 'Get User Profile',
						value: 'getUserProfile',
						description: 'Retrieve a TikTok user profile',
						action: 'Get TikTok user profile',
					},
					{
						name: 'Get User Posts',
						value: 'getUserPosts',
						description: 'Retrieve video posts from a TikTok user',
						action: 'Get TikTok user posts',
					},
					{
						name: 'Get Video Comments',
						value: 'getVideoComments',
						description: 'Retrieve comments from a TikTok video',
						action: 'Get TikTok video comments',
					},
				],
				default: 'getVideo',
			},

			// TikTok: Get Video fields
			{
				displayName: 'Video ID',
				name: 'awemeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getVideo'],
					},
				},
				default: '',
				description: 'TikTok video ID (aweme_id)',
				placeholder: 'e.g. 7234567890123456789',
			},

			// TikTok: Get Video by Share URL fields
			{
				displayName: 'Share URL',
				name: 'shareUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getVideoByShareUrl'],
					},
				},
				default: '',
				description: 'TikTok video share URL',
				placeholder: 'e.g. https://vm.tiktok.com/ZMhj8KQ9T/',
			},

			// TikTok: Get Multiple Videos fields
			{
				displayName: 'Video IDs',
				name: 'awemeIds',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getMultipleVideos'],
					},
				},
				default: '',
				description: 'Comma-separated list of TikTok video IDs',
				placeholder: 'e.g. 7234567890123456789,7234567890123456790',
			},

			// TikTok: Get User Profile fields
			{
				displayName: 'Identifier Type',
				name: 'identifierType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getUserProfile'],
					},
				},
				options: [
					{
						name: 'User ID',
						value: 'userId',
					},
					{
						name: 'Sec User ID',
						value: 'secUserId',
					},
					{
						name: 'Unique ID (Username)',
						value: 'uniqueId',
					},
				],
				default: 'uniqueId',
				description: 'Type of identifier to use',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getUserProfile'],
						identifierType: ['userId'],
					},
				},
				default: '',
				description: 'The TikTok user ID',
			},
			{
				displayName: 'Sec User ID',
				name: 'secUserId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getUserProfile'],
						identifierType: ['secUserId'],
					},
				},
				default: '',
				description: 'The TikTok sec_user_id',
			},
			{
				displayName: 'Username',
				name: 'uniqueId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getUserProfile'],
						identifierType: ['uniqueId'],
					},
				},
				default: '',
				description: 'TikTok username (unique_id)',
				placeholder: 'e.g. charlidamelio',
			},

			// TikTok: Get User Posts fields
			{
				displayName: 'Identifier Type',
				name: 'userIdentifierType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getUserPosts'],
					},
				},
				options: [
					{
						name: 'Sec User ID',
						value: 'secUserId',
					},
					{
						name: 'Unique ID (Username)',
						value: 'uniqueId',
					},
				],
				default: 'uniqueId',
				description: 'Type of identifier to use',
			},
			{
				displayName: 'Sec User ID',
				name: 'postsSecUserId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getUserPosts'],
						userIdentifierType: ['secUserId'],
					},
				},
				default: '',
				description: 'The TikTok sec_user_id',
			},
			{
				displayName: 'Username',
				name: 'postsUniqueId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getUserPosts'],
						userIdentifierType: ['uniqueId'],
					},
				},
				default: '',
				description: 'The TikTok username (unique_id)',
			},
			{
				displayName: 'Max Cursor',
				name: 'maxCursor',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getUserPosts'],
					},
				},
				default: 0,
				description: 'Pagination cursor for next page',
			},
			{
				displayName: 'Count',
				name: 'count',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getUserPosts'],
					},
				},
				default: 20,
				description: 'Number of posts to fetch (max 35)',
			},

			// TikTok: Get Video Comments fields
			{
				displayName: 'Video ID',
				name: 'commentsAwemeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getVideoComments'],
					},
				},
				default: '',
				description: 'The TikTok video ID',
			},
			{
				displayName: 'Cursor',
				name: 'commentsCursor',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getVideoComments'],
					},
				},
				default: 0,
				description: 'Pagination cursor',
			},
			{
				displayName: 'Count',
				name: 'commentsCount',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['tiktok'],
						operation: ['getVideoComments'],
					},
				},
				default: 20,
				description: 'Number of comments to fetch',
			},

			// ============================================================
			// Instagram Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['instagram'],
					},
				},
				options: [
					{
						name: 'Get User by Username',
						value: 'getUserByUsername',
						description: 'Retrieve an Instagram user by username',
						action: 'Get Instagram user by username',
					},
					{
						name: 'Get User by ID',
						value: 'getUserById',
						description: 'Retrieve an Instagram user by user ID',
						action: 'Get Instagram user by ID',
					},
					{
						name: 'Get Post by URL',
						value: 'getPostByUrl',
						description: 'Retrieve an Instagram post using its URL',
						action: 'Get Instagram post by URL',
					},
					{
						name: 'Get Post Media',
						value: 'getPostMedia',
						description: 'Retrieve media files from an Instagram post',
						action: 'Get Instagram post media',
					},
					{
						name: 'Get User Highlights',
						value: 'getUserHighlights',
						description: 'Retrieve story highlights from an Instagram user',
						action: 'Get Instagram user highlights',
					},
					{
						name: 'Get Post Comments',
						value: 'getPostComments',
						description: 'Retrieve comments from an Instagram post',
						action: 'Get Instagram post comments',
					},
					{
						name: 'Get Comment Replies',
						value: 'getCommentReplies',
						description: 'Retrieve replies to an Instagram comment',
						action: 'Get Instagram comment replies',
					},
					{
						name: 'Get User Posts',
						value: 'getUserPosts',
						description: 'Retrieve posts from an Instagram user',
						action: 'Get Instagram user posts',
					},
				],
				default: 'getUserByUsername',
			},

			// Instagram: Get User by Username
			{
				displayName: 'Username',
				name: 'instagramUsername',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['instagram'],
						operation: ['getUserByUsername', 'getUserHighlights'],
					},
				},
				default: '',
				description: 'Instagram username (without @)',
				placeholder: 'e.g. instagram',
			},

			// Instagram: Get User by ID
			{
				displayName: 'User ID',
				name: 'instagramUserId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['instagram'],
						operation: ['getUserById', 'getUserPosts'],
					},
				},
				default: '',
				description: 'Instagram user ID',
				placeholder: 'e.g. 25025320',
			},

			// Instagram: Get Post by URL / Get Post Media
			{
				displayName: 'Post URL',
				name: 'instagramPostUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['instagram'],
						operation: ['getPostByUrl', 'getPostMedia'],
					},
				},
				default: '',
				description: 'Instagram post URL',
				placeholder: 'e.g. https://www.instagram.com/p/CqxHFz-Jr9w/',
			},

			// Instagram: Get Post Comments
			{
				displayName: 'Post ID',
				name: 'instagramPostId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['instagram'],
						operation: ['getPostComments'],
					},
				},
				default: '',
				description: 'Instagram post ID',
			},

			// Instagram: Get Comment Replies
			{
				displayName: 'Comment ID',
				name: 'instagramCommentId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['instagram'],
						operation: ['getCommentReplies'],
					},
				},
				default: '',
				description: 'Instagram comment ID',
			},

			// Instagram: Pagination fields
			{
				displayName: 'Count',
				name: 'instagramCount',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['instagram'],
						operation: ['getUserPosts'],
					},
				},
				default: 12,
				description: 'Number of posts to fetch',
			},
			{
				displayName: 'End Cursor',
				name: 'instagramEndCursor',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['instagram'],
						operation: ['getUserPosts'],
					},
				},
				default: '',
				description: 'Pagination cursor for next page',
			},

			// ============================================================
			// YouTube Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['youtube'],
					},
				},
				options: [
					{
						name: 'Get Video Info',
						value: 'getVideoInfo',
						description: 'Retrieve YouTube video information',
						action: 'Get YouTube video info',
					},
					{
						name: 'Get Video Comments',
						value: 'getVideoComments',
						description: 'Retrieve comments from a YouTube video',
						action: 'Get YouTube video comments',
					},
					{
						name: 'Get Channel ID',
						value: 'getChannelId',
						description: 'Retrieve a YouTube channel ID by username',
						action: 'Get YouTube channel ID',
					},
					{
						name: 'Get Channel Info',
						value: 'getChannelInfo',
						description: 'Retrieve YouTube channel information',
						action: 'Get YouTube channel info',
					},
					{
						name: 'Get Channel Videos',
						value: 'getChannelVideos',
						description: 'Retrieve videos from a YouTube channel',
						action: 'Get YouTube channel videos',
					},
					{
						name: 'Get Channel Shorts',
						value: 'getChannelShorts',
						description: 'Retrieve YouTube Shorts from a channel',
						action: 'Get YouTube channel shorts',
					},
				],
				default: 'getVideoInfo',
			},

			// YouTube: Get Video Info / Get Video Comments
			{
				displayName: 'Video ID',
				name: 'youtubeVideoId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['youtube'],
						operation: ['getVideoInfo', 'getVideoComments'],
					},
				},
				default: '',
				description: 'YouTube video ID',
				placeholder: 'e.g. dQw4w9WgXcQ',
			},

			// YouTube: Get Channel ID
			{
				displayName: 'Username',
				name: 'youtubeUsername',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['youtube'],
						operation: ['getChannelId'],
					},
				},
				default: '',
				description: 'YouTube channel username (without @)',
				placeholder: 'e.g. mkbhd',
			},

			// YouTube: Get Channel Info / Videos / Shorts
			{
				displayName: 'Channel ID',
				name: 'youtubeChannelId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['youtube'],
						operation: ['getChannelInfo', 'getChannelVideos', 'getChannelShorts'],
					},
				},
				default: '',
				description: 'YouTube channel ID',
				placeholder: 'e.g. UCBJycsmduvYEL83R_U4JriQ',
			},

			// YouTube: Pagination
			{
				displayName: 'Continuation Token',
				name: 'youtubeContinuation',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['youtube'],
						operation: ['getVideoComments', 'getChannelVideos', 'getChannelShorts'],
					},
				},
				default: '',
				description: 'Pagination token for next page',
			},

			// ============================================================
			// Twitter Operations
			// ============================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['twitter'],
					},
				},
				options: [
					{
						name: 'Get Tweet Detail',
						value: 'getTweetDetail',
						description: 'Retrieve details of a tweet',
						action: 'Get tweet detail',
					},
					{
						name: 'Get User Profile',
						value: 'getUserProfile',
						description: 'Retrieve a Twitter user profile',
						action: 'Get Twitter user profile',
					},
					{
						name: 'Get User Tweets',
						value: 'getUserTweets',
						description: 'Retrieve tweets from a Twitter user',
						action: 'Get Twitter user tweets',
					},
					{
						name: 'Get Tweet Comments',
						value: 'getTweetComments',
						description: 'Retrieve comments from a tweet',
						action: 'Get tweet comments',
					},
					{
						name: 'Get Latest Comments',
						value: 'getLatestComments',
						description: 'Retrieve latest comments from a tweet',
						action: 'Get latest tweet comments',
					},
					{
						name: 'Get User Replies',
						value: 'getUserReplies',
						description: 'Retrieve replies from a Twitter user',
						action: 'Get Twitter user replies',
					},
					{
						name: 'Get User Media',
						value: 'getUserMedia',
						description: 'Retrieve media posts from a Twitter user',
						action: 'Get Twitter user media',
					},
					{
						name: 'Get Retweet Users',
						value: 'getRetweetUsers',
						description: 'Retrieve users who retweeted a tweet',
						action: 'Get retweet users',
					},
				],
				default: 'getTweetDetail',
			},

			// Twitter: Get Tweet Detail / Comments / Latest Comments / Retweet Users
			{
				displayName: 'Tweet ID',
				name: 'twitterTweetId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['twitter'],
						operation: [
							'getTweetDetail',
							'getTweetComments',
							'getLatestComments',
							'getRetweetUsers',
						],
					},
				},
				default: '',
				description: 'Twitter tweet ID',
			},

			// Twitter: Get User Profile / Tweets / Replies / Media
			{
				displayName: 'Screen Name',
				name: 'twitterScreenName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['twitter'],
						operation: ['getUserProfile', 'getUserTweets', 'getUserReplies', 'getUserMedia'],
					},
				},
				default: '',
				description: 'Twitter screen name (username without @)',
				placeholder: 'e.g. elonmusk',
			},

			// Twitter: Pagination
			{
				displayName: 'Cursor',
				name: 'twitterCursor',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['twitter'],
						operation: [
							'getUserTweets',
							'getTweetComments',
							'getLatestComments',
							'getUserReplies',
							'getUserMedia',
							'getRetweetUsers',
						],
					},
				},
				default: '',
				description: 'Pagination cursor for next page',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				if (resource === 'tiktok') {
					// ===== TikTok Operations =====
					if (operation === 'getVideo') {
						const awemeId = this.getNodeParameter('awemeId', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/tiktok/app/v3/fetch_one_video',
							{},
							{ aweme_id: awemeId },
						);
					} else if (operation === 'getVideoByShareUrl') {
						const shareUrl = this.getNodeParameter('shareUrl', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/tiktok/app/v3/fetch_one_video_by_share_url',
							{},
							{ share_url: shareUrl },
						);
					} else if (operation === 'getMultipleVideos') {
						const awemeIds = this.getNodeParameter('awemeIds', i) as string;
						const awemeIdList = awemeIds.split(',').map((id) => id.trim());
						responseData = await tikHubApiRequest.call(
							this,
							'POST',
							'/api/v1/tiktok/app/v3/fetch_multi_video',
							{ aweme_ids: awemeIdList },
						);
					} else if (operation === 'getUserProfile') {
						const identifierType = this.getNodeParameter('identifierType', i) as string;
						const qs: IDataObject = {};
						if (identifierType === 'userId') {
							qs.user_id = this.getNodeParameter('userId', i) as string;
						} else if (identifierType === 'secUserId') {
							qs.sec_user_id = this.getNodeParameter('secUserId', i) as string;
						} else if (identifierType === 'uniqueId') {
							qs.unique_id = this.getNodeParameter('uniqueId', i) as string;
						}
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/tiktok/app/v3/handler_user_profile',
							{},
							qs,
						);
					} else if (operation === 'getUserPosts') {
						const userIdentifierType = this.getNodeParameter('userIdentifierType', i) as string;
						const qs: IDataObject = {};
						if (userIdentifierType === 'secUserId') {
							qs.sec_user_id = this.getNodeParameter('postsSecUserId', i) as string;
						} else if (userIdentifierType === 'uniqueId') {
							qs.unique_id = this.getNodeParameter('postsUniqueId', i) as string;
						}
						qs.max_cursor = this.getNodeParameter('maxCursor', i) as number;
						qs.count = this.getNodeParameter('count', i) as number;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/tiktok/app/v3/fetch_user_post_videos',
							{},
							qs,
						);
					} else if (operation === 'getVideoComments') {
						const awemeId = this.getNodeParameter('commentsAwemeId', i) as string;
						const cursor = this.getNodeParameter('commentsCursor', i) as number;
						const count = this.getNodeParameter('commentsCount', i) as number;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/tiktok/app/v3/fetch_video_comments',
							{},
							{ aweme_id: awemeId, cursor, count },
						);
					}
				} else if (resource === 'instagram') {
					// ===== Instagram Operations =====
					if (operation === 'getUserByUsername') {
						const username = this.getNodeParameter('instagramUsername', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/instagram/web_app/fetch_user_info_by_username',
							{},
							{ username },
						);
					} else if (operation === 'getUserById') {
						const userId = this.getNodeParameter('instagramUserId', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/instagram/web_app/fetch_user_info_by_user_id',
							{},
							{ user_id: userId },
						);
					} else if (operation === 'getPostByUrl') {
						const url = this.getNodeParameter('instagramPostUrl', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/instagram/web_app/fetch_post_info_by_url',
							{},
							{ url },
						);
					} else if (operation === 'getPostMedia') {
						const url = this.getNodeParameter('instagramPostUrl', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/instagram/web_app/fetch_post_media_by_url',
							{},
							{ url },
						);
					} else if (operation === 'getUserHighlights') {
						const username = this.getNodeParameter('instagramUsername', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/instagram/web_app/fetch_user_highlights_by_username',
							{},
							{ username },
						);
					} else if (operation === 'getPostComments') {
						const postId = this.getNodeParameter('instagramPostId', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/instagram/web_app/fetch_post_comments_by_post_id',
							{},
							{ post_id: postId },
						);
					} else if (operation === 'getCommentReplies') {
						const commentId = this.getNodeParameter('instagramCommentId', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/instagram/web_app/fetch_comment_replies_by_comment_id',
							{},
							{ comment_id: commentId },
						);
					} else if (operation === 'getUserPosts') {
						const userId = this.getNodeParameter('instagramUserId', i) as string;
						const count = this.getNodeParameter('instagramCount', i) as number;
						const endCursor = this.getNodeParameter('instagramEndCursor', i) as string;
						const qs: IDataObject = { user_id: userId, count };
						if (endCursor) {
							qs.end_cursor = endCursor;
						}
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/instagram/web_app/fetch_user_posts_by_user_id',
							{},
							qs,
						);
					}
				} else if (resource === 'youtube') {
					// ===== YouTube Operations =====
					if (operation === 'getVideoInfo') {
						const videoId = this.getNodeParameter('youtubeVideoId', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/youtube/web/get_video_info',
							{},
							{ video_id: videoId },
						);
					} else if (operation === 'getVideoComments') {
						const videoId = this.getNodeParameter('youtubeVideoId', i) as string;
						const continuation = this.getNodeParameter('youtubeContinuation', i) as string;
						const qs: IDataObject = { video_id: videoId };
						if (continuation) {
							qs.continuation = continuation;
						}
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/youtube/web/get_video_comments',
							{},
							qs,
						);
					} else if (operation === 'getChannelId') {
						const username = this.getNodeParameter('youtubeUsername', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/youtube/web/get_channel_id_by_username',
							{},
							{ username },
						);
					} else if (operation === 'getChannelInfo') {
						const channelId = this.getNodeParameter('youtubeChannelId', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/youtube/web/get_channel_info',
							{},
							{ channel_id: channelId },
						);
					} else if (operation === 'getChannelVideos') {
						const channelId = this.getNodeParameter('youtubeChannelId', i) as string;
						const continuation = this.getNodeParameter('youtubeContinuation', i) as string;
						const qs: IDataObject = { channel_id: channelId };
						if (continuation) {
							qs.continuation = continuation;
						}
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/youtube/web/get_channel_videos',
							{},
							qs,
						);
					} else if (operation === 'getChannelShorts') {
						const channelId = this.getNodeParameter('youtubeChannelId', i) as string;
						const continuation = this.getNodeParameter('youtubeContinuation', i) as string;
						const qs: IDataObject = { channel_id: channelId };
						if (continuation) {
							qs.continuation = continuation;
						}
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/youtube/web/get_channel_shorts',
							{},
							qs,
						);
					}
				} else if (resource === 'twitter') {
					// ===== Twitter Operations =====
					if (operation === 'getTweetDetail') {
						const tweetId = this.getNodeParameter('twitterTweetId', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/twitter/web/fetch_tweet_detail',
							{},
							{ tweet_id: tweetId },
						);
					} else if (operation === 'getUserProfile') {
						const screenName = this.getNodeParameter('twitterScreenName', i) as string;
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/twitter/web/get_user_profile',
							{},
							{ screen_name: screenName },
						);
					} else if (operation === 'getUserTweets') {
						const screenName = this.getNodeParameter('twitterScreenName', i) as string;
						const cursor = this.getNodeParameter('twitterCursor', i) as string;
						const qs: IDataObject = { screen_name: screenName };
						if (cursor) {
							qs.cursor = cursor;
						}
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/twitter/web/fetch_user_tweets',
							{},
							qs,
						);
					} else if (operation === 'getTweetComments') {
						const tweetId = this.getNodeParameter('twitterTweetId', i) as string;
						const cursor = this.getNodeParameter('twitterCursor', i) as string;
						const qs: IDataObject = { tweet_id: tweetId };
						if (cursor) {
							qs.cursor = cursor;
						}
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/twitter/web/fetch_post_comments',
							{},
							qs,
						);
					} else if (operation === 'getLatestComments') {
						const tweetId = this.getNodeParameter('twitterTweetId', i) as string;
						const cursor = this.getNodeParameter('twitterCursor', i) as string;
						const qs: IDataObject = { tweet_id: tweetId };
						if (cursor) {
							qs.cursor = cursor;
						}
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/twitter/web/fetch_tweet_comments',
							{},
							qs,
						);
					} else if (operation === 'getUserReplies') {
						const screenName = this.getNodeParameter('twitterScreenName', i) as string;
						const cursor = this.getNodeParameter('twitterCursor', i) as string;
						const qs: IDataObject = { screen_name: screenName };
						if (cursor) {
							qs.cursor = cursor;
						}
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/twitter/web/fetch_user_replies',
							{},
							qs,
						);
					} else if (operation === 'getUserMedia') {
						const screenName = this.getNodeParameter('twitterScreenName', i) as string;
						const cursor = this.getNodeParameter('twitterCursor', i) as string;
						const qs: IDataObject = { screen_name: screenName };
						if (cursor) {
							qs.cursor = cursor;
						}
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/twitter/web/fetch_user_media',
							{},
							qs,
						);
					} else if (operation === 'getRetweetUsers') {
						const tweetId = this.getNodeParameter('twitterTweetId', i) as string;
						const cursor = this.getNodeParameter('twitterCursor', i) as string;
						const qs: IDataObject = { tweet_id: tweetId };
						if (cursor) {
							qs.cursor = cursor;
						}
						responseData = await tikHubApiRequest.call(
							this,
							'GET',
							'/api/v1/twitter/web/fetch_retweet_users',
							{},
							qs,
						);
					}
				}

				returnData.push({
					json: responseData,
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error).message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
