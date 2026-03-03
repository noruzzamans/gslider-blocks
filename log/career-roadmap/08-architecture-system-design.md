# 🏗️ Architecture & System Design — Learning Path

> Priority: 🟡 Mid-term (৩-৬ মাসে শিখুন)
> Goal: "Just a Developer" থেকে "Solution Architect" হওয়া

---

## কেন Architecture জানা দরকার?

AI কোডের যেকোনো line লিখে দিতে পারে। কিন্তু —
- কোন component কোথায় রাখবেন?
- Database কিভাবে design করবেন?
- ১০ লাখ user হলে system কি survive করবে?
- ৩ বছর পর codebase কি maintainable থাকবে?

**এগুলো শুধু মানুষই decide করতে পারে।**

---

## WordPress Plugin Architecture Patterns

### 1. File Organization Patterns

#### ❌ Bad (Flat Structure):
```
my-plugin/
  ├── my-plugin.php (সব code এখানে)
  ├── style.css
  └── script.js
```

#### ✅ Good (Modular Structure — আপনার plugin):
```
gslider-blocks/
  ├── gslider-blocks.php          (Entry point only)
  ├── includes/                    (PHP backend)
  │   ├── Plugin.php               (Bootstrap)
  │   ├── Classes/                 (Business logic)
  │   ├── Traits/                  (Shared behaviors)
  │   ├── Assets/                  (Script/Style management)
  │   └── Utils/                   (Helpers)
  ├── src/                         (JS frontend)
  │   ├── blocks/                  (Individual blocks)
  │   ├── components/              (Reusable UI)
  │   ├── store/                   (State management)
  │   ├── utils/                   (Helpers)
  │   └── constants/               (Config)
  └── build/                       (Compiled output)
```

#### 🚀 Better (Where you should go):
```
gslider-blocks/
  ├── includes/
  │   ├── Interfaces/               (Interfaces)
  │   │   ├── Registrable.php
  │   │   └── Renderable.php
  │   ├── Classes/
  │   ├── Services/                (Service layer)
  │   │   ├── SliderService.php
  │   │   └── LicenseService.php
  │   ├── Api/                     (REST API)
  │   │   └── SettingsController.php
  │   └── Models/                  (Data models)
  └── src/
      ├── blocks/
      │   └── testimonial/
      │       ├── inspector/       (Split panels)
      │       │   ├── index.js
      │       │   ├── GeneralPanel.js
      │       │   └── StylePanel.js
      │       ├── styling/         (Split styles)
      │       │   ├── index.js
      │       │   ├── desktop.js
      │       │   └── responsive.js
      │       └── ...
      ├── hooks/                   (Custom React hooks)
      └── services/                (API layer)
```

### 2. Design Patterns আপনার জানা দরকার

#### Singleton Pattern (আপনি already ব্যবহার করছেন ✅)
```php
// SingletonTrait — একটা class-এর একটাই instance থাকবে
class Plugin {
    use SingletonTrait;
}
```

#### Service Container / Dependency Injection
```php
// এখন আপনি করছেন:
StyleGenerator::getInstance()->register();
FontLoader::getInstance()->register();

// Better approach — Service Container:
$container = new Container();
$container->register(StyleGenerator::class);
$container->register(FontLoader::class);
$container->bootAll();
```

#### Repository Pattern (Data access)
```php
// এখন: Direct DB queries scattered in code
// Better:
class SliderRepository {
    public function findById(int $id): ?Slider {}
    public function findAll(): array {}
    public function save(Slider $slider): bool {}
}
```

#### Observer Pattern (Events)
```php
// WordPress hooks ARE observer pattern!
// আপনি already ব্যবহার করছেন:
add_action('init', [$this, 'register_blocks']);
add_filter('render_block', [$this, 'collect_dynamic_styles']);
```

---

## Headless WordPress + API Design

### কি?
WordPress কে শুধু backend/CMS হিসেবে ব্যবহার করা, frontend আলাদা framework (React/Next.js) দিয়ে বানানো।

### Architecture:
```
WordPress (Backend/API)
    ↓ REST API / GraphQL
Next.js / React (Frontend)
    ↓
User's Browser
```

### কেন শিখবেন?
- Enterprise clients এটা চায়
- Performance বেশি
- Frontend flexibility অনেক বেশি
- আপনার React knowledge directly কাজে লাগবে

### শেখার Resource:
- [ ] [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [ ] WPGraphQL plugin study করুন
- [ ] Next.js + WordPress headless project তৈরী করুন
- [ ] Faust.js (WordPress headless framework) explore করুন

---

## Multi-site Architecture

### কি?
একটা WordPress installation দিয়ে অনেকগুলো site চালানো।

### কখন লাগে?
- University — প্রতিটা department-এর আলাদা site
- Agency — client sites manage করা
- SaaS — প্রতিটা customer-এর আলাদা instance

### আপনার Plugin-এর জন্য কেন Important?
- GSlider কি multisite compatible?
- Network-wide activation support করে?
- Per-site settings vs network-wide settings

---

## Database Design

### WordPress Options API vs Custom Table

| Use Case | Approach |
|---|---|
| Simple settings | `get_option()` / `update_option()` |
| Per-post data | Post meta (`get_post_meta()`) |
| Large datasets (10K+ rows) | Custom table |
| Relational data | Custom table + foreign keys |
| Frequently queried | Custom table + proper indexes |

### আপনার Plugin-এর জন্য:
- Block attributes → Post content-এ store হয় (✅ correct)
- Plugin settings → Options API (✅ correct)
- Analytics data (future) → Custom table needed

---

## 📋 Learning Action Items

- [ ] SOLID principles শিখুন (Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion)
- [ ] WordPress Plugin Boilerplate study করুন — [wppb.me](https://wppb.me/)
- [ ] আপনার inspector.js split করার practice করুন — real architecture exercise
- [ ] একটা REST API endpoint তৈরী করুন GSlider-এর জন্য
- [ ] "PHP Design Patterns" book/course study করুন
- [ ] "System Design Interview" by Alex Xu বই পড়ুন

---

## 🔗 Resources

- [WordPress Plugin Architecture Best Practices](https://developer.wordpress.org/plugins/)
- [PHP Design Patterns](https://designpatternsphp.readthedocs.io/)
- [System Design Primer (GitHub)](https://github.com/donnemartin/system-design-primer)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
