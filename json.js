
function getJSON(myRequest){
    fetch(myRequest)                            // get the geo info
      .then(response => response.json())        // convert the json into arrays
      .then(data => {                           // use the arrays
        fetch(data.properties.forecast)         // get the forecast link
            .then(response => response.json())  // convert the forecast into arrays
            .then(data => {                     // use the arrays
                let table = document.querySelector("table"); // table =  document.createElement("table");
                generateTable(table, data.properties.periods);
                //document.body.appendChild(table);
              }
            )
        }
      )
}

function generatePTCell(row,txt,em){
    cell = row.insertCell();
    text = document.createTextNode(txt);
    cell.appendChild(text);
    cell.style.textAlign = "center";
    cell.style.height = em+"em";
    cell.style.vAlign = "top";
}

function generateTable(table, data) {
  let row = table.insertRow();
  for (let element of data) {
    tcell = row.insertCell();   // insert a new td
    tcell.style.width = "7%";
    tcell.style.border = "solid black 1px";
    ptable = document.createElement("table");  // create a new period table
    prow = ptable.insertRow();
    generatePTCell(prow,element.name,3);       // set period name
    prow = ptable.insertRow();
    cell = prow.insertCell();
    cell.style.textAlign = "center";
    img = document.createElement("IMG");       // create the icon
    img.title = element.detailedForecast;
    img.src = element.icon;
    cell.appendChild(img);
    prow = ptable.insertRow();
    generatePTCell(prow,element.shortForecast,5); // short forecast
    prow = ptable.insertRow();
    generatePTCell(prow,element.temperature + element.temperatureUnit,1.5)  // Temp
    prow = ptable.insertRow();
    generatePTCell(prow,element.windSpeed + "   " + element.windDirection,2); // wind
    tcell.appendChild(ptable);                  // append the new period table to the new td
  }
}

getJSON('https://api.weather.gov/points/41.5,-87.95');

