var formatSet = {
  'ga:date':function(val){
    return val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
  },
  'ga:avgEventValue':function(val){
    return Math.floor(parseFloat(val)*1000)/1000;
  }
};

var ecWallFirstShowReportTable = {
  init:function(containerid,dataSet,channelId){
    var channelId = channelId || 'rayjump';
    var table = $('<table cellspacing="0" cellspadding="0" border="1">');
    var thead = this.initHeader(dataSet.colHeaderArray);
    var tbody = this.initBody(dataSet.colHeaderArray,dataSet.rowHeaderArray,dataSet.mainSet);
    table.append('<thead><tr><td>'+channelId+'</td><td colspan="'+(dataSet.colHeaderArray.length)*2+'">COUNTRY ISO / REQUEST</td></tr></thead>').append(thead).append(tbody);
    $('#'+containerid).append(table);
  },
  initHeader:function (headerData) {
    var thead = $('<thead>');
    var tr = $('<tr>');
    var tdh = $('<td>');
    tdh.html('TOP');
    tr.append(tdh);
    for(var i=0,iMax=headerData.length;i<iMax;i++){
      var headerItem = headerData[i];
      var td = $('<td colspan="2">');
      td.html(headerItem);
      tr.append(td);
    }
    thead.append(tr);
    return thead;
  },
  initBody:function(colHeaderArray,rowHeaderArray,mainSet){
    var me = this;
    var tbody = $('<tbody>');
    var totalSet = {};
    for(var i=0,iMax=rowHeaderArray.length;i<iMax;i++){
      var tr = $('<tr>');
      var rowHeader = rowHeaderArray[i];
      var tdh = $('<td>');
      tdh.html((parseInt(rowHeader))+1);
      tr.append(tdh);
      for(var j=0,jMax=colHeaderArray.length;j<jMax;j++){
        var colHeader = colHeaderArray[j];
        if(!totalSet[colHeader]) totalSet[colHeader] = 0;
        var td1 = $('<td>');
        var td2 = $('<td>');
        // console.log(mainSet[colHeader])
        // var tdValue = mainSet[colHeader][rowHeader].text;
        var tdValue1 = mainSet[colHeader][rowHeader].countryIso;
        var tdValue2 = mainSet[colHeader][rowHeader].totalEvent;
        totalSet[colHeader] += mainSet[colHeader][rowHeader].value;
        td1.html(tdValue1);
        td2.html(tdValue2);
        tr.append(td1);
        tr.append(td2);
      }
      tbody.append(tr);
    }

    var trf = $('<tr>');
    var tdf = $('<td>');
    tdf.html('Total:');
    trf.append(tdf);
    for(var k=0,kMax=colHeaderArray.length;k<kMax;k++){
      var colFooter = colHeaderArray[k];
      var td = $('<td colspan="2">');
      td.html(totalSet[colFooter]);
        trf.append(td);
    }
    tbody.append(trf);

    return tbody;
  }
};

var ecWallFirstShowTransformat = {
  init:function(data,formatSet,rowLimit){
    this.formatSet = formatSet;
    if(rowLimit) this.rowLimit = rowLimit;
    var dateSet = this.dataFormatByDate(data);
    this.colHeaderArray = [];
    this.rowHeaderArray = [];
    this.rowHeaderSet = {};
    var mainSet = {};
    for(var cKey in dateSet){
      this.colHeaderArray.push(cKey);
      mainSet[cKey] = this.rowFormatByLabel(dateSet[cKey]);
      dateSet[cKey] = dateSet[cKey].sort(function(itemA,itemB){
        return (parseInt(itemB.value) - parseInt(itemA.value));
      });
    }
    this.colHeaderArray = this.colHeaderArray.sort(function(itemA,itemB){
      return (new Date(itemA) > new Date(itemB));
    });

    for(var i=0;i<rowLimit;i++){
      this.rowHeaderArray.push(i);
    }

    return {
      'colHeaderArray':this.colHeaderArray,
      'rowHeaderArray':this.rowHeaderArray,
      'mainSet':dateSet
    };
  },
  rowLimit:null,
  rowHeaderSet:{},
  rowHeaderArray:[],
  colHeaderArray:[],
  formatSet:null,
  dataFormatByDate:function(data){
    var headerData = data.columnHeaders;
    var colSet = this.getColConfig(headerData);
    var bodyData = data.rows;
    var dateSet = {};
    var dateColIndex = colSet['ga:date'];
    var eventActionColIndex = colSet['ga:eventAction'];
    var countryISOColIndex = colSet['ga:countryIsoCode'];
    var totalEventColIndex = colSet['ga:totalEvents'];
    for(var i=0,iMax=bodyData.length;i<iMax;i++){
      var rowData = bodyData[i];
      var dateVal = rowData[dateColIndex];
      var dateVal = this.formatSet['ga:date'](dateVal);
      if(!dateSet[dateVal]) dateSet[dateVal] = [];
      dateSet[dateVal].push({
        'ga:eventAction':rowData[eventActionColIndex],
        'ga:countryIsoCode':rowData[countryISOColIndex],
        'ga:totalEvents':rowData[totalEventColIndex],
      });
    }
    return dateSet;
  },
  rowFormatByLabel:function(rows){
    for(var i=0,iMax=rows.length;i<iMax;i++){
      var row = rows[i];
      rows[i] = {
        'text' : (row['ga:countryIsoCode'] + ' / '+row['ga:totalEvents']),
        'value' : parseInt(row['ga:totalEvents']),
        'countryIso':row['ga:countryIsoCode'],
        'totalEvent':row['ga:totalEvents']
      };
    }
    // console.log(rows)
    return rows;
  },
  getColConfig:function(cols){
    var colSet = {};
    for(var i=0,iMax=cols.length;i<iMax;i++){
      var col = cols[i];
      colSet[col.name] = i;
    }
    return colSet;
  }

};

var ecWallPageLoadedReportTable = {
  init:function(containerid,dataSet,channelId){
    var channelId = channelId || 'rayjump';
    var table = $('<table cellspacing="0" cellspadding="0" border="1">');
    var thead = this.initHeader(dataSet.colHeaderArray);
    var tbody = this.initBody(dataSet.colHeaderArray,dataSet.rowHeaderArray,dataSet.mainSet);
    table.append('<thead><tr><td>'+channelId+'</td><td colspan="'+dataSet.colHeaderArray.length+'">REQUEST / LOAD AVG(s)</td></tr></thead>').append(thead).append(tbody);
    $('#'+containerid).append(table);
  },
  initHeader:function (headerData) {
    var thead = $('<thead>');
    var tr = $('<tr>');
    var tdh = $('<td>');
    tdh.html('PAGE');
    tr.append(tdh);
    for(var i=0,iMax=headerData.length;i<iMax;i++){
      var headerItem = headerData[i];
      var td = $('<td>');
      td.html(headerItem);
      tr.append(td);
    }
    thead.append(tr);
    return thead;
  },
  initBody:function(colHeaderArray,rowHeaderArray,mainSet){
    var me = this;
    var tbody = $('<tbody>');
    var totalSet = {};
    for(var i=0,iMax=rowHeaderArray.length;i<iMax;i++){
      var tr = $('<tr>');
      var rowHeader = rowHeaderArray[i];
      var tdh = $('<td>');
      tdh.html(rowHeader);
      tr.append(tdh);
      for(var j=0,jMax=colHeaderArray.length;j<jMax;j++){
        var colHeader = colHeaderArray[j];
        if(!totalSet[colHeader]) totalSet[colHeader] = 0;
        var td = $('<td>');
        // console.log(mainSet[colHeader])
        var tdValue = mainSet[colHeader][rowHeader].text;
        totalSet[colHeader] += mainSet[colHeader][rowHeader].value;
        td.html(tdValue);
        tr.append(td);
      }
      tbody.append(tr);
    }

    var trf = $('<tr>');
    var tdf = $('<td>');
    tdf.html('Total:');
    trf.append(tdf);
    for(var k=0,kMax=colHeaderArray.length;k<kMax;k++){
      var colFooter = colHeaderArray[k];
      var td = $('<td>');
      td.html(totalSet[colFooter]);
        trf.append(td);
    }
    tbody.append(trf);

    return tbody;
  }
};

var ecWallPageLoadedTransformat = {
  init:function(data,formatSet,rowLimit){
    this.formatSet = formatSet;
    if(rowLimit) this.rowLimit = rowLimit;
    var dateSet = this.dataFormatByDate(data);
    this.colHeaderArray = [];
    this.rowHeaderArray = [];
    this.rowHeaderSet = {};
    var mainSet = {};
    for(var cKey in dateSet){
      this.colHeaderArray.push(cKey);
      mainSet[cKey] = this.rowFormatByLabel(dateSet[cKey]);
    }
    this.colHeaderArray = this.colHeaderArray.sort(function(itemA,itemB){
      return (new Date(itemA) > new Date(itemB));
    });
    for(var rKey in this.rowHeaderSet){
      this.rowHeaderArray.push(rKey);
    }
    this.rowHeaderArray = this.rowHeaderArray.sort(function(itemA,itemB){
      return (parseInt(itemA) - parseInt(itemB));
    });

    return {
      'colHeaderArray':this.colHeaderArray,
      'rowHeaderArray':this.rowHeaderArray,
      'mainSet':mainSet
    };
  },
  rowLimit:null,
  rowHeaderSet:{},
  rowHeaderArray:[],
  colHeaderArray:[],
  formatSet:null,
  dataFormatByDate:function(data){
    var headerData = data.columnHeaders;
    var colSet = this.getColConfig(headerData);
    var bodyData = data.rows;
    var dateSet = {};
    var dateColIndex = colSet['ga:date'];
    var eventLabelColIndex = colSet['ga:eventLabel'];
    var totalEventsColIndex = colSet['ga:totalEvents'];
    var avgEventValueColIndex = colSet['ga:avgEventValue'];
    for(var i=0,iMax=bodyData.length;i<iMax;i++){
      var rowData = bodyData[i];
      var dateVal = rowData[dateColIndex];
      var dateVal = this.formatSet['ga:date'](dateVal);
      if(!dateSet[dateVal]) dateSet[dateVal] = [];
      dateSet[dateVal].push({
        'ga:eventLabel':rowData[eventLabelColIndex],
        'ga:totalEvents':rowData[totalEventsColIndex],
        'ga:avgEventValue':this.formatSet['ga:avgEventValue'](rowData[avgEventValueColIndex]),
      });
    }
    return dateSet;
  },
  rowFormatByLabel:function(rows){
    var labelSet = {};
    for(var i=0,iMax=rows.length;i<iMax;i++){
      var row = rows[i];
      if(this.rowLimit && (this.rowLimit >= row['ga:eventLabel'])) this.rowHeaderSet[row['ga:eventLabel']] = true;
      labelSet[row['ga:eventLabel']] = {
        'text' : (row['ga:totalEvents'] + ' / '+row['ga:avgEventValue']),
        'value' : parseInt(row['ga:totalEvents'])
      };
    }
    // console.log(labelSet);
    return labelSet;
  },
  getColConfig:function(cols){
    var colSet = {};
    for(var i=0,iMax=cols.length;i<iMax;i++){
      var col = cols[i];
      colSet[col.name] = i;
    }
    return colSet;
  }
}