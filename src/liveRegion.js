/**
 * Vanilla JavaScript Live Regions
 * A modern, vanilla JavaScript implementation for managing ARIA live regions
 *
 * @module LiveRegion
 */

(function (global, factory) {
  'use strict';

  if (typeof exports === 'object' && typeof module !== 'undefined') {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else {
    // Browser global
    global.LiveRegion = factory();
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  /**
   * Default options for live regions
   */
  const defaults = {
    labelledby: null,
    label: null,
    role: 'region',
    atomic: 'false',
    live: 'polite',
    relevant: 'additions',
    busy: 'false',
    className: undefined,
    replace: false,
    text: undefined,
    wait: 200,
  };

  /**
   * Check if a value is empty
   * @param {*} str - Value to check
   * @returns {boolean} True if empty
   */
  function isEmpty(str) {
    return ['', ' ', 0, '0', null, false, undefined].includes(str);
  }

  /**
   * Remove empty properties from an object
   * @param {Object} obj - Object to clean
   * @returns {Object} Cleaned object
   */
  function cleanBlank(obj) {
    const cleaned = {};
    for (const key in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, key) &&
        !isEmpty(obj[key])
      ) {
        cleaned[key] = obj[key];
      }
    }
    return cleaned;
  }

  /**
   * Get current ARIA attributes from an element
   * @param {HTMLElement} element - Target element
   * @returns {Object} Current attributes
   */
  function getCurrentAttributes(element) {
    return {
      labelledby: element.getAttribute('aria-labelledby') || undefined,
      label: element.getAttribute('aria-label') || undefined,
      role: element.getAttribute('role') || undefined,
      atomic: element.getAttribute('aria-atomic') || undefined,
      live: element.getAttribute('aria-live') || undefined,
      relevant: element.getAttribute('aria-relevant') || undefined,
      busy: element.getAttribute('aria-busy') || undefined,
    };
  }

  /**
   * Create or update a live region
   * @param {HTMLElement|string} selector - Element or CSS selector
   * @param {Object} options - Configuration options
   * @returns {HTMLElement|HTMLElement[]} Affected element(s)
   */
  function liveRegion(selector, options = {}) {
    // Get element(s)
    let elements;
    if (typeof selector === 'string') {
      elements = document.querySelectorAll(selector);
    } else if (selector instanceof HTMLElement) {
      elements = [selector];
    } else if (selector instanceof NodeList || selector instanceof Array) {
      elements = selector;
    } else {
      throw new Error('Invalid selector provided to liveRegion');
    }

    // Process each element
    const results = [];
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      // Get current attributes
      const current = cleanBlank(getCurrentAttributes(element));

      // Merge options with current values and defaults
      const config = Object.assign({}, defaults, current, options);

      // Override live property for alert role
      if (config.role === 'alert') {
        config.live = 'assertive';
      }

      // Set ARIA attributes
      element.setAttribute('role', config.role);
      element.setAttribute('aria-atomic', config.atomic);
      element.setAttribute('aria-live', config.live);
      element.setAttribute('aria-busy', config.busy);
      element.setAttribute('aria-relevant', config.relevant);

      // Set label attributes if provided
      if (config.labelledby !== null && config.labelledby !== undefined) {
        element.setAttribute('aria-labelledby', config.labelledby);
      }

      if (config.label !== null && config.label !== undefined) {
        element.setAttribute('aria-label', config.label);
      }

      // Add CSS class if provided
      if (config.className !== undefined) {
        element.classList.add(config.className);
      }

      // Handle text content
      if (config.text !== undefined) {
        setTimeout(() => {
          if (config.replace) {
            element.innerHTML = config.text;
          } else {
            element.insertAdjacentHTML('beforeend', config.text);
          }
        }, config.wait);
      }

      results.push(element);
    }

    // Return single element or array based on input
    return results.length === 1 ? results[0] : results;
  }

  /**
   * Static method to create a new live region
   * @param {Object} options - Configuration options
   * @returns {HTMLElement} New live region element
   */
  liveRegion.create = function (options = {}) {
    const element = document.createElement('div');
    document.body.appendChild(element);
    return liveRegion(element, options);
  };

  /**
   * Static method to find all live regions on the page
   * @returns {NodeList} All elements with aria-live attribute
   */
  liveRegion.findAll = function () {
    return document.querySelectorAll('[aria-live]');
  };

  /**
   * Static method to remove live region attributes
   * @param {HTMLElement|string} selector - Element or CSS selector
   */
  liveRegion.remove = function (selector) {
    const elements =
      typeof selector === 'string'
        ? document.querySelectorAll(selector)
        : [selector];

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      element.removeAttribute('role');
      element.removeAttribute('aria-atomic');
      element.removeAttribute('aria-live');
      element.removeAttribute('aria-busy');
      element.removeAttribute('aria-relevant');
      element.removeAttribute('aria-labelledby');
      element.removeAttribute('aria-label');
    }
  };

  return liveRegion;
});
