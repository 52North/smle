export const NERC_NAMESPACES = {
  SKOS: 'http://www.w3.org/2004/02/skos/core#',
  RDF: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
};

export interface NercSparqlResponse {
  results: {
    bindings: {
      uri: {
        type: string,
        value: string
      },
      id: {
        type: string,
        value: string
      },
      label: {
        type: string,
        value: string
      },
      definition: {
        type: string,
        value: string
      },
      count: {
        type: string,
        value: string
      }
    }[]
  };
}
