import { AbstractDataComponent } from '../../model/swe/AbstractDataComponent';
import { AbstractSimpleComponent } from '../../model/swe/AbstractSimpleComponent';
import { AbstractSWE } from '../../model/swe/AbstractSWE';
import { AbstractSWEIdentifiable } from '../../model/swe/AbstractSWEIdentifiable';
import { AllowedTimes } from '../../model/swe/AllowedTimes';
import { AllowedTokens } from '../../model/swe/AllowedTokens';
import { AllowedValues } from '../../model/swe/AllowedValues';
import { NAMESPACES } from './Namespaces';
import { SweBinaryBlock } from '../../model/swe/SweBinaryBlock';
import { SweBinaryComponent } from '../../model/swe/SweBinaryComponent';
import { SweBinaryEncoding } from '../../model/swe/SweBinaryEncoding';
import { SweBoolean } from '../../model/swe/SweBoolean';
import { SweCategory } from '../../model/swe/SweCategory';
import { SweCategoryRange } from '../../model/swe/SweCategoryRange';
import { SweCoordinate } from '../../model/swe/SweCoordinate';
import { SweCount } from '../../model/swe/SweCount';
import { SweCountRange } from '../../model/swe/SweCountRange';
import { SweDataArray } from '../../model/swe/SweDataArray';
import { SweDataChoice } from '../../model/swe/SweDataChoice';
import { SweDataRecord } from '../../model/swe/SweDataRecord';
import { SweDataStream } from '../../model/swe/SweDataStream';
import { SweElementType } from '../../model/swe/SweElementType';
import { SweEncoding } from '../../model/swe/SweEncoding';
import { SweField } from '../../model/swe/SweField';
import { SweMatrix } from '../../model/swe/SweMatrix';
import { SweNilValue } from '../../model/swe/SweNilValue';
import { SweQuality } from '../../model/swe/SweQuality';
import { SweQuantity } from '../../model/swe/SweQuantity';
import { SweQuantityRange } from '../../model/swe/SweQuantityRange';
import { SweText } from '../../model/swe/SweText';
import { SweTextEncoding } from '../../model/swe/SweTextEncoding';
import { SweTime } from '../../model/swe/SweTime';
import { SweTimeRange } from '../../model/swe/SweTimeRange';
import { SweVector } from '../../model/swe/SweVector';
import { SweXmlEncoding } from '../../model/swe/SweXmlEncoding';

export class SweEncoder {

    public encodeDataComponent(component: AbstractDataComponent, document: Document): Node {
        if (component instanceof SweVector) {
            return this.encodeVector(component, document);
        }
        if (component instanceof SweDataRecord) {
            return this.encodeDataRecord(component, document);
        }
        if (component instanceof SweMatrix) {
            return this.encodeMatrix(component, document);
        }
        if (component instanceof SweDataArray) {
            return this.encodeDataArray(component, document);
        }
        if (component instanceof SweDataChoice) {
            return this.encodeDataChoice(component, document);
        }
        if (component instanceof SweQuantityRange) {
            return this.encodeQuantityRange(component, document);
        }
        if (component instanceof SweTimeRange) {
            return this.encodeTimeRange(component, document);
        }
        if (component instanceof SweCountRange) {
            return this.encodeCountRange(component, document);
        }
        if (component instanceof SweCategoryRange) {
            return this.encodeCategoryRange(component, document);
        }
        if (component instanceof SweBoolean) {
            return this.encodeBoolean(component, document);
        }
        if (component instanceof SweCount) {
            return this.encodeCount(component, document);
        }
        if (component instanceof SweQuantity) {
            return this.encodeQuantity(component, document);
        }
        if (component instanceof SweTime) {
            return this.encodeTime(component, document);
        }
        if (component instanceof SweCategory) {
            return this.encodeCategory(component, document);
        }
        if (component instanceof SweText) {
            return this.encodeText(component, document);
        }
        throw new Error('Unsupported SWE data component');
    }

    public encodeCoordinate(coord: SweCoordinate, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:coordinate');

        if (coord.name) {
            node.setAttribute('name', coord.name);
        }

        if (coord.coordinate) {
            node.appendChild(this.encodeDataComponent(coord.coordinate, document));
        }

        return node;
    }

    public encodeVector(component: SweVector, document: Document): Node {

        const node = document.createElementNS(NAMESPACES.SWE, 'swe:Vector');

        this.encodeAbstractDataComponent(node, component, document);

        if (component.coordinates) {
            component.coordinates.forEach((coord) =>
                node.appendChild(this.encodeCoordinate(coord, document)));
        }

        if (component.referenceFrame) {
            node.setAttribute('referenceFrame', component.referenceFrame);
        }

        if (component.localFrame) {
            node.setAttribute('localFrame', component.localFrame);
        }

        return node;
    }

    public encodeField(field: SweField, document: Document): Node {
        const fieldNode = document.createElementNS(NAMESPACES.SWE, 'swe:field');
        if (field.name) {
            fieldNode.setAttribute('name', field.name);
        }
        if (field.component) {
            fieldNode.appendChild(this.encodeDataComponent(field.component, document));
        }
        return fieldNode;
    }

    public encodeDataRecord(component: SweDataRecord, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:DataRecord');

        this.encodeAbstractDataComponent(node, component, document);

        if (component.fields) {
            component.fields.forEach((field) => node.appendChild(this.encodeField(field, document)));
        }

        return node;
    }

    public encodeMatrix(component: SweMatrix, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:Matrix');
        this.encodeAbstractDataArray(node, component, document);

        if (component.referenceFrame) {
            node.setAttribute('referenceFrame', component.referenceFrame);
        }

        if (component.localFrame) {
            node.setAttribute('localFrame', component.localFrame);
        }

        return node;
    }


    public encodeDataArray(component: SweDataArray, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:DataArray');
        this.encodeAbstractDataArray(node, component, document);
        return node;
    }

    public encodeAbstractEncoding(encoding: SweEncoding, document: Document): Node {
        if (encoding instanceof SweTextEncoding) {
            return this.encodeTextEncoding(encoding, document);
        }
        if (encoding instanceof SweBinaryEncoding) {
            return this.encodeBinaryEncoding(encoding, document);
        }
        if (encoding instanceof SweXmlEncoding) {
            return this.encodeXmlEncoding(encoding, document);
        }
        throw new Error('Unsupported encoding type');
    }

    public encodeTextEncoding(encoding: SweTextEncoding, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:TextEncoding');

        this.encodeAbstractSwe(node, encoding, document);

        if (encoding.collapseWhiteSpace != null) {
            node.setAttribute('collapseWhiteSpace', encoding.collapseWhiteSpace.toString());
        }

        if (encoding.decimalSeparator) {
            node.setAttribute('decimalSeparator', encoding.decimalSeparator);
        }

        if (encoding.tokenSeparator) {
            node.setAttribute('tokenSeparator', encoding.tokenSeparator);
        }

        if (encoding.blockSeparator) {
            node.setAttribute('blockSeparator', encoding.blockSeparator);
        }

        return node;
    }

    public encodeBinaryEncoding(encoding: SweBinaryEncoding, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:BinaryEncoding');

        this.encodeAbstractSwe(node, encoding, document);

        if (encoding.members) {
            encoding.members.forEach((member) => {
                const memberNode = document.createElementNS(NAMESPACES.SWE, 'swe:member');
                if (member instanceof SweBinaryComponent) {
                    memberNode.appendChild(this.encodeBinaryComponent(member, document));
                } else {
                    memberNode.appendChild(this.encodeBinaryBlock(member, document));
                }
                node.appendChild(memberNode);
            });
        }

        if (encoding.byteOrder != null) {
            node.setAttribute('byteOrder', encoding.byteOrder);
        }

        if (encoding.byteEncoding != null) {
            node.setAttribute('byteEncoding', encoding.byteEncoding);
        }

        if (encoding.byteLength != null) {
            node.setAttribute('byteLength', encoding.byteLength.toString());
        }

        return node;
    }

    public encodeBinaryComponent(block: SweBinaryComponent, document: Document): Node {

        const node = document.createElementNS(NAMESPACES.SWE, 'swe:Component');

        this.encodeAbstractSwe(node, block, document);

        if (block.encryption) {
            node.setAttribute('encryption', block.encryption);
        }

        if (block.significantBits != null) {
            node.setAttribute('significantBits', block.significantBits.toString());
        }

        if (block.bitLength != null) {
            node.setAttribute('bitLength', block.bitLength.toString());
        }

        if (block.byteLength != null) {
            node.setAttribute('byteLength', block.byteLength.toString());
        }

        if (block.dataType) {
            node.setAttribute('dataType', block.dataType);
        }

        if (block.ref) {
            node.setAttribute('ref', block.ref);
        }

        return node;
    }

    public encodeBinaryBlock(block: SweBinaryBlock, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:Block');

        this.encodeAbstractSwe(node, block, document);

        if (block.compression) {
            node.setAttribute('compression', block.compression);
        }

        if (block.encryption) {
            node.setAttribute('encryption', block.encryption);
        }

        if (block.paddingBytesAfter != null) {
            node.setAttribute('paddingBytes-after', block.paddingBytesAfter.toString());
        }

        if (block.paddingBytesBefore != null) {
            node.setAttribute('paddingBytes-before', block.paddingBytesBefore.toString());
        }

        if (block.byteLength != null) {
            node.setAttribute('byteLength', block.byteLength.toString());
        }

        if (block.ref) {
            node.setAttribute('ref', block.ref);
        }

        return node;
    }

    public encodeXmlEncoding(encoding: SweXmlEncoding, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:XMLEncoding');

        this.encodeAbstractSwe(node, encoding, document);

        return node;
    }

    public encodeElementType(type: SweElementType, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:elementType');

        if (type.name) {
            node.setAttribute('name', type.name);
        }

        if (type.type) {
            node.appendChild(this.encodeDataComponent(type.type, document));
        }

        return node;
    }

    public encodeDataChoice(component: SweDataChoice, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:DataChoice');

        this.encodeAbstractDataComponent(node, component, document);

        if (component.choiceValue && component.choiceValue.length > 0) {
            const choiceValueNode = document.createElementNS(NAMESPACES.SWE, 'swe:choiceValue');
            component.choiceValue.forEach((category) =>
                choiceValueNode.appendChild(this.encodeCategory(category, document)));
            node.appendChild(choiceValueNode);
        }

        if (component.items) {
            component.items.forEach((item) => {
                const itemNode = document.createElementNS(NAMESPACES.SWE, 'swe:item');
                if (item.name) {
                    itemNode.setAttribute('name', item.name);
                }
                if (item.item) {
                    itemNode.appendChild(this.encodeDataComponent(item.item, document));
                }
                node.appendChild(itemNode);
            });
        }
        return node;
    }

    public encodeQuantityRange(component: SweQuantityRange, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:QuantityRange');

        this.encodeAbstractSimpleComponent(node, component, document);

        if (component.uom) {
            const uomNode = document.createElementNS(NAMESPACES.SWE, 'swe:uom');
            if (component.uom.code) {
                uomNode.setAttribute('code', component.uom.code);
            }
            if (component.uom.href) {
                uomNode.setAttributeNS(NAMESPACES.XLINK, 'xlink:href', component.uom.href);
            }
            node.appendChild(uomNode);
        }

        if (component.constraint) {
            const constraintNode = document.createElementNS(NAMESPACES.SWE, 'swe:constraint');
            constraintNode.appendChild(this.encodeAllowedValues(component.constraint, document));
            node.appendChild(constraintNode);
        }

        if (component.value != null) {
            const valueNode = document.createElementNS(NAMESPACES.SWE, 'swe:value');
            valueNode.textContent = `${component.value[0].toString()} ${component.value[1].toString()}`;
            node.appendChild(valueNode);
        }

        return node;
    }

    public encodeTimeRange(component: SweTimeRange, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:TimeRange');

        this.encodeAbstractSimpleComponent(node, component, document);

        if (component.uom) {
            const uomNode = document.createElementNS(NAMESPACES.SWE, 'swe:uom');
            if (component.uom.code) {
                uomNode.setAttribute('code', component.uom.code);
            }
            if (component.uom.href) {
                uomNode.setAttributeNS(NAMESPACES.XLINK, 'xlink:href', component.uom.href);
            }
            node.appendChild(uomNode);
        }

        if (component.constraint) {
            const constraintNode = document.createElementNS(NAMESPACES.SWE, 'swe:constraint');
            constraintNode.appendChild(this.encodeAllowedTimes(component.constraint, document));
            node.appendChild(constraintNode);
        }

        if (component.value != null) {
            const valueNode = document.createElementNS(NAMESPACES.SWE, 'swe:value');

            const value = component.value.map((v) => {
                if (v instanceof Date) {
                    return v.toISOString();
                } else {
                    return v;
                }
            });

            valueNode.textContent = `${value[0]} ${value[1]}`;

            node.appendChild(valueNode);
        }

        if (component.referenceTime) {
            node.setAttribute('referenceTime', component.referenceTime.toISOString());
        }

        if (component.localFrame) {
            node.setAttribute('localFrame', component.localFrame);
        }

        return node;
    }

    public encodeCountRange(component: SweCountRange, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:CountRange');

        this.encodeAbstractSimpleComponent(node, component, document);

        if (component.constraint) {
            const constraintNode = document.createElementNS(NAMESPACES.SWE, 'swe:constraint');
            constraintNode.appendChild(this.encodeAllowedValues(component.constraint, document));
            node.appendChild(constraintNode);
        }

        if (component.value != null) {
            const valueNode = document.createElementNS(NAMESPACES.SWE, 'swe:value');
            valueNode.textContent = `${component.value[0].toString()} ${component.value[1].toString()}`;
            node.appendChild(valueNode);
        }

        return node;
    }

    public encodeConstraint(object: AllowedTimes | AllowedTokens | AllowedValues, document: Document): Node {
        if (object instanceof AllowedTimes) {
            return this.encodeAllowedTimes(object, document);
        }
        if (object instanceof AllowedTokens) {
            return this.encodeAllowedTokens(object, document);
        }
        if (object instanceof AllowedValues) {
            return this.encodeAllowedValues(object, document);
        }
    }

    public encodeCategoryRange(component: SweCategoryRange, document: Document): Node {

        const node = document.createElementNS(NAMESPACES.SWE, 'swe:CategoryRange');

        this.encodeAbstractSimpleComponent(node, component, document);

        if (component.codeSpace) {
            const codeSpaceNode = document.createElementNS(NAMESPACES.SWE, 'swe:codeSpace');
            codeSpaceNode.setAttributeNS(NAMESPACES.XLINK, 'xlink:href', component.codeSpace);
            node.appendChild(codeSpaceNode);
        }

        if (component.constraint) {
            const constraintNode = document.createElementNS(NAMESPACES.SWE, 'swe:constraint');
            constraintNode.appendChild(this.encodeAllowedTokens(component.constraint, document));
            node.appendChild(constraintNode);
        }

        if (component.value) {
            const valueNode = document.createElementNS(NAMESPACES.SWE, 'swe:value');
            // let value = component.value.map(x => x.replace(' ', '&#032;'));
            valueNode.textContent = `${component.value[0]} ${component.value[1]}`;
            node.appendChild(valueNode);
        }

        return node;
    }

    public encodeBoolean(component: SweBoolean, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:Boolean');

        this.encodeAbstractSimpleComponent(node, component, document);

        if (component.value != null) {
            const valueNode = document.createElementNS(NAMESPACES.SWE, 'swe:value');
            valueNode.textContent = component.value.toString();
            node.appendChild(valueNode);
        }

        return node;
    }

    public encodeCount(component: SweCount, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:Count');

        this.encodeAbstractSimpleComponent(node, component, document);

        if (component.constraint) {
            const constraintNode = document.createElementNS(NAMESPACES.SWE, 'swe:constraint');
            constraintNode.appendChild(this.encodeAllowedValues(component.constraint, document));
            node.appendChild(constraintNode);
        }

        if (component.value != null) {
            const valueNode = document.createElementNS(NAMESPACES.SWE, 'swe:value');
            valueNode.textContent = component.value.toString();
            node.appendChild(valueNode);
        }

        return node;
    }

    public encodeQuantity(component: SweQuantity, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:Quantity');

        this.encodeAbstractSimpleComponent(node, component, document);

        if (component.uom) {
            const uomNode = document.createElementNS(NAMESPACES.SWE, 'swe:uom');
            if (component.uom.code) {
                uomNode.setAttribute('code', component.uom.code);
            }
            if (component.uom.href) {
                uomNode.setAttributeNS(NAMESPACES.XLINK, 'xlink:href', component.uom.href);
            }
            node.appendChild(uomNode);
        }

        if (component.constraint) {
            const constraintNode = document.createElementNS(NAMESPACES.SWE, 'swe:constraint');
            constraintNode.appendChild(this.encodeAllowedValues(component.constraint, document));
            node.appendChild(constraintNode);
        }

        if (component.value != null) {
            const valueNode = document.createElementNS(NAMESPACES.SWE, 'swe:value');
            valueNode.textContent = component.value.toString();
            node.appendChild(valueNode);
        }

        return node;
    }

    public encodeTime(component: SweTime, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:Time');

        this.encodeAbstractSimpleComponent(node, component, document);

        if (component.uom) {
            const uomNode = document.createElementNS(NAMESPACES.SWE, 'swe:uom');
            if (component.uom.code) {
                uomNode.setAttribute('code', component.uom.code);
            }
            if (component.uom.href) {
                uomNode.setAttributeNS(NAMESPACES.XLINK, 'xlink:href', component.uom.href);
            }
            node.appendChild(uomNode);
        }

        if (component.constraint) {
            const constraintNode = document.createElementNS(NAMESPACES.SWE, 'swe:constraint');
            constraintNode.appendChild(this.encodeAllowedTimes(component.constraint, document));
            node.appendChild(constraintNode);
        }

        if (component.value != null) {
            const valueNode = document.createElementNS(NAMESPACES.SWE, 'swe:value');
            const value = component.value;

            if (value instanceof Date) {
                valueNode.textContent = value.toISOString();
            } else {
                valueNode.textContent = value;
            }

            node.appendChild(valueNode);
        }

        if (component.referenceTime) {
            node.setAttribute('referenceTime', component.referenceTime.toISOString());
        }

        if (component.localFrame) {
            node.setAttribute('localFrame', component.localFrame);
        }

        return node;
    }

    public encodeCategory(component: SweCategory, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:Category');

        this.encodeAbstractSimpleComponent(node, component, document);

        if (component.codeSpace) {
            const codeSpaceNode = document.createElementNS(NAMESPACES.SWE, 'swe:codeSpace');
            codeSpaceNode.setAttributeNS(NAMESPACES.XLINK, 'xlink:href', component.codeSpace);
            node.appendChild(codeSpaceNode);
        }

        if (component.constraint) {
            const constraintNode = document.createElementNS(NAMESPACES.SWE, 'swe:constraint');
            constraintNode.appendChild(this.encodeAllowedTokens(component.constraint, document));
            node.appendChild(constraintNode);
        }

        if (component.value) {
            const valueNode = document.createElementNS(NAMESPACES.SWE, 'swe:value');
            valueNode.textContent = component.value;
            node.appendChild(valueNode);
        }

        return node;
    }

    public encodeText(component: SweText, document: Document): Node {

        const node = document.createElementNS(NAMESPACES.SWE, 'swe:Text');

        this.encodeAbstractSimpleComponent(node, component, document);

        if (component.constraint) {
            const constraintNode = document.createElementNS(NAMESPACES.SWE, 'swe:constraint');
            constraintNode.appendChild(this.encodeAllowedTokens(component.constraint, document));
            node.appendChild(constraintNode);
        }

        if (component.value) {
            const valueNode = document.createElementNS(NAMESPACES.SWE, 'swe:value');
            valueNode.textContent = component.value;
            node.appendChild(valueNode);
        }

        return node;
    }

    public encodeAllowedTokens(allowedTokens: AllowedTokens, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:AllowedTokens');

        this.encodeAbstractSwe(node, allowedTokens, document);

        if (allowedTokens.values) {
            allowedTokens.values.forEach((value) => {
                const valueNode = document.createElementNS(NAMESPACES.SWE, 'swe:value');
                valueNode.textContent = value;
                node.appendChild(valueNode);
            });
        }

        if (allowedTokens.pattern) {
            const patternNode = document.createElementNS(NAMESPACES.SWE, 'swe:pattern');
            patternNode.textContent = allowedTokens.pattern;
            node.appendChild(patternNode);
        }

        return node;
    }

    public encodeAllowedValues(allowedValues: AllowedValues, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:AllowedValues');

        this.encodeAbstractSwe(node, allowedValues, document);

        if (allowedValues.values) {
            allowedValues.values.filter((x) => !isNaN(+x))
                .forEach((x) => {
                    const n = document.createElementNS(NAMESPACES.SWE, 'swe:value');
                    n.textContent = x.toString();
                    node.appendChild(n);
                });
            allowedValues.values.filter((x) => x instanceof Array)
                .forEach((x) => {
                    const n = document.createElementNS(NAMESPACES.SWE, 'swe:interval');
                    n.textContent = `${x[0]} ${x[1]}`;
                    node.appendChild(n);
                });
        }
        if (allowedValues.significantFigures != null) {
            const n = document.createElementNS(NAMESPACES.SWE, 'swe:significantFigures');
            n.textContent = allowedValues.significantFigures.toString();
            node.appendChild(n);
        }

        return node;

    }

    public encodeAllowedTimes(allowedTimes: AllowedTimes, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SWE, 'swe:AllowedTimes');

        this.encodeAbstractSwe(node, allowedTimes, document);

        if (allowedTimes.values) {
            allowedTimes.values.forEach((allowedTime) => {
                let value: string;
                if (allowedTime instanceof Date) {
                    value = allowedTime.toISOString();
                } else if (allowedTime instanceof String) {
                    value = allowedTime;
                }
                if (value) {
                    const valueNode = document.createElementNS(NAMESPACES.SWE, 'swe:value');
                    valueNode.textContent = value;
                    node.appendChild(valueNode);
                }
            });

            allowedTimes.values.forEach((allowedTime) => {
                if (allowedTime instanceof Array) {
                    const value = allowedTime.map((v) => {
                        if (v instanceof Date) {
                            return v.toISOString();
                        } else {
                            return v;
                        }
                    });
                    const intervalNode = document.createElementNS(NAMESPACES.SWE, 'swe:interval');
                    intervalNode.textContent = `${value[0]} ${value[1]}`;
                    node.appendChild(intervalNode);
                }
            });
        }

        if (allowedTimes.significantFigures != null) {
            const n = document.createElementNS(NAMESPACES.SWE, 'swe:significantFigures');
            n.textContent = allowedTimes.significantFigures.toString();
            node.appendChild(n);
        }

        return node;
    }

    public encodeNilValue(nilValue: SweNilValue, document: Document): Node {
        const nilValueNode = document.createElementNS(NAMESPACES.SWE, 'swe:nilValue');
        if (nilValue.value) {
            nilValueNode.textContent = nilValue.value;
        }
        if (nilValue.reason) {
            nilValueNode.setAttribute('reason', nilValue.reason);
        }
        return nilValueNode;
    }

    public encodeQuality(quality: SweQuality, document: Document): Node {
        const qualityNode = document.createElementNS(NAMESPACES.SWE, 'swe:quality');
        if (quality instanceof SweQuantity) {
            qualityNode.appendChild(this.encodeQuantity(quality, document));
        } else if (quality instanceof SweQuantityRange) {
            qualityNode.appendChild(this.encodeQuantityRange(quality, document));
        } else if (quality instanceof SweCategory) {
            qualityNode.appendChild(this.encodeCategory(quality, document));
        } else if (quality instanceof SweText) {
            qualityNode.appendChild(this.encodeText(quality, document));
        } else {
            throw new Error('Unkown quality type');
        }
        return qualityNode;
    }


    public encodeAbstractSwe(node: Element, component: AbstractSWE, document: Document): void {

        if (component.id) {
            node.setAttribute('id', component.id);
        }

        if (component.extension) {
            throw new Error('Extensions are not supported');
        }

    }

    public encodeAbstractSweIdentifiable(node: Element, component: AbstractSWEIdentifiable, document: Document): void {

        this.encodeAbstractSwe(node, component, document);

        if (component.identifier) {
            const identifierNode = document.createElementNS(NAMESPACES.SWE, 'swe:identifier');
            identifierNode.textContent = component.identifier;
            node.appendChild(identifierNode);
        }

        if (component.label) {
            const labelNode = document.createElementNS(NAMESPACES.SWE, 'swe:label');
            labelNode.textContent = component.label;
            node.appendChild(labelNode);
        }

        if (component.description) {
            const descriptionNode = document.createElementNS(NAMESPACES.SWE, 'swe:description');
            descriptionNode.textContent = component.description;
            node.appendChild(descriptionNode);
        }
    }

    public encodeAbstractDataComponent(node: Element, component: AbstractDataComponent, document: Document): void {

        this.encodeAbstractSweIdentifiable(node, component, document);

        if (component.updatable != null) {
            node.setAttribute('updatable', component.updatable.toString());
        }

        if (component.optional != null) {
            node.setAttribute('optional', component.optional.toString());
        }

        if (component.definition) {
            node.setAttribute('definition', component.definition);
        }
    }

    public encodeAbstractSimpleComponent(node: Element, component: AbstractSimpleComponent, document: Document): void {

        this.encodeAbstractDataComponent(node, component, document);

        if (component.quality) {
            component.quality.forEach((quality) => node.appendChild(this.encodeQuality(quality, document)));
        }

        if (component.nilValues && component.nilValues.length > 0) {
            const outerNilValuesNode = document.createElementNS(NAMESPACES.SWE, 'swe:nilValues');
            const innerNilValuesNode = document.createElementNS(NAMESPACES.SWE, 'swe:NilValues');
            outerNilValuesNode.appendChild(innerNilValuesNode);
            node.appendChild(outerNilValuesNode);
            component.nilValues.forEach(
                (nilValue) => innerNilValuesNode.appendChild(this.encodeNilValue(nilValue, document))
            );
        }

        if (component.referenceFrame) {
            node.setAttribute('referenceFrame', component.referenceFrame);
        }

        if (component.axisId) {
            node.setAttribute('axisID', component.axisId);
        }
    }

    public encodeDataStream(object: SweDataStream, document: Document): Node {
        const node = document.createElementNS(NAMESPACES.SML, 'sml:DataStream');

        this.encodeAbstractSweIdentifiable(node, object, document);

        if (object.elementCount) {
            const elementCountNode = document.createElementNS(NAMESPACES.SWE, 'swe:elementCount');
            object.elementCount.forEach((elementCount) =>
                elementCountNode.appendChild(this.encodeCount(elementCount, document)));
            node.appendChild(elementCountNode);
        }

        if (object.elementType) {
            node.appendChild(this.encodeElementType(object.elementType, document));
        }

        if (object.encoding) {
            const encodingNode = document.createElementNS(NAMESPACES.SWE, 'swe:encoding');
            encodingNode.appendChild(this.encodeAbstractEncoding(object.encoding, document));
            node.appendChild(encodingNode);
        }

        if (object.values) {

        }
        return node;
    }

    private encodeAbstractDataArray(node: Element, component: SweDataArray, document: Document): void {
        this.encodeAbstractDataComponent(node, component, document);

        if (component.elementCount != null) {
            const countNode = document.createElementNS(NAMESPACES.SWE, 'swe:elementCount');
            countNode.textContent = component.elementCount.toString();
            node.appendChild(countNode);
        }

        if (component.elementType) {
            node.appendChild(this.encodeElementType(component.elementType, document));
        }

        if (component.encoding) {
            const encodingNode = document.createElementNS(NAMESPACES.SWE, 'swe:encoding');
            encodingNode.appendChild(this.encodeAbstractEncoding(component.encoding, document));
            node.appendChild(encodingNode);
        }

        if (component.values) {
            const valuesNode = document.createElementNS(NAMESPACES.SWE, 'swe:values');
            valuesNode.textContent = component.values as string;
            node.appendChild(valuesNode);
        }
    }
}
