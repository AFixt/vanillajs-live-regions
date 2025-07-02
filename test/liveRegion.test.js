import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import LiveRegion from '../src/liveRegion.js';

describe('LiveRegion', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Default properties', () => {
    it('should set default role to "region"', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      LiveRegion(element);

      expect(element.getAttribute('role')).toBe('region');
    });

    it('should set default aria-atomic to "false"', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      LiveRegion(element);

      expect(element.getAttribute('aria-atomic')).toBe('false');
    });

    it('should set default aria-live to "polite"', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      LiveRegion(element);

      expect(element.getAttribute('aria-live')).toBe('polite');
    });

    it('should set default aria-busy to "false"', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      LiveRegion(element);

      expect(element.getAttribute('aria-busy')).toBe('false');
    });

    it('should set default aria-relevant to "additions"', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      LiveRegion(element);

      expect(element.getAttribute('aria-relevant')).toBe('additions');
    });
  });

  describe('Custom properties', () => {
    it('should accept custom label', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      LiveRegion(element, { label: 'News Ticker' });

      expect(element.getAttribute('aria-label')).toBe('News Ticker');
    });

    it('should accept custom labelledby', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      LiveRegion(element, { labelledby: 'some-id' });

      expect(element.getAttribute('aria-labelledby')).toBe('some-id');
    });

    it('should force assertive for alert role', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      LiveRegion(element, { role: 'alert' });

      expect(element.getAttribute('role')).toBe('alert');
      expect(element.getAttribute('aria-live')).toBe('assertive');
    });

    it('should add CSS class if provided', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      LiveRegion(element, { className: 'live-region-class' });

      expect(element.classList.contains('live-region-class')).toBe(true);
    });
  });

  describe('Text handling', () => {
    it('should append text when replace is false', async () => {
      const element = document.createElement('div');
      element.innerHTML = 'Initial content';
      container.appendChild(element);

      LiveRegion(element, { text: ' New content', replace: false, wait: 10 });

      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(element.innerHTML).toBe('Initial content New content');
    });

    it('should replace text when replace is true', async () => {
      const element = document.createElement('div');
      element.innerHTML = 'Initial content';
      container.appendChild(element);

      LiveRegion(element, { text: 'New content', replace: true, wait: 10 });

      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(element.innerHTML).toBe('New content');
    });
  });

  describe('Selector support', () => {
    it('should work with CSS selectors', () => {
      const element = document.createElement('div');
      element.className = 'test-element';
      container.appendChild(element);

      LiveRegion('.test-element');

      expect(element.getAttribute('role')).toBe('region');
    });

    it('should work with multiple elements', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      element1.className = 'test-element';
      element2.className = 'test-element';
      container.appendChild(element1);
      container.appendChild(element2);

      const results = LiveRegion('.test-element');

      expect(results).toHaveLength(2);
      expect(element1.getAttribute('role')).toBe('region');
      expect(element2.getAttribute('role')).toBe('region');
    });
  });

  describe('Static methods', () => {
    it('should create new live region with create()', () => {
      const element = LiveRegion.create({ label: 'Dynamic Region' });

      expect(element).toBeInstanceOf(HTMLElement);
      expect(element.getAttribute('aria-label')).toBe('Dynamic Region');
      expect(document.body.contains(element)).toBe(true);

      // Clean up
      document.body.removeChild(element);
    });

    it('should find all live regions with findAll()', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      element1.setAttribute('aria-live', 'polite');
      element2.setAttribute('aria-live', 'assertive');
      container.appendChild(element1);
      container.appendChild(element2);

      const regions = LiveRegion.findAll();

      expect(regions.length).toBeGreaterThanOrEqual(2);
    });

    it('should remove live region attributes with remove()', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      LiveRegion(element, { label: 'Test Region' });
      LiveRegion.remove(element);

      expect(element.getAttribute('role')).toBeNull();
      expect(element.getAttribute('aria-live')).toBeNull();
      expect(element.getAttribute('aria-label')).toBeNull();
    });
  });

  describe('Existing attributes preservation', () => {
    it('should preserve existing attributes unless overridden', () => {
      const element = document.createElement('div');
      element.setAttribute('aria-live', 'assertive');
      element.setAttribute('aria-atomic', 'true');
      container.appendChild(element);

      LiveRegion(element, { role: 'status' });

      expect(element.getAttribute('role')).toBe('status');
      expect(element.getAttribute('aria-live')).toBe('assertive'); // preserved
      expect(element.getAttribute('aria-atomic')).toBe('true'); // preserved
    });
  });

  describe('Error handling', () => {
    it('should throw error for invalid selector', () => {
      expect(() => {
        LiveRegion(123); // Invalid selector type
      }).toThrow('Invalid selector provided to liveRegion');
    });
  });

  describe('NodeList and Array support', () => {
    it('should work with NodeList', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      element1.className = 'test-nodelist';
      element2.className = 'test-nodelist';
      container.appendChild(element1);
      container.appendChild(element2);

      const nodeList = document.querySelectorAll('.test-nodelist');
      const results = LiveRegion(nodeList);

      expect(results).toHaveLength(2);
      expect(element1.getAttribute('role')).toBe('region');
      expect(element2.getAttribute('role')).toBe('region');
    });

    it('should work with Array of elements', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      container.appendChild(element1);
      container.appendChild(element2);

      const results = LiveRegion([element1, element2]);

      expect(results).toHaveLength(2);
      expect(element1.getAttribute('role')).toBe('region');
      expect(element2.getAttribute('role')).toBe('region');
    });
  });
});
