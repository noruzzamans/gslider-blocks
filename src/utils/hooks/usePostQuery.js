/* eslint-disable react-hooks/exhaustive-deps */
import { useSelect } from '@wordpress/data';

/**
 * Custom hook to fetch post type records using WP Core entity stores.
 *
 * @param {Object} queryArgs Query parameters for the request.
 * @param {string} postType  WordPress post type slug (e.g. 'post', 'page', 'product').
 * @return {Object}          Returns { posts, isLoading }
 */
export const usePostQuery = ( queryArgs = {}, postType = 'post' ) => {
	// Sanitize and filter empty parameters to prevent REST query pollution
	const sanitizedQueryArgs = Object.keys( queryArgs ).reduce(
		( acc, key ) => {
			const val = queryArgs[ key ];
			if ( val !== undefined && val !== null && val !== '' ) {
				if ( Array.isArray( val ) ) {
					if ( val.length > 0 ) {
						acc[ key ] = val;
					}
				} else {
					acc[ key ] = val;
				}
			}
			return acc;
		},
		{}
	);

	return useSelect(
		( select ) => {
			const { getEntityRecords, isResolving } = select( 'core' );

			const query = {
				_embed: true, // Always embed author and media entities
				...sanitizedQueryArgs,
			};

			// Format exclude to integer array as expected by core store API
			if ( query.exclude && typeof query.exclude === 'string' ) {
				query.exclude = query.exclude
					.split( ',' )
					.map( ( id ) => parseInt( id.trim(), 10 ) )
					.filter( ( id ) => ! isNaN( id ) );
			}

			return {
				posts: getEntityRecords( 'postType', postType, query ),
				isLoading: isResolving( 'core', 'getEntityRecords', [
					'postType',
					postType,
					query,
				] ),
			};
		},
		[ JSON.stringify( sanitizedQueryArgs ), postType ]
	);
};

export default usePostQuery;
