function main(params) {
    try {
        var ibmdb = require('ibm_db');
        var dsn = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=mth59215;PWD=n3zl7d9tt1@6vd31;Security=SSL;"
        var conn=ibmdb.openSync(dsn);
        var sql = "SELECT USAGE,PRECAUTION,SIDE_EFFECT,INTERACTION,DOSAGE FROM ANGEL_FINAL WHERE DRUG_NAME ='"+params.name+"'"
        data = conn.querySync(sql)
        data = data[0]
        conn.closeSync();
        return data;
    }
    catch (e) {
    return { dberror : e }
 }
}

exports.main = main;
