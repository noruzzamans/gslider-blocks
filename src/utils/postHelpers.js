import { __ } from '@wordpress/i18n';

/**
 * Decode HTML entities in text (e.g. converting &amp; to &)
 * 
 * @param {string} text Raw text string with HTML entities.
 * @returns {string} Decoded plain text string.
 */
export const decodeHtmlEntities = (text) => {
    if (!text) return '';
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
};

/**
 * Get featured image URL from embedded post REST API data, supporting fallback sizes.
 * 
 * @param {Object} post          Embedded post record from WP REST API.
 * @param {string} preferredSize Preferred image size slug (default 'medium_large').
 * @returns {string|null}        Featured image URL or null if not found.
 */
export const getFeaturedImageUrl = (post, preferredSize = 'medium_large') => {
    if (post?._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
        const media = post._embedded['wp:featuredmedia'][0];
        
        if (media.media_details && media.media_details.sizes) {
            const sizes = media.media_details.sizes;
            if (sizes[preferredSize]) {
                return sizes[preferredSize].source_url;
            }
            // Fallbacks
            if (sizes.large) {
                return sizes.large.source_url;
            }
            if (sizes.full) {
                return sizes.full.source_url;
            }
        }
        return media.source_url;
    }
    return null;
};

/**
 * Get categories array from embedded post REST API data.
 * 
 * @param {Object} post Embedded post record from WP REST API.
 * @returns {Array}     List of category term objects.
 */
export const getPostCategories = (post) => {
    if (post?._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
        return post._embedded['wp:term'][0].filter(term => term.taxonomy === 'category');
    }
    return [];
};

/**
 * Get cleaned excerpt text from post, stripping HTML and limiting by word count.
 * 
 * @param {Object} post      Embedded post record from WP REST API.
 * @param {number} wordLimit Maximum number of words to return.
 * @returns {string}         Truncated plain excerpt text.
 */
export const getExcerpt = (post, wordLimit = 20) => {
    let text = post?.excerpt?.rendered || post?.content?.rendered || '';
    if (!text) return '';
    
    const div = document.createElement('div');
    div.innerHTML = text;
    text = div.textContent || div.innerText || '';
    
    const words = text.trim().split(/\s+/);
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text.trim();
};

/**
 * Get author display name from embedded post REST API data.
 * 
 * @param {Object} post Embedded post record from WP REST API.
 * @returns {string}    Author name.
 */
export const getAuthorName = (post) => {
    if (post?._embedded && post._embedded.author && post._embedded.author[0]) {
        return post._embedded.author[0].name || post._embedded.author[0].slug || '';
    }
    return '';
};

/**
 * Get formatted post date using localized date string.
 * 
 * @param {Object} post    Post record.
 * @param {string} locale  Locale string (default 'en-US').
 * @param {Object} options DateTimeFormat options.
 * @returns {string}       Formatted date string.
 */
export const getFormattedDate = (post, locale = 'en-US', options = { year: 'numeric', month: 'short', day: 'numeric' }) => {
    if (!post?.date) return '';
    const date = new Date(post.date);
    return date.toLocaleDateString(locale, options);
};
