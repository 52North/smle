import { AbstractDataComponent } from '../../model/swe/AbstractDataComponent';
import { AbstractSimpleComponent } from '../../model/swe/AbstractSimpleComponent';
import { AbstractSWE } from '../../model/swe/AbstractSWE';
import { AbstractSWEIdentifiable } from '../../model/swe/AbstractSWEIdentifiable';
import { AllowedTimes } from '../../model/swe/AllowedTimes';
import { AllowedTokens } from '../../model/swe/AllowedTokens';
import { AllowedValues } from '../../model/swe/AllowedValues';
import { Namespaces } from './Namespaces';
import { SweAnyRange } from '../../model/swe/SweAnyRange';
import { SweAnyScalar } from '../../model/swe/SweAnyScalar';
import { SweBinaryBlock } from '../../model/swe/SweBinaryBlock';
import { SweBinaryComponent } from '../../model/swe/SweBinaryComponent';
import { SweBinaryEncoding } from '../../model/swe/SweBinaryEncoding';
import { SweBoolean } from '../../model/swe/SweBoolean';
import { SweByteEncoding } from '../../model/swe/SweByteEncoding';
import { SweByteOrder } from '../../model/swe/SweByteOrder';
import { SweCategory } from '../../model/swe/SweCategory';
import { SweCategoryRange } from '../../model/swe/SweCategoryRange';
import { SweCoordinate } from '../../model/swe/SweCoordinate';
import { SweCount } from '../../model/swe/SweCount';
import { SweCountRange } from '../../model/swe/SweCountRange';
import { SweDataArray } from '../../model/swe/SweDataArray';
import { SweDataChoice } from '../../model/swe/SweDataChoice';
import { SweDataChoiceItem } from '../../model/swe/SweDataChoiceItem';
import { SweDataComponent } from '../../model/swe/SweDataComponent';
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
import { DecoderUtils, ReturnObject } from './DecoderUtils';
import { BidiMap } from '../DynamicGUIService';
export class SweDecoder {

    private utils = new DecoderUtils();

     private _profileIDMap : BidiMap;

    public get profileIDMap() {
        return this._profileIDMap;
    }
    public set profileIDMap(profileIDMap: BidiMap) {
        this._profileIDMap = profileIDMap;
    }
    public decodeDataComponent(elem: Element): ReturnObject<AbstractDataComponent> {
        let vector = this.decodeVector(elem);
        if (vector != null) return vector;

        let dataRecord = this.decodeDataRecord(elem);
        if (dataRecord != null) return dataRecord;

        let matrix = this.decodeMatrix(elem);
        if (matrix != null) return matrix;

        let dataArray = this.decodeDataArray(elem);
        if (dataArray != null) return dataArray;

        let dataChoice = this.decodeDataChoice(elem);
        if (dataChoice != null) return dataChoice;

        let quantityRange = this.decodeQuantityRange(elem);
        if (quantityRange != null) return quantityRange;

        let timeRange = this.decodeTimeRange(elem);
        if (timeRange != null) return timeRange;

        let countRange = this.decodeCountRange(elem);
        if (countRange != null) return countRange;

        let categoryRange = this.decodeCategoryRange(elem);
        if (categoryRange != null) return categoryRange;

        let sweBoolean = this.decodeBoolean(elem);
        if (sweBoolean != null) return sweBoolean;

        let count = this.decodeCount(elem);
        if (count != null) return count;

        let quantity = this.decodeQuantity(elem);
        if (quantity != null) return quantity;

        let time = this.decodeTime(elem);
        if (time != null) return time;

        let category = this.decodeCategory(elem);
        if (category != null) return category;

        let text = this.decodeText(elem);
        if (text != null) return text;
    }

    public decodeCoordinate(node: Element): ReturnObject<SweCoordinate> {
        let coordinate = new SweCoordinate();

        if (node.hasAttribute('name')) {
            coordinate.name = node.getAttribute('name');
            this._profileIDMap = this.utils.processProfileID(node, coordinate, "name", this._profileIDMap);

        }
        let returnObject: ReturnObject<SweCount> = this.decodeCount(node);
        if (returnObject) {
            let count = returnObject.value;
            coordinate.coordinate = count;
        }
        if (coordinate.coordinate == null) {
            let returnObject: ReturnObject<SweQuantity> = this.decodeQuantity(node);
            if (returnObject) {
                coordinate.coordinate = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, coordinate, "coordinate", this._profileIDMap);
            }
        } else if (coordinate.coordinate == null) {
            let returnObject: ReturnObject<SweTime> = this.decodeTime(node);
            if (returnObject) {
                coordinate.coordinate = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, coordinate, "coordinate", this._profileIDMap);
            }

        }
        return new ReturnObject(coordinate, node);
    }

    public decodeVector(node: Element): ReturnObject<SweVector> {
        let vectorNode = this.utils.getElement(node, 'Vector', Namespaces.SWE);
        if (vectorNode != null) {
            let vector = new SweVector();

            this.decodeAbstractDataComponent(vectorNode, vector);

            vector.coordinates = this.utils.getDecodedList(
                vectorNode,
                'coordinate',
                Namespaces.SWE, this._profileIDMap,
                (coord) => this.decodeCoordinate(coord));

            if (vectorNode.hasAttribute('referenceFrame')) {
                vector.referenceFrame = vectorNode.getAttribute('referenceFrame');
                this._profileIDMap = this.utils.processProfileID(vectorNode, vector, "referenceFrame", this._profileIDMap);

            }

            if (vectorNode.hasAttribute('localFrame')) {
                vector.localFrame = vectorNode.getAttribute('localFrame');
                this._profileIDMap = this.utils.processProfileID(vectorNode, vector, "localFrame", this._profileIDMap);

            }

            return new ReturnObject(vector, vectorNode);
        }
    }

    public decodeField(fieldNode: Element): ReturnObject<SweField> {

        let field = new SweField();

        if (fieldNode.hasAttribute('name')) {
            field.name = fieldNode.getAttribute('name');
            this._profileIDMap = this.utils.processProfileID(fieldNode, field, "name", this._profileIDMap);

        }
        let returnObject: ReturnObject<AbstractDataComponent> = this.decodeDataComponent(fieldNode.firstElementChild);
        if (returnObject) {
            field.component = returnObject.value;
            this._profileIDMap = this.utils.processProfileID(returnObject.docElement, field, "component", this._profileIDMap);
        }

        return new ReturnObject(field, fieldNode);
    }

    public decodeDataRecord(elem: Element): ReturnObject<SweDataRecord> {
        let dataRecordElem = this.utils.getElement(elem, 'DataRecord', Namespaces.SWE);
        if (dataRecordElem != null) {
            let dataRecord = new SweDataRecord();

            this.decodeAbstractDataComponent(dataRecordElem, dataRecord);

            dataRecord.fields = this.utils.getDecodedList(
                dataRecordElem,
                'field',
                Namespaces.SWE, this._profileIDMap,
                (field) => this.decodeField(field));

            return new ReturnObject(dataRecord, dataRecordElem);
        }
    }

    public decodeDataStream(elem: Element): ReturnObject<SweDataStream> {
        let dataStreamElem = this.utils.getElement(elem, 'DataStream', Namespaces.SML);
        if (dataStreamElem != null) {
            let dataStream = new SweDataStream();

            this.decodeAbstractSweIdentifiable(dataStreamElem, dataStream);

            dataStream.elementCount = this.utils.getDecodedList(
                dataStreamElem,
                'elementCount',
                Namespaces.SWE, this._profileIDMap,
                (elemCount) => this.decodeCount(elemCount));
            let returnObject: ReturnObject<SweElementType> = this.decodeElementType(dataStreamElem);
            if (returnObject) {
                dataStream.elementType = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, dataStream, "elementType", this._profileIDMap);
            }

            let returnObject2: ReturnObject<SweEncoding> = this.decodeAbstractEncoding(dataStreamElem);
            if (returnObject2) {
                dataStream.encoding = returnObject2.value;
                this._profileIDMap = this.utils.processProfileID(returnObject2.docElement, dataStream, "encoding", this._profileIDMap);
            }
            return new ReturnObject(dataStream, dataStreamElem);
        }
    }

    public decodeMatrix(elem: Element): ReturnObject<SweMatrix> {
        let matrixElem = this.utils.getElement(elem, 'Matrix', Namespaces.SWE);
        if (matrixElem != null) {
            let matrix = new SweMatrix();

            this.decodeAbstractDataArray(matrixElem, matrix);

            if (matrixElem.hasAttribute('referenceFrame')) {
                matrix.referenceFrame = matrixElem.getAttribute('referenceFrame');
                this._profileIDMap = this.utils.processProfileID(matrixElem, matrix, "referenceFrame", this._profileIDMap);

            }

            if (matrixElem.hasAttribute('localFrame')) {
                matrix.localFrame = matrixElem.getAttribute('localFrame');
                this._profileIDMap = this.utils.processProfileID(matrixElem, matrix, "localFrame", this._profileIDMap);

            }

            return new ReturnObject(matrix, matrixElem);
        }
    }

    public decodeDataArray(elem: Element): ReturnObject<SweDataArray> {
        let dataArrayElem = this.utils.getElement(elem, 'DataArray', Namespaces.SWE);
        if (dataArrayElem != null) {
            let dataArray = new SweDataArray();

            this.decodeAbstractDataArray(dataArrayElem, dataArray);
            return new ReturnObject(dataArray, dataArrayElem);
        }
    }

    public decodeAbstractEncoding(elem: Element): ReturnObject<SweEncoding> {

        let textEncoding = this.decodeTextEncoding(elem);
        if (textEncoding != null) return textEncoding;

        let binaryEncoding = this.decodeBinaryEncoding(elem);
        if (binaryEncoding != null) return binaryEncoding;

        let xmlEncoding = this.decodeXmlEncoding(elem);
        if (xmlEncoding != null) return xmlEncoding;

        throw new Error('Unsupported encoding type');
    }

    public decodeTextEncoding(elem: Element): ReturnObject<SweTextEncoding> {
        let textEncodingElem = this.utils.getElement(elem, 'TextEncoding', Namespaces.SWE);
        if (textEncodingElem != null) {
            let textEncoding = new SweTextEncoding();

            this.decodeAbstractSwe(textEncodingElem, textEncoding);

            if (textEncodingElem.hasAttribute('collapseWhiteSpace')) {
                textEncoding.collapseWhiteSpace = textEncodingElem.getAttribute('collapseWhiteSpace') === 'true';
                this._profileIDMap = this.utils.processProfileID(textEncodingElem, textEncoding, "collapseWhiteSpace", this._profileIDMap);

            }

            if (textEncodingElem.hasAttribute('decimalSeperator')) {
                textEncoding.decimalSeperator = textEncodingElem.getAttribute('decimalSeperator');
                this._profileIDMap = this.utils.processProfileID(textEncodingElem, textEncoding, "decimalSeperator", this._profileIDMap);

            }

            if (textEncodingElem.hasAttribute('tokenSeperator')) {
                textEncoding.tokenSeperator = textEncodingElem.getAttribute('tokenSeperator');
                this._profileIDMap = this.utils.processProfileID(textEncodingElem, textEncoding, "tokenSeperator", this._profileIDMap);

            }

            if (textEncodingElem.hasAttribute('blockSeperator')) {
                textEncoding.blockSeperator = textEncodingElem.getAttribute('blockSeperator');
                this._profileIDMap = this.utils.processProfileID(textEncodingElem, textEncoding, "blockSeperator", this._profileIDMap);

            }

            return new ReturnObject(textEncoding, textEncodingElem);
        }
    }

    public decodeBinaryEncoding(elem: Element): ReturnObject<SweBinaryEncoding> {
        let binaryEncodingElem = this.utils.getElement(elem, 'BinaryEncoding', Namespaces.SWE);
        if (binaryEncodingElem != null) {
            let binaryEncoding = new SweBinaryEncoding();

            this.decodeAbstractSwe(binaryEncodingElem, binaryEncoding);

            if (binaryEncodingElem.hasAttribute('byteOrder')) {
                let byteOrder = binaryEncodingElem.getAttribute('byteOrder');
                if (byteOrder === 'bigEndian') {
                    binaryEncoding.byteOrder = 'bigEndian';
                    this._profileIDMap = this.utils.processProfileID(binaryEncodingElem, binaryEncoding, "byteOrder", this._profileIDMap);

                }
                if (byteOrder === 'littleEndian') {
                    binaryEncoding.byteOrder = 'littleEndian';
                    this._profileIDMap = this.utils.processProfileID(binaryEncodingElem, binaryEncoding, "byteOrder", this._profileIDMap);


                }
            }

            if (binaryEncodingElem.hasAttribute('byteEncoding')) {
                let byteEncoding = binaryEncodingElem.getAttribute('byteEncoding');
                if (byteEncoding === 'base64') {
                    binaryEncoding.byteEncoding = 'base64';
                    this._profileIDMap = this.utils.processProfileID(binaryEncodingElem, byteEncoding, "base64", this._profileIDMap);

                }
                if (byteEncoding === 'raw') {
                    binaryEncoding.byteEncoding = 'raw';
                    this._profileIDMap = this.utils.processProfileID(binaryEncodingElem, byteEncoding, "raw", this._profileIDMap);

                }
            }

            if (binaryEncodingElem.hasAttribute('byteLength') && !isNaN(+binaryEncodingElem.getAttribute('byteLength'))) {
                binaryEncoding.byteLength = +binaryEncodingElem.getAttribute('byteLength');
            }

            binaryEncoding.members = this.utils.getDecodedList(binaryEncodingElem, 'member', Namespaces.SWE, this._profileIDMap, (member) => {
                let component = this.decodeBinaryComponent(member);
                if (component != null) {
                    return new ReturnObject(component, member);
                }
                let block = this.decodeBinaryBlock(member);
                if (block != null) {
                    return new ReturnObject(block, member);;
                }
                return new ReturnObject(null, null);

            });

            return new ReturnObject(binaryEncoding, binaryEncodingElem);
        }
    }

    public decodeBinaryComponent(elem: Element): ReturnObject<SweBinaryComponent> {

        let componentElem = this.utils.getElement(elem, 'Component', Namespaces.SWE);
        if (componentElem != null) {
            let component = new SweBinaryComponent();

            this.decodeAbstractSwe(componentElem, component);

            if (componentElem.hasAttribute('encryption')) {
                component.encryption = componentElem.getAttribute('encryption');
                this._profileIDMap = this.utils.processProfileID(componentElem, component, "encryption", this._profileIDMap);

            }

            if (componentElem.hasAttribute('significantBits') && !isNaN(+componentElem.getAttribute('significantBits'))) {
                component.significantBits = +componentElem.getAttribute('significantBits');
                this._profileIDMap = this.utils.processProfileID(componentElem, component, "significantBits", this._profileIDMap);

            }

            if (componentElem.hasAttribute('bitLength') && !isNaN(+componentElem.getAttribute('bitLength'))) {
                component.bitLength = +componentElem.getAttribute('bitLength');
                this._profileIDMap = this.utils.processProfileID(componentElem, component, "bitLength", this._profileIDMap);

            }

            if (componentElem.hasAttribute('byteLength') && !isNaN(+componentElem.getAttribute('byteLength'))) {
                component.byteLength = +componentElem.getAttribute('byteLength');
                this._profileIDMap = this.utils.processProfileID(componentElem, component, "byteLength", this._profileIDMap);

            }

            if (componentElem.hasAttribute('dataType')) {
                component.dataType = componentElem.getAttribute('dataType');
                this._profileIDMap = this.utils.processProfileID(componentElem, component, "paddingBytesAfter", this._profileIDMap);

            }

            if (componentElem.hasAttribute('ref')) {
                component.ref = componentElem.getAttribute('ref');
                this._profileIDMap = this.utils.processProfileID(componentElem, component, "ref", this._profileIDMap);

            }

            return new ReturnObject(component, componentElem);
        }
    }

    public decodeBinaryBlock(elem: Element): ReturnObject<SweBinaryBlock> {

        let blockElem = this.utils.getElement(elem, 'Block', Namespaces.SWE);
        if (blockElem != null) {
            let block = new SweBinaryBlock();

            this.decodeAbstractSwe(blockElem, block);

            if (blockElem.hasAttribute('compression')) {
                block.compression = blockElem.getAttribute('compression');
            }

            if (blockElem.hasAttribute('encryption')) {
                block.encryption = blockElem.getAttribute('encryption');
                this._profileIDMap = this.utils.processProfileID(blockElem, block, "encryption", this._profileIDMap);

            }

            if (blockElem.hasAttribute('paddingBytes-after') && !isNaN(+blockElem.getAttribute('paddingBytes-after'))) {
                block.paddingBytesAfter = +blockElem.getAttribute('paddingBytes-after');
                this._profileIDMap = this.utils.processProfileID(blockElem, block, "paddingBytesAfter", this._profileIDMap);

            }

            if (blockElem.hasAttribute('paddingBytes-before') && !isNaN(+blockElem.getAttribute('paddingBytes-before'))) {
                block.paddingBytesBefore = +blockElem.getAttribute('paddingBytes-before');
                this._profileIDMap = this.utils.processProfileID(blockElem, block, "paddingBytesAfter", this._profileIDMap);

            }

            if (blockElem.hasAttribute('byteLength') && !isNaN(+blockElem.getAttribute('byteLength'))) {
                block.byteLength = +blockElem.getAttribute('byteLength');
                this._profileIDMap = this.utils.processProfileID(blockElem, block, "byteLength", this._profileIDMap);

            }

            if (blockElem.hasAttribute('ref')) {
                block.ref = blockElem.getAttribute('ref');
                this._profileIDMap = this.utils.processProfileID(blockElem, block, "ref", this._profileIDMap);

            }

            return new ReturnObject(block, blockElem);
        }
    }


    public decodeXmlEncoding(elem: Element): ReturnObject<SweXmlEncoding> {
        let xmlEncodingElem = this.utils.getElement(elem, 'XMLEncoding', Namespaces.SWE);
        if (xmlEncodingElem != null) {
            let xmlEncoding = new SweXmlEncoding();

            this.decodeAbstractSwe(xmlEncodingElem, xmlEncoding);

            return new ReturnObject(xmlEncoding, elem);
        }
    }

    public decodeElementType(elem: Element): ReturnObject<SweElementType> {
        let elementTypeElem = this.utils.getElement(elem, 'elementType', Namespaces.SWE);
        if (elementTypeElem != null) {
            let elementType = new SweElementType();

            if (elementTypeElem.hasAttribute('name')) {
                elementType.name = elementTypeElem.getAttribute('name');
                this._profileIDMap = this.utils.processProfileID(elementTypeElem, elementType, "name", this._profileIDMap);

            }
            let returnObject: ReturnObject<AbstractDataComponent> = this.decodeDataComponent(elementTypeElem.firstElementChild);
            if (returnObject) {
                elementType.type = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(elementTypeElem, elementType, "type", this._profileIDMap);
            }
            return new ReturnObject(elementType, elementTypeElem);
        }
    }

    public decodeDataChoice(elem: Element): ReturnObject<SweDataChoice> {
        let dataChoiceElem = this.utils.getElement(elem, 'DataChoice', Namespaces.SWE);
        if (dataChoiceElem != null) {
            let dataChoice = new SweDataChoice();

            this.decodeAbstractDataComponent(dataChoiceElem, dataChoice);

            dataChoice.choiceValue = this.utils.getDecodedList(
                dataChoiceElem,
                'choiceValue',
                Namespaces.SWE, this._profileIDMap,
                (value) => this.decodeCategory(value));

            dataChoice.items = this.utils.getDecodedList(
                dataChoiceElem,
                'item',
                Namespaces.SWE, this._profileIDMap,
                (item) => this.decodeDataChoiceItem(item));

            return new ReturnObject(dataChoice, dataChoiceElem);
        }
    }

    public decodeDataChoiceItem(elem: Element): ReturnObject<SweDataChoiceItem> {
        let dataChoiceItem = new SweDataChoiceItem();

        if (elem.hasAttribute('name')) {
            dataChoiceItem.name = elem.getAttribute('name');
            this._profileIDMap = this.utils.processProfileID(elem, dataChoiceItem, "name", this._profileIDMap);

        }

        if (elem.firstElementChild != null) {
            let returnObject: ReturnObject<AbstractDataComponent> = this.decodeDataComponent(elem.firstElementChild);
            if (returnObject) {
                dataChoiceItem.item = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, dataChoiceItem, "item", this._profileIDMap);
            }
        }

        return new ReturnObject(dataChoiceItem, elem);
    }

    public decodeUnitOfMeasure(elem: Element): ReturnObject<UnitOfMeasure> {
        let uomElem = this.utils.getElement(elem, 'uom', Namespaces.SWE);
        if (uomElem != null) {
            let uom = new UnitOfMeasure();

            if (uomElem.hasAttribute('code')) {
                uom.code = uomElem.getAttribute('code');
                this._profileIDMap = this.utils.processProfileID(elem, uom, "code", this._profileIDMap);

            }
            if (uomElem.hasAttribute('href')) {
                uom.href = uomElem.getAttribute('href');
                this._profileIDMap = this.utils.processProfileID(elem, uom, "href", this._profileIDMap);

            }
            return new ReturnObject(uom, uomElem);
        }
    }

    public decodeQuantityRange(elem: Element): ReturnObject<SweQuantityRange> {
        let quantityRangeElem = this.utils.getElement(elem, 'QuantityRange', Namespaces.SWE);
        if (quantityRangeElem != null) {
            let quantityRange = new SweQuantityRange();

            this.decodeAbstractSimpleComponent(quantityRangeElem, quantityRange);

            let returnObject: ReturnObject<UnitOfMeasure> = this.decodeUnitOfMeasure(elem);
            if (returnObject) {
                quantityRange.uom = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, quantityRange, "uom", this._profileIDMap);
            }

            let constraint = this.utils.getElement(quantityRangeElem, 'constraint', Namespaces.SWE);
            if (constraint != null) {
                let returnObject: ReturnObject<AllowedValues> = this.decodeAllowedValues(constraint);
                if (returnObject) {
                    quantityRange.constraint = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(returnObject.docElement, quantityRange, "constraint", this._profileIDMap);
                }
            }

            let valueElem = this.utils.getElement(quantityRangeElem, 'value', Namespaces.SWE);
            if (valueElem != null) {
                let values = valueElem.textContent.split(' ');
                if (values.length === 2 && !isNaN(+values[0]) && !isNaN(+values[1])) {
                    quantityRange.value = [+values[0], +values[1]];
                    this._profileIDMap = this.utils.processProfileID(valueElem, quantityRange, "value", this._profileIDMap);

                }
            }

            return new ReturnObject(quantityRange, quantityRangeElem);
        }
    }

    public decodeTimeRange(elem: Element): ReturnObject<SweTimeRange> {
        let timeRangeElem = this.utils.getElement(elem, 'TimeRange', Namespaces.SWE);
        if (timeRangeElem != null) {
            let timeRange = new SweTimeRange();

            this.decodeAbstractSimpleComponent(timeRangeElem, timeRange);

            let returnObject: ReturnObject<UnitOfMeasure> = this.decodeUnitOfMeasure(timeRangeElem);
            if (returnObject) {
                timeRange.uom = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, timeRange, "uom", this._profileIDMap);
            }
            let valueElem = this.utils.getElement(timeRangeElem, 'value', Namespaces.SWE);
            if (valueElem != null) {
                let values = valueElem.textContent.split(' ');
                if (values.length === 2) {
                    let start, end;
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
                    this._profileIDMap = this.utils.processProfileID(timeRangeElem, timeRange, "value", this._profileIDMap);

                }
            }

            let constraint = this.utils.getElement(timeRangeElem, 'constraint', Namespaces.SWE);
            if (constraint != null) {
                let returnObject: ReturnObject<AllowedTimes> = this.decodeAllowedTimes(constraint);
                if (returnObject) {
                    timeRange.constraint = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(returnObject.docElement, timeRange, "constraint", this._profileIDMap);
                }
            }

            if (timeRangeElem.hasAttribute('referenceTime')) {
                let timeStr = timeRangeElem.getAttribute('referenceTime');
                if (!isNaN(Date.parse(timeStr))) {
                    timeRange.referenceTime = new Date(Date.parse(timeStr));
                    this._profileIDMap = this.utils.processProfileID(timeRangeElem, timeRange, "uom", this._profileIDMap);

                }
            }

            if (timeRangeElem.hasAttribute('localFrame')) {
                timeRange.localFrame = timeRangeElem.getAttribute('localFrame');
                this._profileIDMap = this.utils.processProfileID(timeRangeElem, timeRange, "localFrame", this._profileIDMap);

            }

            return new ReturnObject(timeRange, timeRangeElem);
        }
    }

    public decodeCountRange(elem: Element): ReturnObject<SweCountRange> {
        let countRangeElem = this.utils.getElement(elem, 'CountRange', Namespaces.SWE);
        if (countRangeElem != null) {
            let countRange = new SweCountRange();

            this.decodeAbstractSimpleComponent(countRangeElem, countRange);

            let constraint = this.utils.getElement(countRangeElem, 'constraint', Namespaces.SWE);
            if (constraint != null) {
                let returnObject: ReturnObject<AllowedValues> = this.decodeAllowedValues(constraint);
                if (returnObject) {
                    countRange.constraint = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(returnObject.docElement, countRange, "constraint", this._profileIDMap);
                }
            }

            let valueElem = this.utils.getElement(countRangeElem, 'value', Namespaces.SWE);
            if (valueElem != null) {
                let values = valueElem.textContent.split(' ');
                if (values.length === 2 && !isNaN(+values[0]) && !isNaN(+values[1])) {
                    countRange.value = [+values[0], +values[1]];
                    this._profileIDMap = this.utils.processProfileID(valueElem, countRange, "value", this._profileIDMap);

                }
            }

            return new ReturnObject(countRange, countRangeElem);
        }
    }

    public decodeConstraint(elem: Element): ReturnObject<AllowedTimes | AllowedTokens | AllowedValues> {
        let allowedTimes = this.decodeAllowedTimes(elem);
        if (allowedTimes != null) return allowedTimes;

        let allowedTokens = this.decodeAllowedTokens(elem);
        if (allowedTokens != null) return allowedTokens;

        let allowedValues = this.decodeAllowedValues(elem);
        if (allowedValues != null) return allowedValues;

        throw new Error('Unsupported constraint type');
    }

    public decodeCategoryRange(elem: Element): ReturnObject<SweCategoryRange> {
        let categoryRangeElem = this.utils.getElement(elem, 'CategoryRange', Namespaces.SWE);
        if (categoryRangeElem != null) {
            let categoryRange = new SweCategoryRange();

            this.decodeAbstractSimpleComponent(categoryRangeElem, categoryRange);

            let returnObject: ReturnObject<string> = this.utils.getAttributeOfElement(categoryRangeElem, 'codeSpace', Namespaces.SWE, 'href', Namespaces.XLINK);
            if (returnObject) {
                categoryRange.codeSpace = returnObject.value;
                if (categoryRange.codeSpace) {
                    this._profileIDMap = this.utils.processProfileID(returnObject.docElement, categoryRange, "codeSpace", this._profileIDMap);
                }
            }

            let constraintElem = this.utils.getElement(categoryRangeElem, 'constraint', Namespaces.SWE);
            if (constraintElem != null) {
                let returnObject: ReturnObject<AllowedTokens> = this.decodeAllowedTokens(constraintElem);
                if (returnObject) {
                    categoryRange.constraint = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(returnObject.docElement, categoryRange, "constraint", this._profileIDMap);
                }
            }

            let valueElem = this.utils.getElement(categoryRangeElem, 'value', Namespaces.SWE);
            if (valueElem != null) {
                let values = valueElem.textContent.split(' ');
                if (values.length === 2) {
                    categoryRange.value = [values[0], values[1]];
                    this._profileIDMap = this.utils.processProfileID(valueElem, categoryRange, "value", this._profileIDMap);

                }
            }

            return new ReturnObject(categoryRange, categoryRangeElem);
        }
    }

    public decodeBoolean(elem: Element): ReturnObject<SweBoolean> {
        let boolElem = this.utils.getElement(elem, 'Boolean', Namespaces.SWE);
        if (boolElem != null) {
            let bool = new SweBoolean();

            this.decodeAbstractSimpleComponent(boolElem, bool);

            let value = this.utils.getElement(boolElem, 'value', Namespaces.SWE);
            if (value != null) {
                bool.value = value.textContent === 'true';
                this._profileIDMap = this.utils.processProfileID(boolElem, bool, "value", this._profileIDMap);

            }

            return new ReturnObject(bool, boolElem);
        }
    }

    public decodeCount(elem: Element): ReturnObject<SweCount> {
        let countElem = this.utils.getElement(elem, 'Count', Namespaces.SWE);
        if (countElem != null) {
            let count = new SweCount();

            this.decodeAbstractSimpleComponent(countElem, count);

            let constraint = this.utils.getElement(countElem, 'constraint', Namespaces.SWE);
            if (constraint != null) {
                let returnObject: ReturnObject<AllowedValues> = this.decodeAllowedValues(constraint);
                if (returnObject) {
                    count.constraint = returnObject.value
                    this._profileIDMap = this.utils.processProfileID(countElem, count, "constraint", this._profileIDMap);
                }
            }

            let value = this.utils.getElement(countElem, 'value', Namespaces.SWE);
            if (value != null && !isNaN(+value.textContent)) {
                count.value = +value.textContent;
                this._profileIDMap = this.utils.processProfileID(countElem, count, "value", this._profileIDMap);

            }

            return new ReturnObject(count, countElem);
        }
    }

    public decodeQuantity(elem: Element): ReturnObject<SweQuantity> {
        let quantityElem = this.utils.getElement(elem, 'Quantity', Namespaces.SWE);
        if (quantityElem != null) {
            let quantity = new SweQuantity();

            this.decodeAbstractSimpleComponent(quantityElem, quantity);

            let constraint = this.utils.getElement(quantityElem, 'constraint', Namespaces.SWE);
            if (constraint != null) {
                let returnObject: ReturnObject<AllowedValues> = this.decodeAllowedValues(constraint);
                if (returnObject) {
                    quantity.constraint = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(returnObject.docElement, quantity, "constraint", this._profileIDMap);
                }
            }

            let value = this.utils.getElement(quantityElem, 'value', Namespaces.SWE);
            if (value != null && !isNaN(+value.textContent)) {
                quantity.value = +value.textContent;
                this._profileIDMap = this.utils.processProfileID(quantityElem, quantity, "value", this._profileIDMap);

            }
            let returnObject: ReturnObject<UnitOfMeasure> = this.decodeUnitOfMeasure(quantityElem);
            if (returnObject) {
                quantity.uom = returnObject.value;
                if (quantity.uom) {
                    this._profileIDMap = this.utils.processProfileID(quantityElem, quantity, "uom", this._profileIDMap);
                }
            }
            return new ReturnObject(quantity, quantityElem);
        }
    }

    public decodeTime(elem: Element): ReturnObject<SweTime> {
        let timeElem = this.utils.getElement(elem, 'Time', Namespaces.SWE);
        if (timeElem != null) {
            let time = new SweTime();

            this.decodeAbstractSimpleComponent(timeElem, time);

            let returnObject: ReturnObject<UnitOfMeasure> = this.decodeUnitOfMeasure(timeElem);
            if (returnObject) {
                time.uom = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(timeElem, time, "uom", this._profileIDMap);
            }
            let constraint = this.utils.getElement(timeElem, 'constraint', Namespaces.SWE);
            if (constraint != null) {
                let returnObject: ReturnObject<AllowedTimes> = this.decodeAllowedTimes(constraint);
                if (returnObject) {
                    time.constraint = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(returnObject.docElement, time, "constraint", this._profileIDMap);
                }
            }

            if (timeElem.hasAttribute('referenceTime')) {
                time.referenceTime = new Date(timeElem.getAttribute('referenceTime'));
                this._profileIDMap = this.utils.processProfileID(timeElem, time, "referenceTime", this._profileIDMap);

            }

            if (timeElem.hasAttribute('localFrame')) {
                time.localFrame = timeElem.getAttribute('localFrame');
                this._profileIDMap = this.utils.processProfileID(timeElem, time, "localFrame", this._profileIDMap);

            }

            let value = this.utils.getElement(timeElem, 'value', Namespaces.SWE);
            if (value != null) {
                if (!isNaN(Date.parse(value.textContent))) {
                    time.value = new Date(Date.parse(value.textContent));
                    this._profileIDMap = this.utils.processProfileID(timeElem, time, "value", this._profileIDMap);

                } else if (value.textContent === 'now') {
                    time.value = 'now';
                    this._profileIDMap = this.utils.processProfileID(timeElem, time, "value", this._profileIDMap);

                }
            }

            return new ReturnObject(time, timeElem);
        }
    }

    public decodeCategory(elem: Element): ReturnObject<SweCategory> {
        let catElem = this.utils.getElement(elem, 'Category', Namespaces.SWE);
        if (catElem != null) {
            let category = new SweCategory();

            this.decodeAbstractSimpleComponent(catElem, category);


            let returnObject: ReturnObject<string> = this.utils.getAttributeOfElement(catElem, 'codeSpace', Namespaces.SWE, 'href', Namespaces.XLINK);
            if (returnObject) {
            category.codeSpace = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(returnObject.docElement, category, "constraint", this._profileIDMap);
            }

            let constraint = this.utils.getElement(catElem, 'constraint', Namespaces.SWE);
            if (constraint != null) {
                let returnObject: ReturnObject<AllowedTokens> = this.decodeAllowedTokens(constraint);
                if (returnObject) {
                    category.constraint = returnObject.value;
                    this._profileIDMap = this.utils.processProfileID(returnObject.docElement, category, "constraint", this._profileIDMap);
                }
            }

            let value = this.utils.getElement(catElem, 'value', Namespaces.SWE);
            if (value != null) {
                category.value = value.textContent;
                this._profileIDMap = this.utils.processProfileID(value, category, "value", this._profileIDMap);

            }

            return new ReturnObject(category, catElem);
        }
    }

    public decodeText(elem: Element): ReturnObject<SweText> {
        let textElem = this.utils.getElement(elem, 'Text', Namespaces.SWE);
        if (textElem != null) {
            let text = new SweText();

            this.decodeAbstractSimpleComponent(textElem, text);

            let constraint = this.utils.getElement(textElem, 'constraint', Namespaces.SWE);
            if (constraint != null) {
                let returnObject: ReturnObject<AllowedTokens> = this.decodeAllowedTokens(constraint);
              if (returnObject) {  text.constraint = returnObject.value;
                this._profileIDMap = this.utils.processProfileID(constraint, text, "constraint", this._profileIDMap);
              }
            }

            let value = this.utils.getElement(textElem, 'value', Namespaces.SWE);
            if (value != null) {
                text.value = value.textContent;
                this._profileIDMap = this.utils.processProfileID(value, text, "value", this._profileIDMap);

            }

            return new ReturnObject(text, textElem);
        }
    }

    public decodeAllowedTokens(elem: Element): ReturnObject<AllowedTokens> {
        let allowedTokensElem = this.utils.getElement(elem, 'AllowedTokens', Namespaces.SWE);
        if (allowedTokensElem != null) {
            let allowedTokens = new AllowedTokens();

            this.decodeAbstractSwe(allowedTokensElem, allowedTokens);

            this.utils.getDecodedList(
                allowedTokensElem,
                'value',
                Namespaces.SWE, this._profileIDMap,
                (v) => new ReturnObject(allowedTokens.values.push(v.textContent), allowedTokensElem));

            let pattern = this.utils.getElement(allowedTokensElem, 'pattern', Namespaces.SWE);
            if (pattern != null) {
                allowedTokens.pattern = pattern.textContent;
                this._profileIDMap = this.utils.processProfileID(pattern, allowedTokens, "pattern", this._profileIDMap);

            }

            return new ReturnObject(allowedTokens, allowedTokensElem);
        }
    }

    public decodeAllowedValues(elem: Element): ReturnObject<AllowedValues> {
        let allowedValuesElem = this.utils.getElement(elem, 'AllowedValues', Namespaces.SWE);
        if (allowedValuesElem != null) {
            let allowedValues = new AllowedValues();


            this.decodeAbstractSwe(allowedValuesElem, allowedValues);

            let significantFigures = this.utils.getElement(allowedValuesElem, 'significantFigures', Namespaces.SWE);
            if (significantFigures != null && !isNaN(+significantFigures.textContent)) {
                allowedValues.significantFigures = +significantFigures.textContent;
                this._profileIDMap = this.utils.processProfileID(significantFigures, allowedValues, "significantFigures", this._profileIDMap);
            }
            allowedValues.values = this.utils.getDecodedList(allowedValuesElem, 'value', Namespaces.SWE, this._profileIDMap, (v) => {
                if (v.textContent != null && !isNaN(+v.textContent)) {
                    return new ReturnObject(+v.textContent, v);
                }
                return new ReturnObject(null, null);
            });

            allowedValues.values = this.utils.getDecodedList(allowedValuesElem, 'interval', Namespaces.SWE, this._profileIDMap, (v) => {
                if (v.textContent != null) {
                    let interval = v.textContent.split(' ');
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
        let allowedTimesElem = this.utils.getElement(elem, 'AllowedTimes', Namespaces.SWE);
        if (allowedTimesElem != null) {
            let allowedTimes = new AllowedTimes();

            this.decodeAbstractSwe(allowedTimesElem, allowedTimes);

            let significantFigures = this.utils.getElement(allowedTimesElem, 'significantFigures', Namespaces.SWE);
            if (significantFigures != null && !isNaN(+significantFigures.textContent)) {
                allowedTimes.significantFigures = +significantFigures.textContent;
                this._profileIDMap = this.utils.processProfileID(allowedTimesElem, allowedTimes, "significantFigures", this._profileIDMap);

            }

            allowedTimes.values = this.utils.getDecodedList(allowedTimesElem, 'value', Namespaces.SWE, this._profileIDMap, (elem) => {
                if (!isNaN(Date.parse(elem.textContent))) {
                    return new ReturnObject(new Date(Date.parse(elem.textContent)), elem);
                }
                return new ReturnObject(null, null);
            });

            allowedTimes.values = this.utils.getDecodedList(allowedTimesElem, 'interval', Namespaces.SWE, this._profileIDMap, (elem) => {
                let interval = elem.textContent.split(' ');
                if (interval.length === 2 && !isNaN(Date.parse(interval[0])) && !isNaN(Date.parse(interval[1]))) {
                    return new ReturnObject([new Date(Date.parse(interval[0])), new Date(Date.parse(interval[1]))], elem);
                }
                return new ReturnObject(null, null);
            });

            return new ReturnObject(allowedTimes, allowedTimesElem);
        }
    }

    public decodeNilValue(elem: Element): ReturnObject<SweNilValue> {
        let nilValue = new SweNilValue();

        if (elem.hasAttribute('reason')) {
            nilValue.reason = elem.getAttribute('reason');
            this._profileIDMap = this.utils.processProfileID(elem, nilValue, "reason", this._profileIDMap);

        }

        nilValue.value = elem.textContent;
        this._profileIDMap = this.utils.processProfileID(elem, nilValue, "value", this._profileIDMap);


        return new ReturnObject(nilValue, elem);
    }

    public decodeQuality(elem: Element): ReturnObject<SweQuality> {
        let quantity = this.decodeQuantity(elem);
        if (quantity != null) return quantity;

        let quantityRange = this.decodeQuantityRange(elem);
        if (quantityRange != null) return quantityRange;

        let category = this.decodeCategory(elem);
        if (category != null) return category;

        let text = this.decodeText(elem);
        if (text != null) return text;
    }

    public decodeAbstractSwe(elem: Element, component: AbstractSWE): void {
        if (elem.hasAttribute('id')) {
            component.id = elem.getAttribute('id');
        }
        // TODO add extension
    }

    public decodeAbstractSweIdentifiable(elem: Element, object: AbstractSWEIdentifiable): void {
        this.decodeAbstractSwe(elem, object);

        if (elem.getElementsByTagNameNS(Namespaces.SWE, 'identifier').length === 1) {
            object.identifier = elem.getElementsByTagNameNS(Namespaces.SWE, 'identifier')[0].textContent;
        }

        if (elem.getElementsByTagNameNS(Namespaces.SWE, 'label').length === 1) {
            object.label = elem.getElementsByTagNameNS(Namespaces.SWE, 'label')[0].textContent;
        }

        if (elem.getElementsByTagNameNS(Namespaces.SWE, 'description').length === 1) {
            object.description = elem.getElementsByTagNameNS(Namespaces.SWE, 'description')[0].textContent;
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
            Namespaces.SWE, this._profileIDMap,
            (quality) => this.decodeQuality(quality));

        let outerNilValuesElem = this.utils.getElement(elem, 'nilValues', Namespaces.SWE);
        if (outerNilValuesElem != null) {
            let innerNilValuesElem = this.utils.getElement(outerNilValuesElem, 'NilValues', Namespaces.SWE);
            if (innerNilValuesElem != null) {
                component.nilValues = this.utils.getDecodedList(
                    innerNilValuesElem,
                    'nilValue',
                    Namespaces.SWE, this._profileIDMap,
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

        let elementCount = this.utils.getElement(elem, 'elementCount', Namespaces.SWE);
        if (elementCount != null && !isNaN(+elementCount.textContent)) {
            component.elementCount = +elementCount.textContent;
            this._profileIDMap = this.utils.processProfileID(elem, component, "elementCount", this._profileIDMap);

        }

        let elementType = this.utils.getElement(elem, 'elementType', Namespaces.SWE);
        if (elementType != null) {
            let returnObject: ReturnObject<SweElementType> = this.decodeElementType(elementType);
         if (returnObject) {   component.elementType = returnObject.value;
            this._profileIDMap = this.utils.processProfileID(elem, component, "elementType", this._profileIDMap);
         }
        }

        let encoding = this.utils.getElement(elem, 'encoding', Namespaces.SWE);
        if (encoding != null) {
            let returnObject: ReturnObject<SweEncoding> = this.decodeAbstractEncoding(encoding);
          if (returnObject) {  component.encoding = returnObject.value;
            this._profileIDMap = this.utils.processProfileID(returnObject.docElement, component, "encoding", this._profileIDMap);
          }
        }

        let values = this.utils.getElement(elem, 'values', Namespaces.SWE);
        if (values != null) {
            component.values = values.textContent;
            this._profileIDMap = this.utils.processProfileID(elem, component, "values", this._profileIDMap);

        }
    }
}
