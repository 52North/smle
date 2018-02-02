
/**
 * function performed by the responsible party
 */
export type Role =
    /**
     * party that supplies the resource
     */
    'resourceProvider' |
    /**
     * party that accepts accountability and responsability for the data and
     * ensures appropriate care and maintenance of the resource
     */
    'custodian' |
    /**
     * party who uses the resource
     */
    'user' |
    /**
     * party who created the resource
     */
    'originator' |
    /**
     * party who can be contacted for acquiring knowledge about or acquisition
     * of the resource
     */
    'pointOfContact' |
    /**
     * key party responsible for gathering information and conducting research
     */
    'principalInvestigator' |
    /**
     * party wha has processed the data in a manner such that the resource has
     * been modified
     */
    'processor' |
    /**
     * party who published the resource
     */
    'publisher' |
    /**
     * party who authored the resource
     */
    'author' |
    /**
     * party who owned the resource
     */
    'owner' |
    string;
