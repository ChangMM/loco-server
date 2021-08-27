import { GraphQLScalarType, Kind, ValueNode, print } from 'graphql'

/**
 * 格式化单元格数据
 * @see https://github.com/graphql/graphql-js/issues/500
 */
export const GraphQLCellData = new GraphQLScalarType({
  name: 'CellData',
  description: '单元格数据，类型为 string|number|boolean|array|null',
  // gets invoked when serializing the result to send it back to a client.
  serialize(value: any) {
    return value
  },
  // gets invoked to parse client input that was passed through variables.
  parseValue(value: any) {
    return value
  },
  // gets invoked to parse client input that was passed inline in the query.
  parseLiteral(ast, variables) {
    const value = _parseLiteral(ast, variables)
    if (!value) return null
    return JSON.stringify({ value })
  },
})

function parseObject(ast: any, variables: any) {
  var value = Object.create(null)
  ast.fields.forEach(function (field: any) {
    value[field.name.value] = _parseLiteral(field.value, variables)
  })
  return value
}

function _parseLiteral(ast: ValueNode, variables: any): any {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value

    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value)

    case Kind.OBJECT:
      return parseObject(ast, variables)

    case Kind.LIST:
      return ast.values.map(function (n) {
        return _parseLiteral(n, variables)
      })

    case Kind.NULL:
      return null

    case Kind.VARIABLE:
      return variables ? variables[ast.name.value] : undefined

    default:
      throw new TypeError(' cannot represent value: ' + print(ast))
  }
}
