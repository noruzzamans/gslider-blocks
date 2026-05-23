<?php
/**
 * Global Query and Helper utilities for GSlider Blocks.
 *
 * Provides static helper methods to compile WP_Query parameters and
 * execute queries for different dynamic blocks.
 *
 * @package GSlider\Utils
 * @since   1.2.0
 */

namespace GSlider\Utils;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'Helper' ) ) {

    /**
     * Provides helper services for query compilation and utility helpers.
     *
     * @since 1.2.0
     */
    class Helper {

        /**
         * Compiles block query attributes into standard WP_Query arguments.
         *
         * @since 1.2.0
         *
         * @param array $attributes The block attributes.
         * @return array Compliant WP_Query arguments array.
         */
        public static function get_post_query_args( array $attributes ) {
            $post_type            = isset( $attributes['postType'] ) ? sanitize_text_field( $attributes['postType'] ) : 'post';
            $posts_per_page       = isset( $attributes['postsPerPage'] ) ? intval( $attributes['postsPerPage'] ) : 6;
            $categories           = isset( $attributes['categories'] ) ? array_map( 'intval', $attributes['categories'] ) : array();
            $tags                 = isset( $attributes['tags'] ) ? array_map( 'intval', $attributes['tags'] ) : array();
            $authors              = isset( $attributes['authors'] ) ? array_map( 'intval', $attributes['authors'] ) : array();
            $exclude_posts        = isset( $attributes['excludePosts'] ) ? sanitize_text_field( $attributes['excludePosts'] ) : '';
            $offset               = isset( $attributes['offset'] ) ? intval( $attributes['offset'] ) : 0;
            $orderby              = isset( $attributes['orderBy'] ) ? sanitize_text_field( $attributes['orderBy'] ) : 'date';
            $order                = isset( $attributes['order'] ) ? sanitize_text_field( $attributes['order'] ) : 'desc';
            $search_query         = isset( $attributes['searchQuery'] ) ? sanitize_text_field( $attributes['searchQuery'] ) : '';
            $sticky_posts         = isset( $attributes['stickyPosts'] ) ? sanitize_text_field( $attributes['stickyPosts'] ) : 'include';
            $taxonomy_query       = isset( $attributes['taxonomyQuery'] ) ? $attributes['taxonomyQuery'] : array();
            $meta_key             = isset( $attributes['metaKey'] ) ? sanitize_text_field( $attributes['metaKey'] ) : '';
            $meta_value           = isset( $attributes['metaValue'] ) ? sanitize_text_field( $attributes['metaValue'] ) : '';
            $meta_compare         = isset( $attributes['metaCompare'] ) ? sanitize_text_field( $attributes['metaCompare'] ) : '=';
            $date_range           = isset( $attributes['dateRange'] ) ? sanitize_text_field( $attributes['dateRange'] ) : 'any';
            $exclude_current_post = ! empty( $attributes['excludeCurrentPost'] );

            $query_args = array(
                'post_type'      => $post_type,
                'posts_per_page' => $posts_per_page,
                'post_status'    => 'publish',
                'orderby'        => $orderby,
                'order'          => $order,
            );

            // Construct taxonomy query parameters
            $tax_query = array();

            if ( ! empty( $categories ) ) {
                $tax_query[] = array(
                    'taxonomy' => 'category',
                    'field'    => 'term_id',
                    'terms'    => $categories,
                    'operator' => 'IN',
                );
            }

            if ( ! empty( $tags ) ) {
                $tax_query[] = array(
                    'taxonomy' => 'post_tag',
                    'field'    => 'term_id',
                    'terms'    => $tags,
                    'operator' => 'IN',
                );
            }

            if ( ! empty( $taxonomy_query ) && is_array( $taxonomy_query ) ) {
                foreach ( $taxonomy_query as $tax_slug => $term_ids ) {
                    if ( ! empty( $term_ids ) ) {
                        $tax_query[] = array(
                            'taxonomy' => $tax_slug,
                            'field'    => 'term_id',
                            'terms'    => array_map( 'intval', $term_ids ),
                            'operator' => 'IN',
                        );
                    }
                }
            }

            if ( ! empty( $tax_query ) ) {
                if ( count( $tax_query ) > 1 ) {
                    $tax_query['relation'] = 'AND';
                }
                $query_args['tax_query'] = $tax_query;
            }

            if ( ! empty( $authors ) ) {
                $query_args['author__in'] = $authors;
            }

            if ( $offset > 0 ) {
                $query_args['offset'] = $offset;
            }

            // Construct post exclusions
            $excluded_ids = array();
            if ( ! empty( $exclude_posts ) ) {
                $excluded_ids = array_map( 'intval', explode( ',', $exclude_posts ) );
            }
            if ( $exclude_current_post ) {
                $current_page_id = get_the_ID();
                if ( $current_page_id ) {
                    $excluded_ids[] = $current_page_id;
                }
            }

            if ( ! empty( $excluded_ids ) ) {
                $query_args['post__not_in'] = $excluded_ids;
            }

            if ( ! empty( $search_query ) ) {
                $query_args['s'] = $search_query;
            }

            // Construct Date Query
            if ( ! empty( $date_range ) && 'any' !== $date_range ) {
                $date_query = array();
                switch ( $date_range ) {
                    case 'last_24_hours':
                        $date_query[] = array( 'after' => '24 hours ago' );
                        break;
                    case 'last_7_days':
                        $date_query[] = array( 'after' => '7 days ago' );
                        break;
                    case 'last_30_days':
                        $date_query[] = array( 'after' => '30 days ago' );
                        break;
                    case 'last_365_days':
                        $date_query[] = array( 'after' => '1 year ago' );
                        break;
                    case 'current_month':
                        $date_query[] = array(
                            'year'  => date( 'Y' ),
                            'month' => date( 'm' ),
                        );
                        break;
                    case 'current_year':
                        $date_query[] = array(
                            'year' => date( 'Y' ),
                        );
                        break;
                }
                $query_args['date_query'] = $date_query;
            }

            // Construct Meta Query
            if ( ! empty( $meta_key ) ) {
                $meta_query = array(
                    'key'     => $meta_key,
                    'compare' => $meta_compare,
                );
                if ( '' !== $meta_value && ! in_array( $meta_compare, array( 'EXISTS', 'NOT EXISTS' ), true ) ) {
                    $meta_query['value'] = $meta_value;
                }
                $query_args['meta_query'] = array( $meta_query );

                // Handle meta value sorting
                if ( in_array( $orderby, array( 'meta_value', 'meta_value_num' ), true ) ) {
                    $query_args['meta_key'] = $meta_key;
                }
            }

            // Construct Sticky Posts rules
            if ( 'exclude' === $sticky_posts ) {
                $sticky_ids = get_option( 'sticky_posts' );
                if ( ! empty( $sticky_ids ) ) {
                    $query_args['post__not_in'] = isset( $query_args['post__not_in'] )
                        ? array_merge( $query_args['post__not_in'], $sticky_ids )
                        : $sticky_ids;
                }
            } elseif ( 'only' === $sticky_posts ) {
                $sticky_ids = get_option( 'sticky_posts' );
                $query_args['post__in'] = ! empty( $sticky_ids ) ? $sticky_ids : array( 0 );
            }

            return $query_args;
        }

        /**
         * Executes standard WP_Query based on dynamic block attributes.
         *
         * @since 1.2.0
         *
         * @param array $attributes The block attributes.
         * @return \WP_Query The WP_Query instance.
         */
        public static function get_posts( array $attributes ) {
            return new \WP_Query( self::get_post_query_args( $attributes ) );
        }
    }
}
