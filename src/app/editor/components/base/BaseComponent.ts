import {getDisplayName} from '../../../decorators/DisplayName';

export class BaseComponent {
    public model: any;

    protected getDisplayName(propertyName: string, target: any = this.model) {
        var displayName = getDisplayName(target, propertyName);
        return displayName || propertyName;
    }
}
