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
import { SweDataChoiceItem } from '../../model/swe/SweDataChoiceItem';
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
import { UnitOfMeasure } from '../../model/swe/UnitOfMeasure';
import { DecoderUtils } from './DecoderUtils';
import { ReturnObject } from './ReturnObject';
import { BidiMap } from '../dynamicGUI/BidiMap';

export class SweDecoder {

    private utils = new DecoderUtils();

    private _profileIDMap: BidiMap;

    public get profileIDMap() {
        return this._profileIDMap;
    }
    public set profileIDMap(profileIDMap: BidiMap) {
        this._profileIDMap = profileIDMap;
    }
    public decodeDataComponent(elem: Element): ReturnObject<AbstractDataComponent> {
        const vector = this.decodeVector(elem);
        if (vector != null) { return vector; }

        const dataRecord = this.decodeDataRecord(elem);
        if (dataRecord != null) { return dataRecord; }

        const matrix = this.decodeMatrix(elem);
        if (matrix != null) { return matrix; }

        const dataArray = this.decodeDataArray(elem);
        if (dataArray != null) { return dataArray; }

        const dataChoice = this.decodeDataChoice(elem);
        if (dataChoice != null) { return dataChoice; }

        const quantityRange = this.decodeQuantityRange(elem);
        if (quantityRange != null) { return quantityRange; }

        const timeRange = this.decodeTimeRange(elem);
        if (timeRange != null) { return timeRange; }

        const countRange = this.decodeCountRange(elem);
        if (countRange != null) { return countRange; }

        const categoryRange = this.decodeCategoryRange(elem);
        if (categoryRange != null) { return categoryRange; }

        const sweBoolean = this.decodeBoolean(elem);
        if (sweBoolean != null) { return sweBoolean; }

        const count = this.decodeCount(elem);
        if (count != null) { return count; }

        const quantity = this.decodeQuantity(elem);
        if (quantity != null) { return quantity; }

        const time = this.decodeTime(elem);
        if (time != null) { return time; }

        const category = this.decodeCategory(elem);
        if (category != null) { return category; }

        const text = this.decodeText(elem);
        if (text != null) { return text; }
    }

    public decodeCoordinate(node: Element): ReturnObject<SweCoordinate> {
        const coordinate = new SweCoordinate();

        if (node.hasAttribute('name')) {
            coordinate.name = node.getAttribute('name');
            this._profileIDMap = this.utils.processProfileID(node, coordinate, 'name', this._profileIDMap);

        }
        const returnObject: ReturnObject<SweCount> = this.decodeCount(node);
        if (returnObject) {
            const count = returnObject.value;
            coordinate.coordinate = count;
        }
        if (coordinate.coordinate == null) {
            const quantityReturnObject: ReturnObject<SweQuantity> = this.decodeQuantity(node);
            if (quantityReturnObject) {
                coordinate.coordinate = quantityReturnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    quantityReturnObject.docElement, coordinate, 'coordinate', this._profileIDMap
                );
            }
        } else if (coordinate.coordinate == null) {
            const timeReturnObject: ReturnObject<SweTime> = this.decodeTime(node);
            if (timeReturnObject) {
                coordinate.coordinate = timeReturnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    timeReturnObject.docElement, coordinate, 'coordinate', this._profileIDMap
                );
            }
        }
        return new ReturnObject(coordinate, node);
    }

    public decodeVector(node: Element): ReturnObject<SweVector> {
        const vectorNode = this.utils.getElement(node, 'Vector', NAMESPACES.SWE);
        if (vectorNode != null) {
            const vector = new SweVector();

            this.decodeAbstractDataComponent(vectorNode, vector);

            vector.coordinates = this.utils.getDecodedList(
                vectorNode,
                'coordinate',
                NAMESPACES.SWE, this._profileIDMap,
                (coord) => this.decodeCoordinate(coord));

            if (vectorNode.hasAttribute('referenceFrame')) {
                vector.referenceFrame = vectorNode.getAttribute('referenceFrame');
                this._profileIDMap = this.utils.processProfileID(
                    vectorNode, vector, 'referenceFrame', this._profileIDMap
                );
            }

            if (vectorNode.hasAttribute('localFrame')) {
                vector.localFrame = vectorNode.getAttribute('localFrame');
                this._profileIDMap = this.utils.processProfileID(vectorNode, vector, 'localFrame', this._profileIDMap);
            }

            return new ReturnObject(vector, vectorNode);
        }
    }

    public decodeField(fieldNode: Element): ReturnObject<SweField> {

        const field = new SweField();

        if (fieldNode.hasAttribute('name')) {
            field.name = fieldNode.getAttribute('name');
            this._profileIDMap = this.utils.processProfileID(fieldNode, field, 'name', this._profileIDMap);
        }
        const returnObject: ReturnObject<AbstractDataComponent> = this.decodeDataComponent(fieldNode.firstElementChild);
        if (returnObject) {
            field.component = returnObject.value;
            this._profileIDMap = this.utils.processProfileID(
                returnObject.docElement, field, 'component', this._profileIDMap
            );
        }

        return new ReturnObject(field, fieldNode);
    }

    public decodeDataRecord(elem: Element): ReturnObject<SweDataRecord> {
        const dataRecordElem = this.utils.getElement(elem, 'DataRecord', NAMESPACES.SWE);
        if (dataRecordElem != null) {
            const dataRecord = new SweDataRecord();

            this.decodeAbstractDataComponent(dataRecordElem, dataRecord);

            dataRecord.fields = this.utils.getDecodedList(
                dataRecordElem,
                'field',
                NAMESPACES.SWE, this._profileIDMap,
                (field) => this.decodeField(field));

            return new ReturnObject(dataRecord, dataRecordElem);
        }
    }

    public decodeDataStream(elem: Element): ReturnObject<SweDataStream> {
        const dataStreamElem = this.utils.getElement(elem, 'DataStream', NAMESPACES.SWE);
        if (dataStreamElem != null) {
            const dataStream = new SweDataStream();

            this.decodeAbstractSweIdentifiable(dataStreamElem, dataStream);

            dataStream.elementCount = this.utils.getDecodedList(
                dataStreamElem,
                'elementCount',
                NAMESPACES.SWE, this._profileIDMap,
                (elemCount) => this.decodeCount(elemCount));
            const returnObject: ReturnObject<SweElementType> = this.decodeElementType(dataStreamElem);
            if (returnObject) {
                dataStream.elementType = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, dataStream, 'elementType', this._profileIDMap
                );
            }

            const encodingElem: ReturnObject<SweEncoding> = this.decodeAbstractEncoding(
                this.utils.getElement(dataStreamElem, 'encoding', NAMESPACES.SWE)
            );
            if (encodingElem) {
                dataStream.encoding = encodingElem.value;
                this._profileIDMap = this.utils.processProfileID(
                    encodingElem.docElement, dataStream, 'encoding', this._profileIDMap
                );
            }
            return new ReturnObject(dataStream, dataStreamElem);
        }
    }

    public decodeMatrix(elem: Element): ReturnObject<SweMatrix> {
        const matrixElem = this.utils.getElement(elem, 'Matrix', NAMESPACES.SWE);
        if (matrixElem != null) {
            const matrix = new SweMatrix();

            this.decodeAbstractDataArray(matrixElem, matrix);

            if (matrixElem.hasAttribute('referenceFrame')) {
                matrix.referenceFrame = matrixElem.getAttribute('referenceFrame');
                this._profileIDMap = this.utils.processProfileID(
                    matrixElem, matrix, 'referenceFrame', this._profileIDMap
                );
            }

            if (matrixElem.hasAttribute('localFrame')) {
                matrix.localFrame = matrixElem.getAttribute('localFrame');
                this._profileIDMap = this.utils.processProfileID(matrixElem, matrix, 'localFrame', this._profileIDMap);
            }

            return new ReturnObject(matrix, matrixElem);
        }
    }

    public decodeDataArray(elem: Element): ReturnObject<SweDataArray> {
        const dataArrayElem = this.utils.getElement(elem, 'DataArray', NAMESPACES.SWE);
        if (dataArrayElem != null) {
            const dataArray = new SweDataArray();

            this.decodeAbstractDataArray(dataArrayElem, dataArray);
            return new ReturnObject(dataArray, dataArrayElem);
        }
    }

    public decodeAbstractEncoding(elem: Element): ReturnObject<SweEncoding> {

        const textEncoding = this.decodeTextEncoding(elem);
        if (textEncoding != null) { return textEncoding; }

        const binaryEncoding = this.decodeBinaryEncoding(elem);
        if (binaryEncoding != null) { return binaryEncoding; }

        const xmlEncoding = this.decodeXmlEncoding(elem);
        if (xmlEncoding != null) { return xmlEncoding; }

        throw new Error('Unsupported encoding type');
    }

    public decodeTextEncoding(elem: Element): ReturnObject<SweTextEncoding> {
        const textEncodingElem = this.utils.getElement(elem, 'TextEncoding', NAMESPACES.SWE);
        if (textEncodingElem != null) {
            const textEncoding = new SweTextEncoding();

            this.decodeAbstractSwe(textEncodingElem, textEncoding);

            if (textEncodingElem.hasAttribute('collapseWhiteSpace')) {
                textEncoding.collapseWhiteSpace = textEncodingElem.getAttribute('collapseWhiteSpace') === 'true';
                this._profileIDMap = this.utils.processProfileID(
                    textEncodingElem, textEncoding, 'collapseWhiteSpace', this._profileIDMap
                );
            }

            if (textEncodingElem.hasAttribute('decimalSeparator')) {
                textEncoding.decimalSeparator = textEncodingElem.getAttribute('decimalSeparator');
                this._profileIDMap = this.utils.processProfileID(
                    textEncodingElem, textEncoding, 'decimalSeparator', this._profileIDMap
                );
            }

            if (textEncodingElem.hasAttribute('tokenSeparator')) {
                textEncoding.tokenSeparator = textEncodingElem.getAttribute('tokenSeparator');
                this._profileIDMap = this.utils.processProfileID(
                    textEncodingElem, textEncoding, 'tokenSeparator', this._profileIDMap
                );
            }

            if (textEncodingElem.hasAttribute('blockSeparator')) {
                textEncoding.blockSeparator = textEncodingElem.getAttribute('blockSeparator');
                this._profileIDMap = this.utils.processProfileID(
                    textEncodingElem, textEncoding, 'blockSeparator', this._profileIDMap
                );
            }

            return new ReturnObject(textEncoding, textEncodingElem);
        }
    }

    public decodeBinaryEncoding(elem: Element): ReturnObject<SweBinaryEncoding> {
        const binaryEncodingElem = this.utils.getElement(elem, 'BinaryEncoding', NAMESPACES.SWE);
        if (binaryEncodingElem != null) {
            const binaryEncoding = new SweBinaryEncoding();

            this.decodeAbstractSwe(binaryEncodingElem, binaryEncoding);

            if (binaryEncodingElem.hasAttribute('byteOrder')) {
                const byteOrder = binaryEncodingElem.getAttribute('byteOrder');
                if (byteOrder === 'bigEndian') {
                    binaryEncoding.byteOrder = 'bigEndian';
                    this._profileIDMap = this.utils.processProfileID(
                        binaryEncodingElem, binaryEncoding, 'byteOrder', this._profileIDMap
                    );
                }
                if (byteOrder === 'littleEndian') {
                    binaryEncoding.byteOrder = 'littleEndian';
                    this._profileIDMap = this.utils.processProfileID(
                        binaryEncodingElem, binaryEncoding, 'byteOrder', this._profileIDMap
                    );
                }
            }

            if (binaryEncodingElem.hasAttribute('byteEncoding')) {
                const byteEncoding = binaryEncodingElem.getAttribute('byteEncoding');
                if (byteEncoding === 'base64') {
                    binaryEncoding.byteEncoding = 'base64';
                    this._profileIDMap = this.utils.processProfileID(
                        binaryEncodingElem, byteEncoding, 'base64', this._profileIDMap
                    );
                }
                if (byteEncoding === 'raw') {
                    binaryEncoding.byteEncoding = 'raw';
                    this._profileIDMap = this.utils.processProfileID(
                        binaryEncodingElem, byteEncoding, 'raw', this._profileIDMap
                    );
                }
            }

            if (binaryEncodingElem.hasAttribute('byteLength')
                && !isNaN(+binaryEncodingElem.getAttribute('byteLength'))) {
                binaryEncoding.byteLength = +binaryEncodingElem.getAttribute('byteLength');
            }

            binaryEncoding.members = this.utils.getDecodedList(
                binaryEncodingElem, 'member', NAMESPACES.SWE, this._profileIDMap, (member) => {
                    const component = this.decodeBinaryComponent(member);
                    if (component != null) {
                        return new ReturnObject(component, member);
                    }
                    const block = this.decodeBinaryBlock(member);
                    if (block != null) {
                        return new ReturnObject(block, member);
                    }
                    return new ReturnObject(null, null);

                });

            return new ReturnObject(binaryEncoding, binaryEncodingElem);
        }
    }

    public decodeBinaryComponent(elem: Element): ReturnObject<SweBinaryComponent> {

        const componentElem = this.utils.getElement(elem, 'Component', NAMESPACES.SWE);
        if (componentElem != null) {
            const component = new SweBinaryComponent();

            this.decodeAbstractSwe(componentElem, component);

            if (componentElem.hasAttribute('encryption')) {
                component.encryption = componentElem.getAttribute('encryption');
                this._profileIDMap = this.utils.processProfileID(
                    componentElem, component, 'encryption', this._profileIDMap
                );
            }

            if (componentElem.hasAttribute('significantBits')
                && !isNaN(+componentElem.getAttribute('significantBits'))) {
                component.significantBits = +componentElem.getAttribute('significantBits');
                this._profileIDMap = this.utils.processProfileID(
                    componentElem, component, 'significantBits', this._profileIDMap
                );
            }

            if (componentElem.hasAttribute('bitLength') && !isNaN(+componentElem.getAttribute('bitLength'))) {
                component.bitLength = +componentElem.getAttribute('bitLength');
                this._profileIDMap = this.utils.processProfileID(
                    componentElem, component, 'bitLength', this._profileIDMap
                );
            }

            if (componentElem.hasAttribute('byteLength') && !isNaN(+componentElem.getAttribute('byteLength'))) {
                component.byteLength = +componentElem.getAttribute('byteLength');
                this._profileIDMap = this.utils.processProfileID(
                    componentElem, component, 'byteLength', this._profileIDMap
                );
            }

            if (componentElem.hasAttribute('dataType')) {
                component.dataType = componentElem.getAttribute('dataType');
                this._profileIDMap = this.utils.processProfileID(
                    componentElem, component, 'paddingBytesAfter', this._profileIDMap
                );
            }

            if (componentElem.hasAttribute('ref')) {
                component.ref = componentElem.getAttribute('ref');
                this._profileIDMap = this.utils.processProfileID(componentElem, component, 'ref', this._profileIDMap);

            }

            return new ReturnObject(component, componentElem);
        }
    }

    public decodeBinaryBlock(elem: Element): ReturnObject<SweBinaryBlock> {

        const blockElem = this.utils.getElement(elem, 'Block', NAMESPACES.SWE);
        if (blockElem != null) {
            const block = new SweBinaryBlock();

            this.decodeAbstractSwe(blockElem, block);

            if (blockElem.hasAttribute('compression')) {
                block.compression = blockElem.getAttribute('compression');
            }

            if (blockElem.hasAttribute('encryption')) {
                block.encryption = blockElem.getAttribute('encryption');
                this._profileIDMap = this.utils.processProfileID(blockElem, block, 'encryption', this._profileIDMap);
            }

            if (blockElem.hasAttribute('paddingBytes-after') && !isNaN(+blockElem.getAttribute('paddingBytes-after'))) {
                block.paddingBytesAfter = +blockElem.getAttribute('paddingBytes-after');
                this._profileIDMap = this.utils.processProfileID(
                    blockElem, block, 'paddingBytesAfter', this._profileIDMap
                );
            }

            if (blockElem.hasAttribute('paddingBytes-before')
                && !isNaN(+blockElem.getAttribute('paddingBytes-before'))) {
                block.paddingBytesBefore = +blockElem.getAttribute('paddingBytes-before');
                this._profileIDMap = this.utils.processProfileID(
                    blockElem, block, 'paddingBytesAfter', this._profileIDMap
                );
            }

            if (blockElem.hasAttribute('byteLength') && !isNaN(+blockElem.getAttribute('byteLength'))) {
                block.byteLength = +blockElem.getAttribute('byteLength');
                this._profileIDMap = this.utils.processProfileID(blockElem, block, 'byteLength', this._profileIDMap);
            }

            if (blockElem.hasAttribute('ref')) {
                block.ref = blockElem.getAttribute('ref');
                this._profileIDMap = this.utils.processProfileID(blockElem, block, 'ref', this._profileIDMap);
            }

            return new ReturnObject(block, blockElem);
        }
    }


    public decodeXmlEncoding(elem: Element): ReturnObject<SweXmlEncoding> {
        const xmlEncodingElem = this.utils.getElement(elem, 'XMLEncoding', NAMESPACES.SWE);
        if (xmlEncodingElem != null) {
            const xmlEncoding = new SweXmlEncoding();

            this.decodeAbstractSwe(xmlEncodingElem, xmlEncoding);

            return new ReturnObject(xmlEncoding, elem);
        }
    }

    public decodeElementType(elem: Element): ReturnObject<SweElementType> {
        const elementTypeElem = this.utils.getElement(elem, 'elementType', NAMESPACES.SWE);
        if (elementTypeElem != null) {
            const elementType = new SweElementType();

            if (elementTypeElem.hasAttribute('name')) {
                elementType.name = elementTypeElem.getAttribute('name');
                this._profileIDMap = this.utils.processProfileID(
                    elementTypeElem, elementType, 'name', this._profileIDMap
                );
            }
            const returnObject: ReturnObject<AbstractDataComponent> =
                this.decodeDataComponent(elementTypeElem.firstElementChild);
            if (returnObject) {
                elementType.type = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    elementTypeElem, elementType, 'type', this._profileIDMap
                );
            }
            return new ReturnObject(elementType, elementTypeElem);
        }
    }

    public decodeDataChoice(elem: Element): ReturnObject<SweDataChoice> {
        const dataChoiceElem = this.utils.getElement(elem, 'DataChoice', NAMESPACES.SWE);
        if (dataChoiceElem != null) {
            const dataChoice = new SweDataChoice();

            this.decodeAbstractDataComponent(dataChoiceElem, dataChoice);

            dataChoice.choiceValue = this.utils.getDecodedList(
                dataChoiceElem,
                'choiceValue',
                NAMESPACES.SWE, this._profileIDMap,
                (value) => this.decodeCategory(value));

            dataChoice.items = this.utils.getDecodedList(
                dataChoiceElem,
                'item',
                NAMESPACES.SWE, this._profileIDMap,
                (item) => this.decodeDataChoiceItem(item));

            return new ReturnObject(dataChoice, dataChoiceElem);
        }
    }

    public decodeDataChoiceItem(elem: Element): ReturnObject<SweDataChoiceItem> {
        const dataChoiceItem = new SweDataChoiceItem();

        if (elem.hasAttribute('name')) {
            dataChoiceItem.name = elem.getAttribute('name');
            this._profileIDMap = this.utils.processProfileID(elem, dataChoiceItem, 'name', this._profileIDMap);

        }

        if (elem.firstElementChild != null) {
            const returnObject: ReturnObject<AbstractDataComponent> = this.decodeDataComponent(elem.firstElementChild);
            if (returnObject) {
                dataChoiceItem.item = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, dataChoiceItem, 'item', this._profileIDMap
                );
            }
        }

        return new ReturnObject(dataChoiceItem, elem);
    }

    public decodeUnitOfMeasure(elem: Element): ReturnObject<UnitOfMeasure> {
        const uomElem = this.utils.getElement(elem, 'uom', NAMESPACES.SWE);
        if (uomElem != null) {
            const uom = new UnitOfMeasure();
            if (uomElem.hasAttribute('code')) {
                uom.code = uomElem.getAttribute('code');
                this._profileIDMap = this.utils.processProfileID(elem, uom, 'code', this._profileIDMap);

            }
            if (uomElem.hasAttributeNS(NAMESPACES.XLINK, 'href')) {
                uom.href = uomElem.getAttributeNS(NAMESPACES.XLINK, 'href');
                this._profileIDMap = this.utils.processProfileID(elem, uom, 'href', this._profileIDMap);
            }
            if (uomElem.hasAttributeNS(NAMESPACES.XLINK, 'title')) {
                uom.title = uomElem.getAttributeNS(NAMESPACES.XLINK, 'title');
                this._profileIDMap = this.utils.processProfileID(elem, uom, 'title', this._profileIDMap);
            }
            return new ReturnObject(uom, uomElem);
        }
    }

    public decodeQuantityRange(elem: Element): ReturnObject<SweQuantityRange> {
        const quantityRangeElem = this.utils.getElement(elem, 'QuantityRange', NAMESPACES.SWE);
        if (quantityRangeElem != null) {
            const quantityRange = new SweQuantityRange();

            this.decodeAbstractSimpleComponent(quantityRangeElem, quantityRange);

            const returnObject: ReturnObject<UnitOfMeasure> = this.decodeUnitOfMeasure(elem);
            if (returnObject) {
                quantityRange.uom = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, quantityRange, 'uom', this._profileIDMap
                );
            }

            const constraint = this.utils.getElement(quantityRangeElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                const allowedValues: ReturnObject<AllowedValues> = this.decodeAllowedValues(constraint);
                if (allowedValues) {
                    quantityRange.constraint = allowedValues.value;
                    this._profileIDMap = this.utils.processProfileID(
                        allowedValues.docElement, quantityRange, 'constraint', this._profileIDMap
                    );
                }
            }

            const valueElem = this.utils.getElement(quantityRangeElem, 'value', NAMESPACES.SWE);
            if (valueElem != null) {
                const values = valueElem.textContent.split(' ');
                if (values.length === 2 && !isNaN(+values[0]) && !isNaN(+values[1])) {
                    quantityRange.value = [+values[0], +values[1]];
                    this._profileIDMap = this.utils.processProfileID(
                        valueElem, quantityRange, 'value', this._profileIDMap
                    );
                }
            }

            return new ReturnObject(quantityRange, quantityRangeElem);
        }
    }

    public decodeTimeRange(elem: Element): ReturnObject<SweTimeRange> {
        const timeRangeElem = this.utils.getElement(elem, 'TimeRange', NAMESPACES.SWE);
        if (timeRangeElem != null) {
            const timeRange = new SweTimeRange();

            this.decodeAbstractSimpleComponent(timeRangeElem, timeRange);

            const returnObject: ReturnObject<UnitOfMeasure> = this.decodeUnitOfMeasure(timeRangeElem);
            if (returnObject) {
                timeRange.uom = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, timeRange, 'uom', this._profileIDMap
                );
            }
            const valueElem = this.utils.getElement(timeRangeElem, 'value', NAMESPACES.SWE);
            if (valueElem != null) {
                const values = valueElem.textContent.split(' ');
                if (values.length === 2) {
                    let start;
                    let end;
                    if (!isNaN(Date.parse(values[0]))) {
                        start = new Date(Date.parse(values[0]));
                    } else if (values[0] === 'now') {
                        start = 'now';
                    }
                    if (!isNaN(Date.parse(values[1]))) {
                        end = new Date(Date.parse(values[1]));
                    } else if (values[1] === 'now') {
                        end = 'now';
                    }
                    timeRange.value = [start, end];
                    this._profileIDMap = this.utils.processProfileID(
                        timeRangeElem, timeRange, 'value', this._profileIDMap
                    );
                }
            }

            const constraint = this.utils.getElement(timeRangeElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                const allowedTimes: ReturnObject<AllowedTimes> = this.decodeAllowedTimes(constraint);
                if (allowedTimes) {
                    timeRange.constraint = allowedTimes.value;
                    this._profileIDMap = this.utils.processProfileID(
                        allowedTimes.docElement, timeRange, 'constraint', this._profileIDMap
                    );
                }
            }

            if (timeRangeElem.hasAttribute('referenceTime')) {
                const timeStr = timeRangeElem.getAttribute('referenceTime');
                if (!isNaN(Date.parse(timeStr))) {
                    timeRange.referenceTime = new Date(Date.parse(timeStr));
                    this._profileIDMap = this.utils.processProfileID(
                        timeRangeElem, timeRange, 'uom', this._profileIDMap
                    );
                }
            }

            if (timeRangeElem.hasAttribute('localFrame')) {
                timeRange.localFrame = timeRangeElem.getAttribute('localFrame');
                this._profileIDMap = this.utils.processProfileID(
                    timeRangeElem, timeRange, 'localFrame', this._profileIDMap
                );
            }

            return new ReturnObject(timeRange, timeRangeElem);
        }
    }

    public decodeCountRange(elem: Element): ReturnObject<SweCountRange> {
        const countRangeElem = this.utils.getElement(elem, 'CountRange', NAMESPACES.SWE);
        if (countRangeElem != null) {
            const countRange = new SweCountRange();

            this.decodeAbstractSimpleComponent(countRangeElem, countRange);

            const constraint = this.utils.getElement(countRangeElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                const returnObject: ReturnObject<AllowedValues> = this.decodeAllowedValues(constraint);
                if (returnObject) {
                    countRange.constraint = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(
                        returnObject.docElement, countRange, 'constraint', this._profileIDMap
                    );
                }
            }

            const valueElem = this.utils.getElement(countRangeElem, 'value', NAMESPACES.SWE);
            if (valueElem != null) {
                const values = valueElem.textContent.split(' ');
                if (values.length === 2 && !isNaN(+values[0]) && !isNaN(+values[1])) {
                    countRange.value = [+values[0], +values[1]];
                    this._profileIDMap = this.utils.processProfileID(
                        valueElem, countRange, 'value', this._profileIDMap
                    );
                }
            }

            return new ReturnObject(countRange, countRangeElem);
        }
    }

    public decodeConstraint(elem: Element): ReturnObject<AllowedTimes | AllowedTokens | AllowedValues> {
        const allowedTimes = this.decodeAllowedTimes(elem);
        if (allowedTimes != null) { return allowedTimes; }

        const allowedTokens = this.decodeAllowedTokens(elem);
        if (allowedTokens != null) { return allowedTokens; }

        const allowedValues = this.decodeAllowedValues(elem);
        if (allowedValues != null) { return allowedValues; }

        throw new Error('Unsupported constraint type');
    }

    public decodeCategoryRange(elem: Element): ReturnObject<SweCategoryRange> {
        const categoryRangeElem = this.utils.getElement(elem, 'CategoryRange', NAMESPACES.SWE);
        if (categoryRangeElem != null) {
            const categoryRange = new SweCategoryRange();

            this.decodeAbstractSimpleComponent(categoryRangeElem, categoryRange);

            const returnObject: ReturnObject<string> = this.utils.getAttributeOfElement(
                categoryRangeElem, 'codeSpace', NAMESPACES.SWE, 'href', NAMESPACES.XLINK
            );
            if (returnObject) {
                categoryRange.codeSpace = returnObject.value;
                if (categoryRange.codeSpace) {
                    this._profileIDMap = this.utils.processProfileID(
                        returnObject.docElement, categoryRange, 'codeSpace', this._profileIDMap
                    );
                }
            }

            const constraintElem = this.utils.getElement(categoryRangeElem, 'constraint', NAMESPACES.SWE);
            if (constraintElem != null) {
                const allowedTokens: ReturnObject<AllowedTokens> = this.decodeAllowedTokens(constraintElem);
                if (allowedTokens) {
                    categoryRange.constraint = allowedTokens.value;
                    this._profileIDMap = this.utils.processProfileID(
                        allowedTokens.docElement, categoryRange, 'constraint', this._profileIDMap
                    );
                }
            }

            const valueElem = this.utils.getElement(categoryRangeElem, 'value', NAMESPACES.SWE);
            if (valueElem != null) {
                const values = valueElem.textContent.split(' ');
                if (values.length === 2) {
                    categoryRange.value = [values[0], values[1]];
                    this._profileIDMap = this.utils.processProfileID(
                        valueElem, categoryRange, 'value', this._profileIDMap
                    );
                }
            }

            return new ReturnObject(categoryRange, categoryRangeElem);
        }
    }

    public decodeBoolean(elem: Element): ReturnObject<SweBoolean> {
        const boolElem = this.utils.getElement(elem, 'Boolean', NAMESPACES.SWE);
        if (boolElem != null) {
            const bool = new SweBoolean();

            this.decodeAbstractSimpleComponent(boolElem, bool);

            const value = this.utils.getElement(boolElem, 'value', NAMESPACES.SWE);
            if (value != null) {
                bool.value = value.textContent === 'true';
                this._profileIDMap = this.utils.processProfileID(boolElem, bool, 'value', this._profileIDMap);
            }

            return new ReturnObject(bool, boolElem);
        }
    }

    public decodeCount(elem: Element): ReturnObject<SweCount> {
        const countElem = this.utils.getElement(elem, 'Count', NAMESPACES.SWE);
        if (countElem != null) {
            const count = new SweCount();

            this.decodeAbstractSimpleComponent(countElem, count);

            const constraint = this.utils.getElement(countElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                const returnObject: ReturnObject<AllowedValues> = this.decodeAllowedValues(constraint);
                if (returnObject) {
                    count.constraint = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(
                        countElem, count, 'constraint', this._profileIDMap
                    );
                }
            }

            const value = this.utils.getElement(countElem, 'value', NAMESPACES.SWE);
            if (value != null && !isNaN(+value.textContent)) {
                count.value = +value.textContent;
                this._profileIDMap = this.utils.processProfileID(countElem, count, 'value', this._profileIDMap);

            }

            return new ReturnObject(count, countElem);
        }
    }

    public decodeQuantity(elem: Element): ReturnObject<SweQuantity> {
        const quantityElem = this.utils.getElement(elem, 'Quantity', NAMESPACES.SWE);
        if (quantityElem != null) {
            const quantity = new SweQuantity();

            this.decodeAbstractSimpleComponent(quantityElem, quantity);

            const constraint = this.utils.getElement(quantityElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                const allowedValuesObject: ReturnObject<AllowedValues> = this.decodeAllowedValues(constraint);
                if (allowedValuesObject) {
                    quantity.constraint = allowedValuesObject.value;
                    this._profileIDMap = this.utils.processProfileID(
                        allowedValuesObject.docElement, quantity, 'constraint', this._profileIDMap
                    );
                }
            }

            const value = this.utils.getElement(quantityElem, 'value', NAMESPACES.SWE);
            if (value != null && !isNaN(+value.textContent)) {
                quantity.value = +value.textContent;
                this._profileIDMap = this.utils.processProfileID(quantityElem, quantity, 'value', this._profileIDMap);

            }
            const returnObject: ReturnObject<UnitOfMeasure> = this.decodeUnitOfMeasure(quantityElem);
            if (returnObject) {
                quantity.uom = returnObject.value;
                if (quantity.uom) {
                    this._profileIDMap = this.utils.processProfileID(quantityElem, quantity, 'uom', this._profileIDMap);
                }
            }
            return new ReturnObject(quantity, quantityElem);
        }
    }

    public decodeTime(elem: Element): ReturnObject<SweTime> {
        const timeElem = this.utils.getElement(elem, 'Time', NAMESPACES.SWE);
        if (timeElem != null) {
            const time = new SweTime();

            this.decodeAbstractSimpleComponent(timeElem, time);

            const returnObject: ReturnObject<UnitOfMeasure> = this.decodeUnitOfMeasure(timeElem);
            if (returnObject) {
                time.uom = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(timeElem, time, 'uom', this._profileIDMap);
            }
            const constraint = this.utils.getElement(timeElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                const allowedTimes: ReturnObject<AllowedTimes> = this.decodeAllowedTimes(constraint);
                if (allowedTimes) {
                    time.constraint = allowedTimes.value;
                    this._profileIDMap = this.utils.processProfileID(
                        allowedTimes.docElement, time, 'constraint', this._profileIDMap
                    );
                }
            }

            if (timeElem.hasAttribute('referenceTime')) {
                time.referenceTime = new Date(timeElem.getAttribute('referenceTime'));
                this._profileIDMap = this.utils.processProfileID(timeElem, time, 'referenceTime', this._profileIDMap);
            }

            if (timeElem.hasAttribute('localFrame')) {
                time.localFrame = timeElem.getAttribute('localFrame');
                this._profileIDMap = this.utils.processProfileID(timeElem, time, 'localFrame', this._profileIDMap);
            }

            const value = this.utils.getElement(timeElem, 'value', NAMESPACES.SWE);
            if (value != null) {
                if (!isNaN(Date.parse(value.textContent))) {
                    time.value = new Date(Date.parse(value.textContent));
                    this._profileIDMap = this.utils.processProfileID(timeElem, time, 'value', this._profileIDMap);
                } else if (value.textContent === 'now') {
                    time.value = 'now';
                    this._profileIDMap = this.utils.processProfileID(timeElem, time, 'value', this._profileIDMap);
                }
            }

            return new ReturnObject(time, timeElem);
        }
    }

    public decodeCategory(elem: Element): ReturnObject<SweCategory> {
        const catElem = this.utils.getElement(elem, 'Category', NAMESPACES.SWE);
        if (catElem != null) {
            const category = new SweCategory();

            this.decodeAbstractSimpleComponent(catElem, category);

            const returnObject: ReturnObject<string> = this.utils.getAttributeOfElement(
                catElem, 'codeSpace', NAMESPACES.SWE, 'href', NAMESPACES.XLINK
            );
            if (returnObject) {
                category.codeSpace = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, category, 'constraint', this._profileIDMap
                );
            }

            const constraint = this.utils.getElement(catElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                const allowedTokens: ReturnObject<AllowedTokens> = this.decodeAllowedTokens(constraint);
                if (allowedTokens) {
                    category.constraint = allowedTokens.value;
                    this._profileIDMap = this.utils.processProfileID(
                        allowedTokens.docElement, category, 'constraint', this._profileIDMap
                    );
                }
            }

            const value = this.utils.getElement(catElem, 'value', NAMESPACES.SWE);
            if (value != null) {
                category.value = value.textContent;
                this._profileIDMap = this.utils.processProfileID(value, category, 'value', this._profileIDMap);

            }

            return new ReturnObject(category, catElem);
        }
    }

    public decodeText(elem: Element): ReturnObject<SweText> {
        const textElem = this.utils.getElement(elem, 'Text', NAMESPACES.SWE);
        if (textElem != null) {
            const text = new SweText();

            this.decodeAbstractSimpleComponent(textElem, text);

            const constraint = this.utils.getElement(textElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                const returnObject: ReturnObject<AllowedTokens> = this.decodeAllowedTokens(constraint);
                if (returnObject) {
                    text.constraint = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(
                        constraint, text, 'constraint', this._profileIDMap
                    );
                }
            }

            const value = this.utils.getElement(textElem, 'value', NAMESPACES.SWE);
            if (value != null) {
                text.value = value.textContent;
                this._profileIDMap = this.utils.processProfileID(value, text, 'value', this._profileIDMap);
            }

            return new ReturnObject(text, textElem);
        }
    }

    public decodeAllowedTokens(elem: Element): ReturnObject<AllowedTokens> {
        const allowedTokensElem = this.utils.getElement(elem, 'AllowedTokens', NAMESPACES.SWE);
        if (allowedTokensElem != null) {
            const allowedTokens = new AllowedTokens();

            this.decodeAbstractSwe(allowedTokensElem, allowedTokens);

            this.utils.getDecodedList(
                allowedTokensElem,
                'value',
                NAMESPACES.SWE, this._profileIDMap,
                (v) => new ReturnObject(allowedTokens.values.push(v.textContent), allowedTokensElem));

            const pattern = this.utils.getElement(allowedTokensElem, 'pattern', NAMESPACES.SWE);
            if (pattern != null) {
                allowedTokens.pattern = pattern.textContent;
                this._profileIDMap = this.utils.processProfileID(pattern, allowedTokens, 'pattern', this._profileIDMap);
            }

            return new ReturnObject(allowedTokens, allowedTokensElem);
        }
    }

    public decodeAllowedValues(elem: Element): ReturnObject<AllowedValues> {
        const allowedValuesElem = this.utils.getElement(elem, 'AllowedValues', NAMESPACES.SWE);
        if (allowedValuesElem != null) {
            const allowedValues = new AllowedValues();


            this.decodeAbstractSwe(allowedValuesElem, allowedValues);

            const significantFigures = this.utils.getElement(allowedValuesElem, 'significantFigures', NAMESPACES.SWE);
            if (significantFigures != null && !isNaN(+significantFigures.textContent)) {
                allowedValues.significantFigures = +significantFigures.textContent;
                this._profileIDMap = this.utils.processProfileID(
                    significantFigures, allowedValues, 'significantFigures', this._profileIDMap
                );
            }
            allowedValues.values = this.utils.getDecodedList(
                allowedValuesElem, 'value', NAMESPACES.SWE, this._profileIDMap, (v) => {
                    if (v.textContent != null && !isNaN(+v.textContent)) {
                        return new ReturnObject(+v.textContent, v);
                    }
                    return new ReturnObject(null, null);
                });

            allowedValues.values = this.utils.getDecodedList(
                allowedValuesElem, 'interval', NAMESPACES.SWE, this._profileIDMap, (v) => {
                    if (v.textContent != null) {
                        const interval = v.textContent.split(' ');
                        if (interval.length === 2 && !isNaN(+interval[0]) && !isNaN(+interval[1])) {
                            return new ReturnObject([+interval[0], +interval[1]], v);
                        }
                    }
                    return new ReturnObject(null, null);
                });
            return new ReturnObject(allowedValues, allowedValuesElem);
        }
    }

    public decodeAllowedTimes(elem: Element): ReturnObject<AllowedTimes> {
        const allowedTimesElem = this.utils.getElement(elem, 'AllowedTimes', NAMESPACES.SWE);
        if (allowedTimesElem != null) {
            const allowedTimes = new AllowedTimes();

            this.decodeAbstractSwe(allowedTimesElem, allowedTimes);

            const significantFigures = this.utils.getElement(allowedTimesElem, 'significantFigures', NAMESPACES.SWE);
            if (significantFigures != null && !isNaN(+significantFigures.textContent)) {
                allowedTimes.significantFigures = +significantFigures.textContent;
                this._profileIDMap = this.utils.processProfileID(
                    allowedTimesElem, allowedTimes, 'significantFigures', this._profileIDMap
                );

            }

            allowedTimes.values = this.utils.getDecodedList(
                allowedTimesElem, 'value', NAMESPACES.SWE, this._profileIDMap, (entry) => {
                    if (!isNaN(Date.parse(entry.textContent))) {
                        return new ReturnObject(new Date(Date.parse(entry.textContent)), entry);
                    }
                    return new ReturnObject(null, null);
                });

            allowedTimes.values = this.utils.getDecodedList(
                allowedTimesElem, 'interval', NAMESPACES.SWE, this._profileIDMap, (entry) => {
                    const interval = entry.textContent.split(' ');
                    if (interval.length === 2 && !isNaN(Date.parse(interval[0])) && !isNaN(Date.parse(interval[1]))) {
                        return new ReturnObject(
                            [new Date(Date.parse(interval[0])), new Date(Date.parse(interval[1]))], entry
                        );
                    }
                    return new ReturnObject(null, null);
                });

            return new ReturnObject(allowedTimes, allowedTimesElem);
        }
    }

    public decodeNilValue(elem: Element): ReturnObject<SweNilValue> {
        const nilValue = new SweNilValue();

        if (elem.hasAttribute('reason')) {
            nilValue.reason = elem.getAttribute('reason');
            this._profileIDMap = this.utils.processProfileID(elem, nilValue, 'reason', this._profileIDMap);

        }

        nilValue.value = elem.textContent;
        this._profileIDMap = this.utils.processProfileID(elem, nilValue, 'value', this._profileIDMap);


        return new ReturnObject(nilValue, elem);
    }

    public decodeQuality(elem: Element): ReturnObject<SweQuality> {
        const quantity = this.decodeQuantity(elem);
        if (quantity != null) { return quantity; }

        const quantityRange = this.decodeQuantityRange(elem);
        if (quantityRange != null) { return quantityRange; }

        const category = this.decodeCategory(elem);
        if (category != null) { return category; }

        const text = this.decodeText(elem);
        if (text != null) { return text; }
    }

    public decodeAbstractSwe(elem: Element, component: AbstractSWE): void {
        if (elem.hasAttribute('id')) {
            component.id = elem.getAttribute('id');
        }
        // TODO add extension
    }

    public decodeAbstractSweIdentifiable(elem: Element, object: AbstractSWEIdentifiable): void {
        this.decodeAbstractSwe(elem, object);

        if (elem.getElementsByTagNameNS(NAMESPACES.SWE, 'identifier').length === 1) {
            object.identifier = elem.getElementsByTagNameNS(NAMESPACES.SWE, 'identifier')[0].textContent;
        }

        if (elem.getElementsByTagNameNS(NAMESPACES.SWE, 'label').length === 1) {
            object.label = elem.getElementsByTagNameNS(NAMESPACES.SWE, 'label')[0].textContent;
        }

        if (elem.getElementsByTagNameNS(NAMESPACES.SWE, 'description').length === 1) {
            object.description = elem.getElementsByTagNameNS(NAMESPACES.SWE, 'description')[0].textContent;
        }
    }

    public decodeAbstractDataComponent(elem: Element, component: AbstractDataComponent): void {
        this.decodeAbstractSweIdentifiable(elem, component);

        if (elem.hasAttribute('updatable')) {
            component.updatable = elem.getAttribute('updatable') === 'true';
        }

        if (elem.hasAttribute('optional')) {
            component.optional = elem.getAttribute('optional') === 'true';
        }

        if (elem.hasAttribute('definition')) {
            component.definition = elem.getAttribute('definition');
        }
    }

    public decodeAbstractSimpleComponent(elem: Element, component: AbstractSimpleComponent): void {

        this.decodeAbstractDataComponent(elem, component);

        component.quality = this.utils.getDecodedList(
            elem,
            'quality',
            NAMESPACES.SWE, this._profileIDMap,
            (quality) => this.decodeQuality(quality));

        const outerNilValuesElem = this.utils.getElement(elem, 'nilValues', NAMESPACES.SWE);
        if (outerNilValuesElem != null) {
            const innerNilValuesElem = this.utils.getElement(outerNilValuesElem, 'NilValues', NAMESPACES.SWE);
            if (innerNilValuesElem != null) {
                component.nilValues = this.utils.getDecodedList(
                    innerNilValuesElem,
                    'nilValue',
                    NAMESPACES.SWE, this._profileIDMap,
                    (nilValue) => this.decodeNilValue(nilValue));
            }
        }

        if (elem.hasAttribute('referenceFrame')) {
            component.referenceFrame = elem.getAttribute('referenceFrame');
        }

        if (elem.hasAttribute('axisID')) {
            component.axisId = elem.getAttribute('axisID');
        }
    }

    private decodeAbstractDataArray(elem: Element, component: SweDataArray): void {

        this.decodeAbstractDataComponent(elem, component);

        const elementCount = this.utils.getElement(elem, 'elementCount', NAMESPACES.SWE);
        if (elementCount != null && !isNaN(+elementCount.textContent)) {
            component.elementCount = +elementCount.textContent;
            this._profileIDMap = this.utils.processProfileID(elem, component, 'elementCount', this._profileIDMap);
        }

        const elementType = this.utils.getElement(elem, 'elementType', NAMESPACES.SWE);
        if (elementType != null) {
            const returnObject: ReturnObject<SweElementType> = this.decodeElementType(elementType);
            if (returnObject) {
                component.elementType = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(elem, component, 'elementType', this._profileIDMap);
            }
        }

        const encoding = this.utils.getElement(elem, 'encoding', NAMESPACES.SWE);
        if (encoding != null) {
            const returnObject: ReturnObject<SweEncoding> = this.decodeAbstractEncoding(encoding);
            if (returnObject) {
                component.encoding = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(
                    returnObject.docElement, component, 'encoding', this._profileIDMap
                );
            }
        }

        const values = this.utils.getElement(elem, 'values', NAMESPACES.SWE);
        if (values != null) {
            component.values = values.textContent;
            this._profileIDMap = this.utils.processProfileID(elem, component, 'values', this._profileIDMap);
        }
    }
}
