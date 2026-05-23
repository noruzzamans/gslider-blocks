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
         * Compiles taxonomy query parameters into WP_Query tax_query array.
         *
         * @since 1.2.0
         *
         * @param array $categories Standard categories list.
         * @param array $tags       Standard tags list.
         * @param array $taxonomies Custom taxonomy slug => term IDs array.
         * @return array Compiled tax_query array.
         */
        public static function build_tax_query( array $categories = [], array $tags = [], array $taxonomies = [] ) {
            $tax_query = array();

            if ( ! empty( $categories ) ) {
                $tax_query[] = array(
                    'taxonomy' => 'category',
                    'field'    => 'term_id',
                    'terms'    => array_map( 'intval', $categories ),
                    'operator' => 'IN',
                );
            }

            if ( ! empty( $tags ) ) {
                $tax_query[] = array(
                    'taxonomy' => 'post_tag',
                    'field'    => 'term_id',
                    'terms'    => array_map( 'intval', $tags ),
                    'operator' => 'IN',
                );
            }

            if ( ! empty( $taxonomies ) && is_array( $taxonomies ) ) {
                foreach ( $taxonomies as $tax_slug => $term_ids ) {
                    if ( ! empty( $term_ids ) ) {
                        $tax_query[] = array(
                            'taxonomy' => sanitize_text_field( $tax_slug ),
                            'field'    => 'term_id',
                            'terms'    => array_map( 'intval', (array) $term_ids ),
                            'operator' => 'IN',
                        );
                    }
                }
            }

            if ( ! empty( $tax_query ) ) {
                if ( count( $tax_query ) > 1 ) {
                    $tax_query['relation'] = 'AND';
                }
            }

            return $tax_query;
        }

        /**
         * Generates standard WP_Query date_query parameters based on relative date ranges.
         *
         * @since 1.2.0
         *
         * @param string $date_range Relative range identifier.
         * @return array Compiled date_query parameters.
         */
        public static function build_date_query( string $date_range ) {
            if ( empty( $date_range ) || 'any' === $date_range ) {
                return array();
            }

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

            return $date_query;
        }

        /**
         * Compiles a single custom field metadata comparison array.
         *
         * @since 1.2.0
         *
         * @param string $meta_key     The custom field key.
         * @param string $meta_value   The custom field value.
         * @param string $meta_compare The comparison operator.
         * @return array Compiled meta_query subarray.
         */
        public static function build_meta_query( string $meta_key, string $meta_value = '', string $meta_compare = '=' ) {
            if ( empty( $meta_key ) ) {
                return array();
            }

            $meta_query = array(
                'key'     => sanitize_text_field( $meta_key ),
                'compare' => sanitize_text_field( $meta_compare ),
            );

            if ( '' !== $meta_value && ! in_array( $meta_compare, array( 'EXISTS', 'NOT EXISTS' ), true ) ) {
                $meta_query['value'] = sanitize_text_field( $meta_value );
            }

            return array( $meta_query );
        }

        /**
         * Compiles excluded post IDs list.
         *
         * @since 1.2.0
         *
         * @param string $exclude_posts_string Comma-separated post IDs.
         * @param bool   $exclude_current      Option to exclude the current active post.
         * @return array Flat array of excluded post ID integers.
         */
        public static function build_excluded_posts( string $exclude_posts_string = '', bool $exclude_current = false ) {
            $excluded_ids = array();

            if ( ! empty( $exclude_posts_string ) ) {
                $excluded_ids = array_map( 'intval', explode( ',', $exclude_posts_string ) );
            }

            if ( $exclude_current ) {
                $current_id = get_the_ID();
                if ( $current_id ) {
                    $excluded_ids[] = $current_id;
                }
            }

            return array_unique( $excluded_ids );
        }
    }
}
