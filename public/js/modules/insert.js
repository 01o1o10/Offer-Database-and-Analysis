module.exports = {

    addProduct: function(data, cb){
        if(!data){
            if(cb){
                cb()
            }
            else{
                ui.alert('add-product-failed', 'Entered product data is empty!', false)
            }
        }
        else{
            if(!data.category){
                if(cb){
                    cb('Please select a category!')
                }
                else{
                    ui.alert('add-product-failed', 'Please select a category!', false)
                }
            }
            else if(!data.product || !data.inf || !data.steel || !data.cup || !data.lead || !data.zinc || !data.wms || !data.extra){
                if(cb){
                    cb('Fields can not be empty!')
                }
                else{
                    ui.alert('add-product-failed', 'Fields can not be empty!', false)
                }
            }
            else if(!$.isNumeric(data.inf) || !$.isNumeric(data.steel) || !$.isNumeric(data.cup) || !$.isNumeric(data.lead) || !$.isNumeric(data.zinc) || !$.isNumeric(data.wms) || !$.isNumeric(data.extra)){
                if(cb){
                    cb('Inflation, Steel, Cuprum, Lead and Workmanship fields must be numeric!')
                }
                else{
                    ui.alert('add-product-failed', 'Inflation, Steel, Cuprum, Lead and Workmanship fields must be numeric!', false)
                }
            }
            else if((parseFloat(data.inf) + parseFloat(data.steel) + parseFloat(data.cup) + parseFloat(data.lead) + parseFloat(data.zinc) + parseFloat(data.wms) + parseFloat(data.extra)) != 1){
                console.log((parseFloat(data.inf) + parseFloat(data.steel) + parseFloat(data.cup) + parseFloat(data.lead) + parseFloat(data.zinc) + parseFloat(data.wms) + parseFloat(data.extra)))
                if(cb){
                    cb('Total effects value must be equal to 1!')
                }
                else{
                    ui.alert('add-product-failed', 'Total effects value must be equal to 1!', false)
                }
            }
            else{
                sql.query("select * from products where p_name='" + data.product + "';", function(product){
                    if(product.length  != 0){
                        if(cb){
                            cb('This product is already exists!')
                        }
                        else{
                            ui.alert('add-product-failed', 'This product is already exists!', false)
                        }
                    }
                    else{
                        var sqlStatement = "insert into products(c_id, p_name, inf_effect, steel_effect, cup_effect, lead_effect, zinc_effect, wms_effect, extra_effect) values(" + data.category + ",'" + data.product + "', " + data.inf + ", " + data.steel + ", " + data.cup + ", " + data.lead + ", " + data.zinc + ", " + data.wms + ", " + data.extra + ");"
                        console.log(sqlStatement)
                        sql.query(sqlStatement, function(check){
                            if(check){
                                var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2, col3, col4, col5, col6, col7, col8, col9, col10) values('add', 'products', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check.insertId + ", "+ data.category + ",'" + data.product + "', " + data.inf + ", " + data.steel + ", " + data.cup + ", " + data.lead + ", " + data.zinc + ", " + data.wms + ", " + data.extra + ");"
                                console.log(sqlStatement)
                                sql.query(sqlStatement, function(check){})
                                select.update({className: 'select-product', value: check.insertId, text: data.product})
                                if(cb){
                                    cb(check.insertId)
                                }
                                else{
                                    ui.alert('add-product-succes', 'Product saved succesfully!', true)
                                }
                            }
                        })
                    }
                })
            }
        }
    },

    addCategory: function(category, cb){
        if(!category){
            if(cb){
                cb('Category name can not be empty!')
            }
            else{
                ui.alert('add-category-failed', 'Category name can not be empty!', false)
            }
        }
        else{
            sql.query("select * from categories where c_name='" + category + "';", function(categoryCheck){
                if(categoryCheck.length != 0){
                    if(cb){
                        cb('This category is already exists!')
                    }
                    else{
                        ui.alert('add-category-failed', 'This category is already exists!', false)
                    }
                }
                else{
                    var sqlStatement = "insert into categories(c_name) values('" + category + "');"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){
                        if(check){
                            var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('add', 'categories', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', " + check.insertId + ", '"+ category + "');"
                            console.log(sqlStatement)
                            sql.query(sqlStatement, function(check){})
                            select.update({className: 'select-category', value: check.insertId, text: category})
                            if(cb){
                                cb(check.insertId)
                            }
                            else{
                                ui.alert('add-category-succes', 'Category saved succesfully!', true)
                            }
                        }
                    })
                }
            })
        }
    },

    addProject: function(project, cb){
        if(!project){
            if(cb){
                cb('Project name can not be empty!')
            }
            else{
                ui.alert('add-project-failed', 'Project name can not be empty!', false)
            }
        }
        else{
            sql.query("select * from projects where pj_name='" + project + "';", function(projectCheck){
                if(projectCheck.length != 0){
                    if(cb){
                        cb('This project is already exists!')
                    }
                    else{
                        ui.alert('add-project-failed', 'This project is already exists!', false)
                    }
                }
                else{
                    var sqlStatement = "insert into projects(pj_name) values('" + project + "');"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){
                        if(check){
                            var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('add', 'projects', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check.insertId + ", '"+ project + "');"
                            console.log(sqlStatement)
                            sql.query(sqlStatement, function(check){})
                            select.update({className: 'select-project', value: check.insertId, text: project})
                            if(cb){
                                cb(check.insertId)
                            }
                            else{
                                ui.alert('add-project-succes', 'Project saved succesfully!', true)
                            }
                        }
                    })
                }
            })
        }
    },

    addSupplier: function(supplier, cb){
        if(!supplier){
            if(cb){
                cb('Supplier name can not be empty!')
            }
            else{
                ui.alert('add-supplier-failed', 'Supplier name can not be empty!', false)
            }
        }
        else{
            sql.query("select * from suppliers where s_name='" + supplier + "';", function(supplierCheck){
                if(supplierCheck.length != 0){
                    if(cb){
                        cb('This supplier is already exists!')
                    }
                    else{
                        ui.alert('add-supplier-failed', 'This supplier is already exists!', false)
                    }
                }
                else{
                    var sqlStatement = "insert into suppliers(s_name) values('" + supplier + "');"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){
                        if(check){
                            var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('add', 'supplier', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check.insertId + ", '"+ supplier + "');"
                            console.log(sqlStatement)
                            sql.query(sqlStatement, function(check){})
                            select.update({className: 'select-supplier', value: check.insertId, text: supplier})
                            if(cb){
                                cb(check.insertId)
                            }
                            else{
                                ui.alert('add-supplier-succes', 'Supplier saved succesfully!', true)
                            }
                        }
                    })
                }
            })
        }
    },

    addOffer: function(data, cb){
        if(!data){
            if(cb){
                cb('Entered offer data is empty!')
            }
            else{
                ui.alert('add-offer-failed', 'Entered offer data is empty!', false)
            }
        }
        else if(!data.product || !data.project || !data.supplier || !data.price){
            if(cb){
                cb('Any field can not be empty!')
            }
            else{
                ui.alert('add-offer-failed', 'Any field can not be empty!', false)
            }
        }
        else {
            if(!$.isNumeric(data.price)){
                if(cb){
                    cb()
                }
                else{
                    ui.alert('add-offer-failed', 'Price must be numeric!', false)
                }
            }
            else {
                var sqlStatement = "insert into offers(pd_id, pj_id, s_id, price, date, exchange, usd, eur) values(" + data.product + ", " + data.project + ", " + data.supplier + ", " + data.price + ", '" + data.date + "', '" + data.exchange + "', " + data.usd + ", " + data.eur + ");"
                console.log(sqlStatement)
                sql.query(sqlStatement, function(check){
                    var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2, col3, col4, col5, col6, col7, col8, col9) values('add', 'offers', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', " + check.insertId  + ",'" + data.product + "', '" + data.project + "', '" + data.supplier + "', '" + data.price + "', '" + data.date + "', '" + data.exchange + "', '" + data.usd + "', '" + data.eur + "');"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){})
                    if(check){
                        if(cb){
                            cb(check.insertId)
                        }
                        else{
                            ui.alert('add-offer-succes', 'Offer saved succesfully!', true)
                        }
                    }
                })
            }
        }
    },

    addPrice: function(price, tableInfo){
        //add metal prices to db
        if(!price){
            ui.setAlertModal('Price can not get for' + tableInfo.tableName + '!</br>Please contact with <strong>Ilyas Mammadov</strong></br>Tel: +90 506 110 7443</br>E-mail: ilyas.mammadov.96@gmail.com' , false)
        }
        else if(!$.isNumeric(price)){
            ui.setAlertModal('Price must be numeric for' + tableInfo.tableName + '!</br>Please contact with <strong>Ilyas Mammadov</strong></br>Tel: +90 506 110 7443</br>E-mail: ilyas.mammadov.96@gmail.com' , false)
        }
        else {
            var sqlStatement = "insert into " + tableInfo.tableName + "(" + tableInfo.cols[0] + ", " + tableInfo.cols[1] + ") values('" + od.getDateNow() + "', " + price + ");"
            sql.query(sqlStatement, function(check){})
        }
    },

    excelToDb: function(data, i){
        $('#import-excel-progress').css('width', '' + ((i/(data.length-3))*100) + '%')
        if(data[i][4] > '2015-01-01'){
            insert.addCategory(data[i][6], function(categoryResult){
                console.log('i: ' + i + ' category id: ' + categoryResult)
                insert.addProject(data[i][0], function(projectResult){
                    console.log('i: ' + i + ' project id: ' + projectResult)
                    insert.addSupplier(data[i][1], function(supplierResult){
                        console.log('i: ' + i + ' supplier id: ' + supplierResult)
                        if(data[i][6]){
                            sql.query("select c_id from categories where c_name='" + data[i][6] + "';", function(categoryId){
                                if(categoryId[0]){
                                    var productInfo = {}
                                    productInfo.product = data[i][5]
                                    productInfo.inf = data[i][7]
                                    productInfo.steel = data[i][8]
                                    productInfo.cup = data[i][9]
                                    productInfo.lead = data[i][10]
                                    productInfo.zinc = data[i][11]
                                    productInfo.wms = data[i][12]
                                    productInfo.extra = data[i][13]
                                    productInfo.category = categoryId[0].c_id
                                    console.log(productInfo)
                                    insert.addProduct(productInfo, function(productResult){
                                        console.log('i: ' + i + ' product id: ' + productResult)
                                        var offerInfo = {}
                                        if(data[i][5]){
                                            sql.query("select p_id from products where p_name='" + data[i][5] + "';", function(productId){
                                                if(productId[0]){
                                                    console.log('i: ' + i + ' ' + data[i][5] + ' için id: ' + productId[0].p_id)
                                                    offerInfo.product = productId[0].p_id
                                                    if(data[i][0]){
                                                        sql.query("select pj_id from projects where pj_name='" + data[i][0] + "';", function(projectId){
                                                            if(projectId[0]){
                                                                console.log('i: ' + i + ' ' + data[i][0] + ' için id: ' + projectId[0].pj_id)
                                                                offerInfo.project = projectId[0].pj_id
                                                                if(data[i][1]){
                                                                    sql.query("select s_id from suppliers where s_name='" + data[i][1] + "';", function(supplierId){
                                                                        if(supplierId[0]){
                                                                            console.log('i: ' + i + ' ' + data[i][1] + ' için id: ' + supplierId[0].s_id)
                                                                            offerInfo.supplier = supplierId[0].s_id
                                                                            offerInfo.price = data[i][2]
                                                                            offerInfo.exchange = data[i][3]
                                                                            offerInfo.date = data[i][4]
                                                                            if(offerInfo.date == od.getDateNow()){
                                                                                offerInfo.usd = od.setExchangeRateNow[0].selling
                                                                                offerInfo.eur = od.setExchangeRateNow[1].selling
                                                                                console.log(offerInfo)
                                                                                insert.addOffer(offerInfo, function(chrck){
                                                                                    if($.isNumeric(check)){
                                                                                        i++
                                                                                        if(i != data.length){
                                                                                            insert.excelToDb(data, i)
                                                                                        }
                                                                                    }
                                                                                    else{
                                                                                        console.log(check)
                                                                                        i++
                                                                                        if(i != data.length){
                                                                                            insert.excelToDb(data, i)
                                                                                        }
                                                                                    }
                                                                                })
                                                                            }
                                                                            else{
                                                                                od.getDollarRate(offerInfo.date, function(rate1){
                                                                                    offerInfo.usd = rate1
                                                                                    od.getEuroRate(offerInfo.date, function(rate2){
                                                                                        offerInfo.eur = rate2
                                                                                        console.log(offerInfo)
                                                                                        insert.addOffer(offerInfo, function(check){
                                                                                            if($.isNumeric(check)){
                                                                                                i++
                                                                                                if(i != data.length){
                                                                                                    insert.excelToDb(data, i)
                                                                                                }
                                                                                            }
                                                                                            else{
                                                                                                console.log(check)
                                                                                                i++
                                                                                                if(i != data.length){
                                                                                                    insert.excelToDb(data, i)
                                                                                                }
                                                                                            }
                                                                                        })
                                                                                    })
                                                                                })
                                                                            }
                                                                        }
                                                                        else{
                                                                            console.log('Supplier name is undefined in the db!')
                                                                            i++
                                                                            if(i != data.length){
                                                                                insert.excelToDb(data, i)
                                                                            }
                                                                        }
                                                                    })
                                                                }
                                                                else{
                                                                    console.log('Supplier name is undefined in the file!')
                                                                    i++
                                                                    if(i != data.length){
                                                                        insert.excelToDb(data, i)
                                                                    }
                                                                }
                                                            }
                                                            else{
                                                                console.log('Project name is undefined in the db!')
                                                                i++
                                                                if(i != data.length){
                                                                    insert.excelToDb(data, i)
                                                                }
                                                            }
                                                        })
                                                    }
                                                    else{
                                                        console.log('Project name is undefined in the file!')
                                                        i++
                                                        if(i != data.length){
                                                            insert.excelToDb(data, i)
                                                        }
                                                    }
                                                }
                                                else{
                                                    console.log('Product name is undefined in the db!')
                                                    i++
                                                    if(i != data.length){
                                                        insert.excelToDb(data, i)
                                                    }
                                                }
                                            })
                                        }
                                        else{
                                            console.log('Product name is undefined in the file!')
                                            i++
                                            if(i != data.length){
                                                insert.excelToDb(data, i)
                                            }
                                        }
                                    })
                                }
                                else{
                                    i++
                                    if(i != data.length){
                                        insert.excelToDb(data, i)
                                    }
                                }
                            })
                        }
                        else {
                            i++
                            if(i != data.length){
                                insert.excelToDb(data, i)
                            }
                        }
                    })
                })
            })
        }
    }
}