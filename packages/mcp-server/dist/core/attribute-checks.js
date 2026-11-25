/**
 * Shared value checks for the generator and the validator.
 *
 * A generated block is pasted into a post as it is, so a value that escapes the
 * declaration it belongs to, or a URL with a script scheme, reaches the page
 * without the editor ever seeing it. Both tools run these checks so the two
 * cannot drift.
 */
export const DEVICE_KEYS = ['Desktop', 'Tablet', 'Mobile'];
const SAFE_URL = /^(?:https?:|mailto:|tel:|#|\/|\.\/|\.\.\/)/i;
const URL_FIELDS = [
    'buttonUrl',
    'secondaryButtonUrl',
    'primaryButtonLink',
    'secondaryButtonLink',
    'link',
    'url',
    'backgroundImageUrl',
    'authorImageUrl',
    'videoExternalUrl',
];
/**
 * Returns why a URL value is refused, or null where it is safe.
 * @param value
 */
export function urlFault(value) {
    const trimmed = value.trim();
    if (trimmed === '') {
        return null;
    }
    if (!SAFE_URL.test(trimmed)) {
        return 'must be an http(s), mailto:, tel:, hash or relative URL';
    }
    return null;
}
/**
 * Returns why a colour value is refused, or null where it is safe.
 *
 * Everything a declaration's value may hold is accepted; what no value may
 * hold is the punctuation that ends the declaration or the rule.
 * @param value
 */
export function colorFault(value) {
    if (/[;{}<>`\\]|\/\*/.test(value)) {
        return 'must not contain a declaration or rule terminator';
    }
    return null;
}
/**
 * Returns the faults of one per-device object, each naming its key.
 * @param key
 * @param value
 * @param scalarType
 * @param allowed
 */
export function deviceObjectFaults(key, value, scalarType, allowed) {
    const faults = [];
    for (const [device, entry] of Object.entries(value)) {
        if (!DEVICE_KEYS.includes(device)) {
            faults.push(`Attribute "${key}.${device}" is not one of ${DEVICE_KEYS.join(', ')}.`);
            continue;
        }
        if (scalarType && !matchesType(scalarType, entry)) {
            // A number written as text and the number itself are the same
            // quantity, and several attributes accept both
            const numeric = (scalarType === 'number' && typeof entry === 'string') ||
                (scalarType === 'string' && typeof entry === 'number');
            if (!numeric) {
                faults.push(`Attribute "${key}.${device}" must be a ${scalarType}.`);
                continue;
            }
        }
        if (Array.isArray(allowed) &&
            typeof entry === 'string' &&
            entry !== '' &&
            !allowed.includes(entry)) {
            faults.push(`Attribute "${key}.${device}" must be one of: ${allowed.join(', ')}.`);
        }
    }
    return faults;
}
/**
 * Returns the faults of a block's generated CSS where a top-level rule escapes
 * the block's own scope.
 * @param blockStyle
 * @param blockId
 */
export function styleScopeFaults(blockStyle, blockId) {
    const faults = [];
    const selectorPattern = /([^{}]+)\{/g;
    let match = selectorPattern.exec(blockStyle);
    while (match) {
        const selector = match[1].trim();
        if (selector.startsWith('@') || selector === '') {
            match = selectorPattern.exec(blockStyle);
            continue;
        }
        for (const part of selector.split(',')) {
            const current = part.trim();
            if (!current.includes(`.${blockId}`)) {
                faults.push(`blockStyle holds a rule outside .${blockId}: ${current.slice(0, 60)}`);
            }
        }
        match = selectorPattern.exec(blockStyle);
    }
    return faults;
}
/**
 * Returns whether a value has the declared attribute type.
 * @param type
 * @param value
 */
export function matchesType(type, value) {
    if (type === 'number') {
        return typeof value === 'number' && Number.isFinite(value);
    }
    if (type === 'boolean') {
        return typeof value === 'boolean';
    }
    if (type === 'string') {
        return typeof value === 'string';
    }
    if (type === 'array') {
        return Array.isArray(value);
    }
    if (type === 'object') {
        return value !== null && typeof value === 'object';
    }
    return true;
}
/**
 * Returns the faults of every URL field and colour field in one attribute map.
 * @param attributes
 * @param slideFields
 */
export function attributeValueFaults(attributes, slideFields = []) {
    const faults = [];
    const checkUrlField = (key, value) => {
        if (typeof value !== 'string') {
            return;
        }
        const fault = urlFault(value);
        if (fault) {
            faults.push(`Attribute "${key}" ${fault}.`);
        }
    };
    for (const [key, value] of Object.entries(attributes)) {
        if (URL_FIELDS.includes(key)) {
            checkUrlField(key, value);
        }
        if (/Color$/.test(key) && typeof value === 'string') {
            const fault = colorFault(value);
            if (fault) {
                faults.push(`Attribute "${key}" ${fault}.`);
            }
        }
        if (slideFields.includes(key) && Array.isArray(value)) {
            value.forEach((item, index) => {
                if (!item || typeof item !== 'object') {
                    return;
                }
                for (const [itemKey, itemValue] of Object.entries(item)) {
                    if (URL_FIELDS.includes(itemKey)) {
                        checkUrlField(`${key}[${index}].${itemKey}`, itemValue);
                    }
                    if (/Color$/.test(itemKey) &&
                        typeof itemValue === 'string') {
                        const fault = colorFault(itemValue);
                        if (fault) {
                            faults.push(`Attribute "${key}[${index}].${itemKey}" ${fault}.`);
                        }
                    }
                }
            });
        }
    }
    return faults;
}
//# sourceMappingURL=attribute-checks.js.map