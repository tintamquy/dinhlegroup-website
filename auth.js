/**
 * Dinh Le Group - Temporary Access Gate / Password Protection
 * Password: adidaphat
 */
(function() {
    'use strict';

    const AUTH_KEY = 'dlg_authenticated_access_v2';
    const VALID_PASS = 'adidaphat';

    // Check URL parameters for fast access (e.g., ?pass=adidaphat or ?pwd=adidaphat)
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const urlPass = urlParams.get('pass') || urlParams.get('pwd') || urlParams.get('password');
        if (urlPass && urlPass.trim().toLowerCase() === VALID_PASS) {
            localStorage.setItem(AUTH_KEY, 'granted');
            sessionStorage.setItem(AUTH_KEY, 'granted');
            
            // Clean up the URL parameter without reloading
            urlParams.delete('pass');
            urlParams.delete('pwd');
            urlParams.delete('password');
            const cleanQuery = urlParams.toString();
            const newUrl = window.location.pathname + (cleanQuery ? '?' + cleanQuery : '') + window.location.hash;
            window.history.replaceState({}, document.title, newUrl);
        }
    } catch (e) {
        console.warn('URL auth check skipped:', e);
    }

    // Check if already authenticated
    function isAuthenticated() {
        try {
            return localStorage.getItem(AUTH_KEY) === 'granted' || sessionStorage.getItem(AUTH_KEY) === 'granted';
        } catch (e) {
            return false;
        }
    }

    if (isAuthenticated()) {
        // Expose helper to re-lock anytime for testing
        window.dlgLogout = function() {
            localStorage.removeItem(AUTH_KEY);
            sessionStorage.removeItem(AUTH_KEY);
            window.location.reload();
        };
        return;
    }

    // Immediately hide content before render to eliminate flicker
    document.documentElement.classList.add('dlg-auth-locked');

    // Inject critical barrier CSS immediately
    const style = document.createElement('style');
    style.id = 'dlg-auth-critical-css';
    style.textContent = `
        html.dlg-auth-locked, html.dlg-auth-locked body {
            overflow: hidden !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        html.dlg-auth-locked body > *:not(#dlg-auth-gate) {
            filter: blur(16px) !important;
            opacity: 0.15 !important;
            pointer-events: none !important;
            user-select: none !important;
            transition: filter 0.5s ease, opacity 0.5s ease !important;
        }
        #dlg-auth-gate {
            visibility: visible !important;
            opacity: 1 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 2147483647 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: radial-gradient(circle at 50% 25%, #082142 0%, #030e1e 50%, #01070e 100%) !important;
            font-family: 'Rajdhani', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            color: #ffffff !important;
            padding: 20px !important;
            box-sizing: border-box !important;
            transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        #dlg-auth-gate * {
            box-sizing: border-box !important;
            font-family: inherit !important;
        }
        .dlg-card {
            position: relative;
            width: 100%;
            max-width: 440px;
            background: rgba(10, 25, 48, 0.75);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(212, 175, 55, 0.35);
            border-radius: 20px;
            padding: 40px 32px;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 50px rgba(0, 102, 204, 0.2);
            text-align: center;
            overflow: hidden;
            animation: dlgCardEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (max-width: 480px) {
            .dlg-card {
                padding: 30px 20px !important;
                border-radius: 16px !important;
            }
            .dlg-title {
                font-size: 20px !important;
            }
        }
        .dlg-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 50% 10%, rgba(212, 175, 55, 0.12) 0%, transparent 60%);
            pointer-events: none;
        }
        @keyframes dlgCardEntrance {
            from {
                opacity: 0;
                transform: translateY(24px) scale(0.96);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        @keyframes dlgShake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-10px); }
            40% { transform: translateX(10px); }
            60% { transform: translateX(-6px); }
            80% { transform: translateX(6px); }
        }
        .dlg-shake {
            animation: dlgShake 0.45s ease-in-out !important;
        }
        .dlg-logo-wrapper {
            margin-bottom: 20px;
            position: relative;
            display: inline-block;
        }
        .dlg-logo-img {
            width: 85px;
            height: 85px;
            object-fit: contain;
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.05);
            padding: 8px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 102, 204, 0.35);
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .dlg-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(212, 175, 55, 0.12);
            color: #f1c40f;
            border: 1px solid rgba(212, 175, 55, 0.4);
            border-radius: 50px;
            padding: 5px 14px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-bottom: 16px;
        }
        .dlg-badge-dot {
            width: 7px;
            height: 7px;
            background: #f1c40f;
            border-radius: 50%;
            box-shadow: 0 0 8px #f1c40f;
            animation: dlgPulse 1.8s infinite;
        }
        @keyframes dlgPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.85); }
        }
        .dlg-title {
            font-family: 'Orbitron', 'Rajdhani', sans-serif !important;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 2px;
            color: #ffffff;
            margin: 0 0 8px 0;
            text-transform: uppercase;
            background: linear-gradient(135deg, #ffffff 30%, #e2e8f0 70%, #d4af37 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .dlg-subtitle {
            font-size: 14px;
            color: #94a3b8;
            margin-bottom: 28px;
            line-height: 1.5;
            font-weight: 500;
        }
        .dlg-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .dlg-input-box {
            position: relative;
            display: flex;
            align-items: center;
        }
        .dlg-input-icon {
            position: absolute;
            left: 16px;
            color: #64748b;
            display: flex;
            align-items: center;
            pointer-events: none;
        }
        .dlg-input {
            width: 100%;
            height: 52px;
            background: rgba(4, 14, 28, 0.7);
            border: 1.5px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            padding: 0 46px 0 46px;
            font-size: 15px;
            color: #ffffff;
            letter-spacing: 1px;
            outline: none;
            transition: all 0.25s ease;
        }
        .dlg-input:focus {
            border-color: #0066cc;
            background: rgba(6, 18, 38, 0.95);
            box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.25), 0 0 20px rgba(0, 102, 204, 0.2);
        }
        .dlg-toggle-eye {
            position: absolute;
            right: 12px;
            background: none;
            border: none;
            color: #64748b;
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
        }
        .dlg-toggle-eye:hover {
            color: #ffffff;
        }
        .dlg-btn {
            height: 52px;
            background: linear-gradient(135deg, #0066cc 0%, #003366 100%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            color: #ffffff;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 8px 20px rgba(0, 102, 204, 0.35);
        }
        .dlg-btn:hover {
            background: linear-gradient(135deg, #0077ee 0%, #004080 100%);
            transform: translateY(-2px);
            box-shadow: 0 12px 28px rgba(0, 102, 204, 0.5);
        }
        .dlg-btn:active {
            transform: translateY(0);
        }
        .dlg-btn.dlg-success {
            background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4) !important;
        }
        .dlg-msg {
            min-height: 22px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.3px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.2s ease;
        }
        .dlg-msg.error {
            color: #f87171;
        }
        .dlg-msg.success {
            color: #34d399;
        }
        .dlg-footer {
            margin-top: 24px;
            font-size: 11px;
            color: #64748b;
            letter-spacing: 1px;
        }
    `;
    (document.head || document.documentElement).appendChild(style);

    // Initialize lock screen HTML once DOM is ready
    function initGate() {
        if (isAuthenticated()) return;
        if (document.getElementById('dlg-auth-gate')) return;

        const gate = document.createElement('div');
        gate.id = 'dlg-auth-gate';
        gate.innerHTML = `
            <div class="dlg-card" id="dlg-auth-card">
                <div class="dlg-logo-wrapper">
                    <img src="LOGO-1-1.png" alt="Dinh Le Group" class="dlg-logo-img" onerror="this.style.display='none'">
                </div>
                
                <div class="dlg-badge">
                    <span class="dlg-badge-dot"></span>
                    <span>Restricted Access &bull; Internal Preview</span>
                </div>
                
                <h1 class="dlg-title">DINH LE GROUP</h1>
                <p class="dlg-subtitle">This system is currently under private review. Please enter your access password to continue.</p>
                
                <form class="dlg-form" id="dlg-auth-form" onsubmit="return false;">
                    <div class="dlg-input-box">
                        <span class="dlg-input-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </span>
                        
                        <input 
                            type="password" 
                            id="dlg-auth-input" 
                            class="dlg-input" 
                            placeholder="Enter access password..." 
                            autocomplete="current-password"
                            spellcheck="false"
                            autofocus
                        >
                        
                        <button type="button" class="dlg-toggle-eye" id="dlg-toggle-eye" title="Show/Hide password" aria-label="Toggle password visibility">
                            <svg id="dlg-eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="dlg-msg" id="dlg-auth-msg"></div>
                    
                    <button type="submit" class="dlg-btn" id="dlg-auth-submit">
                        <span>Enter System</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </form>
                
                <div class="dlg-footer">
                    © 2026 DINH LE GROUP. ALL RIGHTS RESERVED.
                </div>
            </div>
        `;

        document.body.appendChild(gate);

        const card = document.getElementById('dlg-auth-card');
        const form = document.getElementById('dlg-auth-form');
        const input = document.getElementById('dlg-auth-input');
        const eyeBtn = document.getElementById('dlg-toggle-eye');
        const eyeIcon = document.getElementById('dlg-eye-icon');
        const submitBtn = document.getElementById('dlg-auth-submit');
        const msg = document.getElementById('dlg-auth-msg');

        // Focus input after render
        setTimeout(() => {
            if (input) input.focus();
        }, 100);

        // Toggle password view
        let isPasswordShown = false;
        eyeBtn.addEventListener('click', () => {
            isPasswordShown = !isPasswordShown;
            input.type = isPasswordShown ? 'text' : 'password';
            eyeIcon.innerHTML = isPasswordShown ? `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            ` : `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        });

        // Verification logic
        function verifyPassword() {
            const entered = (input.value || '').trim().toLowerCase();
            
            if (!entered) {
                showMsg('Please enter the access password.', 'error');
                triggerShake();
                return;
            }

            if (entered === VALID_PASS) {
                // Success
                showMsg('Access granted! Unlocking system...', 'success');
                submitBtn.classList.add('dlg-success');
                submitBtn.innerHTML = `
                    <span>Access Granted</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                
                try {
                    localStorage.setItem(AUTH_KEY, 'granted');
                    sessionStorage.setItem(AUTH_KEY, 'granted');
                } catch(e) {}

                // Smooth fade-out unlock transition
                setTimeout(() => {
                    gate.style.opacity = '0';
                    gate.style.transform = 'scale(1.02)';
                    document.documentElement.classList.remove('dlg-auth-locked');
                    
                    setTimeout(() => {
                        gate.remove();
                        const critStyle = document.getElementById('dlg-auth-critical-css');
                        if (critStyle) critStyle.remove();
                    }, 500);
                }, 400);

            } else {
                // Incorrect
                showMsg('Incorrect password. Please try again.', 'error');
                triggerShake();
                input.value = '';
                input.focus();
            }
        }

        function triggerShake() {
            card.classList.remove('dlg-shake');
            void card.offsetWidth; // Reflow
            card.classList.add('dlg-shake');
            setTimeout(() => card.classList.remove('dlg-shake'), 500);
        }

        function showMsg(text, type) {
            msg.textContent = text;
            msg.className = 'dlg-msg ' + type;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            verifyPassword();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                verifyPassword();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGate);
    } else {
        initGate();
    }

    // Expose relock function in console
    window.dlgLogout = function() {
        localStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem(AUTH_KEY);
        window.location.reload();
    };
})();
