import { getDisplayName } from '@helgoland/sensorml';

export class BaseComponent {
    public model: any;

    public getDisplayName(propertyName: string, target: any = this.model) {
        const displayName = getDisplayName(target, propertyName);
        return displayName || propertyName;
    }
}
