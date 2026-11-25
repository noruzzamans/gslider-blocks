import { z } from 'zod';
import { BLOCK_ID_PREFIX } from '../core/registry.js';
import { attributeDefaults, prepareBlock, } from '../core/block-runtime.js';
import { blockNameFromMarkup, commentAttributes } from '../core/markup.js';
import { colorFault, deviceObjectFaults, styleScopeFaults, urlFault, } from '../core/attribute-checks.js';
import { validationIssues } from '../core/block-runtime.js';
import { GENERATABLE_SLUGS } from './generate-block.js';
const validateInputZod = z
    .object({
    markup: z.string().optional(),
    blockSlug: z.enum(GENERATABLE_SLUGS).optional(),
    attributes: z.record(z.string(), z.unknown()).optional(),
})
    .strict();
export const validateBlockToolDefinition = {
    name: 'gslider_validate_block',
    description: 'Checks GSlider markup or attributes. Reports unknown keys, wrong types, disallowed effects, a bad blockId, and whether the markup passes validateBlock. A blockStyle that the editor would rewrite is a warning.',
    inputSchema: {
        type: 'object',
        properties: {
            markup: {
                type: 'string',
                description: 'A block comment to parse and validate. Use this or blockSlug plus attributes.',
            },
            blockSlug: {
                type: 'string',
                enum: GENERATABLE_SLUGS,
                description: 'Block slug, required when markup is omitted.',
            },
            attributes: {
                type: 'object',
                description: 'Attribute object to check, required when markup is omitted.',
            },
        },
    },
};
function typeMatches(type, value) {
    if (type === 'array') {
        return Array.isArray(value);
    }
    if (type === 'object') {
        return (value !== null &&
            typeof value === 'object' &&
            !Array.isArray(value));
    }
    if (type === 'boolean') {
        return typeof value === 'boolean';
    }
    if (type === 'string') {
        return typeof value === 'string';
    }
    if (type === 'number') {
        return typeof value === 'number' && Number.isFinite(value);
    }
    return true;
}
function checkAttributes(slug, raw) {
    const schema = prepareBlock(slug).schema;
    const errors = [];
    const carouselOnly = slug === 'image-slider' ||
        slug === 'logo-carousel' ||
        slug === 'post-carousel';
    for (const [key, value] of Object.entries(raw)) {
        const definition = schema.attributes[key];
        if (!definition) {
            errors.push(`Unknown attribute "${key}".`);
            continue;
        }
        if (!typeMatches(definition.type, value)) {
            errors.push(`Attribute "${key}" must be a ${definition.type}.`);
        }
        // A slide array carries objects, and an unknown key there reaches the
        // saved content without ever being named
        if (key === schema.slideField && Array.isArray(value)) {
            const itemSchema = schema.slideItemSchema ?? {};
            const itemKeys = Object.keys(itemSchema.properties ?? {});
            value.forEach((item, index) => {
                if (!item || typeof item !== 'object') {
                    return;
                }
                for (const itemKey of Object.keys(item)) {
                    if (!itemKeys.includes(itemKey)) {
                        errors.push(`Attribute "${key}[${index}]" has unknown key "${itemKey}".`);
                    }
                }
            });
        }
        const allowed = schema.allowedValues?.[key];
        if (definition.type === 'object' &&
            value &&
            typeof value === 'object') {
            const defaultKeys = Object.keys((definition.default ?? {}));
            const perDevice = ['Desktop', 'Tablet', 'Mobile'].every((device) => defaultKeys.includes(device));
            if (perDevice) {
                errors.push(...deviceObjectFaults(key, value, typeof definition.default.Desktop, allowed));
            }
        }
        if (typeof value === 'string' && /Color$/.test(key)) {
            const fault = colorFault(value);
            if (fault) {
                errors.push(`Attribute "${key}" ${fault}.`);
            }
        }
        if (typeof value === 'string' &&
            [
                'buttonUrl',
                'secondaryButtonUrl',
                'backgroundImageUrl',
                'authorImageUrl',
            ].includes(key)) {
            const fault = urlFault(value);
            if (fault) {
                errors.push(`Attribute "${key}" ${fault}.`);
            }
        }
        if (Array.isArray(allowed) &&
            typeof value === 'string' &&
            !allowed.includes(value)) {
            errors.push(`Attribute "${key}" must be one of: ${allowed.join(', ')}.`);
        }
    }
    for (const effectKey of ['slideEffect', 'carouselEffect']) {
        const value = raw[effectKey];
        if (typeof value !== 'string') {
            continue;
        }
        const allowed = schema.allowedEffects[effectKey] ?? [];
        if (!allowed.includes(value)) {
            errors.push(`Effect "${value}" is not allowed for ${schema.name} (${effectKey}). Allowed: ${allowed.join(', ')}.`);
        }
    }
    let sliderType = carouselOnly ? 'carousel' : 'slider';
    if (typeof raw.sliderType === 'string') {
        sliderType = raw.sliderType;
    }
    const activeKey = sliderType === 'carousel' ? 'carouselEffect' : 'slideEffect';
    if (raw[activeKey] !== undefined &&
        typeof raw[activeKey] !== 'string') {
        errors.push(`${activeKey} must be a string.`);
    }
    const prefix = BLOCK_ID_PREFIX[slug];
    const blockId = raw.blockId;
    if (typeof blockId !== 'string' ||
        !new RegExp(`^${prefix}-[a-z0-9]{8}$`).test(blockId)) {
        errors.push(`blockId must be ${prefix}- followed by 8 characters.`);
    }
    return errors;
}
function styleWarning(slug, raw) {
    const { bundled } = prepareBlock(slug);
    const recomputed = bundled.styling({
        ...attributeDefaults(bundled.attributes),
        ...raw,
    });
    if (raw.blockStyle !== recomputed) {
        return 'blockStyle differs from what the editor would write, so opening the block rewrites it.';
    }
    return null;
}
/**
 * Returns the faults of one flexi-content-item's attributes.
 *
 * Only the attributes the item declares are read: the parsed block also
 * carries core attributes such as `className`, which are not the schema's.
 * @param raw
 */
function checkItemAttributes(raw) {
    const schema = prepareBlock('flexi-content-item').schema;
    const known = {};
    for (const [key, value] of Object.entries(raw)) {
        if (schema.attributes[key]) {
            known[key] = value;
        }
    }
    return checkAttributes('flexi-content-item', known);
}
/**
 * The core blocks the generator writes inside a slide.
 */
const SLIDE_CONTENT_BLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/image',
    'core/buttons',
    'core/button',
];
/**
 * Returns the faults of a flexi-content slide tree, each with its path.
 *
 * Only `flexi-content-item` may sit directly under `flexi-content`, each
 * slide's own attributes are checked as its child block is, and a slide holds
 * only the core blocks the generator writes.
 * @param block
 * @param path
 */
function innerBlockErrors(block, path = 'block') {
    const current = block;
    const errors = [];
    for (const [index, child] of (current.innerBlocks ?? []).entries()) {
        const childPath = `${path}.innerBlocks[${index}]`;
        const item = child;
        if (item.name !== 'gslider-blocks/flexi-content-item') {
            errors.push(`${childPath}: only gslider-blocks/flexi-content-item may be a slide of flexi-content.`);
            continue;
        }
        errors.push(...checkItemAttributes(item.attributes ?? {}).map((error) => `${childPath}: ${error}`));
        for (const [inner, content] of (item.innerBlocks ?? []).entries()) {
            const contentPath = `${childPath}.innerBlocks[${inner}]`;
            const name = content.name ?? '';
            if (!SLIDE_CONTENT_BLOCKS.includes(name)) {
                errors.push(`${contentPath}: ${name} is not one of the blocks a slide holds (${SLIDE_CONTENT_BLOCKS.join(', ')}).`);
            }
        }
    }
    return errors;
}
function validate(input) {
    if (input.markup && (input.blockSlug || input.attributes)) {
        throw new Error('Pass markup, or blockSlug with attributes, not both.');
    }
    if (input.markup) {
        const name = blockNameFromMarkup(input.markup);
        const slug = name?.startsWith('gslider-blocks/')
            ? name.slice('gslider-blocks/'.length)
            : '';
        if (!GENERATABLE_SLUGS.includes(slug)) {
            throw new Error(`markup must be one of: ${GENERATABLE_SLUGS.map((item) => `gslider-blocks/${item}`).join(', ')}.`);
        }
        const blockSlug = slug;
        const { blocks } = prepareBlock(blockSlug);
        // A comment without JSON is a block whose attributes are all defaults
        const raw = commentAttributes(input.markup) ?? {};
        const errors = checkAttributes(blockSlug, raw);
        const parsed = blocks.parse(input.markup)[0];
        const issues = parsed
            ? validationIssues(blocks, parsed)
            : ['nothing parsed'];
        if (issues.length > 0) {
            errors.push('Block markup does not match the block save output.', ...issues.map((issue) => String(issue)));
        }
        if (blockSlug === 'flexi-content') {
            errors.push(...innerBlockErrors(parsed));
        }
        const warning = styleWarning(blockSlug, raw);
        return {
            isValid: errors.length === 0,
            errors,
            warnings: warning ? [warning] : [],
            validationLog: issues,
        };
    }
    if (!input.blockSlug || !input.attributes) {
        throw new Error('Pass markup, or blockSlug with attributes.');
    }
    const errors = checkAttributes(input.blockSlug, input.attributes);
    if (typeof input.attributes.blockStyle === 'string' &&
        typeof input.attributes.blockId === 'string') {
        errors.push(...styleScopeFaults(input.attributes.blockStyle, input.attributes.blockId));
    }
    const warning = styleWarning(input.blockSlug, input.attributes);
    return {
        isValid: errors.length === 0,
        errors,
        warnings: warning ? [warning] : [],
    };
}
export async function handleValidateBlock(args) {
    const parsed = validateInputZod.safeParse(args);
    if (!parsed.success) {
        const message = parsed.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join(', ');
        return {
            isError: true,
            content: [
                {
                    type: 'text',
                    text: `Invalid arguments for gslider_validate_block: ${message}`,
                },
            ],
        };
    }
    try {
        const report = validate(parsed.data);
        return {
            isError: !report.isValid,
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(report, null, 2),
                },
            ],
        };
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
            isError: true,
            content: [{ type: 'text', text: message }],
        };
    }
}
//# sourceMappingURL=validate-block.js.map