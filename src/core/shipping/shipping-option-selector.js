import { find } from 'lodash';

export default class ShippingOptionSelector {
    /**
     * @constructor
     * @param {ShippingOptionsState} shippingOptions
     * @param {QuoteState} quote
     */
    constructor(shippingOptions = {}, quote = {}) {
        this._shippingOptions = shippingOptions;
        this._quote = quote;
    }

    /**
     * @return {ShippingOptionList}
     */
    getShippingOptions() {
        return this._shippingOptions.data;
    }

    /**
     * @return {?ShippingOption}
     */
    getSelectedShippingOption() {
        const { shippingAddress, shippingOption: optionId } = this._quote.data;
        const shippingOptions = shippingAddress ? this.getShippingOptions()[shippingAddress.id] : undefined;

        return find(shippingOptions, { id: optionId });
    }

    /**
     * @return {?ErrorResponse}
     */
    getLoadError() {
        return this._shippingOptions.errors && this._shippingOptions.errors.loadError;
    }

    /**
     * @return {?ErrorResponse}
     */
    getSelectError() {
        return this._shippingOptions.errors && this._shippingOptions.errors.selectError;
    }

    /**
     * @return {boolean}
     */
    isLoading() {
        return !!(this._shippingOptions.statuses && this._shippingOptions.statuses.isLoading);
    }

    /**
     * @return {boolean}
     */
    isSelecting() {
        return !!(this._shippingOptions.statuses && this._shippingOptions.statuses.isSelecting);
    }
}