/**
 * Shared value checks for the generator and the validator.
 *
 * A generated block is pasted into a post as it is, so a value that escapes the
 * declaration it belongs to, or a URL with a script scheme, reaches the page
 * without the editor ever seeing it. Both tools run these checks so the two
 * cannot drift.
 */
export declare const DEVICE_KEYS: readonly ['Desktop', 'Tablet', 'Mobile'];
/**
 * Returns why a URL value is refused, or null where it is safe.
 * @param value
 */
export declare function urlFault(value: string): string | null;
/**
 * Returns why a colour value is refused, or null where it is safe.
 *
 * Everything a declaration's value may hold is accepted; what no value may
 * hold is the punctuation that ends the declaration or the rule.
 * @param value
 */
export declare function colorFault(value: string): string | null;
/**
 * Returns the faults of one per-device object, each naming its key.
 * @param key
 * @param value
 * @param scalarType
 * @param allowed
 */
export declare function deviceObjectFaults(key: string, value: Record<string, unknown>, scalarType: string | undefined, allowed: string[] | undefined): string[];
/**
 * Returns the faults of a block's generated CSS where a top-level rule escapes
 * the block's own scope.
 * @param blockStyle
 * @param blockId
 */
export declare function styleScopeFaults(blockStyle: string, blockId: string): string[];
/**
 * Returns whether a value has the declared attribute type.
 * @param type
 * @param value
 */
export declare function matchesType(type: string, value: unknown): boolean;
/**
 * Returns the faults of every URL field and colour field in one attribute map.
 * @param attributes
 * @param slideFields
 */
export declare function attributeValueFaults(attributes: Record<string, unknown>, slideFields?: string[]): string[];
//# sourceMappingURL=attribute-checks.d.ts.map