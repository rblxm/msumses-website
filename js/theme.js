document.addEventListener("DOMContentLoaded", () => {
    // Theme switching logic
    window.themes = [
        {
            name: "Bronze",
            backgroundSvg: "url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3Cg%20id%3D%22unit-bronze%22%3E%3Cg%20stroke%3D%22%23b0754c%22%20stroke-width%3D%220.4%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M0%2010%20H50%20M0%200%20H50%20M0%200%20V50%20M10%200%20V50%20M0%2010%20L10%200%22%2F%3E%3C%2Fg%3E%3Cg%20stroke%3D%22%23e5ccb8%22%20stroke-width%3D%220.3%22%20stroke-dasharray%3D%222%2C2%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M30%2030%20L0%2010%20M30%2030%20L50%2010%20M30%2030%20L50%2060%20M30%2030%20L0%2060%20M30%2030%20L10%200%20M30%2030%20L60%200%20M30%2030%20L60%2050%20M30%2030%20L10%2050%22%2F%3E%3C%2Fg%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222.2%22%20fill%3D%22%23b0754c%22%2F%3E%3Ccircle%20cx%3D%220%22%20cy%3D%2210%22%20r%3D%222.2%22%20fill%3D%22%23b0754c%22%2F%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%220%22%20r%3D%222.2%22%20fill%3D%22%23b0754c%22%2F%3E%3C%2Fg%3E%3C%2Fdefs%3E%3Cuse%20href%3D%22%23unit-bronze%22%20x%3D%220%22%20y%3D%220%22%2F%3E%3Cuse%20href%3D%22%23unit-bronze%22%20x%3D%2250%22%20y%3D%220%22%2F%3E%3Cuse%20href%3D%22%23unit-bronze%22%20x%3D%220%22%20y%3D%2250%22%2F%3E%3Cuse%20href%3D%22%23unit-bronze%22%20x%3D%2250%22%20y%3D%2250%22%2F%3E%3Cuse%20href%3D%22%23unit-bronze%22%20x%3D%22-50%22%20y%3D%220%22%2F%3E%3Cuse%20href%3D%22%23unit-bronze%22%20x%3D%220%22%20y%3D%22-50%22%2F%3E%3Cuse%20href%3D%22%23unit-bronze%22%20x%3D%22-50%22%20y%3D%2250%22%2F%3E%3Cuse%20href%3D%22%23unit-bronze%22%20x%3D%2250%22%20y%3D%22-50%22%2F%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%2210%22%20r%3D%222.2%22%20fill%3D%22%23b0754c%22%2F%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%2260%22%20r%3D%222.2%22%20fill%3D%22%23b0754c%22%2F%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%22100%22%20r%3D%222.2%22%20fill%3D%22%23b0754c%22%2F%3E%3Ccircle%20cx%3D%2260%22%20cy%3D%22100%22%20r%3D%222.2%22%20fill%3D%22%23b0754c%22%2F%3E%3C%2Fsvg%3E')",
            backgroundSize: "200px 200px",
            animationDuration: "60s"
        },
        {
            name: "Aluminum",
            backgroundSvg: "url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3Cg%20id%3D%22unit-aluminum%22%3E%3Cg%20stroke%3D%22%23cbd5e1%22%20stroke-width%3D%220.4%22%20stroke-opacity%3D%220.3%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M0%2010%20H50%20M0%200%20H50%20M0%200%20V50%20M10%200%20V50%20M0%2010%20L10%200%22%2F%3E%3C%2Fg%3E%3Ccircle%20cx%3D%220%22%20cy%3D%2210%22%20r%3D%222.0%22%20fill%3D%22%23cbd5e1%22%20fill-opacity%3D%220.8%22%2F%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%220%22%20r%3D%222.0%22%20fill%3D%22%2394a3b8%22%20fill-opacity%3D%220.8%22%2F%3E%3Ccircle%20cx%3D%2225%22%20cy%3D%2235%22%20r%3D%222.0%22%20fill%3D%22%23e2e8f0%22%20fill-opacity%3D%220.85%22%2F%3E%3Ccircle%20cx%3D%2235%22%20cy%3D%2225%22%20r%3D%222.0%22%20fill%3D%22%23e2e8f0%22%20fill-opacity%3D%220.85%22%2F%3E%3Ccircle%20cx%3D%225%22%20cy%3D%2230%22%20r%3D%222.0%22%20fill%3D%22%23e2e8f0%22%20fill-opacity%3D%220.85%22%2F%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%225%22%20r%3D%222.0%22%20fill%3D%22%23e2e8f0%22%20fill-opacity%3D%220.85%22%2F%3E%3C%2Fg%3E%3C%2Fdefs%3E%3Cuse%20href%3D%22%23unit-aluminum%22%20x%3D%220%22%20y%3D%220%22%2F%3E%3Cuse%20href%3D%22%23unit-aluminum%22%20x%3D%2250%22%20y%3D%220%22%2F%3E%3Cuse%20href%3D%22%23unit-aluminum%22%20x%3D%220%22%20y%3D%2250%22%2F%3E%3Cuse%20href%3D%22%23unit-aluminum%22%20x%3D%2250%22%20y%3D%2250%22%2F%3E%3Cuse%20href%3D%22%23unit-aluminum%22%20x%3D%22-50%22%20y%3D%220%22%2F%3E%3Cuse%20href%3D%22%23unit-aluminum%22%20x%3D%220%22%20y%3D%22-50%22%2F%3E%3Cuse%20href%3D%22%23unit-aluminum%22%20x%3D%22-50%22%20y%3D%2250%22%2F%3E%3Cuse%20href%3D%22%23unit-aluminum%22%20x%3D%2250%22%20y%3D%22-50%22%2F%3E%3Cuse%20href%3D%22%23unit-aluminum%22%20x%3D%22-50%22%20y%3D%22-50%22%2F%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%2210%22%20r%3D%222.0%22%20fill%3D%22%23cbd5e1%22%20fill-opacity%3D%220.8%22%2F%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%2260%22%20r%3D%222.0%22%20fill%3D%22%23cbd5e1%22%20fill-opacity%3D%220.8%22%2F%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%22100%22%20r%3D%222.0%22%20fill%3D%22%23cbd5e1%22%20fill-opacity%3D%220.8%22%2F%3E%3Ccircle%20cx%3D%2260%22%20cy%3D%22100%22%20r%3D%222.0%22%20fill%3D%22%23cbd5e1%22%2F%3E%3C%2Fsvg%3E')",
            backgroundSize: "200px 200px",
            animationDuration: "50s"
        },
        {
            name: "Graphene",
            backgroundSvg: "url('data:image/svg+xml,%3Csvg%20width%3D%22180%22%20height%3D%22103.923%22%20viewBox%3D%220%200%20180%20103.923%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20stroke%3D%22%23888888%22%20stroke-width%3D%222%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M0%2051.9615%20L30%200%20L90%200%20L120%2051.9615%20L90%20103.923%20L30%20103.923%20Z%20M120%2051.9615%20L180%2051.9615%22%2F%3E%3C%2Fg%3E%3Cg%20fill%3D%22%23666666%22%3E%3Ccircle%20cx%3D%220%22%20cy%3D%2251.9615%22%20r%3D%224%22%2F%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%220%22%20r%3D%224%22%2F%3E%3Ccircle%20cx%3D%2290%22%20cy%3D%220%22%20r%3D%224%22%2F%3E%3Ccircle%20cx%3D%22120%22%20cy%3D%2251.9615%22%20r%3D%224%22%2F%3E%3Ccircle%20cx%3D%2290%22%20cy%3D%22103.923%22%20r%3D%224%22%2F%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%22103.923%22%20r%3D%224%22%2F%3E%3Ccircle%20cx%3D%22180%22%20cy%3D%2251.9615%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
            backgroundSize: "180px 103.923px",
            animationDuration: "40s"
        }
    ];

    let currentThemeIndex = 0;
    const themeMenu = document.getElementById("theme-menu");
    const themeBtn = document.getElementById("theme-btn");
    const themeNameSpan = document.getElementById("current-theme-name");
    const themeDropdown = document.getElementById("theme-dropdown");

    function applyTheme(themeIndex) {
        const theme = themes[themeIndex];
        document.body.style.animation = `slideBackground ${theme.animationDuration} linear infinite`;
        themeNameSpan.textContent = theme.name;
        
        // Background layer parameters
        let bgSvg = theme.backgroundSvg; // url(...)
        let bgSvgSize = theme.backgroundSize;
        let bgImage = "none"; // Holds custom gradients (like Quartz radial blurs)
        
        // 1. Shift Accent Colors & Box layout dynamically based on selected theme
        let accent = "#18453B"; // Default fallback (MSU Green)
        let glow = "rgba(24, 69, 59, 0.2)";
        
        // Default layout parameters (Standard Light Mode)
        let bgColor = "#ffffff";
        let textColor = "#333333";
        let headingColor = "#111111";
        let subheadingColor = "#555555";
        let boxBg = "#ffffff";
        let boxBorder = "#cccccc";
        let boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
        let boxBlur = "none";
        let helmetGlow = "transparent"; // Default no-glow for standard light modes
        
        // Gradient stops for dynamic header and underlines
        let grad1 = "#18453B"; // MSU Green
        let grad2 = "#b0754c"; // Warm Bronze
        let grad3 = "#b0754c";
        
        if (theme.name === "Bronze") {
            accent = "#b0754c"; // Warm Metallic Bronze
            glow = "rgba(176, 117, 76, 0.3)";
            bgColor = "#18453B"; // Official MSU Green Background!
            helmetGlow = "rgba(176, 117, 76, 0.6)"; // Symmetrical Bronze Halo for the Spartan Helmets!
            grad1 = "#18453B";
            grad2 = "#b0754c";
            grad3 = "#b0754c";
        } else if (theme.name === "Aluminum") {
            // HIGH-PERFORMANCE AEROSPACE & RACE-CAR METALLIC THEME!
            accent = "#475569"; // Darker Aerospace Blue-Grey for better contrast
            glow = "rgba(71, 85, 105, 0.4)";
            bgColor = "#18453B"; // Official MSU Green Background!
            helmetGlow = "rgba(148, 163, 184, 0.6)"; // Symmetrical Aerospace Halo
            
            // Full Silver/Aerospace Header Gradient with MSU Green start
            grad1 = "#18453B"; // MSU Green
            grad2 = "#94a3b8"; // Silver Highlight
            grad3 = "#18453B"; // Reset to Green at the end
            
            // Standard layout reset
            bgImage = "none";
            textColor = "#333333";
            headingColor = "#111111";
            subheadingColor = "#475569"; // Matching aerospace subheadings
            boxBg = "#ffffff";
            boxBorder = "#cbd5e1"; // Silver card borders
            boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
            boxBlur = "none";
        } else if (theme.name === "Graphene") {
            accent = "#18453B"; // Deep MSU Green
            glow = "rgba(24, 69, 59, 0.2)";
            grad1 = "#18453B";
            grad2 = "#18453B";
            grad3 = "#18453B";
        }
        
        // Inject properties into document root
        document.documentElement.style.setProperty('--accent-color', accent);
        document.documentElement.style.setProperty('--accent-glow', glow);
        document.documentElement.style.setProperty('--bg-color', bgColor);
        document.documentElement.style.setProperty('--bg-svg', bgSvg);
        document.documentElement.style.setProperty('--bg-svg-size', bgSvgSize);
        document.documentElement.style.setProperty('--bg-image', bgImage);
        document.documentElement.style.setProperty('--text-color', textColor);
        document.documentElement.style.setProperty('--heading-color', headingColor);
        document.documentElement.style.setProperty('--subheading-color', subheadingColor);
        document.documentElement.style.setProperty('--box-bg', boxBg);
        document.documentElement.style.setProperty('--box-border', boxBorder);
        document.documentElement.style.setProperty('--box-shadow', boxShadow);
        document.documentElement.style.setProperty('--box-blur', boxBlur);
        document.documentElement.style.setProperty('--helmet-glow', helmetGlow);
        document.documentElement.style.setProperty('--gradient-stop-1', grad1);
        document.documentElement.style.setProperty('--gradient-stop-2', grad2);
        document.documentElement.style.setProperty('--gradient-stop-3', grad3);
        
        // Standard green Spartan helmets for all themes as requested
        const helmetImgSrc = "images/helmet.png";
        const titleLogos = document.querySelectorAll(".title-logo");
        titleLogos.forEach(img => {
            img.src = helmetImgSrc;
        });
        
        const buttons = themeDropdown.querySelectorAll("button");
        buttons.forEach((btn, idx) => {
            btn.classList.toggle("active", idx === themeIndex);
        });
    }

    themes.forEach((theme, index) => {
        const button = document.createElement("button");
        button.textContent = theme.name;
        button.addEventListener("click", () => {
            currentThemeIndex = index;
            localStorage.setItem('mses-theme-index', index); // Save selection
            applyTheme(currentThemeIndex);
            themeMenu.classList.remove("active");
        });
        themeDropdown.appendChild(button);
    });

    themeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        themeMenu.classList.toggle("active");
    });

    window.addEventListener("click", () => {
        themeMenu.classList.remove("active");
    });

    // 2. Parallax Mouse Movement Effect
    window.addEventListener("mousemove", (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.04;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.04;
        document.body.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });

    // 3. Persist Theme Selection
    const savedTheme = localStorage.getItem('mses-theme-index');
    if (savedTheme !== null && themes[savedTheme]) {
        currentThemeIndex = parseInt(savedTheme);
    }

    applyTheme(currentThemeIndex);
});
