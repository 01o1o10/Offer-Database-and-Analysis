const ex = require('xlsx')

module.exports = {

    fileName: '',

    import: function(fileName){
        var workbook = ex.readFile(fileName);
        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var data = this.readExcelAsArray(worksheet)
        $('#import-excel-progress').css('width', '0')
        insert.excelToDb(data, 0)
        console.log(data)
    }, 

    readExcelAsArray: function(worksheet){
        var result = []
        var row
        var rowNum
        var colNum
        var range = ex.utils.decode_range(worksheet['!ref'])
        for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
           row = []
            for(colNum=range.s.c; colNum<=range.e.c; colNum++){
               var nextCell = worksheet [
                  ex.utils.encode_cell({r: rowNum, c: colNum})
               ]
               if( typeof nextCell === 'undefined' ){
                  row.push(void 0)
               } else row.push(nextCell.w)
            }
            result.push(row)
        }
        return result
    },

    export: function(fileName){
        excel.fileName = fileName
        var rows = [{Product: 'Product', Category: 'Category', Project: 'Project', Supplier: 'Supplier', Price: 'Price', Exchange: 'Currency', Date: 'Date', ce: 'Total Effect', cell12: 'Old USD', cell13: 'Old EUR', cell21: 'Old TL Price', cell22: 'Old USD Price', cell23: 'Old EUR Price',    cell31: 'Inflation', cell32: 'New USD', cell33: 'New EUR', cell41: 'New TL Price', cell42: 'New USD Price', cell43: 'New EUR Price', inf: 'Inf Eff', steel: 'Steel Eff', cup: 'Copper Eff', lead: 'Lead Eff', zinc: 'Zinc Eff', wms: 'WMS Eff', steelPriceNew: 'Steel New Price', steelPriceOld: 'Steel Old Price', cuprumPriceNew: 'Copper New Price', cuprumPriceOld: 'Copper Old Price', leadPriceNew: 'Lead New Price', leadPriceOld: 'Lead Old Price', zincPriceNew: 'Zinc New Price', zincPriceOld: 'Zinc Old Price', mwNew: 'WMS New Price', mwOld: 'WMS Old Price', p_name: 'Product', inf_effect: 'Inf Per', steel_effect: 'Steel Per', cup_effect: 'Cop Per', lead_effect: 'Lead Per', zinc_effect: 'Zinc Per', wms_effect: 'WMS Per', extra_effect: 'Extra Per', cur: 'Cur Per'}]
        var selectedRowsId = ui.getSelectedRowsId()
        if(selectedRowsId.length == 0){
            ui.alert('export-excel-failed', 'Any row selected!', false)
        }
        else{
            excel.getExtraData(rows, selectedRowsId, 0)
        }
    },

    getExtraData: function(rows, selectedRowsId, i){
        var resultsRowData = ui.readResultsRow($('#' + selectedRowsId[i]).parent().parent())
        resultsRowData.Price = parseFloat(resultsRowData.Price)
        filter.calcOtherVals($('#' + selectedRowsId[i]).parent().parent().children().eq(5), function(ce, data, effect, prices, productInfo){
            delete data.cell11
            delete productInfo.p_id
            delete productInfo.c_id
            rows.push(Object.assign({}, resultsRowData, {ce: ce}, data, effect, prices, productInfo))
            if(i == selectedRowsId.length-1){
                $('#export-excel-progress').css('width', '' + 100 + '%')
                console.log(rows)
                var ws = ex.utils.json_to_sheet(rows)
        
                /* add to workbook */
                var wb = ex.utils.book_new()
                ex.utils.book_append_sheet(wb, ws, "Teklif Veritabanı")
                
                /* generate an XLSX file */
                ex.writeFile(wb, excel.fileName)
                ui.alert('export-excel-succes', 'Data exported!', true)
            }
            else{
                $('#export-excel-progress').css('width', '' + ((i/selectedRowsId.length)*100) + '%')
                excel.getExtraData(rows, selectedRowsId, ++i)
            }
        })
    }
}