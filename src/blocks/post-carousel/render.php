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
$block_id         = isset( $attributes['blockId'] ) ? sanitize_html_class( $attributes['blockId'] ) : '';
$global_id        = isset( $attributes['globalID'] ) ? sanitize_html_class( $attributes['globalID'] ) : '';
$global_class     = isset( $attributes['globalClass'] ) ? sanitize_html_class( $attributes['globalClass'] ) : '';
$enable_lazy_load = ! empty( $attributes['enableLazyLoad'] );

// Carousel settings
$carousel_per_column     = isset( $attributes['carouselPerColumn'] ) ? $attributes['carouselPerColumn'] : array( 'Desktop' => 3, 'Tablet' => 2, 'Mobile' => 1 );
$carousel_per_column_gap = isset( $attributes['carouselPerColumnGap'] ) ? $attributes['carouselPerColumnGap'] : array( 'Desktop' => 20, 'Tablet' => 15, 'Mobile' => 10 );
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

// Show/Hide Elements
$show_navigation     = isset( $attributes['showNavigation'] ) ? $attributes['showNavigation'] : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );
$show_pagination     = isset( $attributes['showPagination'] ) ? $attributes['showPagination'] : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );

// Navigation settings
$pagination_position_type     = isset( $attributes['paginationPositionType'] ) ? sanitize_text_field( $attributes['paginationPositionType'] ) : 'outside';
$navigation_arrow_position_type = isset( $attributes['navigationArrowPositionType'] ) ? sanitize_text_field( $attributes['navigationArrowPositionType'] ) : 'inside';
$navigation_arrow_position      = isset( $attributes['navigationArrowPosition'] ) ? sanitize_text_field( $attributes['navigationArrowPosition'] ) : 'center';

// Check if elements enabled
$any_navigation_enabled     = ! empty( $show_navigation['Desktop'] ) || ! empty( $show_navigation['Tablet'] ) || ! empty( $show_navigation['Mobile'] );
$any_pagination_enabled     = ! empty( $show_pagination['Desktop'] ) || ! empty( $show_pagination['Tablet'] ) || ! empty( $show_pagination['Mobile'] );

// Content Order Normalization
$default_content_order = array( 'thumbnail', 'categories', 'title', 'excerpt', 'meta', 'readmore' );
$content_order         = isset( $attributes['contentOrder'] ) && is_array( $attributes['contentOrder'] ) ? $attributes['contentOrder'] : $default_content_order;
$content_order         = array_values( array_unique( array_intersect( $content_order, $default_content_order ) ) );
foreach ( $default_content_order as $key ) {
    if ( ! in_array( $key, $content_order, true ) ) {
        $content_order[] = $key;
    }
}

// Query posts
$query_args = array(
    'post_type'      => 'post',
    'posts_per_page' => 6,
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'DESC',
);

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
                        <div class="gslider-post-carousel-card">
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
                                        <div class="gslider-post-carousel-title">
                                            <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                                        </div>
                                        <?php
                                        break;

                                    case 'excerpt':
                                        if ( $excerpt ) :
                                            ?>
                                            <div class="gslider-post-carousel-excerpt">
                                                <p><?php echo esc_html( $excerpt ); ?></p>
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
                                        ?>
                                        <div class="gslider-post-carousel-readmore">
                                            <a href="<?php the_permalink(); ?>"><?php esc_html_e( 'Read More', 'gslider-blocks' ); ?> →</a>
                                        </div>
                                        <?php
                                        break;
                                }
                            }
                            ?>
                        </div>
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
