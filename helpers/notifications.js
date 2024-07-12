const axios = require('axios');
const exeQuery = require('../helpers/exeQuery');
const { ReplaceText } = require('../helpers/utilityFunctions.js');

class notification {
//#region Notification
    RejectIndentNotify(IndentStatus, callback) {
        const { Reason } = IndentStatus;
        const OrgId = 41028;
        if (Reason != "null") {
            this.sendNotification(OrgId, 'StoreManager', 'RejectIndent', { Reason }, callback);
        }
    }

    RaiseIndentNotify(StockIndentDatas, callback) {
        const { StoreName, StockIndent } = StockIndentDatas;
        const OrgId = StockIndent[0].OrgId;
        this.sendNotification(OrgId, 'ADMIN', 'RaiseIndent', { StoreName }, callback);
    }
    SendNotification(orgId, roleName, eventName, replacements, callback){
        execqry.getNotificationTemplate(eventName, roleName, orgId, (err, results) => {
            if (err) {
                return callback(err);
            }
            const userData = results && results.length > 0 ? results[0] : null;
            if (!userData) {
                return callback(new Error(`${roleName} email not found`));
            }

            const { Email: userEmail, EmailBody, Subject, Mobile, WhatsAppBody } = userData;
            SendWhatsappNotification(WhatsAppBody,Mobile,replacements,callback);        
            SendEmailNotification(EmailBody,orgId,userEmail,replacements,callback);
        });
    }
    SendWhatsappNotification(messageTemplate,Mobile,replacements,callback) {
        const whatsappMessage = ReplaceText(messageTemplate, replacements);
        const whatsappRequestData = { superid: 10001, tomobile: Mobile, message: whatsappMessage };
        this.sendRequest('https://notifyservisesrc.azurewebsites.net/notify/sendwhatsapp', whatsappRequestData, callback);
    }
    SendEmailNotification(messageTemplate,OrgId,userEmail,replacements,callback) {
        const emailMessage = ReplaceText(messageTemplate, replacements);
        const subject = ReplaceText(Subject, replacements);
        const emailRequestData = { superid: OrgId, toaddr: userEmail, message: emailMessage, subject: subject };
        this.sendRequest('https://notifyservisesrc.azurewebsites.net/notify/sendmail', emailRequestData, callback);
    }
    sendRequest(url, data, callback) {
        axios.post(url, data)
            .then(response => {
                console.log('Request sent successfully:', response.data);
                callback(null, response.data);
            })
            .catch(error => {
                console.error('Error sending request:', error.message);
                callback(error);
            });
    }
//#endregion Notification
}