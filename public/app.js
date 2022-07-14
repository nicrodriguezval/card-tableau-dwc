;(function () {
  var myConnector = tableau.makeConnector()

  myConnector.getSchema = function (schemaCallback) {
    const cardsTableCols = [
      {
        id: 'id',
        dataType: tableau.dataTypeEnum.int
      },
      {
        id: 'driver_id',
        dataType: tableau.dataTypeEnum.int
      },
      {
        id: 'request_id',
        dataType: tableau.dataTypeEnum.int
      },
      {
        id: 'decrypted_card_number',
        dataType: tableau.dataTypeEnum.string
      }
    ]

    const cardsTable = {
      id: 'cards',
      alias: 'Cards from api',
      columns: cardsTableCols
    }

    schemaCallback([cardsTable])
  }

  myConnector.getData = function (table, doneCallback) {
    const tableData = []

    $.ajax({
      dataType: 'json',
      url: 'https://payments-transer.fletx.co/api/v1/transactions/get_report_advance'
    }).done((data) => {
      const cards = data.data

      cards.forEach((card) => {
        tableData.push({
          id: card.id,
          driver_id: card.driver_id,
          request_id: card.request_id,
          decrypted_card_number: card.decrypted_card_number
        })
      })

      table.appendRows(tableData)
      doneCallback()
    })
  }

  tableau.registerConnector(myConnector)
})()

const getData = () => {
  tableau.connectionName = 'Cards from api'
  tableau.submit()
}

document.querySelector('#get-data').addEventListener('click', getData)