# n8n-nodes-tikhub

This is an n8n community node that integrates [TikHub API](https://api.tikhub.io) with n8n workflows.

TikHub provides unified access to social media APIs including TikTok, Instagram, YouTube, and Twitter/X.

## Installation

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in n8n
2. Select **Install**
3. Enter `n8n-nodes-tikhub` in **Enter npm package name**
4. Agree to risks and install

### Manual Installation

```bash
npm install n8n-nodes-tikhub
```

For local n8n installation:
```bash
cd ~/.n8n/nodes
npm install n8n-nodes-tikhub
```

For Docker:
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -e NODE_ENV=production \
  -e N8N_COMMUNITY_PACKAGES=n8n-nodes-tikhub \
  n8nio/n8n
```

## Prerequisites

- n8n installed (version 0.190.0 or higher)
- TikHub API key from [https://api.tikhub.io](https://api.tikhub.io)

## Quick Start

### 1. Install the Package

**Via n8n UI (Recommended):**
- Go to **Settings > Community Nodes**
- Click **Install**
- Enter: `n8n-nodes-tikhub`
- **Restart n8n** after installation

### 2. Configure Credentials

1. Get your API key from [TikHub](https://api.tikhub.io)
2. In n8n, go to **Credentials > New**
3. Search for "TikHub API"
4. Enter your API key
5. Click **Save** and **Test**

### 3. Use in Workflows

1. Create a new workflow
2. Add a **TikHub** node
3. Select a **Resource** (TikTok, Instagram, YouTube, Twitter)
4. Choose an **Operation**
5. Fill in required parameters
6. Execute!

**📖 For detailed instructions, see [HOW_TO_USE.md](HOW_TO_USE.md)**

## Credentials

To use this node, you need to configure TikHub API credentials:

1. Go to **Credentials > New**
2. Search for "TikHub API"
3. Enter your API key
4. (Optional) Modify the base URL if needed (default: `https://api.tikhub.io`)

## Supported Platforms & Operations

### TikTok (6 operations)
- ✅ **Get Video** - Fetch single video data by ID
- ✅ **Get Video by Share URL** - Fetch video data using share URL
- ✅ **Get Multiple Videos** - Batch fetch multiple videos
- ✅ **Get User Profile** - Get user profile information
- ✅ **Get User Posts** - Get user's video posts
- ✅ **Get Video Comments** - Fetch comments on a video

### Instagram (8 operations)
- ✅ **Get User by Username** - Fetch user data by username
- ✅ **Get User by ID** - Fetch user data by ID
- ✅ **Get Post by URL** - Fetch post data by URL
- ✅ **Get Post Media** - Extract media from post
- ✅ **Get User Highlights** - Fetch user story highlights
- ✅ **Get Post Comments** - Get comments on a post
- ✅ **Get Comment Replies** - Get replies to a comment
- ✅ **Get User Posts** - Fetch user's posts

### YouTube (6 operations)
- ✅ **Get Video Info** - Fetch video information
- ✅ **Get Video Comments** - Get comments on a video
- ✅ **Get Channel ID** - Get channel ID by username
- ✅ **Get Channel Info** - Fetch channel information
- ✅ **Get Channel Videos** - Get videos from a channel
- ✅ **Get Channel Shorts** - Get YouTube Shorts from a channel

### Twitter/X (8 operations)
- ✅ **Get Tweet Detail** - Fetch tweet details
- ✅ **Get User Profile** - Get user profile information
- ✅ **Get User Tweets** - Fetch user's tweets
- ✅ **Get Tweet Comments** - Get comments on a tweet
- ✅ **Get Latest Comments** - Get latest comments
- ✅ **Get User Replies** - Fetch user's replies
- ✅ **Get User Media** - Get user's media posts
- ✅ **Get Retweet Users** - Get users who retweeted

## Usage Examples

### Example 1: Get TikTok Video Data

```
Trigger (Manual/Schedule)
  ↓
TikHub Node
  - Resource: TikTok
  - Operation: Get Video
  - Video ID: 7234567890123456789
  ↓
Save to Google Sheets / Database
```

### Example 2: Monitor Instagram User Posts

```
Schedule Trigger (Every hour)
  ↓
TikHub Node
  - Resource: Instagram
  - Operation: Get User Posts
  - User ID: {{$json["instagram_user_id"]}}
  ↓
IF Node (Check for new posts)
  ↓
Send Notification (Slack/Email)
```

### Example 3: Aggregate YouTube Channel Data

```
Trigger
  ↓
TikHub Node
  - Resource: YouTube
  - Operation: Get Channel Info
  - Channel ID: UCxxxxxx
  ↓
TikHub Node
  - Resource: YouTube
  - Operation: Get Channel Videos
  ↓
Process and store video data
```

### Example 4: Twitter User Analysis

```
Trigger
  ↓
TikHub Node
  - Resource: Twitter
  - Operation: Get User Profile
  - Screen Name: username
  ↓
TikHub Node
  - Resource: Twitter
  - Operation: Get User Tweets
  ↓
Analyze and visualize data
```

## Pagination

Many endpoints support pagination for fetching large datasets:

**TikTok:**
- Use `Max Cursor` and `Count` parameters

**Instagram:**
- Use `End Cursor` parameter

**YouTube:**
- Use `Continuation Token` parameter

**Twitter:**
- Use `Cursor` parameter

Example workflow with pagination:
```
1. First request returns data + cursor
2. Extract cursor from response
3. Use cursor in next request
4. Repeat until no more data
```

## Error Handling

The node includes comprehensive error handling:

- **Authentication errors**: Check your API key
- **Rate limiting**: TikHub will return rate limit errors if exceeded
- **Invalid parameters**: Check parameter format and requirements
- **Network errors**: Retry mechanism available

Enable "Continue on Fail" in node settings to handle errors gracefully in workflows.

## API Rate Limits

TikHub API has rate limits based on your subscription plan. Check your usage at [https://api.tikhub.io/dashboard](https://api.tikhub.io/dashboard).

Tips to manage rate limits:
- Use batch endpoints when available (e.g., Get Multiple Videos)
- Implement delays between requests
- Cache responses when appropriate
- Monitor your API usage

## Development

### Setup Development Environment

```bash
git clone <your-repo>
cd n8n-nodes-tikhub
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Link Locally

```bash
npm link
cd ~/.n8n/custom
npm link n8n-nodes-tikhub
n8n start
```

## Resources

- [TikHub API Documentation](https://api.tikhub.io/docs)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [GitHub Repository](https://github.com/yourusername/n8n-nodes-tikhub)

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/n8n-nodes-tikhub/issues)
- **TikHub Support**: [api.tikhub.io](https://api.tikhub.io)
- **n8n Community**: [community.n8n.io](https://community.n8n.io)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

[MIT](LICENSE)

## Changelog

### v1.0.0
- Initial release
- Support for 28 endpoints across 4 platforms
- TikTok: 6 operations
- Instagram: 8 operations
- YouTube: 6 operations
- Twitter: 8 operations
