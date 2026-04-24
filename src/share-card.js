/**
 * QARAH — Share Card Generator
 * 1080×1920 portrait canvas card with user photo + name result
 */

export async function generateShareCard({ photoSrc, impression, names, lang = 'ko' }) {
    const W = 1080, H = 1920;
    const canvas = document.createElement('canvas');
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    await document.fonts.ready;

    // Background
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0,    '#07071a');
    bg.addColorStop(0.55, '#0c091e');
    bg.addColorStop(1,    '#130818');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Star field (deterministic)
    const rng = seededRng(42);
    for (let i = 0; i < 150; i++) {
        const alpha = rng() * 0.45 + 0.05;
        const r     = rng() * 2.5 + 0.5;
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(rng() * W, rng() * H, r, 0, Math.PI * 2);
        ctx.fill();
    }

    // Top glow
    const topGlow = ctx.createRadialGradient(W / 2, -80, 0, W / 2, -80, 720);
    topGlow.addColorStop(0, 'rgba(167,139,250,0.18)');
    topGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, W, 720);

    ctx.textAlign   = 'center';
    ctx.textBaseline = 'middle';

    // Brand
    ctx.font      = '900 80px Outfit, sans-serif';
    ctx.fillStyle = '#a78bfa';
    ctx.fillText('QARAH', W / 2, 105);

    ctx.font      = '400 34px Pretendard, sans-serif';
    ctx.fillStyle = '#4b5563';
    ctx.fillText(lang === 'ko' ? '인상에 어울리는 이름' : 'Your impression, your name', W / 2, 175);

    // User photo (circular)
    const PHOTO_CY = 455, PHOTO_R = 280;
    if (photoSrc) {
        // Outer glow
        const ringGlow = ctx.createRadialGradient(W / 2, PHOTO_CY, PHOTO_R - 10, W / 2, PHOTO_CY, PHOTO_R + 50);
        ringGlow.addColorStop(0, 'rgba(167,139,250,0.45)');
        ringGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = ringGlow;
        ctx.beginPath();
        ctx.arc(W / 2, PHOTO_CY, PHOTO_R + 50, 0, Math.PI * 2);
        ctx.fill();

        await drawCircularPhoto(ctx, photoSrc, W / 2, PHOTO_CY, PHOTO_R);

        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth   = 6;
        ctx.beginPath();
        ctx.arc(W / 2, PHOTO_CY, PHOTO_R + 4, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Impression badge
    const IMP_Y = photoSrc ? 820 : 410;
    const impLabel = lang === 'ko' ? impression.label : (impression.labelEn || impression.label);

    ctx.font      = '54px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(impression.emoji, W / 2, IMP_Y);

    ctx.font      = '700 50px Pretendard, sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(impLabel, W / 2, IMP_Y + 78);

    // Divider
    ctx.strokeStyle = 'rgba(167,139,250,0.22)';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(140, IMP_Y + 120);
    ctx.lineTo(W - 140, IMP_Y + 120);
    ctx.stroke();

    // Rank label
    const RANK_Y = IMP_Y + 185;
    ctx.font      = '400 34px Pretendard, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(
        lang === 'ko' ? '🥇 QARAH 추천 1위 이름' : '🥇 QARAH Top Recommendation',
        W / 2, RANK_Y
    );

    // #1 Name — auto-sized
    const n1 = names[0];
    const nameFontSize = fitFontSize(ctx, n1.name, 900, 'Pretendard, sans-serif', 160, 72);
    ctx.font      = `900 ${nameFontSize}px Pretendard, sans-serif`;
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(n1.name, W / 2, RANK_Y + 148);

    // Hanja / reading sub-text
    const subText = n1.hanja || n1.reading || '';
    const SUB_Y   = RANK_Y + 240;
    if (subText) {
        ctx.font      = '500 50px Pretendard, sans-serif';
        ctx.fillStyle = 'rgba(251,191,36,0.55)';
        ctx.fillText(subText, W / 2, SUB_Y);
    }

    // Meaning
    const meaningY = SUB_Y + (subText ? 82 : 22);
    ctx.font      = '400 40px Pretendard, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`"${truncate(n1.meaning, 28)}"`, W / 2, meaningY);

    // Score bar
    const BAR_Y = meaningY + 90;
    const barW  = 640, barH = 16;
    const barX  = (W - barW) / 2;

    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    roundRect(ctx, barX, BAR_Y, barW, barH, 8);
    ctx.fill();

    const fill = ctx.createLinearGradient(barX, 0, barX + barW, 0);
    fill.addColorStop(0, '#d97706');
    fill.addColorStop(1, '#fbbf24');
    ctx.fillStyle = fill;
    roundRect(ctx, barX, BAR_Y, barW * (n1.score / 100), barH, 8);
    ctx.fill();

    ctx.font      = '700 46px Outfit, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(
        `${lang === 'ko' ? '적합도' : 'Match'} ${n1.score}%`,
        W / 2, BAR_Y + 76
    );

    // 2nd, 3rd names
    const SMALL_Y = BAR_Y + 168;
    ctx.font      = '400 38px Pretendard, sans-serif';
    ctx.fillStyle = '#4b5563';
    if (names[1]) ctx.fillText(`🥈 ${names[1].name}  "${truncate(names[1].meaning, 18)}"`, W / 2, SMALL_Y);
    if (names[2]) ctx.fillText(`🥉 ${names[2].name}  "${truncate(names[2].meaning, 18)}"`, W / 2, SMALL_Y + 68);

    // Bottom CTA
    ctx.font      = '400 36px Pretendard, sans-serif';
    ctx.fillStyle = '#374151';
    ctx.fillText('qarah.web.app 에서 내 이름 찾기 →', W / 2, H - 80);

    // Download
    const a = document.createElement('a');
    a.download = `qarah-${n1.name}.png`;
    a.href     = canvas.toDataURL('image/png');
    a.click();
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function seededRng(seed) {
    let s = seed;
    return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

function fitFontSize(ctx, text, maxWidth, fontFamily, maxSize, minSize) {
    for (let size = maxSize; size >= minSize; size -= 4) {
        ctx.font = `900 ${size}px ${fontFamily}`;
        if (ctx.measureText(text).width <= maxWidth) return size;
    }
    return minSize;
}

async function drawCircularPhoto(ctx, src, cx, cy, r) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.clip();
            const aw = img.naturalWidth, ah = img.naturalHeight;
            const ar = aw / ah;
            let sx, sy, sw, sh;
            if (ar > 1) { sh = ah; sw = sh; sx = (aw - sw) / 2; sy = 0; }
            else         { sw = aw; sh = sw; sx = 0; sy = (ah - sh) / 2; }
            ctx.drawImage(img, sx, sy, sw, sh, cx - r, cy - r, r * 2, r * 2);
            ctx.restore();
            resolve();
        };
        img.onerror = resolve;
        img.src = src;
    });
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function truncate(str, max) {
    return str && str.length > max ? str.slice(0, max - 1) + '…' : (str || '');
}
