<?php
/**
 * Registrable interface for GSlider Blocks.
 *
 * Defines a contract for classes that register
 * WordPress hooks, actions, and filters.
 *
 * @package GSlider\Interfaces
 * @since   1.1.7
 */

namespace GSlider\Interfaces;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Interface for service classes that register WordPress hooks.
 *
 * Any class implementing this interface must provide a register()
 * method that sets up its WordPress hooks and filters.
 *
 * @since 1.1.7
 */
interface Registrable {

	/**
	 * Register WordPress hooks, actions, and filters.
	 *
	 * @since 1.1.7
	 *
	 * @return void
	 */
	public function register(): void;
}
