import { useEffect } from '@wordpress/element';

/**
 * Custom hook to handle duplicate block detection and ID regeneration.
 *
 * When a block is duplicated, it keeps the original blockId. This hook gives
 * the copy a new id on the next effect, before another attribute changes.
 * 
 * @param {Object} params
 * @param {string} params.clientId - Block's unique client ID
 * @param {string} params.blockId - Current block ID attribute
 * @param {string} params.blockPrefix - Prefix for the block ID (e.g., 'fb-testimonial')
 * @param {boolean} params.isSelected - Whether the block is currently selected
 * @param {Object} params.attributes - All block attributes
 * @param {Function} params.setAttributes - Function to update attributes
 * @param {string[]} [params.excludeKeys] - Additional keys to exclude from change detection
 */
const useBlockIdGenerator = ({
    clientId,
    blockId,
    blockPrefix,
    isSelected,
    attributes,
    setAttributes,
    excludeKeys = [],
}) => {
    useEffect(() => {
        if (!clientId || typeof clientId !== 'string') {
            return;
        }

        const expectedIdPrefix = `${blockPrefix}-${clientId.slice(0, 8)}`;
        if (blockId === expectedIdPrefix) {
            return;
        }

        setAttributes({
            blockId: expectedIdPrefix,
        });
    }, [clientId, blockId, blockPrefix, isSelected, attributes, setAttributes, excludeKeys]);
};

export default useBlockIdGenerator;
