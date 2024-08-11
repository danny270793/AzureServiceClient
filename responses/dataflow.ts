export interface Source {
  dataset: {
    referenceName: string
    type: string
  }
  name: string
}

export interface Sink {
  dataset: {
    referenceName: string
    type: string
  }
  name: string
}

export interface Transformation {
  name: string
}

export default interface DataFlow {
  id: string
  name: string
  type: 'Microsoft.Synapse/workspaces/dataflows'
  etag: string
  properties: {
    folder: {
      name: string
    }
    type: string
    typeProperties: {
      sources: Source[]
      sinks: Sink[]
      transformations: Transformation[]
      scriptLines: string[]
    }
  }
}
