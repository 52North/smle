import {Configuration} from '../../../services/config/Configuration';
import {TrueConfiguration} from '../../../services/config/TrueConfiguration';

export abstract class ConfigurableComponent {
    public config: Configuration = new TrueConfiguration();
    private _isShowAll: boolean = false;
    private bufferConfig: Configuration;

    public get isShowAll(): boolean {
        return this._isShowAll;
    }

    public set isShowAll(value: boolean) {
        if (value === this._isShowAll) {
            return;
        }

        if (value && !this._isShowAll) {
            this.bufferConfig = this.config;
            this.config = new TrueConfiguration();
            this._isShowAll = true;
        } else {
            this.config = this.bufferConfig;
            this.bufferConfig = null;
            this._isShowAll = false;
        }
    }
}
