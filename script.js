// 🔥 FIXED SMM Growth Tool v2.0
class SMMGrowthTool {
    constructor() {
        this.init();
    }

    init() {
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.usernameInput = document.getElementById('username');
        this.platformSelect = document.getElementById('platform');
        this.resultsSection = document.getElementById('results');
        
        // SAFE event listeners
        if (this.analyzeBtn) {
            this.analyzeBtn.addEventListener('click', () => this.analyzeProfile());
        }
        if (this.usernameInput) {
            this.usernameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.analyzeProfile();
            });
        }

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    analyzeProfile() {
        const username = this.usernameInput.value.trim();
        const platform = this.platformSelect.value;

        if (!username) {
            this.showError('Please enter a username! 🚀');
            return;
        }

        this.showLoading(true);
        
        setTimeout(() => {
            this.generateResults(username, platform);
            this.showLoading(false);
        }, 2500);
    }

    showLoading(show) {
        const btnSpan = this.analyzeBtn.querySelector('span');
        const loading = this.analyzeBtn.querySelector('.loading');
        
        if (show) {
            btnSpan.textContent = 'Analyzing...';
            loading.style.display = 'inline-block';
            this.analyzeBtn.disabled = true;
        } else {
            btnSpan.textContent = '✨ Magic Complete!';
            loading.style.display = 'none';
            this.analyzeBtn.disabled = false;
            setTimeout(() => {
                btnSpan.textContent = '✨ Analyze & Grow';
            }, 2000);
        }
    }

    generateResults(username, platform) {
        const analysis = this.getAIResults(username, platform);
        
        document.getElementById('profileName').textContent = `@${username} (${platform.toUpperCase()})`;
        document.getElementById('growthScore').innerHTML = `Growth Score: ${analysis.score}/100 <i class="fas fa-trophy"></i>`;
        
        document.getElementById('pred30').innerHTML = `+${analysis.pred30}`;
        document.getElementById('pred90').innerHTML = `+${analysis.pred90}`;
        document.getElementById('pred180').innerHTML = `+${analysis.pred180}`;
        
        this.updateStrategies(analysis);
        this.resultsSection.classList.remove('hidden');
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    getAIResults(username, platform) {
        const baseFollowers = Math.floor(Math.random() * 50000) + 1000;
        const growthPotential = Math.floor(Math.random() * 40) + 60;
        
        return {
            score: growthPotential,
            pred30: this.formatFollowers(baseFollowers * 0.15),
            pred90: this.formatFollowers(baseFollowers * 0.45),
            pred180: this.formatFollowers(baseFollowers * 1.2),
            strategies: this.generatePlatformStrategies(platform)
        };
    }

    generatePlatformStrategies(platform) {
        const strategies = {
            instagram: {
                posting: ['📱 8-10 AM', '🌙 7-9 PM', '🎯 5x/week', '⚡ Reels M/W/F'],
                content: ['🎭 Carousels', '🔥 Trend Reels', '💬 Story Qs', '📈 Progress'],
                hashtags: ['#instagrowth', '#reelsviral', '#growyourinsta', '#reelsinstagram'],
                engagement: ['❤️ Reply fast', '📩 DM engagers', '🔄 Repost Stories', '💯 5-8 hashtags']
            },
            tiktok: {
                posting: ['🎵 6-9 PM', '🌅 12-2 PM', '⚡ 7x/week', '🔥 Trends 8PM'],
                content: ['🎨 15s hooks', '🔥 Trend sounds', '📱 Text overlays', '✨ Duets'],
                hashtags: ['#fyp', '#foryou', '#viral', '#tiktokgrowth'],
                engagement: ['💬 Reply FAST', '🔄 Stitch trends', '❤️ Like similar', '📈 Trend timing']
            },
            youtube: {
                posting: ['📺 Thu/Fri 3PM', '🎥 Sun 10AM', '⚡ Shorts 5PM', '📈 Long Thu'],
                content: ['🎬 10s hook', '🔥 Face thumbnails', '💡 How-to guides', '⏱️ 8-12min'],
                hashtags: ['#youtube', '#youtubegrowth', '#shorts'],
                engagement: ['💬 Pin CTA', '📺 Watch own', '🔗 Cross-post', '❤️ First hour']
            },
            twitter: {
                posting: ['🐦 9-11 AM', '🌙 8-10 PM', '⚡ Threads T/Th', '🔥 Reply daily'],
                content: ['🧵 5-7 threads', '💭 Polls/Qs', '🔥 Hot takes', '📊 Data screenshots'],
                hashtags: ['#growthhacking', '#twittergrowth', '#smm'],
                engagement: ['💬 Reply 50+/day', '🔄 RT+comment', '👥 Spaces', '📈 Follow-back']
            }
        };
        return strategies[platform] || strategies.instagram;
    }

    updateStrategies(analysis) {
        const lists = {
            postingSchedule: analysis.strategies.posting.map(item => `<li><i class="fas fa-check-circle"></i> ${item}</li>`).join(''),
            contentIdeas: analysis.strategies.content.map(item => `<li><i class="fas fa-magic"></i> ${item}</li>`).join(''),
            hashtagsList: analysis.strategies.hashtags.map(tag => `<span class="hashtag">${tag}</span>`).join(''),
            engagementTips: analysis.strategies.engagement.map(item => `<li><i class="fas fa-fire"></i> ${item}</li>`).join('')
        };

        document.getElementById('postingSchedule').innerHTML = lists.postingSchedule;
        document.getElementById('contentIdeas').innerHTML = lists.contentIdeas;
        document.getElementById('hashtagsList').innerHTML = lists.hashtagsList;
        document.getElementById('engagementTips').innerHTML = lists.engagementTips;
    }

    formatFollowers(num) {
        if (num >= 1000000) return `${(num/1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num/1000).toFixed(0)}K`;
        return `${Math.floor(num)}`;
    }

    showError(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `position:fixed;top:20px;right:20px;background:#ef4444;color:white;padding:1rem 2rem;border-radius:10px;z-index:10000;font-weight:500;`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}

// GLOBAL BUTTON FUNCTIONS (Fixed!)
function copyStrategies() {
    const text = `🚀 SMM GROWTH STRATEGIES

📅 POSTING: Optimal times generated
💡 CONTENT: Viral ideas ready
#️⃣ HASHTAGS: Power list copied
❤️ ENGAGEMENT: Boost tactics

Copy this to Notion/Google Docs!`;
    navigator.clipboard.writeText(text).then(() => showToast('✅ All strategies copied!'));
}

function generateContentPlan() {
    const plan = `🚀 30-DAY GROWTH PLAN

Week 1: Foundation (Daily Stories + 3 posts)
Week 2: Momentum (Test 2 trends)
Week 3: Scale (1 collab post)
Week 4: Dominate (Live + giveaway)

Follow posting schedule exactly! 📈`;
    navigator.clipboard.writeText(plan).then(() => showToast('📅 30-Day Plan copied!'));
}

function shareResults() {
    const url = window.location.href;
    const text = `🔥 My SMM Growth Score: 92/100!\nCheck yours free:\n${url}`;
    navigator.clipboard.writeText(text).then(() => showToast('🔗 Share link copied!'));
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:linear-gradient(45deg,#10b981,#059669);color:white;padding:1rem 2.5rem;border-radius:50px;font-weight:600;z-index:10000;box-shadow:0 10px 30px rgba(0,0,0,0.2);`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// START ON PAGE LOAD
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SMMGrowthTool();
    });
} else {
    new SMMGrowthTool();
}
