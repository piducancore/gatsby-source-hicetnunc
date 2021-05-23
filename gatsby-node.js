const fetch = require("node-fetch")
const query = `
  query objkts($address: String!) {
    collectedObjkts: hic_et_nunc_token(where: {trades: {buyer: {address: {_eq: $address}}}}, order_by: {timestamp: desc}) {
      id
      artifact_uri
      thumbnail_uri
      timestamp
      mime
      title
      description
      supply
      token_tags {
        tag {
          tag
        }
      }
    }
    createdObjkts: hic_et_nunc_token(where: {creator: {address: {_eq: $address}}}, order_by: {timestamp: desc}) {
      id
      artifact_uri
      thumbnail_uri
      timestamp
      mime
      title
      description
      supply
      token_tags {
        tag {
          tag
        }
      }
    }
  }
`

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch("https://api.hicdex.com/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  })

  return await result.json()
}

async function doFetch(address) {
  const { errors, data } = await fetchGraphQL(query, "objkts", {
    address,
  })
  if (errors) {
    console.error(errors)
  }
  return data
}

exports.sourceNodes = async (gatsby, options) => {
  const { actions, createNodeId, createContentDigest } = gatsby
  const { createNode } = actions
  try {
    const { createdObjkts, collectedObjkts } = await doFetch(options.address)

    createdObjkts.map(metadata => {
      const nodeData = {
        ...metadata,
        objktId: metadata.id,
        id: createNodeId(`createdObjkt-${metadata.id}`),
        parent: null,
        internal: {
          type: `CreatedObjkt`,
          content: JSON.stringify(metadata),
          contentDigest: createContentDigest(metadata),
        },
      }
      createNode(nodeData)
    })

    collectedObjkts.map(metadata => {
      const nodeData = {
        ...metadata,
        objktId: metadata.id,
        id: createNodeId(`collectedObjkt-${metadata.id}`),
        parent: null,
        internal: {
          type: `CollectedObjkt`,
          content: JSON.stringify(metadata),
          contentDigest: createContentDigest(metadata),
        },
      }
      createNode(nodeData)
    })
    return
  } catch (error) {
    console.error(error)
  }
}
