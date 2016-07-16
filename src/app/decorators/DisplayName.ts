declare var Reflect: any;

const displayNameKey = 'DisplayName';

export function DisplayName(displayName: string) {
    return Reflect.metadata(displayNameKey, displayName);
}

export function getDisplayName(target: any, propertyKey: string) {
    return Reflect.getMetadata(displayNameKey, target, propertyKey);
}
