# 🚀 Quick Deployment Reference Card

## ⚡ Super Quick Guide (20 Minutes Total)

### 📦 Part 1: GitHub (10 minutes)

```powershell
# 1. Open PowerShell in your project folder
cd d:\Scrapper\shining-smile-dental

# 2. Initialize Git
git init
git add .
git commit -m "Initial commit: Shining Smile Dental website"

# 3. Create GitHub repo at: https://github.com/new
#    Name: shining-smile-dental
#    Don't initialize with README

# 4. Connect and push (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/shining-smile-dental.git
git branch -M main
git push -u origin main
```

### 🌐 Part 2: Netlify (5 minutes)

**Option A: Automatic (Recommended)**
1. Go to: https://app.netlify.com/
2. Click "Add new site" → "Import from Git"
3. Choose GitHub → Select your repository
4. Click "Deploy site"
5. Done! Your site is live! 🎉

**Option B: Manual**
1. Go to: https://app.netlify.com/
2. Drag & drop your project folder
3. Done! Your site is live! 🎉

---

## 📋 Prerequisites Checklist

- [ ] Git installed (`git --version`)
- [ ] GitHub account (https://github.com/signup)
- [ ] Netlify account (https://www.netlify.com/)

---

## 🔄 Update Your Site Later

```powershell
# Make changes to your files, then:
git add .
git commit -m "Updated content"
git push

# Netlify auto-deploys! ✨
```

---

## 🆘 Quick Troubleshooting

**Git not found?**
→ Install: https://git-scm.com/

**Authentication failed?**
→ Use Personal Access Token: https://github.com/settings/tokens

**Site not deploying?**
→ Check Netlify deploy logs

**Forms not working?**
→ Add `netlify` attribute to `<form>` tags

---

## 📱 Your Live URLs

**GitHub Repository:**
`https://github.com/YOUR-USERNAME/shining-smile-dental`

**Netlify Site:**
`https://your-site-name.netlify.app`

---

## 🎯 Next Steps After Deployment

1. ✅ Test your live site
2. ✅ Customize Netlify domain name
3. ✅ Set up custom domain (optional)
4. ✅ Enable form submissions
5. ✅ Add Google Analytics (optional)

---

**Full Guide: See DEPLOYMENT_GUIDE.md**
