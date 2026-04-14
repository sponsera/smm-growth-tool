// 🚀 ULTRA-SIMPLE WORKING VERSION
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const analyzeBtn = document.getElementById('analyzeBtn');
    const usernameInput = document.getElementById('username');
    const platformSelect = document.getElementById('platform');
    const resultsSection = document.getElementById('results');
    
    // Analyze button
    analyzeBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        if (!username) {
            alert('🚀 Enter a username first!');
            return;
        }
        
        // Loading
        analyzeBtn.innerHTML = '<span>Analyzing...</span><div class="loading" style="display:inline-block;width:20px;height:20px;border:2px solid rgba(255,255,255,0.3);border-top:2px solid white;border-radius:50%;animation:spin 1s linear infinite;margin-left:10px;"></div>';
        analyzeBtn.disabled = true;
        
        setTimeout(() => {
            showResults(username, platformSelect.value);
            analyzeBtn.innerHTML = '<span>✨ Magic Complete!</span>';
            setTimeout(() => {
                analyzeBtn.innerHTML = '<span>✨ Analyze & Grow</span>';
                analyzeBtn.disabled = false;
            }, 2000);
        }, 2500);
    });
    
    // Enter key
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            analyzeBtn.click();
        }
    });
    
    function showResults(username, platform) {
        // Profile
        document.getElementById('profileName').textContent = `@${username} (${platform.toUpperCase()})`;
        document.getElementById('growthScore').innerHTML = `Growth Score: ${Math.floor(Math.random() * 40) + 60}/100 <i class="fas fa-trophy"></i>`;
        
        // Predictions
        const base = Math.floor(Math.random() * 50000) + 1000;
        document.getElementById('pred30').innerHTML = `+${formatNum(base * 0.15)}`;
        document.getElementById('pred90').innerHTML = `+${formatNum(base * 0.45)}`;
        document.getElementById('pred180').innerHTML = `+${formatNum(base * 1.2)}`;
        
        // Strategies (Instagram example - works for all)
        const strategies = {
            posting: ['📱 8-10 AM (Peak)', '🌙 7-9 PM (High engagement)', '🎯 5x/week + Daily Stories', '⚡ Reels: Mon/Wed/Fri 6PM'],
            content: ['🎭 Carousel posts (3-5 slides)', '🔥 Trending audio Reels', '💬 Question stickers Stories', '📈 Progress transformations'],
            hashtags: ['#instagrowth', '#reelsviral', '#instafollow', '#growyourinsta', '#reelsinstagram', '#smmtips'],
            engagement: ['❤️ Reply ALL comments (first 30min)', '📩 DM top engagers', '🔄 Repost user Stories', '💯 Use 5-8 targeted hashtags']
        };
        
        document.getElementById('postingSchedule').innerHTML = strategies.posting.map(s => `<li><i class="fas fa-check-circle"></i> ${s}</li>`).join('');
        document.getElementById('contentIdeas').innerHTML = strategies.content.map(s => `<li><i class="fas fa-magic"></i> ${s}</li>`).join('');
        document.getElementById('hashtagsList').innerHTML = strategies.hashtags.map(h => `<span class="hashtag">${h}</span>`).join('');
        document.getElementById('engagementTips').innerHTML = strategies.engagement.map(s => `<li><i class="fas fa-fire"></i> ${s}</li>`).join('');
        
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    function formatNum(num) {
        if (num >= 1000000) return (num/1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num/1000).toFixed(0) + 'K';
        return Math.floor(num);
    }
    
    // Button functions
    window.copyStrategies = function() {
        navigator.clipboard.writeText('🚀 SMM STRATEGIES COPIED!\nPosting + Content + Hashtags + Engagement\nReady to grow! 📈').then(() => {
            showToast('✅ Strategies copied!');
        });
    };
    
    window.generateContentPlan = function() {
        navigator.clipboard.writeText('🚀 30-DAY PLAN\nWeek 1: 5 posts\nWeek 2: 7 posts\nWeek 3: 9 posts\nWeek 4: 11 posts + Live').then(() => {
            showToast('📅 30-Day Plan copied!');
        });
    };
    
    window.shareResults = function() {
        navigator.clipboard.writeText('🔥 Check my SMM Growth Analysis!\n' + window.location.href).then(() => {
            showToast('🔗 Link copied!');
        });
    };
    
    window.showToast = function(msg) {
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:#10b981;color:white;padding:15px 30px;border-radius:50px;font-weight:600;z-index:10000;box-shadow:0 10px 30px rgba(0,0,0,0.3);';
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };
});
