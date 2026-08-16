document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('crystal-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Ensure Canvas renders crisply on high-DPI screens
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let vertices = [];
    let edges = [];
    let activeType = 'bcc';

    // 3D Rotation Angles
    let rx = 0.5;
    let ry = 0.5;
    
    // Mouse/Touch Drag state
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Load geometry definitions
    function loadGeometry(type) {
        activeType = type;
        if (type === 'polonium') {
            // Polonium (Simple Cubic) - 8 corner atoms
            vertices = [
                {x: -1, y: -1, z: -1, type: 'corner'},
                {x: 1, y: -1, z: -1, type: 'corner'},
                {x: 1, y: 1, z: -1, type: 'corner'},
                {x: -1, y: 1, z: -1, type: 'corner'},
                {x: -1, y: -1, z: 1, type: 'corner'},
                {x: 1, y: -1, z: 1, type: 'corner'},
                {x: 1, y: 1, z: 1, type: 'corner'},
                {x: -1, y: 1, z: 1, type: 'corner'}
            ].map(v => ({ x: v.x * 95, y: v.y * 95, z: v.z * 95, type: v.type }));

            edges = [
                [0, 1], [1, 2], [2, 3], [3, 0], // Back plane
                [4, 5], [5, 6], [6, 7], [7, 4], // Front plane
                [0, 4], [1, 5], [2, 6], [3, 7]  // Connector edges
            ];
        } else if (type === 'martensite') {
            // Martensite (Stretched BCT with center atom)
            vertices = [
                {x: -1, y: -1.5, z: -1, type: 'corner'},
                {x: 1, y: -1.5, z: -1, type: 'corner'},
                {x: 1, y: 1.5, z: -1, type: 'corner'},
                {x: -1, y: 1.5, z: -1, type: 'corner'},
                {x: -1, y: -1.5, z: 1, type: 'corner'},
                {x: 1, y: -1.5, z: 1, type: 'corner'},
                {x: 1, y: 1.5, z: 1, type: 'corner'},
                {x: -1, y: 1.5, z: 1, type: 'corner'},
                {x: 0, y: 0, z: 0, type: 'center'} // Interstitial Carbon / Body Center
            ].map(v => ({ x: v.x * 75, y: v.y * 75, z: v.z * 75, type: v.type }));

            edges = [
                [0, 1], [1, 2], [2, 3], [3, 0], // Back plane
                [4, 5], [5, 6], [6, 7], [7, 4], // Front plane
                [0, 4], [1, 5], [2, 6], [3, 7]  // Connector edges
            ];
        } else if (type === 'perovskite') {
            // Perovskite (ABO3 Solar Lattice)
            vertices = [
                // A-site Corners (8)
                {x: -1, y: -1, z: -1, type: 'corner'},
                {x: 1, y: -1, z: -1, type: 'corner'},
                {x: 1, y: 1, z: -1, type: 'corner'},
                {x: -1, y: 1, z: -1, type: 'corner'},
                {x: -1, y: -1, z: 1, type: 'corner'},
                {x: 1, y: -1, z: 1, type: 'corner'},
                {x: 1, y: 1, z: 1, type: 'corner'},
                {x: -1, y: 1, z: 1, type: 'corner'},
                
                // X-site Oxygen Face-centers (6)
                {x: 0, y: -1.1, z: 0, type: 'oxygen'}, // Bottom
                {x: 0, y: 1.1, z: 0, type: 'oxygen'},  // Top
                {x: -1.1, y: 0, z: 0, type: 'oxygen'}, // Left
                {x: 1.1, y: 0, z: 0, type: 'oxygen'},  // Right
                {x: 0, y: 0, z: -1.1, type: 'oxygen'}, // Back
                {x: 0, y: 0, z: 1.1, type: 'oxygen'},  // Front
                
                // B-site Center Cation (1)
                {x: 0, y: 0, z: 0, type: 'center'}
            ].map(v => ({ x: v.x * 90, y: v.y * 90, z: v.z * 90, type: v.type }));

            edges = [
                // Outer Cube Edges (0 to 11)
                [0, 1], [1, 2], [2, 3], [3, 0],
                [4, 5], [5, 6], [6, 7], [7, 4],
                [0, 4], [1, 5], [2, 6], [3, 7],
                
                // Inner Octahedral Edges (12 to 23)
                [9, 10], [9, 11], [9, 12], [9, 13], // Top to faces
                [8, 10], [8, 11], [8, 12], [8, 13], // Bottom to faces
                [10, 12], [10, 13],                  // Left to front/back
                [11, 12], [11, 13]                   // Right to front/back
            ];
        } else if (type === 'zinc') {
            // Zinc Blende (ZnS - FCC Sulfur + 4 Zn Tetrahedral sites)
            vertices = [
                // FCC Sulfur Corners (8)
                {x: -1, y: -1, z: -1, type: 'sulfur'},
                {x: 1, y: -1, z: -1, type: 'sulfur'},
                {x: 1, y: 1, z: -1, type: 'sulfur'},
                {x: -1, y: 1, z: -1, type: 'sulfur'},
                {x: -1, y: -1, z: 1, type: 'sulfur'},
                {x: 1, y: -1, z: 1, type: 'sulfur'},
                {x: 1, y: 1, z: 1, type: 'sulfur'},
                {x: -1, y: 1, z: 1, type: 'sulfur'},
                // FCC Sulfur Face Centers (6)
                {x: 0, y: -1, z: 0, type: 'sulfur'},  // Bottom
                {x: 0, y: 1, z: 0, type: 'sulfur'},   // Top
                {x: -1, y: 0, z: 0, type: 'sulfur'},  // Left
                {x: 1, y: 0, z: 0, type: 'sulfur'},   // Right
                {x: 0, y: 0, z: -1, type: 'sulfur'},  // Back
                {x: 0, y: 0, z: 1, type: 'sulfur'},   // Front
                // Zinc Cations in alternating sub-cube centers (4)
                {x: -0.5, y: -0.5, z: -0.5, type: 'zinc'}, // T1
                {x: 0.5, y: 0.5, z: -0.5, type: 'zinc'},   // T2
                {x: -0.5, y: 0.5, z: 0.5, type: 'zinc'},    // T3
                {x: 0.5, y: -0.5, z: 0.5, type: 'zinc'}    // T4
            ].map(v => ({ x: v.x * 90, y: v.y * 90, z: v.z * 90, type: v.type }));

            edges = [
                // Bounding Cube Frame (0 to 11)
                [0, 1], [1, 2], [2, 3], [3, 0],
                [4, 5], [5, 6], [6, 7], [7, 4],
                [0, 4], [1, 5], [2, 6], [3, 7],
                // Zn-S Covalent Bonds (12 to 27)
                [14, 0], [14, 10], [14, 8], [14, 12], // T1 to corners/faces
                [15, 1], [15, 11], [15, 9], [15, 12], // T2
                [16, 7], [16, 10], [16, 9], [16, 13], // T3
                [17, 5], [17, 11], [17, 8], [17, 13]  // T4
            ];
        } else if (type === 'graphene') {
            // Honeycomb Graphene Patch
            const R = 50;
            const rawVertices = [];
            const centers = [
                {x: 0, z: 0},
                {x: 1.5 * R, z: Math.sqrt(3)/2 * R},
                {x: 1.5 * R, z: -Math.sqrt(3)/2 * R},
                {x: -1.5 * R, z: Math.sqrt(3)/2 * R},
                {x: -1.5 * R, z: -Math.sqrt(3)/2 * R},
                {x: 0, z: Math.sqrt(3) * R},
                {x: 0, z: -Math.sqrt(3) * R}
            ];
            
            centers.forEach(c => {
                for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI) / 3;
                    const px = c.x + R * Math.cos(angle);
                    const pz = c.z + R * Math.sin(angle);
                    let exists = false;
                    for (let v of rawVertices) {
                        if (Math.hypot(v.x - px, v.z - pz) < 1.0) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        rawVertices.push({x: px, y: 0, z: pz, type: 'carbon'});
                    }
                }
            });
            
            let sumX = 0, sumZ = 0;
            rawVertices.forEach(v => { sumX += v.x; sumZ += v.z; });
            const midX = sumX / rawVertices.length;
            const midZ = sumZ / rawVertices.length;
            
            vertices = rawVertices.map(v => ({
                x: v.x - midX,
                y: 0,
                z: v.z - midZ,
                type: 'carbon'
            }));
            
            edges = [];
            for (let i = 0; i < vertices.length; i++) {
                for (let j = i + 1; j < vertices.length; j++) {
                    const d = Math.hypot(vertices[i].x - vertices[j].x, vertices[i].z - vertices[j].z);
                    if (Math.abs(d - R) < 2.0) {
                        edges.push([i, j]);
                    }
                }
            }
        } else if (type === 'bcc') {
            // Body-Centered Cubic (BCC)
            vertices = [
                {x: -1, y: -1, z: -1, type: 'corner'},
                {x: 1, y: -1, z: -1, type: 'corner'},
                {x: 1, y: 1, z: -1, type: 'corner'},
                {x: -1, y: 1, z: -1, type: 'corner'},
                {x: -1, y: -1, z: 1, type: 'corner'},
                {x: 1, y: -1, z: 1, type: 'corner'},
                {x: 1, y: 1, z: 1, type: 'corner'},
                {x: -1, y: 1, z: 1, type: 'corner'},
                {x: 0, y: 0, z: 0, type: 'center'}
            ].map(v => ({ x: v.x * 95, y: v.y * 95, z: v.z * 95, type: v.type }));

            edges = [
                [0, 1], [1, 2], [2, 3], [3, 0],
                [4, 5], [5, 6], [6, 7], [7, 4],
                [0, 4], [1, 5], [2, 6], [3, 7]
            ];
        } else if (type === 'fcc') {
            // Face-Centered Cubic (FCC)
            vertices = [
                {x: -1, y: -1, z: -1, type: 'corner'},
                {x: 1, y: -1, z: -1, type: 'corner'},
                {x: 1, y: 1, z: -1, type: 'corner'},
                {x: -1, y: 1, z: -1, type: 'corner'},
                {x: -1, y: -1, z: 1, type: 'corner'},
                {x: 1, y: -1, z: 1, type: 'corner'},
                {x: 1, y: 1, z: 1, type: 'corner'},
                {x: -1, y: 1, z: 1, type: 'corner'},
                {x: 0, y: -1, z: 0, type: 'face'},
                {x: 0, y: 1, z: 0, type: 'face'},
                {x: -1, y: 0, z: 0, type: 'face'},
                {x: 1, y: 0, z: 0, type: 'face'},
                {x: 0, y: 0, z: -1, type: 'face'},
                {x: 0, y: 0, z: 1, type: 'face'}
            ].map(v => ({ x: v.x * 95, y: v.y * 95, z: v.z * 95, type: v.type }));

            edges = [
                [0, 1], [1, 2], [2, 3], [3, 0],
                [4, 5], [5, 6], [6, 7], [7, 4],
                [0, 4], [1, 5], [2, 6], [3, 7]
            ];
        } else if (type === 'halite') {
            // Halite (NaCl)
            const S = 65;
            const rawVertices = [];
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    for (let z = -1; z <= 1; z++) {
                        const dist2 = x*x + y*y + z*z;
                        const type = (dist2 % 2 === 1) ? 'anion' : 'cation';
                        rawVertices.push({x: x * S, y: y * S, z: z * S, type: type});
                    }
                }
            }
            vertices = rawVertices;

            edges = [];
            for (let i = 0; i < vertices.length; i++) {
                for (let j = i + 1; j < vertices.length; j++) {
                    const d = Math.hypot(vertices[i].x - vertices[j].x, vertices[i].y - vertices[j].y, vertices[i].z - vertices[j].z);
                    if (Math.abs(d - S) < 2.0) {
                        edges.push([i, j]);
                    }
                }
            }
        } else if (type === 'hcp') {
            // Hexagonal Close Packed (HCP - Titanium)
            const Rh = 100;
            const H = 160;
            vertices = [];
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                vertices.push({ x: Rh * Math.cos(angle), y: H/2, z: Rh * Math.sin(angle), type: 'corner' });
            }
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                vertices.push({ x: Rh * Math.cos(angle), y: -H/2, z: Rh * Math.sin(angle), type: 'corner' });
            }
            vertices.push({ x: 0, y: H/2, z: 0, type: 'center' });
            vertices.push({ x: 0, y: -H/2, z: 0, type: 'center' });
            const innerR = Rh * 0.58; 
            for (let i = 0; i < 3; i++) {
                const angle = (i * 2 * Math.PI / 3) + (Math.PI / 6);
                vertices.push({ x: innerR * Math.cos(angle), y: 0, z: innerR * Math.sin(angle), type: 'center' });
            }

            edges = [
                [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
                [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 6],
                [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11],
                [12, 0], [12, 1], [12, 2], [12, 3], [12, 4], [12, 5],
                [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11],
                [14, 0], [14, 1], [14, 6], [14, 7],
                [15, 2], [15, 3], [15, 8], [15, 9],
                [16, 4], [16, 5], [16, 10], [16, 11]
            ];
        }
    }

    function render() {
        ctx.clearRect(0, 0, rect.width, rect.height);
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#18453B';
        const accentGlow = getComputedStyle(document.documentElement).getPropertyValue('--accent-glow').trim() || 'rgba(24, 69, 59, 0.2)';

        const projected = vertices.map(v => {
            const y1 = v.y * Math.cos(rx) - v.z * Math.sin(rx);
            const z1 = v.y * Math.sin(rx) + v.z * Math.cos(rx);
            const x2 = v.x * Math.cos(ry) + z1 * Math.sin(ry);
            const z2 = -v.x * Math.sin(ry) + z1 * Math.cos(ry);
            const scale = 1.0;
            return { x: x2 * scale + rect.width / 2, y: y1 * scale + rect.height / 2, z: z2, type: v.type };
        });

        edges.forEach((edge, idx) => {
            const p1 = projected[edge[0]];
            const p2 = projected[edge[1]];
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#111111';
            ctx.globalAlpha = 0.9;
            if ((activeType === 'perovskite' && idx >= 12) || (activeType === 'hcp' && idx >= 18) || (activeType === 'zinc' && idx >= 12)) {
                ctx.lineWidth = 1.2;
                ctx.setLineDash([3, 3]);
            } else if (activeType === 'graphene') {
                ctx.globalAlpha = 0.8;
                ctx.lineWidth = 3.5;
                ctx.setLineDash([]);
            } else {
                ctx.lineWidth = 2.0;
                ctx.setLineDash([]);
            }
            ctx.stroke();
            ctx.globalAlpha = 1.0;
            ctx.setLineDash([]);
        });

        if (activeType === 'martensite' || activeType === 'bcc') {
            ctx.strokeStyle = '#111111';
            ctx.globalAlpha = 0.6;
            ctx.lineWidth = 1.2;
            ctx.setLineDash([4, 4]);
            const centerNode = projected[8];
            for (let i = 0; i < 8; i++) {
                const corner = projected[i];
                ctx.beginPath();
                ctx.moveTo(centerNode.x, centerNode.y);
                ctx.lineTo(corner.x, corner.y);
                ctx.stroke();
            }
            ctx.setLineDash([]);
            ctx.globalAlpha = 1.0;
        }

        const sortedAtoms = [...projected].map((v, i) => ({ ...v, originalIndex: i })).sort((a, b) => b.z - a.z);

        sortedAtoms.forEach(atom => {
            ctx.beginPath();
            let radius = 18;
            let mainColor = accentColor;
            let highlightColor = '#ffffff';
            let shadowColor = '#000000';
            let isInterior = false;
            if (['center', 'face', 'tetra', 'cation', 'zinc', 'silicon', 'oxygen', 'anion'].includes(atom.type)) isInterior = true;

            if (isInterior) {
                mainColor = '#94a3b8';
                highlightColor = '#ffffff';
                shadowColor = '#0f172a';
            } else {
                mainColor = accentColor;
                highlightColor = '#ffffff';
                shadowColor = '#000000';
            }

            if (activeType === 'perovskite') {
                radius = atom.type === 'corner' ? 16 : (atom.type === 'center' ? 11 : 13);
            } else if (activeType === 'bcc' || activeType === 'martensite' || activeType === 'fcc') {
                radius = (atom.type === 'center' || atom.type === 'face') ? 17 : 15;
            } else if (activeType === 'graphene') {
                radius = 13;
                mainColor = accentColor;
                highlightColor = '#ffffff';
            } else if (activeType === 'hcp') {
                radius = atom.type === 'center' ? 14 : 16;
            }

            const grad = ctx.createRadialGradient(atom.x - radius * 0.35, atom.y - radius * 0.35, radius * 0.05, atom.x, atom.y, radius);
            grad.addColorStop(0, highlightColor);
            grad.addColorStop(0.2, mainColor);
            grad.addColorStop(1, shadowColor);
            ctx.arc(atom.x, atom.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = grad;
            ctx.shadowColor = isInterior ? 'rgba(0,0,0,0.3)' : accentGlow;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0; 
        });
    }

    function startDrag(clientX, clientY) { isDragging = true; lastMouseX = clientX; lastMouseY = clientY; }
    function moveDrag(clientX, clientY) {
        if (!isDragging) return;
        ry += (clientX - lastMouseX) * 0.005;
        rx -= (clientY - lastMouseY) * 0.005;
        // Pitch clamping removed for free rotation
        lastMouseX = clientX;
        lastMouseY = clientY;
        requestAnimationFrame(render);
    }

    canvas.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
    window.addEventListener('mouseup', () => { isDragging = false; });
    canvas.addEventListener('touchstart', (e) => { if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    window.addEventListener('touchmove', (e) => { if (isDragging && e.touches.length === 1) moveDrag(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });

    const btnPolonium = document.getElementById('btn-polonium');
    const btnBcc = document.getElementById('btn-bcc');
    const btnFcc = document.getElementById('btn-fcc');
    const btnMartensite = document.getElementById('btn-martensite');
    const btnPerovskite = document.getElementById('btn-perovskite');
    const btnHalite = document.getElementById('btn-halite');
    const btnGraphene = document.getElementById('btn-graphene');
    const btnHcp = document.getElementById('btn-hcp');
    const btnDiamond = document.getElementById('btn-diamond');

    const controlBtns = [btnPolonium, btnBcc, btnFcc, btnMartensite, btnPerovskite, btnHalite, btnGraphene, btnHcp, btnDiamond];
    function setActiveButton(activeBtn) { controlBtns.forEach(btn => { if (btn) btn.classList.toggle('active', btn === activeBtn); }); }

    if (btnBcc) {
        if (btnPolonium) btnPolonium.addEventListener('click', () => { setActiveButton(btnPolonium); loadGeometry('polonium'); render(); });
        btnBcc.addEventListener('click', () => { setActiveButton(btnBcc); loadGeometry('bcc'); render(); });
        if (btnFcc) btnFcc.addEventListener('click', () => { setActiveButton(btnFcc); loadGeometry('fcc'); render(); });
        if (btnMartensite) btnMartensite.addEventListener('click', () => { setActiveButton(btnMartensite); loadGeometry('martensite'); render(); });
        if (btnPerovskite) btnPerovskite.addEventListener('click', () => { setActiveButton(btnPerovskite); loadGeometry('perovskite'); render(); });
        if (btnHalite) btnHalite.addEventListener('click', () => { setActiveButton(btnHalite); loadGeometry('halite'); render(); });
        if (btnDiamond) btnDiamond.addEventListener('click', () => { setActiveButton(btnDiamond); loadGeometry('zinc'); render(); });
        if (btnGraphene) btnGraphene.addEventListener('click', () => { setActiveButton(btnGraphene); loadGeometry('graphene'); render(); });
        if (btnHcp) btnHcp.addEventListener('click', () => { setActiveButton(btnHcp); loadGeometry('hcp'); render(); });
    }

    loadGeometry('bcc');
    setTimeout(render, 100);
});
