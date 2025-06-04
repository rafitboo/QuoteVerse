class QuoteGenerator {
    constructor() {
        this.currentQuote = null;
        this.isLoading = false;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadRandomQuote();
    }
    
    bindEvents() {
        const newQuoteBtn = document.getElementById('new-quote');
        const shareBtn = document.getElementById('share-quote');
        const copyBtn = document.getElementById('copy-quote');
        
        newQuoteBtn.addEventListener('click', () => this.getNewQuote());
        shareBtn.addEventListener('click', () => this.shareQuote());
        copyBtn.addEventListener('click', () => this.copyQuote());
        
        // Keyboard shortcut for new quote
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                this.getNewQuote();
            }
        });
    }
    
    async loadRandomQuote() {
        await this.getNewQuote();
    }
    
    async getNewQuote() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            const response = await fetch('/get-quote/');
            const data = await response.json();
            
            if (data.success) {
                this.currentQuote = data.quote;
                this.displayQuote(data.quote);
            } else {
                this.showNotification('Could not fetch quote', true);
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
            this.showNotification('Network error', true);
        } finally {
            this.hideLoading();
            this.isLoading = false;
        }
    }
    
    displayQuote(quote) {
        const quoteText = document.getElementById('quote-text');
        const quoteAuthor = document.getElementById('quote-author');
        
        // Add exit animation
        quoteText.style.opacity = '0';
        quoteAuthor.style.opacity = '0';
        
        setTimeout(() => {
            quoteText.textContent = quote.text;
            quoteAuthor.textContent = quote.author;
            
            // Add enter animation
            quoteText.style.opacity = '1';
            quoteAuthor.style.opacity = '1';
            
            // Add slide-in animation class
            quoteText.classList.remove('slide-in');
            quoteAuthor.classList.remove('slide-in');
            
            setTimeout(() => {
                quoteText.classList.add('slide-in');
                quoteAuthor.classList.add('slide-in');
            }, 50);
        }, 200);
    }
    
    shareQuote() {
        if (!this.currentQuote) return;
        
        const shareText = this.currentQuote.text;
        
        if (navigator.share) {
            navigator.share({
                title: 'Inspirational Quote',
                text: shareText,
                url: window.location.href
            }).catch(console.error);
        } else {
            this.copyToClipboard(shareText);
            this.showNotification('Quote copied to clipboard!');
        }
    }
    
    copyQuote() {
        if (!this.currentQuote) return;
        
        const quoteText = this.currentQuote.text;
        this.copyToClipboard(quoteText);
        this.showNotification('Quote copied to clipboard!');
    }
    
    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).catch(console.error);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }
    
    showLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        const newQuoteBtn = document.getElementById('new-quote');
        
        loadingOverlay.classList.add('active');
        newQuoteBtn.disabled = true;
        newQuoteBtn.style.opacity = '0.7';
    }
    
    hideLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        const newQuoteBtn = document.getElementById('new-quote');
        
        loadingOverlay.classList.remove('active');
        newQuoteBtn.disabled = false;
        newQuoteBtn.style.opacity = '1';
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'linear-gradient(135deg, #FF3CAC 0%, #784BA0 100%)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontSize: '0.9rem',
            fontWeight: '500',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuoteGenerator();
    
    // Add initial animation
    setTimeout(() => {
        const quoteCard = document.querySelector('.quote-card');
        if (quoteCard) {
            quoteCard.classList.add('fade-in');
        }
    }, 300);
});