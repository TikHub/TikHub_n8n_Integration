# How to Use n8n-nodes-tikhub

## 🚀 Quick Start Guide

### Step 1: Install the Package

There are **two ways** to install n8n-nodes-tikhub:

#### Option A: Via n8n UI (Recommended)

1. Open your n8n instance
2. Go to **Settings** (gear icon in the left sidebar)
3. Click **Community Nodes**
4. Click **Install** button
5. Enter package name: `n8n-nodes-tikhub`
6. Click **Install**
7. Wait for installation to complete
8. **Restart n8n** (required for new nodes to appear)

#### Option B: Via npm (Manual)

```bash
# For global n8n installation
npm install -g n8n-nodes-tikhub

# For local n8n installation
cd ~/.n8n/custom
npm install n8n-nodes-tikhub

# For Docker
docker exec -it n8n npm install n8n-nodes-tikhub
```

After installation, **restart n8n**.

---

### Step 2: Configure TikHub API Credentials

1. **Get your TikHub API Key:**
   - Visit https://api.tikhub.io
   - Sign up or log in
   - Get your API key from the dashboard

2. **Add credentials in n8n:**
   - Click **Credentials** in the left sidebar
   - Click **+ Add Credential**
   - Search for "TikHub API"
   - Click on **TikHub API**
   - Fill in the details:
     - **API Key:** Your TikHub API key
     - **Base URL:** `https://api.tikhub.io` (default, usually don't need to change)
   - Click **Save**

3. **Test the credentials:**
   - Click **Test** button
   - You should see: ✅ "Connection successful"

---

### Step 3: Create Your First Workflow

#### Example: Get TikTok User Profile

1. **Create a new workflow:**
   - Click **Workflows** → **Add Workflow**
   - Name it: "TikTok User Profile Test"

2. **Add a Manual Trigger:**
   - Click the **+** button
   - Search for "Manual Trigger"
   - Add it to the canvas

3. **Add TikHub Node:**
   - Click the **+** button after the trigger
   - Search for "TikHub"
   - Click on **TikHub** node

4. **Configure the TikHub node:**
   - **Credential:** Select the TikHub API credential you created
   - **Resource:** Select `TikTok`
   - **Operation:** Select `Get User Profile`
   - **Identifier Type:** Select `Unique ID (Username)`
   - **Username:** Enter a TikTok username (e.g., `khaby.lame`)

5. **Execute the workflow:**
   - Click **Execute Workflow** (top right)
   - Click **Execute Node** on the TikHub node
   - View the results in the output panel

**You should see the user's profile data!** ✅

---

## 📚 Complete Feature Guide

### TikTok Operations (6 available)

#### 1. Get Video
Fetch single video data by video ID.

**Configuration:**
- **Resource:** TikTok
- **Operation:** Get Video
- **Video ID:** Enter the TikTok video ID (aweme_id)
  - Example: `7234567890123456789`

**Use Cases:**
- Analyze video performance
- Extract video metadata
- Download video information

---

#### 2. Get Video by Share URL
Fetch video data using a TikTok share URL.

**Configuration:**
- **Resource:** TikTok
- **Operation:** Get Video by Share URL
- **Share URL:** Paste the TikTok share link
  - Example: `https://vm.tiktok.com/ZMFwXyZ/`

**Use Cases:**
- Process videos from links
- Batch analyze shared videos
- Extract data from URLs in spreadsheets

---

#### 3. Get Multiple Videos
Batch fetch multiple videos at once.

**Configuration:**
- **Resource:** TikTok
- **Operation:** Get Multiple Videos
- **Video IDs:** Enter comma-separated video IDs
  - Example: `7234567890123456789,7234567890123456790,7234567890123456791`

**Use Cases:**
- Bulk video analysis
- Compare multiple videos
- Efficient batch processing

---

#### 4. Get User Profile
Fetch user profile information.

**Configuration:**
- **Resource:** TikTok
- **Operation:** Get User Profile
- **Identifier Type:** Choose one:
  - User ID
  - Sec User ID
  - Unique ID (Username) ← Most common
- **Value:** Enter the corresponding value
  - Example username: `charlidamelio`

**Use Cases:**
- Profile monitoring
- Influencer research
- Audience analysis

---

#### 5. Get User Posts
Fetch videos from a user's profile.

**Configuration:**
- **Resource:** TikTok
- **Operation:** Get User Posts
- **Identifier Type:** Sec User ID or Username
- **Username/ID:** Enter the value
- **Max Cursor:** 0 (for first page)
- **Count:** 20 (number of videos, max 35)

**Use Cases:**
- Content monitoring
- Creator analysis
- Trend tracking

**Pagination:**
- Extract `cursor` from response
- Use it in `Max Cursor` for next page

---

#### 6. Get Video Comments
Fetch comments on a video.

**Configuration:**
- **Resource:** TikTok
- **Operation:** Get Video Comments
- **Video ID:** Enter the video ID
- **Cursor:** 0 (for first page)
- **Count:** 20 (number of comments)

**Use Cases:**
- Sentiment analysis
- Engagement tracking
- Comment moderation

---

### Instagram Operations (8 available)

#### Get User by Username
**Configuration:**
- **Resource:** Instagram
- **Operation:** Get User by Username
- **Username:** Enter Instagram username (without @)

#### Get User by ID
**Configuration:**
- **Resource:** Instagram
- **Operation:** Get User by ID
- **User ID:** Enter Instagram user ID

#### Get Post by URL
**Configuration:**
- **Resource:** Instagram
- **Operation:** Get Post by URL
- **Post URL:** Paste Instagram post URL

#### Get Post Media
**Configuration:**
- **Resource:** Instagram
- **Operation:** Get Post Media
- **Post URL:** Paste Instagram post URL

#### Get User Highlights
**Configuration:**
- **Resource:** Instagram
- **Operation:** Get User Highlights
- **Username:** Enter Instagram username

#### Get Post Comments
**Configuration:**
- **Resource:** Instagram
- **Operation:** Get Post Comments
- **Post ID:** Enter Instagram post ID

#### Get Comment Replies
**Configuration:**
- **Resource:** Instagram
- **Operation:** Get Comment Replies
- **Comment ID:** Enter comment ID

#### Get User Posts
**Configuration:**
- **Resource:** Instagram
- **Operation:** Get User Posts
- **User ID:** Enter user ID
- **Count:** 12 (default)
- **End Cursor:** (for pagination)

---

### YouTube Operations (6 available)

#### Get Video Info
**Configuration:**
- **Resource:** YouTube
- **Operation:** Get Video Info
- **Video ID:** Enter YouTube video ID

#### Get Video Comments
**Configuration:**
- **Resource:** YouTube
- **Operation:** Get Video Comments
- **Video ID:** Enter video ID
- **Continuation Token:** (for pagination)

#### Get Channel ID
**Configuration:**
- **Resource:** YouTube
- **Operation:** Get Channel ID
- **Username:** Enter channel username (without @)

#### Get Channel Info
**Configuration:**
- **Resource:** YouTube
- **Operation:** Get Channel Info
- **Channel ID:** Enter YouTube channel ID

#### Get Channel Videos
**Configuration:**
- **Resource:** YouTube
- **Operation:** Get Channel Videos
- **Channel ID:** Enter channel ID
- **Continuation Token:** (for pagination)

#### Get Channel Shorts
**Configuration:**
- **Resource:** YouTube
- **Operation:** Get Channel Shorts
- **Channel ID:** Enter channel ID
- **Continuation Token:** (for pagination)

---

### Twitter/X Operations (8 available)

#### Get Tweet Detail
**Configuration:**
- **Resource:** Twitter
- **Operation:** Get Tweet Detail
- **Tweet ID:** Enter tweet ID

#### Get User Profile
**Configuration:**
- **Resource:** Twitter
- **Operation:** Get User Profile
- **Screen Name:** Enter username (without @)

#### Get User Tweets
**Configuration:**
- **Resource:** Twitter
- **Operation:** Get User Tweets
- **Screen Name:** Enter username
- **Cursor:** (for pagination)

#### Get Tweet Comments
**Configuration:**
- **Resource:** Twitter
- **Operation:** Get Tweet Comments
- **Tweet ID:** Enter tweet ID
- **Cursor:** (for pagination)

#### Get Latest Comments
**Configuration:**
- **Resource:** Twitter
- **Operation:** Get Latest Comments
- **Tweet ID:** Enter tweet ID
- **Cursor:** (for pagination)

#### Get User Replies
**Configuration:**
- **Resource:** Twitter
- **Operation:** Get User Replies
- **Screen Name:** Enter username
- **Cursor:** (for pagination)

#### Get User Media
**Configuration:**
- **Resource:** Twitter
- **Operation:** Get User Media
- **Screen Name:** Enter username
- **Cursor:** (for pagination)

#### Get Retweet Users
**Configuration:**
- **Resource:** Twitter
- **Operation:** Get Retweet Users
- **Tweet ID:** Enter tweet ID
- **Cursor:** (for pagination)

---

## 💡 Example Workflows

### Example 1: TikTok Trending Monitor

**Goal:** Monitor trending TikTok creators daily

**Workflow:**
```
1. Schedule Trigger (daily at 9 AM)
   ↓
2. TikHub Node - Get User Profile
   - Resource: TikTok
   - Operation: Get User Profile
   - Username: {{$json["creator_username"]}}
   ↓
3. Google Sheets - Append Row
   - Spreadsheet: "TikTok Stats"
   - Values: {{$json["follower_count"]}}, {{$json["video_count"]}}
   ↓
4. IF Node - Check if followers increased
   ↓
5. Slack - Send Notification (if followers grew)
```

---

### Example 2: Instagram Post Analytics

**Goal:** Track engagement on Instagram posts

**Workflow:**
```
1. Webhook Trigger (or Manual)
   - Receives Instagram post URL
   ↓
2. TikHub Node - Get Post by URL
   - Resource: Instagram
   - Operation: Get Post by URL
   - URL: {{$json["url"]}}
   ↓
3. Set Node - Extract Data
   - likes: {{$json["like_count"]}}
   - comments: {{$json["comment_count"]}}
   - caption: {{$json["caption"]}}
   ↓
4. Airtable - Create Record
   - Table: "Instagram Posts"
   - Fields: Map extracted data
```

---

### Example 3: YouTube Comment Analysis

**Goal:** Analyze sentiment of YouTube comments

**Workflow:**
```
1. Manual Trigger
   ↓
2. TikHub Node - Get Video Comments
   - Resource: YouTube
   - Operation: Get Video Comments
   - Video ID: {{$json["video_id"]}}
   ↓
3. Split In Batches Node
   - Batch Size: 10
   ↓
4. OpenAI Node - Sentiment Analysis
   - Analyze comment sentiment
   ↓
5. Google Sheets - Append Results
```

---

### Example 4: Multi-Platform Influencer Tracker

**Goal:** Track influencer stats across all platforms

**Workflow:**
```
1. Schedule Trigger (weekly)
   ↓
2. HTTP Request - Get influencer list
   ↓
3. Split In Batches
   ↓
4a. TikHub - TikTok User Profile
4b. TikHub - Instagram User Profile
4c. TikHub - YouTube Channel Info
4d. TikHub - Twitter User Profile
   ↓
5. Merge Node - Combine all data
   ↓
6. Database - Update Records
   ↓
7. Email - Send Report
```

---

## 🔧 Advanced Tips

### Handling Pagination

Most list endpoints support pagination. Here's how to handle it:

**Method 1: Loop Node (Recommended)**
```
1. TikHub Node - Get first page
   - Set cursor/max_cursor to 0
   ↓
2. Set Node - Extract cursor from response
   - cursor: {{$json["cursor"]}}
   ↓
3. Loop Node - Check if has_more
   - Condition: {{$json["has_more"]}} = true
   ↓
4. TikHub Node - Get next page
   - Use cursor from step 2
```

**Method 2: Code Node**
```javascript
// Fetch all pages automatically
const items = [];
let cursor = 0;
let hasMore = true;

while (hasMore) {
  // Make request with cursor
  const response = await this.helpers.httpRequest({
    method: 'GET',
    url: `https://api.tikhub.io/api/v1/...`,
    qs: { cursor, count: 20 },
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  });

  items.push(...response.data);
  cursor = response.cursor;
  hasMore = response.has_more;
}

return items.map(item => ({ json: item }));
```

---

### Error Handling

**Enable "Continue on Fail":**
1. Click on the TikHub node
2. Go to **Settings** tab
3. Enable **Continue on Fail**
4. Add an IF node after to check for errors:
   - Condition: `{{$json["error"]}}` exists

**Common Errors:**
- `401 Unauthorized`: Check API key
- `429 Too Many Requests`: Rate limit exceeded
- `404 Not Found`: Invalid user/video ID
- `500 Server Error`: TikHub API issue

---

### Using Expressions

Access response data using expressions:

**TikTok User Data:**
- Username: `{{$json["data"]["user"]["unique_id"]}}`
- Followers: `{{$json["data"]["user"]["follower_count"]}}`
- Videos: `{{$json["data"]["user"]["aweme_count"]}}`

**Instagram Post Data:**
- Likes: `{{$json["data"]["like_count"]}}`
- Comments: `{{$json["data"]["comment_count"]}}`
- Caption: `{{$json["data"]["caption"]}}`

**YouTube Video Data:**
- Views: `{{$json["data"]["view_count"]}}`
- Title: `{{$json["data"]["title"]}}`
- Duration: `{{$json["data"]["duration"]}}`

---

### Rate Limit Management

TikHub has rate limits based on your plan:

**Best Practices:**
1. Use **Wait** node between requests (500ms recommended)
2. Enable **Batch Processing** for bulk operations
3. Use **Cache URLs** when available (24-hour validity)
4. Monitor usage in TikHub dashboard

**Example with Rate Limiting:**
```
1. Split In Batches (10 items)
   ↓
2. TikHub Node
   ↓
3. Wait Node (500ms)
   ↓
4. Loop back to next batch
```

---

## 🐛 Troubleshooting

### Node not appearing in n8n?

1. Check installation:
   ```bash
   npm list n8n-nodes-tikhub
   ```
2. Restart n8n completely
3. Clear browser cache
4. Check n8n logs for errors

### Credentials not working?

1. Test API key manually:
   ```bash
   curl -H "Authorization: Bearer YOUR_KEY" \
     https://api.tikhub.io/api/v1/health/check
   ```
2. Check for extra spaces in API key
3. Verify key is active in TikHub dashboard
4. Create new API key if needed

### Getting rate limit errors?

1. Check your TikHub plan limits
2. Add delays between requests
3. Use batch endpoints when available
4. Upgrade plan if needed

### Data not as expected?

1. Check TikHub API docs: https://api.tikhub.io/docs
2. Verify parameter names and formats
3. Test endpoint directly with curl
4. Check for API updates

---

## 📚 Additional Resources

- **TikHub API Docs:** https://api.tikhub.io/docs
- **n8n Documentation:** https://docs.n8n.io
- **Community Forum:** https://community.n8n.io
- **Package on npm:** https://www.npmjs.com/package/n8n-nodes-tikhub

---

## 🎉 You're Ready!

You now know how to:
- ✅ Install n8n-nodes-tikhub
- ✅ Configure credentials
- ✅ Use all 28 endpoints
- ✅ Build workflows
- ✅ Handle pagination
- ✅ Manage errors
- ✅ Troubleshoot issues

**Start building amazing social media automation workflows!** 🚀

---

**Questions?** Open an issue on GitHub or ask in the n8n community forum!
