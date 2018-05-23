import { Type } from '@angular/core';

import { DescriptionConfig } from '../../../services/config/DescriptionConfig';
import { VocabularyType } from '../../../services/vocabulary/model';

export interface ChildMetadataOptions {
    vocabularyConfig: VocabularyConfig;
}

export interface VocabularyConfig {
    type: VocabularyType;
    navigation: boolean;
}

export class ChildMetadata<T> {
    private _componentType: Type<T>;
    private _model: any;
    private _config: DescriptionConfig;
    private _options: ChildMetadataOptions;

    public get componentType(): Type<T> {
        return this._componentType;
    }

    public get model(): any {
        return this._model;
    }

    public get config(): DescriptionConfig {
        return this._config;
    }

    public get options(): ChildMetadataOptions {
        return this._options;
    }

    constructor(componentType: Type<T>, model: any, config: DescriptionConfig, options?: ChildMetadataOptions) {
        this._componentType = componentType;
        this._model = model;
        this._config = config;
        this._options = options;
    }
}
