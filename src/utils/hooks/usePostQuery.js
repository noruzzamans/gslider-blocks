import { useSelect } from '@wordpress/data';

/**
 * Custom React Hook to fetch posts from the WordPress database.
 * Designed to be reusable plugin-wide across different blocks (Carousel, Grid, etc.).
 *
 * @param {Object} queryArgs - Arguments for the post query (e.g., per_page, categories, tags, etc.)
 * @param {string} postType - WordPress Post Type (defaults to 'post')
 * @returns {Object} - Object containing { posts, isLoading }
 */
export const usePostQuery = (queryArgs = {}, postType = 'post') => {
    return useSelect((select) => {
        const { getEntityRecords, isResolving } = select('core');
        
        // Ensure _embed is always set to true so we get author and featured image data
        const query = {
            _embed: true,
            ...queryArgs,
        };

        return {
            posts: getEntityRecords('postType', postType, query),
            isLoading: isResolving('core', 'getEntityRecords', ['postType', postType, query]),
        };
    }, [JSON.stringify(queryArgs), postType]);
};

export default usePostQuery;
