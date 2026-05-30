# 🌍 World-Class Pro Animation Plan — Post Carousel Block
### *(Updated with full research findings — blocks-animation plugin + web research)*

> **গোল:** World এর সেরা WordPress carousel blocks এর সাথে compete করার মতো animation system বানানো।
> **CSS Source:** `blocks-animation` plugin এর `index.css` থেকে keyframes copy করা হবে (Animate.css based, 77+ animations)।
> **Technology:** Pure CSS keyframes + Vanilla JS `IntersectionObserver` — কোনো external library dependency নেই।

---

## 🔍 Research Summary (blocks-animation plugin)

`blocks-animation` plugin টা **ThemeIsle** এর বানানো, যেটা **Animate.css** কে WordPress Gutenberg এ integrate করে।

### Plugin থেকে আমরা কী নিচ্ছি:

| কী নিচ্ছি | কোথা থেকে | কীভাবে |
|---|---|---|
| **77+ CSS Keyframes** | `build/animation/index.css` | আমাদের `style.scss` এ copy করব |
| **Scroll trigger logic idea** | `build/animation/frontend.js` | নিজের `view.js` এ implement করব (Swiper compatible) |
| **Class system** | `animated` + animation name | আমাদের card এ apply করব |

### Plugin এর CSS class system:
```html
<!-- Plugin এর class pattern: -->
<div class="animated fadeInUp">...</div>

<!-- আমাদের implementation: -->
<article class="gslider-post-carousel-card animated fadeInUp">
```

> ❌ **Plugin এর frontend.js ব্যবহার করব না** — কারণ এটা Swiper এর `slideChange` event এর সাথে conflict করে।
> ✅ **নিজের `view.js`** এ `IntersectionObserver` দিয়ে trigger করব।

---

## 📋 Final Animation Categories — সম্পূর্ণ List

| # | Category | ⭐ Pro Level | CSS Source | JS দরকার? |
|---|---|---|---|---|
| 1 | **Card Entrance Animations (Scroll Reveal)** | ⭐⭐⭐⭐⭐ | Animate.css keyframes (copy) | হ্যাঁ — IntersectionObserver |
| 2 | **Swiper Creative Transition Effects** | ⭐⭐⭐⭐⭐ | Swiper built-in | হ্যাঁ — Swiper config |
| 3 | **Card Hover Animations** | ⭐⭐⭐⭐⭐ | Custom CSS | না |
| 4 | **Image Hover Effects** | ⭐⭐⭐⭐⭐ | Custom CSS | না |
| 5 | **3D Tilt / Parallax (Mouse Move)** | ⭐⭐⭐⭐⭐ | Custom CSS | হ্যাঁ — mousemove |
| 6 | **Staggered Card Entry** | ⭐⭐⭐⭐⭐ | CSS custom property | হ্যাঁ — minor |
| 7 | **Reduced Motion Accessibility** | ⭐⭐⭐⭐⭐ | CSS media query | না |

> **Note:** Text Reveal, Skeleton Loader, Badge, Pagination, Arrow animations — Phase 2 তে করব।

---

## 🎬 CATEGORY 1 — Card Entrance Animations (Scroll Reveal)

### Available Animations (Animate.css থেকে, সব ব্যবহারযোগ্য)

#### 🟢 Fade Group (সবচেয়ে popular)
| Animation Name | Animate.css Class | Effect |
|---|---|---|
| Fade In | `fadeIn` | Smooth opacity reveal |
| Fade Up | `fadeInUp` | নিচ থেকে উপরে + fade ⭐ Most used |
| Fade Down | `fadeInDown` | উপর থেকে নিচে + fade |
| Fade Left | `fadeInLeft` | ডান থেকে বামে + fade |
| Fade Right | `fadeInRight` | বাম থেকে ডানে + fade |
| Fade Up Big | `fadeInUpBig` | fadeInUp কিন্তু larger distance |
| Fade Top Left | `fadeInTopLeft` | Diagonal corner থেকে |
| Fade Top Right | `fadeInTopRight` | Diagonal corner থেকে |

#### 🟡 Zoom Group
| Animation Name | Animate.css Class | Effect |
|---|---|---|
| Zoom In | `zoomIn` | Scale 0.3 → 1 + fade |
| Zoom In Down | `zoomInDown` | Scale + translateY |
| Zoom In Left | `zoomInLeft` | Scale + translateX |
| Zoom In Right | `zoomInRight` | Scale + translateX |
| Zoom In Up | `zoomInUp` | Scale + translateY upward |

#### 🔵 Bounce Group
| Animation Name | Animate.css Class | Effect |
|---|---|---|
| Bounce In | `bounceIn` | Bouncy scale entrance |
| Bounce In Down | `bounceInDown` | উপর থেকে bounce করে |
| Bounce In Left | `bounceInLeft` | বাম থেকে bounce করে |
| Bounce In Right | `bounceInRight` | ডান থেকে bounce করে |
| Bounce In Up | `bounceInUp` | নিচ থেকে bounce করে |

#### 🟣 Flip Group (3D)
| Animation Name | Animate.css Class | Effect |
|---|---|---|
| Flip In X | `flipInX` | Horizontal 3D flip |
| Flip In Y | `flipInY` | Vertical 3D flip |

#### 🔴 Rotate Group
| Animation Name | Animate.css Class | Effect |
|---|---|---|
| Rotate In | `rotateIn` | 360° rotate + fade |
| Rotate In Down Left | `rotateInDownLeft` | Corner pivot rotation |
| Rotate In Down Right | `rotateInDownRight` | Corner pivot rotation |

#### 🟠 Slide Group
| Animation Name | Animate.css Class | Effect |
|---|---|---|
| Slide In Down | `slideInDown` | উপর থেকে slide |
| Slide In Left | `slideInLeft` | বাম থেকে slide |
| Slide In Right | `slideInRight` | ডান থেকে slide |
| Slide In Up | `slideInUp` | নিচ থেকে slide |

#### ⚪ Special / Premium
| Animation Name | Animate.css Class | Effect |
|---|---|---|
| Back In Down | `backInDown` | পিছন থেকে zoom in (scale 0.7) |
| Back In Left | `backInLeft` | পিছন থেকে left দিয়ে |
| Back In Right | `backInRight` | পিছন থেকে right দিয়ে |
| Back In Up | `backInUp` | পিছন থেকে নিচ দিয়ে |
| Light Speed Right | `lightSpeedInRight` | Lightning fast skew entry |
| Light Speed Left | `lightSpeedInLeft` | Lightning fast skew entry |
| Jack In The Box | `jackInTheBox` | বাক্স থেকে pop করে |
| Roll In | `rollIn` | Rolling করে আসে |

---

### Attributes (মাত্র ৫টা — সব simple type)

```javascript
// attributes.js এ যোগ করতে হবে:

cardEntranceAnimation: {
    type: "string",
    default: "none",   // backward compatible — existing blocks unchanged
},
cardEntranceAnimationDuration: {
    type: "number",
    default: 600,      // milliseconds
},
cardEntranceAnimationDelay: {
    type: "number",
    default: 0,        // milliseconds — base delay
},
cardEntranceAnimationOffset: {
    type: "number",
    default: 15,       // percentage — 15% viewport এ এলে trigger
},
cardEntranceAnimationEasing: {
    type: "string",
    default: "ease-out",
},
```

### Inspector Panel (General Tab → Animation Settings)

```
[SelectControl]  Animation Type
                 → Dropdown: none / fadeIn / fadeInUp / fadeInDown / ...সব options

[RangeControl]   Duration (ms)     min:100  max:2000  default:600
[RangeControl]   Delay (ms)        min:0    max:2000  default:0
[RangeControl]   Viewport Offset % min:0    max:50    default:15
[SelectControl]  Easing            ease / ease-in / ease-out / ease-in-out / linear
```

### render.php Implementation

```php
$card_entrance_animation  = isset( $attributes['cardEntranceAnimation'] ) ? sanitize_html_class( $attributes['cardEntranceAnimation'] ) : 'none';
$animation_duration       = isset( $attributes['cardEntranceAnimationDuration'] ) ? intval( $attributes['cardEntranceAnimationDuration'] ) : 600;
$animation_delay          = isset( $attributes['cardEntranceAnimationDelay'] ) ? intval( $attributes['cardEntranceAnimationDelay'] ) : 0;
$animation_offset         = isset( $attributes['cardEntranceAnimationOffset'] ) ? intval( $attributes['cardEntranceAnimationOffset'] ) : 15;
$animation_easing         = isset( $attributes['cardEntranceAnimationEasing'] ) ? sanitize_text_field( $attributes['cardEntranceAnimationEasing'] ) : 'ease-out';

// Card এর article tag এ class যোগ:
$card_classes = 'gslider-post-carousel-card';
if ( $card_entrance_animation !== 'none' ) {
    $card_classes .= ' animated ' . $card_entrance_animation; // Animate.css classes
}
```

### CSS (style.scss) — Keyframes Source

```scss
// blocks-animation plugin এর index.css থেকে copy:
// path: /blocks-animation/build/animation/index.css

// শুধু এই portion টা নেব (editor UI CSS বাদ দিয়ে):
:root {
    --animate-duration: 1s;
    --animate-delay: 0s;
}
.animated {
    animation-duration: var(--animate-duration);
    animation-fill-mode: both;
}
// + সব @keyframes blocks (fadeIn, fadeInUp, bounceIn, zoomIn etc.)
```

### view.js — IntersectionObserver

```javascript
function initEntranceAnimations(wrapper) {
    const settings = wrapper.dataset.animationSettings
        ? JSON.parse(wrapper.dataset.animationSettings) : {};

    const duration  = settings.duration  || 600;
    const delay     = settings.delay     || 0;
    const offset    = (settings.offset   || 15) / 100;
    const easing    = settings.easing    || 'ease-out';

    const cards = wrapper.querySelectorAll('.animated');
    if (!cards.length) return;

    // Apply custom duration/easing via CSS variable
    cards.forEach((card, index) => {
        card.style.setProperty('--animate-duration', duration + 'ms');
        card.style.animationTimingFunction = easing;
        if (delay > 0) {
            card.style.animationDelay = delay + 'ms';
        }
        // Hide before animate
        card.style.visibility = 'hidden';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                observer.unobserve(entry.target); // once only — no repeat
            }
        });
    }, { threshold: offset });

    cards.forEach(card => observer.observe(card));
}
```

---

## 🎡 CATEGORY 2 — Swiper Creative Transition Effects

> **Note:** `carouselEffect` attribute already exists (`slide`, `fade`, `cube`, `coverflow`, `flip`, `cards`).
> শুধু **Creative presets** add করতে হবে।

### New Creative Effect Options (carouselEffect এ extend)

| Option Value | Description |
|---|---|
| `creative-push` | নতুন slide পুরনোকে push করে |
| `creative-cover` | নতুন slide পুরনোকে cover করে |
| `creative-reveal` | পুরনো slide সরলে নতুন reveal হয় |
| `creative-depth` | পুরনো slide shrink হয়ে পিছনে যায় |
| `creative-parallax` | Image ও text আলাদা speed এ সরে |

### render.php — Creative Effect Config

```php
// carouselEffect === 'creative-*' হলে Swiper creativeEffect config যোগ হবে
$creative_presets = array(
    'creative-push'     => array(
        'prev' => array('translate' => array('-100%', 0, 0)),
        'next' => array('translate' => array('100%', 0, 0)),
    ),
    'creative-cover'    => array(
        'prev' => array('translate' => array('-100%', 0, 0), 'opacity' => 0),
        'next' => array('translate' => array(0, 0, 0)),
    ),
    'creative-reveal'   => array(
        'prev' => array('translate' => array(0, 0, 0)),
        'next' => array('translate' => array('100%', 0, 0), 'opacity' => 0),
    ),
    'creative-depth'    => array(
        'prev' => array('translate' => array('-120%', 0, 0)),
        'next' => array('translate' => array(0, 0, '-1px'), 'scale' => 0.85, 'opacity' => 0.5),
    ),
    'creative-parallax' => array(
        'prev' => array('translate' => array('-110%', 0, 0), 'opacity' => 0),
        'next' => array('translate' => array('110%', 0, 0), 'opacity' => 0),
    ),
);

if ( isset( $creative_presets[ $carousel_effect ] ) ) {
    $swiper_settings['effect'] = 'creative';
    $swiper_settings['creativeEffect'] = $creative_presets[ $carousel_effect ];
}
```

> **New Attribute needed:** নেই — `carouselEffect` already exists। শুধু CONSTANTS এ নতুন options যোগ করতে হবে।

---

## 🖱️ CATEGORY 3 — Card Hover Animations

> **Technology:** Pure CSS via dynamically generated class (styling.js)

### Options (Selector: `cardHoverAnimation`)

| Value | CSS Effect | Description |
|---|---|---|
| `none` | — | কিছু না |
| `lift` | `translateY(-8px)` + shadow | Card উপরে উঠে |
| `zoom` | `scale(1.03)` | Card zoom হয় |
| `lift-zoom` | `translateY(-6px) scale(1.02)` | উভয় একসাথে |
| `pop` | bounce keyframe | Quick pop effect |
| `shadow-depth` | Deep layered shadow | 3D depth feel |
| `border-glow` | `box-shadow` glow | Glowing border |

### Attributes (মাত্র ২টা)

```javascript
cardHoverAnimation: {
    type: "string",
    default: "none",
},
cardHoverAnimationDuration: {
    type: "number",
    default: 300,  // milliseconds
},
```

### Inspector Panel (General Tab → Animation Settings → Card Hover Effect section)

```
[SelectControl]  Hover Animation    none / lift / zoom / lift-zoom / pop / shadow-depth / border-glow
[RangeControl]   Hover Duration(ms) min:100  max:1000  default:300
```

### styling.js → CSS Generation

```javascript
// wrapper class এ যোগ হবে:
if (cardHoverAnimation !== 'none') {
    css += `.${blockId} .gslider-post-carousel-card {
        transition: transform ${cardHoverAnimationDuration}ms ease-out,
                    box-shadow ${cardHoverAnimationDuration}ms ease-out;
    }`;
}

// lift:
if (cardHoverAnimation === 'lift') {
    css += `.${blockId} .gslider-post-carousel-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08);
    }`;
}
// zoom:
if (cardHoverAnimation === 'zoom') {
    css += `.${blockId} .gslider-post-carousel-card:hover {
        transform: scale(1.03);
    }`;
}
// ... বাকি options
```

---

## 🖼️ CATEGORY 4 — Image Hover Effects

> ⚠️ **Already Exists:** `imageHoverEffect`, `imageHoverScale`, `imageHoverOpacity`, `imageHoverLift`, `imageTransitionDuration` — inspector.js line 504-509 এ already আছে!
>
> শুধু **নতুন option values** যোগ করতে হবে existing attribute তে।

### Existing vs New Options

```javascript
// EXISTING (already in attributes.js):
imageHoverEffect: { type: "string", default: "none" }
// Existing options: none, zoom, opacity, lift

// NEW options যোগ করতে হবে:
// grayscale     — BW → Color transition
// shine-sweep   — Light shine বাম থেকে ডানে
// overlay-fade  — Dark overlay fade in
// overlay-slide — Overlay নিচ থেকে উপরে
// pan-left      — Image বাম দিকে সরে
// pan-right     — Image ডান দিকে সরে
```

### নতুন Attribute দরকার নেই! শুধু styling.js এ নতুন CSS rules:

```css
/* Grayscale to Color */
.gslider-img-grayscale .gslider-post-carousel-image img {
    filter: grayscale(1);
    transition: filter 0.4s ease;
}
.gslider-img-grayscale .gslider-post-carousel-card:hover .gslider-post-carousel-image img {
    filter: grayscale(0);
}

/* Shine Sweep */
.gslider-img-shine-sweep .gslider-post-carousel-image { position: relative; overflow: hidden; }
.gslider-img-shine-sweep .gslider-post-carousel-image::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transform: skewX(-20deg);
    transition: left 0.6s ease;
}
.gslider-img-shine-sweep .gslider-post-carousel-card:hover .gslider-post-carousel-image::after {
    left: 150%;
}
```

---

## 🌀 CATEGORY 5 — 3D Tilt / Parallax (Mouse Move)

> সবচেয়ে "WOW" effect। Mouse card এর উপরে move করলে card 3D তে tilt করে।
> **Technology:** Vanilla JS `mousemove` event

### Attributes (মাত্র ২টা)

```javascript
enableCardTilt: {
    type: "boolean",
    default: false,
},
cardTiltMaxAngle: {
    type: "number",
    default: 12,   // degrees (5–25 range)
},
```

### Inspector Panel (General Tab → Animation Settings → 3D Tilt Effect section)

```
[ToggleControl] Enable 3D Tilt        default: false
[RangeControl]  Max Tilt Angle (5–25°) default: 12
                (শুধু দেখাবে যখন Enable = true)
```

### view.js Implementation

```javascript
function initCardTilt(wrapper) {
    const cards = wrapper.querySelectorAll('.gslider-tilt-enabled');
    if (!cards.length) return;

    const maxAngle = parseFloat(wrapper.dataset.tiltMax || 12);
    const perspective = 800;

    cards.forEach(card => {
        card.style.transition = 'transform 400ms ease';
        card.style.transformStyle = 'preserve-3d';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -maxAngle;
            const rotateY = ((x - centerX) / centerX) * maxAngle;

            card.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
        });
    });
}
```

---

## 🎭 CATEGORY 6 — Staggered Card Entry

> প্রতিটা card একটার পরে আরেকটা delay দিয়ে আসে — premium orchestrated feel।

### Attributes (মাত্র ২টা)

```javascript
enableStaggerAnimation: {
    type: "boolean",
    default: false,
},
cardStaggerDelay: {
    type: "number",
    default: 100,   // milliseconds between each card (50–300 range)
},
```

### Inspector Panel (General Tab → Animation Settings → Stagger section)

```
[ToggleControl] Enable Stagger Animation   default: false
[RangeControl]  Stagger Delay (ms)         min:50  max:300  default:100
                (শুধু দেখাবে যখন Enable = true AND Entrance Animation != none)
```

### view.js Implementation

```javascript
function applyStaggerDelays(wrapper) {
    const staggerMs = parseInt(wrapper.dataset.staggerDelay || 100);
    const cards = wrapper.querySelectorAll('.animated');
    cards.forEach((card, index) => {
        const baseDelay = parseFloat(card.style.animationDelay || 0);
        card.style.animationDelay = (baseDelay + index * staggerMs) + 'ms';
    });
}
```

---

## ♿ CATEGORY 7 — Reduced Motion Accessibility

> এটা কোনো attribute দরকার নেই। `style.scss` এ শুধু এক CSS media query।

```scss
@media (prefers-reduced-motion: reduce) {
    .gslider-post-carousel-wrapper .animated {
        animation: none !important;
        transition: none !important;
        opacity: 1 !important;
        transform: none !important;
        visibility: visible !important;
    }
    .gslider-post-carousel-wrapper .gslider-post-carousel-card {
        transition: none !important;
        transform: none !important;
    }
    .gslider-post-carousel-wrapper .gslider-post-carousel-image img {
        transition: none !important;
        filter: none !important;
        transform: none !important;
    }
}
```

---

## 📊 Final Attributes Summary — মোট ১৩টা নতুন Attribute

| # | Attribute | Type | Default | Inspector Control |
|---|---|---|---|---|
| 1 | `cardEntranceAnimation` | `string` | `"none"` | SelectControl (30+ options) |
| 2 | `cardEntranceAnimationDuration` | `number` | `600` | RangeControl (100–2000ms) |
| 3 | `cardEntranceAnimationDelay` | `number` | `0` | RangeControl (0–2000ms) |
| 4 | `cardEntranceAnimationOffset` | `number` | `15` | RangeControl (0–50%) |
| 5 | `cardEntranceAnimationEasing` | `string` | `"ease-out"` | SelectControl (5 options) |
| 6 | `enableStaggerAnimation` | `boolean` | `false` | ToggleControl |
| 7 | `cardStaggerDelay` | `number` | `100` | RangeControl (50–300ms) |
| 8 | `cardHoverAnimation` | `string` | `"none"` | SelectControl (7 options) |
| 9 | `cardHoverAnimationDuration` | `number` | `300` | RangeControl (100–1000ms) |
| 10 | `enableCardTilt` | `boolean` | `false` | ToggleControl |
| 11 | `cardTiltMaxAngle` | `number` | `12` | RangeControl (5–25°) |

> **Note:** `imageHoverEffect` (Category 4) ও `imageTransitionDuration` → already exist in inspector.js (line 504-509) এবং attributes.js তে। শুধু নতুন CSS option values যোগ হবে।
>
> Creative Swiper Effects (Category 2) → `carouselEffect` already exists। শুধু Constants এ নতুন options এবং render.php এ config।
>
> **মোট নতুন attributes: ১১টা** (imageHoverEffect ও carouselEffect আগেই আছে)

---

## 📁 Files এ কী কী Change হবে

| File | Change | Details |
|---|---|---|
| [`attributes.js`](file:///c:/Users/Rubel%20Ahmed/Local%20Sites/test/app/public/wp-content/plugins/gslider-blocks/src/blocks/post-carousel/attributes.js) | **Add** | ১১টা নতুন animation attribute |
| [`style.scss`](file:///c:/Users/Rubel Ahmed/Local%20Sites/test/app/public/wp-content/plugins/gslider-blocks/src/blocks/post-carousel/style.scss) | **Add** | Animate.css keyframes copy + reduced motion |
| [`render.php`](file:///c:/Users/Rubel Ahmed/Local%20Sites/test/app/public/wp-content/plugins/gslider-blocks/src/blocks/post-carousel/render.php) | **Modify** | Card class এ `animated className` output + data attributes |
| [`view.js`](file:///c:/Users/Rubel Ahmed/Local%20Sites/test/app/public/wp-content/plugins/gslider-blocks/src/blocks/post-carousel/view.js) | **Modify** | IntersectionObserver + stagger + tilt JS |
| [`styling.js`](file:///c:/Users/Rubel Ahmed/Local%20Sites/test/app/public/wp-content/plugins/gslider-blocks/src/blocks/post-carousel/styling.js) | **Add** | Card hover CSS + image hover new options |
| [`inspector.js`](file:///c:/Users/Rubel Ahmed/Local%20Sites/test/app/public/wp-content/plugins/gslider-blocks/src/blocks/post-carousel/inspector.js) | **Add** | New "Animation Settings" PanelBody in General tab |
| `constants/index.js` | **Add** | `CAROUSEL_EFFECT_OPTIONS` তে creative presets + animation option arrays |

---

## 🗺️ Inspector Tab Final Layout

```
📋 GENERAL Tab
│
├── Show / Hide Elements          [existing]
├── Layout & Content Setting      [existing]
├── Query Settings                [existing]
├── Content Order                 [existing]
├── Carousel Settings             [existing]
├── Carousel Effect               [existing — + new creative options]
├── Read More Button              [existing]
├── Navigation                    [existing]
│
└── 🎬 Animation Settings         [NEW PanelBody]
    │
    ├── ─── Entrance Animation ───
    │   SelectControl: Animation Type (none / fadeIn / fadeInUp / ...)
    │   RangeControl:  Duration (100–2000ms)
    │   RangeControl:  Delay (0–2000ms)
    │   RangeControl:  Viewport Offset (0–50%)
    │   SelectControl: Easing (ease-out / ease / ease-in / linear)
    │
    ├── ─── Stagger Animation ───
    │   ToggleControl: Enable Stagger
    │   RangeControl:  Stagger Delay (50–300ms) [conditional]
    │
    ├── ─── Card Hover Effect ───
    │   SelectControl: Hover Animation (none / lift / zoom / ...)
    │   RangeControl:  Hover Duration (100–1000ms)
    │
    └── ─── 3D Tilt Effect ───
        ToggleControl: Enable 3D Tilt
        RangeControl:  Max Tilt Angle (5–25°) [conditional]

🎨 STYLE Tab
│
└── Image Panel (existing)
    └── SelectControl: Image Hover Effect
        [extend existing options with: grayscale / shine-sweep / overlay-slide / pan-left / pan-right]
```

---

## 🚀 Implementation Order (Phase Plan)

```
Phase 1 — Attributes + Inspector UI:
✅ attributes.js এ ১১টা নতুন attribute add
✅ inspector.js এ "Animation Settings" PanelBody add
✅ constants/index.js এ animation option arrays add

Phase 2 — CSS:
✅ style.scss এ Animate.css keyframes copy
✅ style.scss এ reduced motion media query
✅ styling.js এ card hover + image hover নতুন CSS

Phase 3 — PHP + JS:
✅ render.php এ animation class + data attributes output
✅ view.js এ IntersectionObserver + stagger + tilt logic

Phase 4 — Swiper Creative Effects:
✅ render.php এ creative effect config
✅ constants/index.js এ CAROUSEL_EFFECT_OPTIONS update
```

---

## 🏆 World-Class Performance Rules

1. **শুধু `transform` এবং `opacity` animate করো** — layout reflow এড়াতে।
2. **`will-change: transform`** — GPU তে promote করো।
3. **`transition` CSS এ রাখো** — JS এ নয়, FOUC এড়াতে।
4. **IntersectionObserver `unobserve()`** — একবার animate হলে detach করো।
5. **`prefers-reduced-motion` respect করো** — Accessibility।
6. **Duration 200ms–800ms** — এর বাহিরে slow মনে হয়।
7. **Easing: `ease-out`** — সবচেয়ে natural feel।
8. **Stagger delay 50ms–150ms** — এর বেশি হলে ধীর মনে হয়।
9. **Animate.css class system reuse** — wheel reinvent করো না।
10. **No external JS library** — `frontend.js` plugin dependency avoid করো।

---

*Last Updated: 2026-05-30 | All research consolidated | gslider-blocks Post Carousel Block*
