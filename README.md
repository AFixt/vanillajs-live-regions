# Vanilla Live Regions

A modern, vanilla JavaScript library for managing ARIA live regions on web pages. This library provides an easy-to-use API for creating and managing live regions that announce content changes to screen reader users.

## Features

- 🚀 Zero dependencies - pure vanilla JavaScript
- 📦 Small footprint - lightweight and efficient
- 🎯 Modern ES6+ syntax with backward compatibility
- 🔧 Flexible API - works with selectors, elements, or NodeLists
- ♿ Full ARIA support with sensible defaults
- 🧪 Thoroughly tested with modern testing tools

## Getting Started

### Installation

Install via npm:

```bash
npm install vanilla-live-regions --save
```

Or include directly in your HTML:

```html
<script type="module">
  import LiveRegion from './dist/liveRegion.mjs';
</script>
```

## Usage

### Basic Usage

```javascript
import LiveRegion from 'vanilla-live-regions';

// Create a live region with default settings
const element = document.getElementById('my-region');
LiveRegion(element);
```

### Using CSS Selectors

```javascript
// Apply to single element
LiveRegion('#status-message');

// Apply to multiple elements
LiveRegion('.notification');
```

### Custom Configuration

```javascript
LiveRegion('#news-ticker', {
  label: 'News Updates',
  role: 'status',
  live: 'polite',
  atomic: 'true'
});
```

### Creating Dynamic Live Regions

```javascript
// Create a new live region dynamically
const alertRegion = LiveRegion.create({
  role: 'alert',
  label: 'System Alerts'
});

// Update its content
LiveRegion(alertRegion, {
  text: 'New notification received!',
  replace: true
});
```

## API Reference

### LiveRegion(selector, options)

Creates or updates a live region.

#### Parameters

- `selector` - Can be:
  - CSS selector string (e.g., '#my-element', '.my-class')
  - HTMLElement
  - NodeList
  - Array of HTMLElements

- `options` - Configuration object with the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `labelledby` | string | null | ID of element to use as label (aria-labelledby) |
| `label` | string | null | Text label for the region (aria-label) |
| `role` | string | 'region' | ARIA role (region, status, alert, log, marquee, timer, progressbar) |
| `atomic` | string | 'false' | Whether to announce entire region or just changes |
| `live` | string | 'polite' | Announcement priority (polite, assertive) |
| `relevant` | string | 'additions' | What changes to announce (additions, removals, text, all) |
| `busy` | string | 'false' | Whether region is being updated |
| `className` | string | undefined | CSS class to add to the element |
| `replace` | boolean | false | Whether to replace existing content |
| `text` | string | undefined | Content to add/replace in the region |
| `wait` | number | 200 | Delay (ms) before updating content |

### Static Methods

#### LiveRegion.create(options)

Creates a new live region element and appends it to the document body.

```javascript
const notification = LiveRegion.create({
  role: 'status',
  label: 'Notifications'
});
```

#### LiveRegion.findAll()

Returns all elements on the page that have live region attributes.

```javascript
const allRegions = LiveRegion.findAll();
console.log(`Found ${allRegions.length} live regions`);
```

#### LiveRegion.remove(selector)

Removes all live region attributes from the specified element(s).

```javascript
LiveRegion.remove('#my-region');
```

## Common Use Cases

### Status Messages

```javascript
LiveRegion('#status', {
  role: 'status',
  text: 'Form saved successfully',
  replace: true
});
```

### Error Alerts

```javascript
LiveRegion('#errors', {
  role: 'alert',
  text: 'Error: Invalid email address',
  replace: true
});
```

### Progress Indicators

```javascript
const progressRegion = LiveRegion('#progress', {
  role: 'progressbar',
  label: 'Upload Progress',
  busy: 'true'
});

// Update progress
LiveRegion(progressRegion, {
  text: 'Upload 45% complete',
  replace: true
});

// Complete
LiveRegion(progressRegion, {
  text: 'Upload complete',
  busy: 'false',
  replace: true
});
```

### Chat or Activity Logs

```javascript
LiveRegion('#chat-log', {
  role: 'log',
  label: 'Chat Messages',
  relevant: 'additions text'
});

// Add new messages
LiveRegion('#chat-log', {
  text: '<div>User: Hello!</div>',
  replace: false  // Append, don't replace
});
```

## Development

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Check coverage
npm run test:coverage
```

### Project Structure

```
├── src/
│   └── liveRegion.vanilla.js    # Main library source
├── test/
│   └── liveRegion.test.js       # Test suite
├── dist/                         # Built files (generated)
├── demo.html                     # Interactive demo
└── vite.config.js               # Build configuration
```

## Browser Support

This library supports all modern browsers and provides fallbacks for older browsers that support ES5.

## Migration from jQuery Version

If you're migrating from the jQuery version:

1. Remove jQuery dependency
2. Update your imports:
   ```javascript
   // Old
   $('#element').liveRegion(options);
   
   // New
   import LiveRegion from 'vanilla-live-regions';
   LiveRegion('#element', options);
   ```

3. The API remains largely the same, with the main difference being the function call syntax.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## More Information

For more information about ARIA live regions:

- [W3C ARIA Practices - Live Regions](https://www.w3.org/WAI/ARIA/apg/patterns/live-region/)
- [MDN - ARIA Live Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [WebAIM - ARIA Live Regions](https://webaim.org/articles/aria/#liveregions)