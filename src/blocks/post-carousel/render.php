<?php
/**
 * Post Carousel Block - Server-Side Render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content.
 * @var WP_Block $block      Block instance.
 *
 * @package GSlider\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Extract attributes with defaults
$block_id            = isset( $attributes['blockId'] ) ? sanitize_html_class( $attributes['blockId'] ) : '';
$global_id           = isset( $attributes['globalID'] ) ? sanitize_html_class( $attributes['globalID'] ) : '';
$global_class        = isset( $attributes['globalClass'] ) ? sanitize_html_class( $attributes['globalClass'] ) : '';
$enable_lazy_load    = ! empty( $attributes['enableLazyLoad'] );
$post_title_html_tag = isset( $attributes['postTitleHtmlTag'] ) ? sanitize_key( $attributes['postTitleHtmlTag'] ) : 'h3';
$post_excerpt_html_tag = isset( $attributes['postExcerptHtmlTag'] ) ? sanitize_key( $attributes['postExcerptHtmlTag'] ) : 'p';

// Carousel settings
$carousel_per_column     = isset( $attributes['carouselPerColumn'] ) ? $attributes['carouselPerColumn'] : array( 'Desktop' => 3, 'Tablet' => 2, 'Mobile' => 1 );
$carousel_per_column_gap = isset( $attributes['carouselPerColumnGap'] ) ? $attributes['carouselPerColumnGap'] : array( 'Desktop' => 10, 'Tablet' => 10, 'Mobile' => 10 );
$speed                   = isset( $attributes['speed'] ) ? $attributes['speed'] : array( 'Desktop' => 800, 'Tablet' => 800, 'Mobile' => 800 );
$autoplay                = ! empty( $attributes['autoplay'] );
$autoplay_delay          = isset( $attributes['autoplayDelay'] ) ? $attributes['autoplayDelay'] : array( 'Desktop' => 1000, 'Tablet' => 1000, 'Mobile' => 1000 );
$infinite_loop           = isset( $attributes['infiniteLoop'] ) ? (bool) $attributes['infiniteLoop'] : true;
$allow_touch_move        = isset( $attributes['allowTouchMove'] ) ? (bool) $attributes['allowTouchMove'] : true;
$pause_on_hover          = ! empty( $attributes['pauseOnHover'] );
$stop_on_last_slide      = ! empty( $attributes['stopOnLastSlide'] );
$reverse_direction       = ! empty( $attributes['reverseDirection'] );
$carousel_effect         = isset( $attributes['carouselEffect'] ) ? sanitize_text_field( $attributes['carouselEffect'] ) : 'slide';
$mousewheel_control      = ! empty( $attributes['mousewheelControl'] );
$keyboard_navigation     = ! empty( $attributes['keyboardNavigation'] );
$pagination_type         = isset( $attributes['paginationType'] ) ? sanitize_text_field( $attributes['paginationType'] ) : 'bullets';
$dynamic_bullets         = ! empty( $attributes['dynamicBullets'] );

// Read More Button settings
$read_more_button_text        = ! empty( $attributes['readMoreButtonText'] ) ? sanitize_text_field( $attributes['readMoreButtonText'] ) : 'Read More';
$read_more_button_link_type   = isset( $attributes['readMoreButtonLinkType'] ) ? sanitize_text_field( $attributes['readMoreButtonLinkType'] ) : 'post';
$read_more_button_link        = isset( $attributes['readMoreButtonLink'] ) ? $attributes['readMoreButtonLink'] : '#';
$read_more_button_target_link = isset( $attributes['readMoreButtonTargetLink'] ) ? (bool) $attributes['readMoreButtonTargetLink'] : true;
$read_more_button_nofollow    = ! empty( $attributes['readMoreButtonNofollow'] );
$read_more_button_sponsored   = ! empty( $attributes['readMoreButtonSponsored'] );
$show_read_more_button        = isset( $attributes['showReadMoreButton'] ) ? $attributes['showReadMoreButton'] : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );
$read_more_button_icon_switcher = isset( $attributes['readMoreButtonIconSwitcher'] ) ? (bool) $attributes['readMoreButtonIconSwitcher'] : true;
$read_more_button_icon_type     = isset( $attributes['readMoreButtonIconType'] ) ? sanitize_text_field( $attributes['readMoreButtonIconType'] ) : 'icon';
$read_more_button_icon_position = isset( $attributes['readMoreButtonIconPosition'] ) ? sanitize_text_field( $attributes['readMoreButtonIconPosition'] ) : 'right';
$read_more_button_icon_html     = isset( $attributes['readMoreButtonIconHtml'] ) ? $attributes['readMoreButtonIconHtml'] : '';
$read_more_button_icon_img_url  = isset( $attributes['readMoreButtonIconImageUrl'] ) ? esc_url_raw( $attributes['readMoreButtonIconImageUrl'] ) : '';
$read_more_button_icon_img_alt  = isset( $attributes['readMoreButtonIconImageAlt'] ) ? sanitize_text_field( $attributes['readMoreButtonIconImageAlt'] ) : 'Right Arrow';

// Show/Hide Elements
$show_navigation     = isset( $attributes['showNavigation'] ) ? $attributes['showNavigation'] : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );
$show_pagination     = isset( $attributes['showPagination'] ) ? $attributes['showPagination'] : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );

// Navigation settings
$pagination_position_type     = isset( $attributes['paginationPositionType'] ) ? sanitize_text_field( $attributes['paginationPositionType'] ) : 'outside';
$navigation_arrow_position_type = isset( $attributes['navigationArrowPositionType'] ) ? sanitize_text_field( $attributes['navigationArrowPositionType'] ) : 'inside';
$navigation_arrow_position      = isset( $attributes['navigationArrowPosition'] ) ? sanitize_text_field( $attributes['navigationArrowPosition'] ) : 'center';

// Check if elements enabled
$any_navigation_enabled       = ! empty( $show_navigation['Desktop'] ) || ! empty( $show_navigation['Tablet'] ) || ! empty( $show_navigation['Mobile'] );
$any_pagination_enabled       = ! empty( $show_pagination['Desktop'] ) || ! empty( $show_pagination['Tablet'] ) || ! empty( $show_pagination['Mobile'] );
$any_read_more_button_enabled = ! empty( $show_read_more_button['Desktop'] ) || ! empty( $show_read_more_button['Tablet'] ) || ! empty( $show_read_more_button['Mobile'] );

// Content Order Normalization
$default_content_order = array( 'thumbnail', 'categories', 'title', 'excerpt', 'meta', 'readmore' );
$content_order         = isset( $attributes['contentOrder'] ) && is_array( $attributes['contentOrder'] ) ? $attributes['contentOrder'] : $default_content_order;
$content_order         = array_values( array_unique( array_intersect( $content_order, $default_content_order ) ) );
foreach ( $default_content_order as $key ) {
    if ( ! in_array( $key, $content_order, true ) ) {
        $content_order[] = $key;
    }
}

// Parse query attributes with defaults (Block-specific)
$post_type             = isset( $attributes['postType'] ) ? sanitize_text_field( $attributes['postType'] ) : 'post';
$posts_per_page        = 6;
if ( isset( $attributes['postsPerPage'] ) ) {
    if ( is_array( $attributes['postsPerPage'] ) ) {
        $posts_per_page = isset( $attributes['postsPerPage']['Desktop'] ) ? intval( $attributes['postsPerPage']['Desktop'] ) : 6;
    } else {
        $posts_per_page = intval( $attributes['postsPerPage'] );
    }
}
$categories            = isset( $attributes['categories'] ) ? array_map( 'intval', $attributes['categories'] ) : array();
$category_filter_type  = isset( $attributes['categoryFilterType'] ) ? sanitize_text_field( $attributes['categoryFilterType'] ) : 'include';
$tags                  = isset( $attributes['tags'] ) ? array_map( 'intval', $attributes['tags'] ) : array();
$tag_filter_type       = isset( $attributes['tagFilterType'] ) ? sanitize_text_field( $attributes['tagFilterType'] ) : 'include';
$authors               = isset( $attributes['authors'] ) ? array_map( 'intval', $attributes['authors'] ) : array();
$author_filter_type    = isset( $attributes['authorFilterType'] ) ? sanitize_text_field( $attributes['authorFilterType'] ) : 'include';
$exclude_posts         = isset( $attributes['excludePosts'] ) ? sanitize_text_field( $attributes['excludePosts'] ) : '';
$offset                = 0;
if ( isset( $attributes['offset'] ) ) {
    if ( is_array( $attributes['offset'] ) ) {
        $offset = isset( $attributes['offset']['Desktop'] ) ? intval( $attributes['offset']['Desktop'] ) : 0;
    } else {
        $offset = intval( $attributes['offset'] );
    }
}
$orderby               = isset( $attributes['orderBy'] ) ? sanitize_text_field( $attributes['orderBy'] ) : 'date';
$order                 = isset( $attributes['order'] ) ? sanitize_text_field( $attributes['order'] ) : 'desc';
$search_query          = isset( $attributes['searchQuery'] ) ? sanitize_text_field( $attributes['searchQuery'] ) : '';
$sticky_posts          = isset( $attributes['stickyPosts'] ) ? sanitize_text_field( $attributes['stickyPosts'] ) : 'include';
$taxonomy_query        = isset( $attributes['taxonomyQuery'] ) ? $attributes['taxonomyQuery'] : array();
$taxonomy_filter_types = isset( $attributes['taxonomyFilterTypes'] ) ? $attributes['taxonomyFilterTypes'] : array();
$meta_key              = isset( $attributes['metaKey'] ) ? sanitize_text_field( $attributes['metaKey'] ) : '';
$meta_value            = isset( $attributes['metaValue'] ) ? sanitize_text_field( $attributes['metaValue'] ) : '';
$meta_compare          = isset( $attributes['metaCompare'] ) ? sanitize_text_field( $attributes['metaCompare'] ) : '=';
$date_range            = isset( $attributes['dateRange'] ) ? sanitize_text_field( $attributes['dateRange'] ) : 'any';
$exclude_current_post  = ! empty( $attributes['excludeCurrentPost'] );

// Construct query arguments for WP_Query
$query_args = array(
    'post_type'      => $post_type,
    'posts_per_page' => $posts_per_page,
    'post_status'    => 'publish',
    'orderby'        => $orderby,
    'order'          => $order,
);

// Call Helper methods to compile dynamic options
$tax_query = \GSlider\Utils\Helper::build_tax_query( $categories, $category_filter_type, $tags, $tag_filter_type, $taxonomy_query, $taxonomy_filter_types );
if ( ! empty( $tax_query ) ) {
    $query_args['tax_query'] = $tax_query;
}

$author_query = \GSlider\Utils\Helper::build_author_query( $authors, $author_filter_type );
if ( ! empty( $author_query ) ) {
    $query_args = array_merge( $query_args, $author_query );
}

if ( $offset > 0 ) {
    $query_args['offset'] = $offset;
}

$excluded_ids = \GSlider\Utils\Helper::build_excluded_posts( $exclude_posts, $exclude_current_post );
if ( ! empty( $excluded_ids ) ) {
    $query_args['post__not_in'] = $excluded_ids;
}

if ( ! empty( $search_query ) ) {
    $query_args['s'] = $search_query;
}

$date_query = \GSlider\Utils\Helper::build_date_query( $date_range );
if ( ! empty( $date_query ) ) {
    $query_args['date_query'] = $date_query;
}

$meta_query = \GSlider\Utils\Helper::build_meta_query( $meta_key, $meta_value, $meta_compare );
if ( ! empty( $meta_query ) ) {
    $query_args['meta_query'] = $meta_query;
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

$posts_query = new WP_Query( $query_args );

if ( ! $posts_query->have_posts() ) {
    wp_reset_postdata();
    return;
}

// Build Swiper settings for frontend
$navigation_enabled_data = array(
    'Mobile'  => ! empty( $show_navigation['Mobile'] ),
    'Tablet'  => ! empty( $show_navigation['Tablet'] ),
    'Desktop' => ! empty( $show_navigation['Desktop'] ),
);

$pagination_enabled_data = array(
    'Mobile'  => ! empty( $show_pagination['Mobile'] ),
    'Tablet'  => ! empty( $show_pagination['Tablet'] ),
    'Desktop' => ! empty( $show_pagination['Desktop'] ),
);

$swiper_settings = array(
    'effect' => $carousel_effect,

    'breakpoints' => array(
        0    => array(
            'slidesPerView' => isset( $carousel_per_column['Mobile'] ) ? (int) $carousel_per_column['Mobile'] : 1,
            'spaceBetween'  => isset( $carousel_per_column_gap['Mobile'] ) ? (int) $carousel_per_column_gap['Mobile'] : 0,
            'speed'         => isset( $speed['Mobile'] ) ? (int) $speed['Mobile'] : 800,
            'autoplay'      => $autoplay ? array( 'delay' => isset( $autoplay_delay['Mobile'] ) ? (int) $autoplay_delay['Mobile'] : 1000 ) : false,
            'navigation'    => array( 'enabled' => $navigation_enabled_data['Mobile'] ),
            'pagination'    => array( 'enabled' => $pagination_enabled_data['Mobile'] ),
        ),
        768  => array(
            'slidesPerView' => isset( $carousel_per_column['Tablet'] ) ? (int) $carousel_per_column['Tablet'] : 2,
            'spaceBetween'  => isset( $carousel_per_column_gap['Tablet'] ) ? (int) $carousel_per_column_gap['Tablet'] : 20,
            'speed'         => isset( $speed['Tablet'] ) ? (int) $speed['Tablet'] : 800,
            'autoplay'      => $autoplay ? array( 'delay' => isset( $autoplay_delay['Tablet'] ) ? (int) $autoplay_delay['Tablet'] : 1000 ) : false,
            'navigation'    => array( 'enabled' => $navigation_enabled_data['Tablet'] ),
            'pagination'    => array( 'enabled' => $pagination_enabled_data['Tablet'] ),
        ),
        1025 => array(
            'slidesPerView' => isset( $carousel_per_column['Desktop'] ) ? (int) $carousel_per_column['Desktop'] : 3,
            'spaceBetween'  => isset( $carousel_per_column_gap['Desktop'] ) ? (int) $carousel_per_column_gap['Desktop'] : 20,
            'speed'         => isset( $speed['Desktop'] ) ? (int) $speed['Desktop'] : 800,
            'autoplay'      => $autoplay ? array( 'delay' => isset( $autoplay_delay['Desktop'] ) ? (int) $autoplay_delay['Desktop'] : 1000 ) : false,
            'navigation'    => array( 'enabled' => $navigation_enabled_data['Desktop'] ),
            'pagination'    => array( 'enabled' => $pagination_enabled_data['Desktop'] ),
        ),
    ),

    'loop'           => $infinite_loop,
    'autoplay'       => $autoplay ? array(
        'pauseOnMouseEnter'    => $pause_on_hover,
        'disableOnInteraction' => false,
        'stopOnLastSlide'      => $stop_on_last_slide,
        'reverseDirection'     => $reverse_direction,
    ) : false,
    'allowTouchMove'  => $allow_touch_move,
    'mousewheel'      => $mousewheel_control,
    'keyboard'        => $keyboard_navigation ? array(
        'enabled'        => true,
        'onlyInViewport' => true,
        'pageUpDown'     => false,
    ) : false,

    'navigation' => array(
        'enabled' => $any_navigation_enabled,
        'nextEl'  => '.swiper-button-next',
        'prevEl'  => '.swiper-button-prev',
    ),

    'pagination' => array(
        'enabled'        => $any_pagination_enabled,
        'el'             => '.' . $block_id . ' .swiper-pagination-post-carousel',
        'type'           => $pagination_type,
        'dynamicBullets' => 'bullets' === $pagination_type ? $dynamic_bullets : false,
        'clickable'      => true,
    ),
);

$swiper_settings_json = wp_json_encode( $swiper_settings );

// Wrapper classes
$wrapper_classes = array(
    'gslider-post-carousel-wrapper',
    $block_id,
    $navigation_arrow_position_type,
    $navigation_arrow_position,
);

if ( $any_pagination_enabled ) {
    $wrapper_classes[] = 'has-pagination';
}

$wrapper_attributes = get_block_wrapper_attributes(
    array(
        'class'                => implode( ' ', array_filter( $wrapper_classes ) ),
        'data-swiper-settings' => $swiper_settings_json,
    )
);

?>
<div <?php echo $wrapper_attributes; ?>>
    <div class="swiper" role="region" aria-label="<?php esc_attr_e( 'Post Carousel', 'gslider-blocks' ); ?>">
        <div class="swiper-wrapper">
            <?php
            while ( $posts_query->have_posts() ) :
                $posts_query->the_post();
                $post_id    = get_the_ID();
                $categories = get_the_category( $post_id );
                $excerpt    = wp_trim_words( get_the_excerpt(), 20, '...' );
                ?>
                <div class="swiper-slide">
                    <div class="gslider-post-carousel-content-wrapper <?php echo esc_attr( $global_class ); ?>"<?php echo $global_id ? ' id="' . esc_attr( $global_id ) . '"' : ''; ?>>
                        <article class="gslider-post-carousel-card">
                            <?php
                            foreach ( $content_order as $element ) {
                                switch ( $element ) {
                                    case 'thumbnail':
                                        if ( has_post_thumbnail( $post_id ) ) :
                                            ?>
                                            <div class="gslider-post-carousel-image">
                                                <a href="<?php the_permalink(); ?>" aria-label="<?php the_title_attribute(); ?>">
                                                    <?php
                                                    the_post_thumbnail(
                                                        'medium_large',
                                                        array(
                                                            'loading' => $enable_lazy_load ? 'lazy' : 'eager',
                                                            'alt'     => get_the_title(),
                                                        )
                                                    );
                                                    ?>
                                                </a>
                                            </div>
                                            <?php
                                        endif;
                                        break;

                                    case 'categories':
                                        if ( ! empty( $categories ) ) :
                                            ?>
                                            <div class="gslider-post-carousel-categories">
                                                <?php foreach ( $categories as $cat ) : ?>
                                                    <span><a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>"><?php echo esc_html( $cat->name ); ?></a></span>
                                                <?php endforeach; ?>
                                            </div>
                                            <?php
                                        endif;
                                        break;

                                    case 'title':
                                        ?>
                                        <div class="gslider-post-carousel-title-wrapper">
                                            <<?php echo esc_attr( $post_title_html_tag ); ?> class="gslider-post-carousel-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></<?php echo esc_attr( $post_title_html_tag ); ?>>
                                        </div>
                                        <?php
                                        break;

                                    case 'excerpt':
                                        if ( $excerpt ) :
                                            ?>
                                            <div class="gslider-post-carousel-excerpt-wrapper">
                                                <<?php echo esc_attr( $post_excerpt_html_tag ); ?> class="gslider-post-carousel-excerpt"><?php echo esc_html( $excerpt ); ?></<?php echo esc_attr( $post_excerpt_html_tag ); ?>>
                                            </div>
                                            <?php
                                        endif;
                                        break;

                                    case 'meta':
                                        ?>
                                        <div class="gslider-post-carousel-meta">
                                            <span class="gslider-post-author">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                                <?php the_author(); ?>
                                            </span>
                                            <span class="gslider-post-date">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                                <?php echo get_the_date(); ?>
                                            </span>
                                        </div>
                                        <?php
                                        break;

                                    case 'readmore':
                                        if ( ! $any_read_more_button_enabled ) {
                                            break;
                                        }
                                        $read_more_url = ( 'custom' === $read_more_button_link_type ) ? $read_more_button_link : get_permalink( $post_id );
                                        $rel_items = array();
                                        if ( $read_more_button_target_link ) {
                                            $rel_items[] = 'noopener';
                                            $rel_items[] = 'noreferrer';
                                        }
                                        if ( $read_more_button_nofollow ) {
                                            $rel_items[] = 'nofollow';
                                        }
                                        if ( $read_more_button_sponsored ) {
                                            $rel_items[] = 'sponsored';
                                        }
                                        $rel_attr = ! empty( $rel_items ) ? ' rel="' . esc_attr( implode( ' ', $rel_items ) ) . '"' : '';
                                        $target_attr = $read_more_button_target_link ? ' target="_blank"' : '';

                                        // Build icon HTML markup
                                        $icon_markup = '';
                                        if ( $read_more_button_icon_switcher ) {
                                            if ( 'icon' === $read_more_button_icon_type && ! empty( $read_more_button_icon_html ) ) {
                                                // SVG icon saved as HTML
                                                $icon_markup = '<span class="gslider-readmore-icon-wrap">' . $read_more_button_icon_html . '</span>';
                                            } elseif ( 'image' === $read_more_button_icon_type && ! empty( $read_more_button_icon_img_url ) ) {
                                                // Custom Image icon
                                                $icon_markup = '<span class="gslider-readmore-icon-wrap"><img src="' . esc_url( $read_more_button_icon_img_url ) . '" alt="' . esc_attr( $read_more_button_icon_img_alt ) . '" /></span>';
                                            }
                                        }
                                        ?>
                                        <div class="gslider-post-carousel-readmore">
                                            <a class="gslider-post-carousel-readmore-btn" href="<?php echo esc_url( $read_more_url ); ?>"<?php echo $target_attr; ?><?php echo $rel_attr; ?>>
                                                <?php if ( $read_more_button_icon_switcher && 'left' === $read_more_button_icon_position ) {
                                                    echo $icon_markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                                                } ?>
                                                <span class="gslider-readmore-text"><?php echo esc_html( $read_more_button_text ); ?></span>
                                                <?php if ( $read_more_button_icon_switcher && 'right' === $read_more_button_icon_position ) {
                                                    echo $icon_markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                                                } ?>
                                            </a>
                                        </div>
                                        <?php
                                        break;
                                }
                            }
                            ?>
                        </article>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>

        <?php if ( $any_navigation_enabled && 'inside' === $navigation_arrow_position_type ) : ?>
            <div class="gslider-navigation-default-icon-wrapper <?php echo esc_attr( $navigation_arrow_position_type . ' ' . $navigation_arrow_position ); ?>">
                <div class="swiper-button-prev" role="button" tabindex="0" aria-label="<?php esc_attr_e( 'Previous slide', 'gslider-blocks' ); ?>"></div>
                <div class="swiper-button-next" role="button" tabindex="0" aria-label="<?php esc_attr_e( 'Next slide', 'gslider-blocks' ); ?>"></div>
            </div>
        <?php endif; ?>

        <?php if ( $any_pagination_enabled && 'inside' === $pagination_position_type ) : ?>
            <div class="swiper-pagination swiper-pagination-post-carousel" aria-label="<?php esc_attr_e( 'Carousel pagination', 'gslider-blocks' ); ?>"></div>
        <?php endif; ?>
    </div>

    <?php if ( $any_navigation_enabled && 'outside' === $navigation_arrow_position_type ) : ?>
        <div class="gslider-navigation-default-icon-wrapper <?php echo esc_attr( $navigation_arrow_position_type . ' ' . $navigation_arrow_position ); ?>">
            <div class="swiper-button-prev" role="button" tabindex="0" aria-label="<?php esc_attr_e( 'Previous slide', 'gslider-blocks' ); ?>"></div>
            <div class="swiper-button-next" role="button" tabindex="0" aria-label="<?php esc_attr_e( 'Next slide', 'gslider-blocks' ); ?>"></div>
        </div>
    <?php endif; ?>

    <?php if ( $any_pagination_enabled && 'outside' === $pagination_position_type ) : ?>
        <div class="swiper-pagination swiper-pagination-post-carousel swiper-pagination-<?php echo esc_attr( $block_id ); ?>" aria-label="<?php esc_attr_e( 'Carousel pagination', 'gslider-blocks' ); ?>"></div>
    <?php endif; ?>
</div>
<?php
wp_reset_postdata();
