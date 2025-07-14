// Bloomberg Terminal JavaScript Controller
class BloombergTerminal {
    constructor() {
        this.commands = {
            'YITZ': {
                action: 'display',
                content: 'getAboutContent',
                description: 'About Me'
            },
            'SUB': {
                action: 'link',
                url: 'https://yitz.substack.com/',
                description: 'Substack'
            },
            'TWIT': {
                action: 'link',
                url: 'https://twitter.com/yitzzzzz',
                description: 'Twitter'
            },
            'STRA': {
                action: 'link',
                url: 'https://www.strava.com/athletes/114904137',
                description: 'Strava'
            },
            'LINK': {
                action: 'link',
                url: 'https://www.linkedin.com/in/isaac-friedman-983948202/',
                description: 'LinkedIn'
            },
            'READ': {
                action: 'link',
                url: 'https://www.goodreads.com/review/list/177841658-yitz-friedman?ref=nav_mybooks&shelf=currently-reading',
                description: 'Goodreads Currently Reading'
            },
            'HELP': {
                action: 'display',
                content: 'getHelpContent',
                description: 'Help'
            }
        };
        
        this.selectedAutocomplete = -1;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startClock();
        this.setupTicker();
    }

    setupEventListeners() {
        const commandInput = document.getElementById('commandInput');
        const goButton = document.getElementById('goButton');
        const autocomplete = document.getElementById('autocomplete');

        // Command input events
        commandInput.addEventListener('input', (e) => this.handleInput(e));
        commandInput.addEventListener('keydown', (e) => this.handleKeydown(e));
        commandInput.addEventListener('focus', () => this.showAutocomplete());
        commandInput.addEventListener('blur', () => {
            // Delay hiding autocomplete to allow click events
            setTimeout(() => this.hideAutocomplete(), 200);
        });

        // Go button click
        goButton.addEventListener('click', () => this.executeCommand());

        // Quick link buttons removed - functionality now only available via command line and function keys

        // Function key buttons
        document.querySelectorAll('.function-key').forEach(button => {
            button.addEventListener('click', (e) => {
                const command = e.currentTarget.dataset.command;
                if (command === 'EXIT') {
                    this.handleExit();
                } else {
                    this.executeCommand(command);
                }
            });
        });

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleGlobalKeydown(e));

        // Autocomplete click events
        autocomplete.addEventListener('click', (e) => {
            if (e.target.classList.contains('autocomplete-item')) {
                const command = e.target.textContent.split(' ')[0];
                commandInput.value = command;
                this.executeCommand(command);
            }
        });
    }

    handleInput(e) {
        const value = e.target.value.toUpperCase();
        this.updateAutocomplete(value);
    }

    handleKeydown(e) {
        const autocompleteItems = document.querySelectorAll('.autocomplete-item');
        
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (this.selectedAutocomplete >= 0 && autocompleteItems.length > 0) {
                    const command = autocompleteItems[this.selectedAutocomplete].textContent.split(' ')[0];
                    this.executeCommand(command);
                } else {
                    this.executeCommand();
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.selectedAutocomplete = Math.min(
                    this.selectedAutocomplete + 1,
                    autocompleteItems.length - 1
                );
                this.updateAutocompleteSelection();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.selectedAutocomplete = Math.max(this.selectedAutocomplete - 1, -1);
                this.updateAutocompleteSelection();
                break;
            case 'Escape':
                this.hideAutocomplete();
                break;
        }
    }

    handleGlobalKeydown(e) {
        // Function key shortcuts
        const functionKeys = {
            'F1': 'HELP',
            'F2': 'SUB',
            'F3': 'TWIT',
            'F4': 'STRA',
            'F5': 'LINK',
            'F6': 'READ',
            'F12': 'EXIT'
        };

        if (functionKeys[e.key]) {
            e.preventDefault();
            if (e.key === 'F12') {
                this.handleExit();
            } else {
                this.executeCommand(functionKeys[e.key]);
            }
        }
    }

    updateAutocomplete(value) {
        const autocomplete = document.getElementById('autocomplete');
        
        if (!value) {
            this.hideAutocomplete();
            return;
        }

        const matches = Object.keys(this.commands).filter(cmd => 
            cmd.startsWith(value)
        );

        if (matches.length === 0) {
            this.hideAutocomplete();
            return;
        }

        const html = matches.map(cmd => 
            `<div class="autocomplete-item">${cmd} - ${this.commands[cmd].description}</div>`
        ).join('');

        autocomplete.innerHTML = html;
        autocomplete.style.display = 'block';
        this.selectedAutocomplete = -1;
    }

    updateAutocompleteSelection() {
        const items = document.querySelectorAll('.autocomplete-item');
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedAutocomplete);
        });
    }

    showAutocomplete() {
        const commandInput = document.getElementById('commandInput');
        this.updateAutocomplete(commandInput.value.toUpperCase());
    }

    hideAutocomplete() {
        const autocomplete = document.getElementById('autocomplete');
        autocomplete.style.display = 'none';
        autocomplete.innerHTML = '';
        this.selectedAutocomplete = -1;
    }

    executeCommand(commandName) {
        const commandInput = document.getElementById('commandInput');
        const command = commandName || commandInput.value.toUpperCase().trim();
        
        this.hideAutocomplete();
        
        if (!command) return;

        if (this.commands[command]) {
            const cmd = this.commands[command];
            
            if (cmd.action === 'display') {
                // Get content by calling the method
                const content = typeof cmd.content === 'string' ? this[cmd.content]() : cmd.content;
                this.displayContent(content);
            } else if (cmd.action === 'link') {
                window.open(cmd.url, '_blank', 'noopener,noreferrer');
            }
            
            commandInput.value = '';
        } else {
            this.displayError(`Unknown command: ${command}`);
            commandInput.value = '';
        }
    }

    displayContent(content) {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = content;
        contentArea.scrollTop = 0;
    }

    displayError(message) {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="error-content">
                <h2>Error</h2>
                <p>${message}</p>
                <p>Type HELP for available commands.</p>
            </div>
        `;
    }

    getAboutContent() {
        return `
            <div class="about-content">
                <div class="profile-section">
                    <img src="assets/profile.jpg" alt="Isaac Friedman" class="profile-image">
                    <h2>About Isaac Friedman</h2>
                </div>
                <p>I am in an explorative stage of my life and looking for the next big thing. My background is rooted in investing (I operated a small fund at 18) and Jewish studies (I spent four years studying almost exclusively Talmud after high school). I also run, bike, and lift regularly.</p>
                
                <h3 style="color: #F7A600; margin-top: 30px; margin-bottom: 15px;">Background</h3>
                <p>My journey has been shaped by diverse experiences in finance, academia, and athletics. I studied in Jerusalem, worked on my MBA at Bar-Ilan University, and currently reside in Miami. The intersection of analytical thinking from investment work and deep textual study from Talmudic scholarship has given me a unique perspective on problem-solving and critical analysis.</p>
                
                <h3 style="color: #F7A600; margin-top: 30px; margin-bottom: 15px;">Current Focus</h3>
                <p>I'm actively exploring new opportunities and challenges that will allow me to apply my analytical skills and diverse background. Whether in technology, finance, or other innovative fields, I'm seeking roles that will push me to grow and contribute meaningfully.</p>
                
                <h3 style="color: #F7A600; margin-top: 30px; margin-bottom: 15px;">Get In Touch</h3>
                <p>Email: <a href="mailto:iyfrdmn@gmail.com" style="color: #32FF32;">iyfrdmn@gmail.com</a></p>
                <p>Use the commands above to connect with me on various platforms, or use the function keys for quick access to my profiles.</p>
            </div>
        `;
    }

    getHelpContent() {
        return `
            <div class="help-content">
                <h2>Terminal Help</h2>
                <p>Welcome to the Portfolio Terminal interface. Use the following commands:</p>
                
                <h3 style="color: #F7A600; margin-top: 20px; margin-bottom: 10px;">Available Commands</h3>
                <ul style="list-style: none; padding-left: 0;">
                    ${Object.entries(this.commands).map(([cmd, info]) => 
                        `<li style="margin: 8px 0;"><span class="cmd">${cmd}</span> - ${info.description}</li>`
                    ).join('')}
                </ul>
                
                <h3 style="color: #F7A600; margin-top: 20px; margin-bottom: 10px;">How to Use</h3>
                <p>• Type a command in the command line and press Enter</p>
                <p>• Click the &lt;GO&gt; button to execute</p>
                <p>• Use arrow keys to navigate autocomplete suggestions</p>
                <p>• Click quick links in the right panel</p>
                <p>• Use function keys F1-F12 for shortcuts</p>
                
                <h3 style="color: #F7A600; margin-top: 20px; margin-bottom: 10px;">Keyboard Shortcuts</h3>
                <p>• F1 - Help (this screen)</p>
                <p>• F2 - Substack</p>
                <p>• F3 - Twitter</p>
                <p>• F4 - Strava</p>
                <p>• F5 - LinkedIn</p>
                <p>• F6 - Goodreads</p>
                <p>• F12 - Exit</p>
            </div>
        `;
    }

    handleExit() {
        if (confirm('Are you sure you want to exit the Portfolio Terminal?')) {
            window.close();
        }
    }

    startClock() {
        const updateClock = () => {
            const now = new Date();
            const utcTime = now.toISOString().slice(11, 19);
            document.getElementById('clock').textContent = `${utcTime} UTC`;
        };

        updateClock();
        setInterval(updateClock, 1000);
    }

    setupTicker() {
        const ticker = document.getElementById('ticker');
        
        // Check if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            ticker.style.animation = 'none';
            ticker.style.transform = 'translateX(0)';
        }
        
        // Load real market data
        this.loadMarketData();
        
        // Update market data every 5 minutes
        setInterval(() => this.loadMarketData(), 300000);
    }

    async loadMarketData() {
        const tickerContent = document.getElementById('tickerContent');
        
        try {
            // Try to fetch from Netlify Function first
            const response = await fetch('/.netlify/functions/stocks');
            
            if (response.ok) {
                const marketData = await response.json();
                if (marketData.length > 0) {
                    const displayText = marketData.map(stock => stock.display).join(' • ');
                    tickerContent.textContent = displayText;
                    return;
                }
            }
            
            // Fallback to demo data if Netlify function fails
            this.displayDemoMarketData();
            
        } catch (error) {
            console.error('Error loading market data:', error);
            this.displayDemoMarketData();
        }
    }
    
    displayDemoMarketData() {
        const tickerContent = document.getElementById('tickerContent');
        
        // Generate realistic looking demo data
        const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA'];
        const marketData = symbols.map(symbol => {
            const basePrice = Math.random() * 200 + 100;
            const change = (Math.random() - 0.5) * 10;
            const changePercent = (change / basePrice * 100);
            const sign = change >= 0 ? '+' : '';
            
            return `${symbol} ${basePrice.toFixed(2)} ${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`;
        });
        
        tickerContent.textContent = marketData.join(' • ');
    }
}

// Initialize the terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BloombergTerminal();
});

// Handle window focus for command input
window.addEventListener('focus', () => {
    const commandInput = document.getElementById('commandInput');
    if (commandInput && document.activeElement !== commandInput) {
        commandInput.focus();
    }
});
