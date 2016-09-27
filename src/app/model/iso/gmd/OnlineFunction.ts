
/**
 * function performed by the resource
 */
export type OnlineFunction =
    /**
     * online instructions for transferring data from one storage device or system
     * to another
     */
    'download' |
    /**
     * online information about the resource
     */
    'information' |
    /**
     * online instructions for requesting the resource from the provider
     */
    'offlineAccess' |
    /**
     * online order process for obtening the resource
     */
    'order' |
    /**
     * online search interface for seeking out information about the resource
     */
    'search';
