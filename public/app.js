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
    const dateObj = JSON.parse(tableau.connectionData)
    const tableData = []

    const datePath = `${dateObj.year}${(dateObj.month) ? '/' + dateObj.month : ''}`
    const url = `https://payments-transer.fletx.co/api/v1/transactions/get_report_advance/${datePath}`

    $.ajax({
      dataType: 'json',
      url
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

const validYear = (year) => /^\d{4}$/.test(year)
const validMonth = (month) => /^\d{0,2}$/.test(month)

function getData(e) {
  e.preventDefault()
  
  const dateObj = {
    year: $('#input-year').val(),
    month: $('#input-month').val()
  }

  console.log(dateObj)

  if (!validYear(dateObj.year)) return alert('Invalid year')
  if (!validMonth(dateObj.month)) return alert('Invalid month')

  tableau.connectionData = JSON.stringify(dateObj)
  tableau.connectionName = 'Cards from api'
  tableau.submit()
}

document.querySelector('#get-data').addEventListener('click', getData)
