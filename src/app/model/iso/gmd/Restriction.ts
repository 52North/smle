/**
 * limitation(s) placed upon the access or use of the data
 */
export type Restriction =
    /**
     * exclusive right to the publication, production, or sale of the rights to a
     * literary, dramatic, musical, or artistic work, or to the use of a
     * commercial print or label, granted by law for a specified period of time to
     * an author, composer, artist, distributor
     */
    'copyright' |
    /**
     * government has granted exclusive right to make, sell, use or license an
     * invention or discovery
     */
    'patent' |
    /**
     * produced or sold information awaiting a patent
     */
    'patentPending' |
    /**
     * a name, symbol, or other device identifying a product, officially
     * registered and legally restricted to the use of the owner or manufacturer
     */
    'trademark' |
    /**
     * formal permission to do something
     */
    'license' |
    /**
     * rights to financial benefit from and control of distribution of
     * non-tangible property that is a result of creativity
     */
    'intellectualPropertyRights' |
    /**
     * withheld from general circulation or disclosure
     */
    'restricted' |
    /**
     * limitation not listed
     */
    'otherRestrictions';
