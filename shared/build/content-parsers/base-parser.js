/**
 * Base interface for content parsers
 */
export class BaseContentParser {
    supportedTypes;
    constructor(supportedTypes) {
        this.supportedTypes = supportedTypes;
    }
    canParse(contentType) {
        return this.supportedTypes.some((type) => contentType.toLowerCase().includes(type.toLowerCase()));
    }
}
