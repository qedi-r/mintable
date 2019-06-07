const _ = require('lodash')

const updateTransactionCategory = async (transactions, overrides) => {
  // Handle category overrides defined in config
  if (overrides) {
    // Handle corner case where this was set before v1.0.0 & scripts/migrate.js double escapes it
    categoryOverrides =
      typeof overrides === 'string'
        ? JSON.parse(overrides)
        : overrides

    transactions = _.map(transactions, transaction => {
      _.forEach(categoryOverrides, override => {
        if (new RegExp(override.pattern, _.get(override, 'flags', '')).test(transaction.name)) {
          transaction['category.0'] = _.get(override, 'category.0', '')
          transaction['category.1'] = _.get(override, 'category.1', '')
        }
      })
      return transaction
    })
  }
  return transactions
}

module.exports = {
  updateTransactionCategory
}
