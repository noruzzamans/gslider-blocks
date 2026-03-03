<?php
/**
 * Main plugin bootstrap file for GSlider Blocks.
 *
 * Initializes all plugin services including assets, blocks,
 * fonts, styles, SVG support, and text domain loading.
 *
 * @package GSlider
 * @since   1.0.0
 */

namespace GSlider;

use GSlider\Traits\SingletonTrait;
use GSlider\Core\StyleGenerator;
use GSlider\Assets\FrontendAssets;
use GSlider\Assets\AdminAssets;
use GSlider\Core\RegistrationBlocks;
use GSlider\Core\RegistrationCategory;
use GSlider\Core\FontLoader;
use GSlider\Core\SupportSVG;
use GSlider\Utils\Utils;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Plugin' ) ) {

	/**
	 * Main plugin class for GSlider Blocks.
	 *
	 * Acts as the central bootstrap, initializing all plugin
	 * components on the plugins_loaded hook and loading
	 * the text domain for translations.
	 *
	 * @since 1.0.0
	 */
	class Plugin {

		use SingletonTrait;

		/**
		 * Service classes to register on all requests.
		 *
		 * @since 1.1.7
		 *
		 * @var string[]
		 */
		private $services = [
			StyleGenerator::class,
			FrontendAssets::class,
			AdminAssets::class,
			RegistrationBlocks::class,
			RegistrationCategory::class,
			FontLoader::class,
			Utils::class,
		];

		/**
		 * Service classes to register on admin requests only.
		 *
		 * @since 1.1.7
		 *
		 * @var string[]
		 */
		private $admin_services = [
			SupportSVG::class,
		];

		/**
		 * Sets up core plugin hooks.
		 *
		 * Registers the plugins_loaded and init actions
		 * for component initialization and text domain loading.
		 *
		 * @since 1.0.0
		 */
		private function __construct() {
			add_action( 'plugins_loaded', [ $this, 'plugins_loaded' ] );
			add_action( 'init', [ $this, 'gslider_load_textdomain' ] );
		}

		/**
		 * Initializes all plugin components.
		 *
		 * Registers all service classes by calling their register()
		 * method. Admin-only services are loaded conditionally.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function plugins_loaded() {
			foreach ( $this->services as $service ) {
				$service::getInstance()->register();
			}

			if ( is_admin() ) {
				foreach ( $this->admin_services as $service ) {
					$service::getInstance()->register();
				}
			}
		}

		/**
		 * Loads the plugin text domain for translations.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function gslider_load_textdomain() {
			load_plugin_textdomain( 'gslider-blocks', false, basename( GSLIDER_DIR_PATH ) . '/languages' );
		}
	}

}

Plugin::getInstance();
