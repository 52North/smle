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

export class SweDecoder {

    private utils = new DecoderUtils();

    public decodeDataComponent(elem: Element): AbstractDataComponent {
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

    public decodeCoordinate(node: Element): SweCoordinate {
        let coordinate = new SweCoordinate();

        if (node.hasAttribute('name')) {
            coordinate.name = node.getAttribute('name');
        }

        let count = this.decodeCount(node);
        coordinate.coordinate = count;
        if (coordinate.coordinate == null) {
            coordinate.coordinate = this.decodeQuantity(node);
        } else if (coordinate.coordinate == null) {
            coordinate.coordinate = this.decodeTime(node);
        }
        return coordinate;
    }

    public decodeVector(node: Element): SweVector {
        let vectorNode = this.utils.getElement(node, 'Vector', NAMESPACES.SWE);
        if (vectorNode != null) {
            let vector = new SweVector();

            this.decodeAbstractDataComponent(vectorNode, vector);

            vector.coordinates = this.utils.getDecodedList(
                vectorNode,
                'coordinate',
                NAMESPACES.SWE,
                (coord) => this.decodeCoordinate(coord));

            if (vectorNode.hasAttribute('referenceFrame')) {
                vector.referenceFrame = vectorNode.getAttribute('referenceFrame');
            }

            if (vectorNode.hasAttribute('localFrame')) {
                vector.localFrame = vectorNode.getAttribute('localFrame');
            }

            return vector;
        }
    }

    public decodeField(fieldNode: Element): SweField {

        let field = new SweField();

        if (fieldNode.hasAttribute('name')) {
            field.name = fieldNode.getAttribute('name');
        }

        field.component = this.decodeDataComponent(fieldNode.firstElementChild);

        return field;
    }

    public decodeDataRecord(elem: Element): SweDataRecord {
        let dataRecordElem = this.utils.getElement(elem, 'DataRecord', NAMESPACES.SWE);
        if (dataRecordElem != null) {
            let dataRecord = new SweDataRecord();

            this.decodeAbstractDataComponent(dataRecordElem, dataRecord);

            dataRecord.fields = this.utils.getDecodedList(
                dataRecordElem,
                'field',
                NAMESPACES.SWE,
                (field) => this.decodeField(field));

            return dataRecord;
        }
    }

    public decodeDataStream(elem: Element): SweDataStream {
        let dataStreamElem = this.utils.getElement(elem, 'DataStream', NAMESPACES.SML);
        if (dataStreamElem != null) {
            let dataStream = new SweDataStream();

            this.decodeAbstractSweIdentifiable(dataStreamElem, dataStream);

            dataStream.elementCount = this.utils.getDecodedList(
                dataStreamElem,
                'elementCount',
                NAMESPACES.SWE,
                (elemCount) => this.decodeCount(elemCount));

            dataStream.elementType = this.decodeElementType(dataStreamElem);

            dataStream.encoding = this.decodeAbstractEncoding(dataStreamElem);

            return dataStream;
        }
    }

    public decodeMatrix(elem: Element): SweMatrix {
        let matrixElem = this.utils.getElement(elem, 'Matrix', NAMESPACES.SWE);
        if (matrixElem != null) {
            let matrix = new SweMatrix();

            this.decodeAbstractDataArray(matrixElem, matrix);

            if (matrixElem.hasAttribute('referenceFrame')) {
                matrix.referenceFrame = matrixElem.getAttribute('referenceFrame');
            }

            if (matrixElem.hasAttribute('localFrame')) {
                matrix.localFrame = matrixElem.getAttribute('localFrame');
            }

            return matrix;
        }
    }

    public decodeDataArray(elem: Element): SweDataArray {
        let dataArrayElem = this.utils.getElement(elem, 'DataArray', NAMESPACES.SWE);
        if (dataArrayElem != null) {
            let dataArray = new SweDataArray();
            this.decodeAbstractDataArray(dataArrayElem, dataArray);
            return dataArray;
        }
    }

    public decodeAbstractEncoding(elem: Element): SweEncoding {

        let textEncoding = this.decodeTextEncoding(elem);
        if (textEncoding != null) return textEncoding;

        let binaryEncoding = this.decodeBinaryEncoding(elem);
        if (binaryEncoding != null) return binaryEncoding;

        let xmlEncoding = this.decodeXmlEncoding(elem);
        if (xmlEncoding != null) return xmlEncoding;

        throw new Error('Unsupported encoding type');
    }

    public decodeTextEncoding(elem: Element): SweTextEncoding {
        let textEncodingElem = this.utils.getElement(elem, 'TextEncoding', NAMESPACES.SWE);
        if (textEncodingElem != null) {
            let textEncoding = new SweTextEncoding();

            this.decodeAbstractSwe(textEncodingElem, textEncoding);

            if (textEncodingElem.hasAttribute('collapseWhiteSpace')) {
                textEncoding.collapseWhiteSpace = textEncodingElem.getAttribute('collapseWhiteSpace') === 'true';
            }

            if (textEncodingElem.hasAttribute('decimalSeperator')) {
                textEncoding.decimalSeperator = textEncodingElem.getAttribute('decimalSeperator');
            }

            if (textEncodingElem.hasAttribute('tokenSeperator')) {
                textEncoding.tokenSeperator = textEncodingElem.getAttribute('tokenSeperator');
            }

            if (textEncodingElem.hasAttribute('blockSeperator')) {
                textEncoding.blockSeperator = textEncodingElem.getAttribute('blockSeperator');
            }

            return textEncoding;
        }
    }

    public decodeBinaryEncoding(elem: Element): SweBinaryEncoding {
        let binaryEncodingElem = this.utils.getElement(elem, 'BinaryEncoding', NAMESPACES.SWE);
        if (binaryEncodingElem != null) {
            let binaryEncoding = new SweBinaryEncoding();

            this.decodeAbstractSwe(binaryEncodingElem, binaryEncoding);

            if (binaryEncodingElem.hasAttribute('byteOrder')) {
                let byteOrder = binaryEncodingElem.getAttribute('byteOrder');
                if (byteOrder === 'bigEndian') binaryEncoding.byteOrder = 'bigEndian';
                if (byteOrder === 'littleEndian') binaryEncoding.byteOrder = 'littleEndian';
            }

            if (binaryEncodingElem.hasAttribute('byteEncoding')) {
                let byteEncoding = binaryEncodingElem.getAttribute('byteEncoding');
                if (byteEncoding === 'base64') binaryEncoding.byteEncoding = 'base64';
                if (byteEncoding === 'raw') binaryEncoding.byteEncoding = 'raw';
            }

            if (binaryEncodingElem.hasAttribute('byteLength') &&
                !isNaN(+binaryEncodingElem.getAttribute('byteLength'))) {
                binaryEncoding.byteLength = +binaryEncodingElem.getAttribute('byteLength');
            }

            this.utils.getDecodedList(binaryEncodingElem, 'member', NAMESPACES.SWE, (member) => {
                let component = this.decodeBinaryComponent(member);
                if (component != null) binaryEncoding.members.push(component);
                let block = this.decodeBinaryBlock(member);
                if (block != null) binaryEncoding.members.push(block);
            });

            return binaryEncoding;
        }
    }

    public decodeBinaryComponent(elem: Element): SweBinaryComponent {

        let componentElem = this.utils.getElement(elem, 'Component', NAMESPACES.SWE);
        if (componentElem != null) {
            let component = new SweBinaryComponent();

            this.decodeAbstractSwe(componentElem, component);

            if (componentElem.hasAttribute('encryption')) {
                component.encryption = componentElem.getAttribute('encryption');
            }

            if (componentElem.hasAttribute('significantBits')
                && !isNaN(+componentElem.getAttribute('significantBits'))) {
                component.significantBits = +componentElem.getAttribute('significantBits');
            }

            if (componentElem.hasAttribute('bitLength') && !isNaN(+componentElem.getAttribute('bitLength'))) {
                component.bitLength = +componentElem.getAttribute('bitLength');
            }

            if (componentElem.hasAttribute('byteLength') && !isNaN(+componentElem.getAttribute('byteLength'))) {
                component.byteLength = +componentElem.getAttribute('byteLength');
            }

            if (componentElem.hasAttribute('dataType')) {
                component.dataType = componentElem.getAttribute('dataType');
            }

            if (componentElem.hasAttribute('ref')) {
                component.ref = componentElem.getAttribute('ref');
            }

            return component;
        }
    }

    public decodeBinaryBlock(elem: Element): SweBinaryBlock {

        let blockElem = this.utils.getElement(elem, 'Block', NAMESPACES.SWE);
        if (blockElem != null) {
            let block = new SweBinaryBlock();

            this.decodeAbstractSwe(blockElem, block);

            if (blockElem.hasAttribute('compression')) {
                block.compression = blockElem.getAttribute('compression');
            }

            if (blockElem.hasAttribute('encryption')) {
                block.encryption = blockElem.getAttribute('encryption');
            }

            if (blockElem.hasAttribute('paddingBytes-after') && !isNaN(+blockElem.getAttribute('paddingBytes-after'))) {
                block.paddingBytesAfter = +blockElem.getAttribute('paddingBytes-after');
            }

            if (blockElem.hasAttribute('paddingBytes-before')
                && !isNaN(+blockElem.getAttribute('paddingBytes-before'))) {
                block.paddingBytesBefore = +blockElem.getAttribute('paddingBytes-before');
            }

            if (blockElem.hasAttribute('byteLength') && !isNaN(+blockElem.getAttribute('byteLength'))) {
                block.byteLength = +blockElem.getAttribute('byteLength');
            }

            if (blockElem.hasAttribute('ref')) {
                block.ref = blockElem.getAttribute('ref');
            }

            return block;
        }
    }


    public decodeXmlEncoding(elem: Element): SweXmlEncoding {
        let xmlEncodingElem = this.utils.getElement(elem, 'XMLEncoding', NAMESPACES.SWE);
        if (xmlEncodingElem != null) {
            let xmlEncoding = new SweXmlEncoding();

            this.decodeAbstractSwe(xmlEncodingElem, xmlEncoding);

            return xmlEncoding;
        }
    }

    public decodeElementType(elem: Element): SweElementType {
        let elementTypeElem = this.utils.getElement(elem, 'elementType', NAMESPACES.SWE);
        if (elementTypeElem != null) {
            let elementType = new SweElementType();

            if (elementTypeElem.hasAttribute('name')) {
                elementType.name = elementTypeElem.getAttribute('name');
            }

            elementType.type = this.decodeDataComponent(elementTypeElem.firstElementChild);

            return elementType;
        }
    }

    public decodeDataChoice(elem: Element): SweDataChoice {
        let dataChoiceElem = this.utils.getElement(elem, 'DataChoice', NAMESPACES.SWE);
        if (dataChoiceElem != null) {
            let dataChoice = new SweDataChoice();

            this.decodeAbstractDataComponent(dataChoiceElem, dataChoice);

            dataChoice.choiceValue = this.utils.getDecodedList(
                dataChoiceElem,
                'choiceValue',
                NAMESPACES.SWE,
                (value) => this.decodeCategory(value));

            dataChoice.items = this.utils.getDecodedList(
                dataChoiceElem,
                'item',
                NAMESPACES.SWE,
                (item) => this.decodeDataChoiceItem(item));

            return dataChoice;
        }
    }

    public decodeDataChoiceItem(elem: Element): SweDataChoiceItem {
        let dataChoiceItem = new SweDataChoiceItem();

        if (elem.hasAttribute('name')) {
            dataChoiceItem.name = elem.getAttribute('name');
        }

        if (elem.firstElementChild != null) {
            dataChoiceItem.item = this.decodeDataComponent(elem.firstElementChild);
        }

        return dataChoiceItem;
    }

    public decodeUnitOfMeasure(elem: Element): UnitOfMeasure {
        let uomElem = this.utils.getElement(elem, 'uom', NAMESPACES.SWE);
        if (uomElem != null) {
            let uom = new UnitOfMeasure();
            if (uomElem.hasAttribute('code')) {
                uom.code = uomElem.getAttribute('code');
            }
            if (uomElem.hasAttribute('href')) {
                uom.href = uomElem.getAttribute('href');
            }
            return uom;
        }
    }

    public decodeQuantityRange(elem: Element): SweQuantityRange {
        let quantityRangeElem = this.utils.getElement(elem, 'QuantityRange', NAMESPACES.SWE);
        if (quantityRangeElem != null) {
            let quantityRange = new SweQuantityRange();

            this.decodeAbstractSimpleComponent(quantityRangeElem, quantityRange);

            quantityRange.uom = this.decodeUnitOfMeasure(elem);

            let constraint = this.utils.getElement(quantityRangeElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                quantityRange.constraint = this.decodeAllowedValues(constraint);
            }

            let valueElem = this.utils.getElement(quantityRangeElem, 'value', NAMESPACES.SWE);
            if (valueElem != null) {
                let values = valueElem.textContent.split(' ');
                if (values.length === 2 && !isNaN(+values[0]) && !isNaN(+values[1])) {
                    quantityRange.value = [+values[0], +values[1]];
                }
            }

            return quantityRange;
        }
    }

    public decodeTimeRange(elem: Element): SweTimeRange {
        let timeRangeElem = this.utils.getElement(elem, 'TimeRange', NAMESPACES.SWE);
        if (timeRangeElem != null) {
            let timeRange = new SweTimeRange();

            this.decodeAbstractSimpleComponent(timeRangeElem, timeRange);

            timeRange.uom = this.decodeUnitOfMeasure(timeRangeElem);

            let valueElem = this.utils.getElement(timeRangeElem, 'value', NAMESPACES.SWE);
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
                }
            }

            let constraint = this.utils.getElement(timeRangeElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                timeRange.constraint = this.decodeAllowedTimes(constraint);
            }

            if (timeRangeElem.hasAttribute('referenceTime')) {
                let timeStr = timeRangeElem.getAttribute('referenceTime');
                if (!isNaN(Date.parse(timeStr))) {
                    timeRange.referenceTime = new Date(Date.parse(timeStr));
                }
            }

            if (timeRangeElem.hasAttribute('localFrame')) {
                timeRange.localFrame = timeRangeElem.getAttribute('localFrame');
            }

            return timeRange;
        }
    }

    public decodeCountRange(elem: Element): SweCountRange {
        let countRangeElem = this.utils.getElement(elem, 'CountRange', NAMESPACES.SWE);
        if (countRangeElem != null) {
            let countRange = new SweCountRange();

            this.decodeAbstractSimpleComponent(countRangeElem, countRange);

            let constraint = this.utils.getElement(countRangeElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                countRange.constraint = this.decodeAllowedValues(constraint);
            }

            let valueElem = this.utils.getElement(countRangeElem, 'value', NAMESPACES.SWE);
            if (valueElem != null) {
                let values = valueElem.textContent.split(' ');
                if (values.length === 2 && !isNaN(+values[0]) && !isNaN(+values[1])) {
                    countRange.value = [+values[0], +values[1]];
                }
            }

            return countRange;
        }
    }

    public decodeConstraint(elem: Element): AllowedTimes | AllowedTokens | AllowedValues {
        let allowedTimes = this.decodeAllowedTimes(elem);
        if (allowedTimes != null) return allowedTimes;

        let allowedTokens = this.decodeAllowedTokens(elem);
        if (allowedTokens != null) return allowedTokens;

        let allowedValues = this.decodeAllowedValues(elem);
        if (allowedValues != null) return allowedValues;

        throw new Error('Unsupported constraint type');
    }

    public decodeCategoryRange(elem: Element): SweCategoryRange {
        let categoryRangeElem = this.utils.getElement(elem, 'CategoryRange', NAMESPACES.SWE);
        if (categoryRangeElem != null) {
            let categoryRange = new SweCategoryRange();

            this.decodeAbstractSimpleComponent(categoryRangeElem, categoryRange);

            categoryRange.codeSpace = this.utils.getAttributeOfElement(
                categoryRangeElem,
                'codeSpace',
                NAMESPACES.SWE,
                'href',
                NAMESPACES.XLINK);

            let constraintElem = this.utils.getElement(categoryRangeElem, 'constraint', NAMESPACES.SWE);
            if (constraintElem != null) {
                categoryRange.constraint = this.decodeAllowedTokens(constraintElem);
            }

            let valueElem = this.utils.getElement(categoryRangeElem, 'value', NAMESPACES.SWE);
            if (valueElem != null) {
                let values = valueElem.textContent.split(' ');
                if (values.length === 2) {
                    categoryRange.value = [values[0], values[1]];
                }
            }

            return categoryRange;
        }
    }

    public decodeBoolean(elem: Element): SweBoolean {
        let boolElem = this.utils.getElement(elem, 'Boolean', NAMESPACES.SWE);
        if (boolElem != null) {
            let bool = new SweBoolean();

            this.decodeAbstractSimpleComponent(boolElem, bool);

            let value = this.utils.getElement(boolElem, 'value', NAMESPACES.SWE);
            if (value != null) {
                bool.value = value.textContent === 'true';
            }

            return bool;
        }
    }

    public decodeCount(elem: Element): SweCount {
        let countElem = this.utils.getElement(elem, 'Count', NAMESPACES.SWE);
        if (countElem != null) {
            let count = new SweCount();

            this.decodeAbstractSimpleComponent(countElem, count);

            let constraint = this.utils.getElement(countElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                count.constraint = this.decodeAllowedValues(constraint);
            }

            let value = this.utils.getElement(countElem, 'value', NAMESPACES.SWE);
            if (value != null && !isNaN(+value.textContent)) {
                count.value = +value.textContent;
            }

            return count;
        }
    }

    public decodeQuantity(elem: Element): SweQuantity {
        let quantityElem = this.utils.getElement(elem, 'Quantity', NAMESPACES.SWE);
        if (quantityElem != null) {
            let quantity = new SweQuantity();

            this.decodeAbstractSimpleComponent(quantityElem, quantity);

            let constraint = this.utils.getElement(quantityElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                quantity.constraint = this.decodeAllowedValues(constraint);
            }

            let value = this.utils.getElement(quantityElem, 'value', NAMESPACES.SWE);
            if (value != null && !isNaN(+value.textContent)) {
                quantity.value = +value.textContent;
            }

            quantity.uom = this.decodeUnitOfMeasure(quantityElem);
            return quantity;
        }
    }

    public decodeTime(elem: Element): SweTime {
        let timeElem = this.utils.getElement(elem, 'Time', NAMESPACES.SWE);
        if (timeElem != null) {
            let time = new SweTime();

            this.decodeAbstractSimpleComponent(timeElem, time);

            time.uom = this.decodeUnitOfMeasure(timeElem);

            let constraint = this.utils.getElement(timeElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                time.constraint = this.decodeAllowedTimes(constraint);
            }

            if (timeElem.hasAttribute('referenceTime')) {
                time.referenceTime = new Date(timeElem.getAttribute('referenceTime'));
            }

            if (timeElem.hasAttribute('localFrame')) {
                time.localFrame = timeElem.getAttribute('localFrame');
            }

            let value = this.utils.getElement(timeElem, 'value', NAMESPACES.SWE);
            if (value != null) {
                if (!isNaN(Date.parse(value.textContent))) {
                    time.value = new Date(Date.parse(value.textContent));
                } else if (value.textContent === 'now') {
                    time.value = 'now';
                }
            }

            return time;
        }
    }

    public decodeCategory(elem: Element): SweCategory {
        let catElem = this.utils.getElement(elem, 'Category', NAMESPACES.SWE);
        if (catElem != null) {
            let category = new SweCategory();

            this.decodeAbstractSimpleComponent(catElem, category);

            category.codeSpace = this.utils.getAttributeOfElement(
                catElem,
                'codeSpace',
                NAMESPACES.SWE,
                'href',
                NAMESPACES.XLINK);

            let constraint = this.utils.getElement(catElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                category.constraint = this.decodeAllowedTokens(constraint);
            }

            let value = this.utils.getElement(catElem, 'value', NAMESPACES.SWE);
            if (value != null) {
                category.value = value.textContent;
            }

            return category;
        }
    }

    public decodeText(elem: Element): SweText {
        let textElem = this.utils.getElement(elem, 'Text', NAMESPACES.SWE);
        if (textElem != null) {
            let text = new SweText();
            this.decodeAbstractSimpleComponent(textElem, text);

            let constraint = this.utils.getElement(textElem, 'constraint', NAMESPACES.SWE);
            if (constraint != null) {
                text.constraint = this.decodeAllowedTokens(constraint);
            }

            let value = this.utils.getElement(textElem, 'value', NAMESPACES.SWE);
            if (value != null) {
                text.value = value.textContent;
            }

            return text;
        }
    }

    public decodeAllowedTokens(elem: Element): AllowedTokens {
        let allowedTokensElem = this.utils.getElement(elem, 'AllowedTokens', NAMESPACES.SWE);
        if (allowedTokensElem != null) {
            let allowedTokens = new AllowedTokens();

            this.decodeAbstractSwe(allowedTokensElem, allowedTokens);

            this.utils.getDecodedList(
                allowedTokensElem,
                'value',
                NAMESPACES.SWE,
                (v) => allowedTokens.values.push(v.textContent));

            let pattern = this.utils.getElement(allowedTokensElem, 'pattern', NAMESPACES.SWE);
            if (pattern != null) {
                allowedTokens.pattern = pattern.textContent;
            }

            return allowedTokens;
        }
    }

    public decodeAllowedValues(elem: Element): AllowedValues {
        let allowedValuesElem = this.utils.getElement(elem, 'AllowedValues', NAMESPACES.SWE);
        if (allowedValuesElem != null) {
            let allowedValues = new AllowedValues();

            this.decodeAbstractSwe(allowedValuesElem, allowedValues);

            let significantFigures = this.utils.getElement(allowedValuesElem, 'significantFigures', NAMESPACES.SWE);
            if (significantFigures != null && !isNaN(+significantFigures.textContent)) {
                allowedValues.significantFigures = +significantFigures.textContent;
            }
            this.utils.getDecodedList(allowedValuesElem, 'value', NAMESPACES.SWE, (v) => {
                if (v.textContent != null && !isNaN(+v.textContent)) {
                    allowedValues.values.push(+v.textContent);
                }
            });

            this.utils.getDecodedList(allowedValuesElem, 'interval', NAMESPACES.SWE, (v) => {
                if (v.textContent != null) {
                    let interval = v.textContent.split(' ');
                    if (interval.length === 2 && !isNaN(+interval[0]) && !isNaN(+interval[1])) {
                        allowedValues.values.push([+interval[0], +interval[1]]);
                    }
                }
            });
            return allowedValues;
        }
    }

    public decodeAllowedTimes(elem: Element): AllowedTimes {
        let allowedTimesElem = this.utils.getElement(elem, 'AllowedTimes', NAMESPACES.SWE);
        if (allowedTimesElem != null) {
            let allowedTimes = new AllowedTimes();
            this.decodeAbstractSwe(allowedTimesElem, allowedTimes);

            let significantFigures = this.utils.getElement(allowedTimesElem, 'significantFigures', NAMESPACES.SWE);
            if (significantFigures != null && !isNaN(+significantFigures.textContent)) {
                allowedTimes.significantFigures = +significantFigures.textContent;
            }

            allowedTimes.values = this.utils.getDecodedList(allowedTimesElem, 'value', NAMESPACES.SWE, (entry) => {
                if (!isNaN(Date.parse(entry.textContent))) {
                    return new Date(Date.parse(entry.textContent));
                }
            });

            this.utils.getDecodedList(allowedTimesElem, 'interval', NAMESPACES.SWE, (entry) => {
                let interval = entry.textContent.split(' ');
                if (interval.length === 2 && !isNaN(Date.parse(interval[0])) && !isNaN(Date.parse(interval[1]))) {
                    allowedTimes.values.push([new Date(Date.parse(interval[0])), new Date(Date.parse(interval[1]))]);
                }
            });

            return allowedTimes;
        }
    }

    public decodeNilValue(elem: Element): SweNilValue {
        let nilValue = new SweNilValue();

        if (elem.hasAttribute('reason')) {
            nilValue.reason = elem.getAttribute('reason');
        }

        nilValue.value = elem.textContent;

        return nilValue;
    }

    public decodeQuality(elem: Element): SweQuality {
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
            NAMESPACES.SWE,
            (quality) => this.decodeQuality(quality));

        let outerNilValuesElem = this.utils.getElement(elem, 'nilValues', NAMESPACES.SWE);
        if (outerNilValuesElem != null) {
            let innerNilValuesElem = this.utils.getElement(outerNilValuesElem, 'NilValues', NAMESPACES.SWE);
            if (innerNilValuesElem != null) {
                component.nilValues = this.utils.getDecodedList(
                    innerNilValuesElem,
                    'nilValue',
                    NAMESPACES.SWE,
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

        let elementCount = this.utils.getElement(elem, 'elementCount', NAMESPACES.SWE);
        if (elementCount != null && !isNaN(+elementCount.textContent)) {
            component.elementCount = +elementCount.textContent;
        }

        let elementType = this.utils.getElement(elem, 'elementType', NAMESPACES.SWE);
        if (elementType != null) {
            component.elementType = this.decodeElementType(elementType);
        }

        let encoding = this.utils.getElement(elem, 'encoding', NAMESPACES.SWE);
        if (encoding != null) {
            component.encoding = this.decodeAbstractEncoding(encoding);
        }

        let values = this.utils.getElement(elem, 'values', NAMESPACES.SWE);
        if (values != null) {
            component.values = values.textContent;
        }
    }
}
