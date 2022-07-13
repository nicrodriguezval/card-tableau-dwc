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
      url: 'https://cors-anywhere.herokuapp.com/http://35.188.2.217:4215/api/v1/transactions/get_report_advance/2019/12',
      headers: { 'x-requested-with': 'origin' }
    }).done((data) => {
      const cards = data.data
        for (let i = 0; i < cards.length; i++) {
          tableData.push({
            id: cards[i].id,
            driver_id: cards[i].driver_id,
            request_id: cards[i].request_id,
            decrypted_card_number: cards[i].decrypted_card_number
          })
        }

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
