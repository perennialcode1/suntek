const dbUtility = require('../dbUtility');


class exeQuery {
    


    Execute_SP(data, OperationId, callback) {
        //console.log(data);
        const sqlQuery = `
        DECLARE @ResultMessage NVARCHAR(MAX);
        DECLARE @STATUS NVARCHAR(MAX); -- Corrected declaration
        EXEC [dbo].[SP_ScreenOperations]
            @OperationId = '${OperationId}',
            @JsonData = '${data}',
            @ResultMessage = @ResultMessage OUTPUT,
            @STATUS = @STATUS OUTPUT; -- Passing @STATUS as an output parameter
        SELECT @ResultMessage AS ResultMessage, @STATUS AS Status; -- Retrieving both output parameters
        `;
        console.log(sqlQuery);
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }

    SpListingWithDetails(TotJson, callback) {
        if (!TotJson) {
            return callback(new Error('No Data Of Listing'));
        }
        const JsonDataJSON = JSON.stringify(TotJson);
        const sqlQuery = `
            EXEC [dbo].[SP_InsertListingWithDetails]
            @JsonData = N'${ JsonDataJSON .replace(/'/g, "''")}'
        `;
        console.log('sqlQuery:', sqlQuery);
        dbUtility.executeQuery(sqlQuery)
            .then(results => callback(null, results))
            .catch(callback);
    }


}

module.exports = new exeQuery();