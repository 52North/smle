import { getDisplayName } from '../../../common/decorators/DisplayName';

export class BaseComponent {
    public model: any;

    protected getDisplayName(propertyName: string, target: any = this.model) {
        let displayName = getDisplayName(target, propertyName);
        return displayName || propertyName;
    }
}
