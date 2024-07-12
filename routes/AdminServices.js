const express = require('express');
const { handleRecord } = require('../helpers/RecordHandler');
const { OperationEnums } = require('../helpers/utilityEnum.js');
const dbUtility = require('../dbUtility');
const exeQuery = require('../helpers/exeQuery');

const router = express.Router();
//#region User Operations
router.get('/getUsers', (req, res) => {
    const {OrgId} = req.query;
    const data = { "OrgId": OrgId };
    handleRecord(req, res, data, OperationEnums().USRSLIST);
});
router.post('/InsertUsers', async (req, res) => {
    try {
        const UsersData = req.body; // Assuming req.body contains the Users data
        const { Users } = require('../Models/UsersMdl');
        const data = new Users(UsersData); // Creating a new Users instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().USRSINSRT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error inserting Users' });
    }
});

router.post('/UpdateUsers', async (req, res) => {
    try {
        const UsersData = req.body; // Assuming req.body contains the Users data
        const { Users } = require('../Models/UsersMdl');
        const data = new Users(UsersData); // Creating a new Users instance
        console.log(data);
        handleRecord(req, res, data, OperationEnums().USRSUPDT);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating Users' });
    }
});
//#endregion User Operations

router.get('/getDDl', (req, res) => {
    const {OrgId, LoggedInUser} = req.query;
    const data = { "OrgId": OrgId, "LoggedInUser": LoggedInUser };
    handleRecord(req, res, data, OperationEnums().DDLSELC);
});

//#region User and Role Permissions
router.get('/UserPermissions', (req, res) => {
    const {OrgId, RoleId, ModuleId } = req.query;
    const data = { "OrgId": OrgId, "RoleId":RoleId, "ModuleId": ModuleId };
    handleRecord(req, res, data, OperationEnums().RSECURSEL);
});

router.get('/getmenu', (req, res) => {
    const {OrgId, RoleId } = req.query;
    const JsonData = { "OrgId": OrgId, "RoleId":RoleId };
    exeQuery.GetMenu(JsonData, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        
        exeQuery.GetMenuItems(results, (err, MenuList) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(MenuList);
        });
    });
});
router.post('/UpdateUserMenu', (req, res) => {
    const UpdateJson = req.body; 
     exeQuery.SpSetRoleSecurity(UpdateJson, (error, results) => {
        if (error) {
           res.status(400).send({ error: error.message });
          return;
       }
       res.status(200).send(results);
    });      
});
//#endregion User and Role Permissions




module.exports = router;