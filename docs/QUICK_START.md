# 🚀 Quick Start - n8n-nodes-tikhub

## 3 Steps to Start Using TikHub in n8n

### Step 1: Install (2 minutes)

**Option A: n8n UI** ⭐ Recommended
```
1. Open n8n
2. Settings → Community Nodes
3. Click "Install"
4. Enter: n8n-nodes-tikhub
5. Click Install
6. ⚠️ RESTART n8n (important!)
```

**Option B: Command Line**
```bash
npm install -g n8n-nodes-tikhub
# Then restart n8n
```

---

### Step 2: Add Credentials (1 minute)

1. **Get API Key:**
   - Visit: https://api.tikhub.io
   - Sign up / Log in
   - Copy your API key

2. **Add to n8n:**
   - Click **Credentials** in n8n
   - Click **+ Add Credential**
   - Search: "TikHub API"
   - Paste your API key
   - Click **Save**
   - Click **Test** ✅

---

### Step 3: Create First Workflow (2 minutes)

#### Example: Get TikTok User Profile

**1. Add Manual Trigger**
```
+ → Search "Manual Trigger" → Add
```

**2. Add TikHub Node**
```
+ → Search "TikHub" → Add
```

**3. Configure TikHub**
```
Credential: [Select your TikHub credential]
Resource: TikTok
Operation: Get User Profile
Identifier Type: Unique ID (Username)
Username: khaby.lame
```

**4. Execute**
```
Click: "Execute Workflow"
Then: "Execute Node" on TikHub
```

**5. See Results! 🎉**
```json
{
  "unique_id": "khaby.lame",
  "nickname": "Khaby Lame",
  "follower_count": 162000000,
  "following_count": 147,
  ...
}
```

---

## ✨ What You Can Do Now

### TikTok
- ✅ Get user profiles
- ✅ Fetch video data
- ✅ Get comments
- ✅ Analyze trends

### Instagram
- ✅ Get user info
- ✅ Fetch posts
- ✅ Get comments
- ✅ Download media

### YouTube
- ✅ Get video info
- ✅ Fetch channel data
- ✅ Get comments
- ✅ Analyze shorts

### Twitter/X
- ✅ Get tweets
- ✅ User profiles
- ✅ Fetch replies
- ✅ Track retweets

---

## 📚 Next Steps

### Learn More
- **Full Guide:** [HOW_TO_USE.md](HOW_TO_USE.md)
- **All Endpoints:** See README.md
- **Examples:** Check workflow templates below

### Example Workflows

#### 1. Daily Creator Stats
```
Schedule (9am daily)
  → TikHub: Get User Profile
  → Google Sheets: Update Row
  → Slack: Notify if follower spike
```

#### 2. Video Monitor
```
Webhook
  → TikHub: Get Video by URL
  → IF: Check views > 10k
  → Email: Alert team
```

#### 3. Comment Analysis
```
Manual Trigger
  → TikHub: Get Video Comments
  → OpenAI: Analyze sentiment
  → Airtable: Save results
```

---

## 🆘 Troubleshooting

**Node not showing up?**
→ Restart n8n completely

**Credentials failing?**
→ Check API key at https://api.tikhub.io

**Rate limit errors?**
→ Add Wait node (500ms) between requests

**Need help?**
→ See [HOW_TO_USE.md](HOW_TO_USE.md) Troubleshooting section

---

## 💡 Pro Tips

1. **Use expressions** to chain data:
   ```
   {{$json["data"]["user"]["follower_count"]}}
   ```

2. **Enable "Continue on Fail"** for error handling

3. **Use cache URLs** for repeated requests (24h validity)

4. **Batch requests** with Split In Batches node

5. **Store cursors** in variables for pagination

---

## 🎯 Resources

- **Package:** https://www.npmjs.com/package/n8n-nodes-tikhub
- **TikHub Docs:** https://api.tikhub.io/docs
- **n8n Community:** https://community.n8n.io
- **Support:** GitHub Issues

---

**You're all set! Start building! 🚀**
