<h1 align="center">Tableau Web Data Connector</h1>

<h2 align="center">Descripton</h2>

This web data connector component allows to fetch data from a source (in this case the decrypted data) and make it available within the Tableau ecosystem.

<h2 align="center">Tools and technologies</h2>

The next list contains the tools, technologies, and dependencies used in the WDC development phase:

1. HTML5
2. CSS
3. JavaScript
4. jQuery
5. Tableau dependency

<h2 align="center">Run the WDC</h2>

In order to test the functionality of the web data connector, we need to use either the simulator provided by Tableau or locally within the Tableau desktop software. In both cases, the web data connector component must be deployed in a local server or a server on the web.

### Tableau simulator

To use the simulator provided by Tableau we have 2 different alternatives, running it locally or use the deployed simulator.

#### Run locally

1. Clone the git repository where is located the WDC SDK:

```bash
git clone https://github.com/tableau/webdataconnector.git
```

**Note**: it is important to have [git](https://git-scm.com/) installed

2. And inside the folder you need to install the dependences by using the next command:

```bash
npm install --production
```

 **Note**: to finish this and the next step successfully is important to have installed [node](https://nodejs.org/es/) and a and a package manager such as [npm](https://www.npmjs.com/).

3. Start running the server:

```bash
npm start
```

4. The local server should be running at:

```
http://localhost:8888/Simulator/index.html
```

#### WDC in Tableau Server

On the other hand, the easiest way to prove the WDC without the need to use the Tableau ecosystem per se is by using the simulator deployed  [here](https://tableau.github.io/webdataconnector/Simulator/).

In this case, we have to consider two main things: all the sources that the component is using need the be provided by a secure protocol (HTTPS), and the SDK in Tableau Server has a defined capacity, this means that if the data fetched is massive the most probably is that the server collapses.

### Tableau desktop software

Here, within Tableau desktop we can make use of the WDC SDK make sure to following the next steps:

1. On the start page, in the **Connect** pane, click **More Servers… > Web Data Connector**. Then enter the URL of the WDC an press Enter.
2. Enter the URL of a WDC and press Enter.
3. Tableau loads the WDC page where you can enter any input required by your WDC.
4. Tableau calls your WDC code, downloads data, and displays it in the **Data Source** pane.

<h2 align="center">API documentation</h2>

Initially, we need to define the connector by using the `var myConnector = tableau.makeConnector()` line, we have not defined the tableau variable yet, but by using the Tableau library this variable is defined in the global scope.

### Schema

```javascript
myConnector.getSchema = function (schemaCallback)
```

#### Description

This function describes the model that we will use to describe the incoming data from the API. Here we define the number of tables (name, alias, columns) and

#### Parameters

+ **shcemaCallback**: this function as parameter (a callback) gets called when the schema is defined. The `schemaCallback` takes an array of table objects. In this case, there is only table object (the `tableSchema` object defined above).

#### Return value

*None*

### Data fetching

````javascript
myConnector.getData = function (table, doneCallback)
````

#### Description

In this function we define the endpoint where we will fetch the data, and we transform the data in order to achieve compatibility with the previous schema defined.

#### Parameters

+ **table**: The `table` parameter is an object defined by the WDC to which you can append data by using the `table.appendRows` method to append the table data array to the `table` as JavaScript object.
+ **doneCallback**: The `doneCallback` is a function as parameter (a callback) that signals to Tableau that you are done getting data.

#### Return value

*None*

### Getting data from user

```javascript
function getData ()
```

#### Description

On click event handler, here we capture an validate the information provided by the user in order send this info to be used in the data fetching as parameters.

#### Parameters

*None*, but if we're using elements like forms or another type of input, we can define a parameter as an event and use the `event.preventDefault()` method in order to not reload the page.

#### Return value

*None*