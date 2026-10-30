import React from 'react';
import { __ } from '@wordpress/i18n';
import { ToggleControl, BaseControl } from '@wordpress/components';
import ResponsiveDeviceControl from '@Components/responsive-device-control';

const ResponsiveToggleControl = ( {
	label = '',
	toggleValue,
	setToggleValue,
	deviceType,
	setAttributes,
	className = '',
} ) => {
	const handleToggleChange = ( newVal ) => {
		let updatedValue = toggleValue ? { ...toggleValue } : {};

		if ( deviceType === 'Desktop' ) {
			updatedValue = {
				Desktop: newVal,
				Tablet: newVal,
				Mobile: newVal,
			};
		} else if ( deviceType === 'Tablet' ) {
			updatedValue = {
				...updatedValue,
				Tablet: newVal,
				Mobile: newVal,
			};
		} else {
			updatedValue = {
				...updatedValue,
				Mobile: newVal,
			};
		}

		setToggleValue( updatedValue );
	};

	return (
		<BaseControl
			className={ `gslider-responsive-toggle-control-wrapper ${ className }` }
		>
			<ToggleControl
				checked={ toggleValue?.[ deviceType ] ?? false }
				onChange={ handleToggleChange }
				className="gslider-responsive-toggle-control"
			/>
			<ResponsiveDeviceControl label={ label } device={ deviceType } />
		</BaseControl>
	);
};

export default ResponsiveToggleControl;
