const express = require('express');
const router = express.Router();
const { handleRecord } = require('../helpers/RecordHandler.js');
const { OperationEnums } = require('../helpers/utilityEnum.js');
const exeQuery = require('../helpers/exeQuery');

router.use(express.json());

//#region Login Service
router.post('/SignIn', async (req, res) => {
    try {
        const { UsersData } = req.body; // Assuming req.body contains the Users data
        const data = new Users(UsersData); // Creating a new Users instance
        handleRecord(req, res, data, OperationEnums().SIGNIN);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error updating Users' });
    }
});
//#endregion Login Service

//#region getsubcategories
/**
 * @swagger
 * /Home/getSubCategories:
 *   get:
 *     summary: Retrieve sub-categories by CategoryId
 *     tags:
 *      - Home
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 */
router.get('/getSubCategories', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});
//#endregion getsubcategories

//#region Create Add
/**
 * @swagger
 * /Home/CreateAdd:
 *   post:
 *     summary: Endpoint to add a new listing with details
 *     tags:
 *       - Home
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserId:
 *                 type: integer
 *                 example: 7
 *               CategoryId:
 *                 type: integer
 *                 example: 1`
 *               SubCategoryId:
 *                 type: integer
 *                 example: 1
 *               Title:
 *                 type: string
 *                 example: "Sample Title"
 *               Description:
 *                 type: string
 *                 example: "PostMan"
 *               ImageUrl:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *               Price:
 *                 type: number
 *                 format: float
 *                 example: 100.00
 *               MinPrice:
 *                 type: number
 *                 format: float
 *                 example: 90.00
 *               MaxPrice:
 *                 type: number
 *                 format: float
 *                 example: 110.00
 *               City:
 *                 type: string
 *                 example: "Sample City"
 *               Country:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 1
 *                 example: "S"
 *               Location:
 *                 type: string
 *                 example: "Sample Location"
 *               Latitude:
 *                 type: number
 *                 format: double
 *                 example: 12.345678
 *               Longitude:
 *                 type: number
 *                 format: double
 *                 example: 98.765432
 *               Status:
 *                 type: string
 *                 example: "Active"
 *               ForSale:
 *                 type: integer
 *                 example: 1
 *               IsFeatured:
 *                 type: boolean
 *                 example: true
 *               IsActive:
 *                 type: integer
 *                 example: 1
 *               CreatedBy:
 *                 type: integer
 *                 example: 1
 *               CreatedOn:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-07-08T00:00:00"
 *               MoreDetails:
 *                 type: string
 *                 example: "Additional details about the listing"
 *               ListingType:
 *                 type: integer
 *                 example: 1
 *               IsOnline:
 *                 type: integer
 *                 example: 1
 *               CompanyName:
 *                 type: string
 *                 example: "Sample Company"
 *               CompanyWebsite:
 *                 type: string
 *                 example: "http://samplecompany.com"
 *               Quantity:
 *                 type: integer
 *                 example: 10
 *               Tenure:
 *                 type: integer
 *                 example: 2
 *               Experience:
 *                 type: integer
 *                 example: 5
 *               CurrentCondition:
 *                 type: string
 *                 example: "New"
 *               Style:
 *                 type: string
 *                 example: "Modern"
 *               Measurment:
 *                 type: string
 *                 example: "Sample Measurement"
 *               SerialNum:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object 
 */

router.post('/CreateAdd', (req, res) => {
    const jsonData = req.body;
    exeQuery.SpListingWithDetails(jsonData, (error, results) => {
        if (error) {
            res.status(400).send({ error: error.message });
            return;
        }
        res.status(200).send(results);
    });
});
//#end Region Create Add


//#region getFeaturedAds

/**
 * @swagger
 * /Home/getFeaturedAds:
 *   get:
 *     summary: Retrieve Featured ads
 *     tags:
 *       - Home
 *     parameters:
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: house for sale
 *                     ImageUrl:
 *                       type: string
 *                       example: "http://example.com/image.jpg"
 *                     location:
 *                       type: string
 *                       example: usa
 *                     postedon:
 *                       type: string
 *                       format: date
 *                       example: 26/10/2024
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 3333
 *                     ListingId:
 *                       type: integer
 *                       example: 101
 *                     subcategoryName:
 *                       type: string
 *                       example: plots
 *                     phone:
 *                       type: 
 *                       example: 98765456789
 *                     postedBy:
 *                       type: string
 *                       example: alex
 *                     UserImage:
 *                       type: string
 *                       example: asdf
 */

router.get('/getFeaturedAds', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});
//#endregion getFeaturedAds

//#region getLatestAds

/**
 * @swagger
 * /Home/getLatestAds:
 *   get:
 *     summary: Retrieve Latest Ads
 *     tags:
 *       - Home
 *     parameters:
 *       - in: query
 *         name: 
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 */
router.get('/getLatestAds', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});
//#endregion getLatestAds

//#region getFeatureddetails

/**
 * @swagger
 * /Home/getFeaturedAdsDetails:
 *   get:
 *     summary: Retrieve Ad details
 *     tags:
 *       - Home
 *     parameters:
 *       - in: query
 *         name: ListingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the listing to retrieve details
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: house for sale
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 123
 *                     description:
 *                       type: string
 *                       example: house
 *                     forSale:
 *                       type: string
 *                       example: 1
 *                     postedBy:
 *                       type: string
 *                       example: sai
 *                     userId:
 *                       type: integer
 *                       example: 123
 *                     postedOn:
 *                       type: string
 *                       format: date
 *                       example: 26/10/2024
 *                     latitude:
 *                       type: number
 *                       format: double
 *                       example: 17.340234
 *                     longitude:
 *                       type: number
 *                       format: double
 *                       example: 17.340234
 *                     city:
 *                       type: string
 *                       example: hnk
 *                     country:
 *                       type: string
 *                       example: usa
 *                     mailId:
 *                       type: string
 *                       example: mail@abc
 *                     phone:
 *                       type: string
 *                       example: 12345
 *                     currentCondition:
 *                       type: string
 *                       example: new
 *                     moreDetails:
 *                       type: object
 *                       properties:
 *                         bathrooms:
 *                           type: string
 *                           example: 2
 *                         bedrooms:
 *                           type: string
 *                           example: 2
 *                         length:
 *                           type: string
 *                           example: 234
 *                         breadth:
 *                           type: string
 *                           example: 234
 *                         availableFrom:
 *                           type: string
 *                           format: date
 *                           example: 22/04/24
 *                 maxprice:
 *                   type: integer
 *                   nullable: true
 *                   example: null
 *                 minprice:
 *                   type: integer
 *                   nullable: true
 *                   example: null
 *                 brandId:
 *                   type: integer
 *                   nullable: true
 *                   example: null
 *                 serialnum:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 measurement:
 *                   type: number
 *                   format: float
 *                   nullable: true
 *                   example: null
 *                 style:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 tenure:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 quantity:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 Message:
 *                   type: string
 *                   example: error message
 */

router.get('/getFeaturedAdsDetails', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});
//#endregion getFeatureddetails


//#region getLatestdetails
/**
 * @swagger
 * /Home/getLatestAdsDetails:
 *   get:
 *     summary: Retrieve Ad details
 *     tags:
 *       - Home
 *     parameters:
 *       - in: query
 *         name: ListingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the listing to retrieve details
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: house for sale
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 123
 *                     description:
 *                       type: string
 *                       example: house
 *                     forSale:
 *                       type: string
 *                       example: 1
 *                     postedBy:
 *                       type: string
 *                       example: sai
 *                     userId:
 *                       type: integer
 *                       example: 123
 *                     postedOn:
 *                       type: string
 *                       format: date
 *                       example: 26/10/2024
 *                     latitude:
 *                       type: number
 *                       format: double
 *                       example: 17.340234
 *                     longitude:
 *                       type: number
 *                       format: double
 *                       example: 17.340234
 *                     city:
 *                       type: string
 *                       example: hnk
 *                     country:
 *                       type: string
 *                       example: usa
 *                     mailId:
 *                       type: string
 *                       example: mail@abc
 *                     phone:
 *                       type: integer
 *                       example: 12345
 *                     currentCondition:
 *                       type: string
 *                       example: new
 *                     moreDetails:
 *                       type: object
 *                       properties:
 *                         bathrooms:
 *                           type: string
 *                           example: 2
 *                         bedrooms:
 *                           type: string
 *                           example: 2
 *                         length:
 *                           type: string
 *                           example: 234
 *                         breadth:
 *                           type: string
 *                           example: 234
 *                         availableFrom:
 *                           type: string
 *                           format: date
 *                           example: 22/04/24
 *                 maxprice:
 *                   type: number
 *                   format: float
 *                   nullable: true
 *                   example: null
 *                 minprice:
 *                   type: number
 *                   format: float
 *                   nullable: true
 *                   example: null
 *                 brandId:
 *                   type: integer
 *                   nullable: true
 *                   example: null
 *                 serialnum:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 measurement:
 *                   type: number
 *                   format: float
 *                   nullable: true
 *                   example: null
 *                 style:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 tenure:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 quantity:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 Message:
 *                   type: string
 *                   example: error message
 */

router.get('/getLatestAdsDetails', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});
//#endregion getLatestdetails


//#region getFeaturedRealestate
/**
 * @swagger
 * /Realestate/getFeaturedRealestate:
 *   get:
 *     summary: Retrieve featured realestate ads
 *     tags:
 *      - Realestate
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to filter realestate ads
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Flag indicating whether the ads are featured
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: house for sale
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 3333
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       subcategoryName:
 *                         type: integer
 *                         example: plots
 *                       phone:
 *                         type: integer
 *                         example: 98765456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       UserImage:
 *                         type: string
 *                         example: asdf
 *                       area:
 *                         type: string
 *                         example: 123
 *                 message:
 *                   type: string
 *                   example: error message
 */


router.get('/getFreaturedRealestate', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getLatestRealestate
/**
 * @swagger
 * /Realestate/getLatestRealestate:
 *   get:
 *     summary: Retrieve latest realestate ads
 *     tags:
 *      - Realestate
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category and the featured status to filter realestate ads
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: house for sale
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 3333
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       subcategoryName:
 *                         type: string
 *                         example: plots
 *                       phone:
 *                         type: string
 *                         example: 98765456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       UserImage:
 *                         type: string
 *                         example: asdf
 *                       area:
 *                         type: string
 *                         example: 123
 *                 message:
 *                   type: string
 *                   example: error message
 */
router.get('/getLatestRealestate', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getRealestateList
/**
 * @swagger
 * /Realestate/getRealestateList:
 *   get:
 *     summary: Retrieve realestate Ad list by subcategoryId
 *     tags:
 *      - Realestate
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to filter realestate ads
 *       - in: query
 *         name: SubCategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the subcategory to filter realestate ads
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: house for sale
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 3333
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       subcategoryName:
 *                         type: string
 *                         example: plots
 *                       phone:
 *                         type: string
 *                         example: 98765456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       UserImage:
 *                         type: string
 *                         example: asdf
 *                       area:
 *                         type: string
 *                         example: 123
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getPropertyList', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getRealestateDetails
/**
 * @swagger
 * /Realestate/getRealestateDetails:
 *   get:
 *     summary: Retrieve Ad details by ListingId
 *     tags:
 *      - Realestate
 *     parameters:
 *       - in: query
 *         name: ListingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the property to retrieve details
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: house for sale
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 123
 *                     description:
 *                       type: string
 *                       example: house
 *                     forSale:
 *                       type: string
 *                       example: 1
 *                     postedBy:
 *                       type: string
 *                       example: sai
 *                     userId:
 *                       type: integer
 *                       example: 123
 *                     postedOn:
 *                       type: string
 *                       format: date
 *                       example: 26/10/2024
 *                     latitude:
 *                       type: number
 *                       format: double
 *                       example: 17.340234
 *                     longitude:
 *                       type: number
 *                       format: double
 *                       example: 17.340234
 *                     city:
 *                       type: string
 *                       example: hnk
 *                     country:
 *                       type: string
 *                       example: usa
 *                     mailId:
 *                       type: string
 *                       example: mail@abc
 *                     phone:
 *                       type: string
 *                       example: 12345
 *                     currentCondition:
 *                       type: string
 *                       example: new
 *                     moreDetails:
 *                       type: object
 *                       properties:
 *                         bathrooms:
 *                           type: string
 *                           example: 2
 *                         bedrooms:
 *                           type: string
 *                           example: 2
 *                         length:
 *                           type: string
 *                           example: 234
 *                         Breadth:
 *                           type: string
 *                           example: 234
 *                         availableFrom:
 *                           type: string
 *                           format: date
 *                           example: 22/04/24
 */
router.get('/getRealestateDetails', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getUpcomingclass
/**
 * @swagger
 * /Education/getUpcomingclasses:
 *   get:
 *     summary: Retrieve Ads of upcoming classes
 *     tags:
 *      - Education
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve list
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         example: 26/10/2024
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 3333
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       subcategoryName:
 *                         type: string
 *                         example: IT
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       UserImage:
 *                         type: string
 *                         example: asdf
 *                       Location:
 *                         type: string
 *                         example: hnk
 *                       duration:
 *                         type: string
 *                         example: 5
 *                       Moredetails:
 *                         type: object
 *                         properties:
 *                           daily:
 *                             type: string
 *                             example: 3
 *                 Message:
 *                   type: string
 *                   example: error message
 */

router.get('/getUpcomingclasses', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getEducationList
/**
 * @swagger
 * /Education/getEducationList:
 *   get:
 *     summary: Retrieve Education Ads List by subcategoryId
 *     tags:
 *      - Education
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve list
 *       - in: query
 *         name: subcategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the subcategory to retrieve list
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       coursePrice:
 *                         type: string
 *                         example: 123
 *                       isFeatured:
 *                         type: boolean
 *                         example: true
 *                       isonline:
 *                         type: integer
 *                         example: 1
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       description:
 *                         type: string
 *                         example: abc
 *                       subcategoryName:
 *                         type: string
 *                         example: IT
 *                       location:
 *                         type: string
 *                         example: hnk
 *                       listingId:
 *                         type: integer
 *                         example: 123
 *                       rating:
 *                         type: number
 *                         format: float
 *                         example: 3.5
 *                       type:
 *                         type: string
 *                         example: 2
 *                 Message:
 *                   type: string
 *                   example: error message
 */


router.get('/getEducationList', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getFeaturedEducation
/**
 * @swagger
 * /Education/getFeaturedEducation:
 *   get:
 *     summary: Retrieve featured Education Ads List
 *     tags:
 *      - Education
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve list
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Flag indicating whether the item is featured
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         example: 26/10/2024
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 3333
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       subcategoryName:
 *                         type: string
 *                         example: IT
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       UserImage:
 *                         type: string
 *                         example: asdf
 *                       Location:
 *                         type: string
 *                         example: hnk
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getFeaturedEducation', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getEducationDetails
/**
 * @swagger
 * /Education/getEducationDetails:
 *   get:
 *     summary: Retrieve Ad details by listingId
 *     tags:
 *      - Education
 *     parameters:
 *       - in: query
 *         name: ListingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the listing to retrieve details
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: abc
 *                     coursePrice:
 *                       type: string
 *                       example: 123
 *                     description:
 *                       type: string
 *                       example: asdf
 *                     postedBy:
 *                       type: string
 *                       example: sai
 *                     postedOn:
 *                       type: string
 *                       example: 26/10/2024
 *                     rating:
 *                       type: number
 *                       format: float
 *                       example: 4.6
 *                    
 *                     latitude:
 *                       type: number
 *                       format: double
 *                       example: 12.12211
 *                     longitude:
 *                       type: number
 *                       format: double
 *                       example: 12.123121
 *                     city:
 *                       type: string
 *                       example: hnk
 *                     country:
 *                       type: string
 *                       example: usa
 *                     mailId:
 *                       type: string
 *                       example: mail@abc
 *                     phone:
 *                       type: string
 *                       example: 12345
 *                     instituteName:
 *                       type: string
 *                       example: bcd
 *                     institutewebsite:
 *                       type: string
 *                       example: ww
 *                     courseDuration:
 *                       type: string
 *                       example: 4
 *                     isOnline:
 *                       type: integer
 *                       example: 0
 *                 Message:
 *                   type: string
 *                   example: error message
 */

router.get('/getEducationDetails', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});



//#region getFeaturedJobs
/**
 * @swagger
 * /Jobs/getFeaturedJobs:
 *   get:
 *     summary: Retrieve featured jobs Ads
 *     tags:
 *      - Jobs
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve list
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Flag indicating whether the item is featured
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       max-salary:
 *                         type: string
 *                         example: 1233
 *                       listingType:
 *                         type: string
 *                         example: Developer
 *                       companyName:
 *                         type: string
 *                         example: abSchool
 *                       location:
 *                         type: string
 *                         example: usa
 *                       condition:
 *                         type: string
 *                         example: internship
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getFeaturedJobs', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getLatestJobs
/**
 * @swagger
 * /Jobs/getLatestJobs:
 *   get:
 *     summary: Retrieve latest jobs Ads
 *     tags:
 *      - Jobs
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       listingType:
 *                         type: string
 *                         example: teacher
 *                       companyName:
 *                         type: string
 *                         example: abSchool
 *                       location:
 *                         type: string
 *                         example: usa
 *                       condition:
 *                         type: string
 *                         example: internship
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getLatestJobs', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getJoblist
/**
 * @swagger
 * /Jobs/getJoblist:
 *   get:
 *     summary: Retrieve job list by SubCategoryId
 *     tags:
 *      - Jobs
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *       - in: query
 *         name: SubCategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the sub-category to retrieve sub-categories
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       max-salary:
 *                         type: string
 *                         example: 1233
 *                       listingType:
 *                         type: string
 *                         example: teacher
 *                       companyName:
 *                         type: string
 *                         example: abSchool
 *                       location:
 *                         type: string
 *                         example: usa
 *                       condition:
 *                         type: string
 *                         example: internship
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getJoblist', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getJobsDetails
/**
 * @swagger
 * /Jobs/getJobsDetails:
 *   get:
 *     summary: Retrieve Ad details by ListingId
 *     tags:
 *      - Jobs
 *     parameters:
 *       - in: query
 *         name: ListingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the listing to retrieve job details
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: abc
 *                     condition:
 *                       type: string
 *                       example: internship
 *                     listingType:
 *                       type: string
 *                       example: teacher
 *                     companyName:
 *                       type: string
 *                       example: abSchool
 *                     location:
 *                       type: string
 *                       example: usa
 *                     minSalary:
 *                       type: string
 *                       example: 1234
 *                     maxSalary:
 *                       type: string
 *                       example: 1233
 *                     minExp:
 *                       type: string
 *                       example: 3
 *                     maxExp:
 *                       type: string
 *                       example: 6
 *                     eligibility:
 *                       type: string
 *                       example: graduate
 *                     language:
 *                       type: string
 *                       example: English, Spanish
 *                     postedon:
 *                       type: string
 *                       format: date
 *                       example: 26/10/2024
 *                     description:
 *                       type: string
 *                       example: abcd
 *                     phone:
 *                       type: string
 *                       example: 987456789
 *                     postedBy:
 *                       type: string
 *                       example: sai
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getJobsDetails', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getFeaturedBusiness
/**
 * @swagger
 * /Business/getFeaturedBusiness:
 *   get:
 *     summary: Retrieve featured business ads
 *     tags:
 *      - Business Directory
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve featured ads
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Flag indicating whether the item is featured
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       LineofBusinessId:
 *                         type: integer
 *                         example: 2
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       UserImage:
 *                         type: string
 *                         example: asdf
 *                       Location:
 *                         type: string
 *                         example: hnk
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getFeaturedBusiness', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getLatestBusiness
/**
 * @swagger
 * /Business/getLatestBusiness:
 *   get:
 *     summary: Retrieve latest business ads
 *     tags:
 *      - Business Directory
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve latest business
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       LineofBusinessId:
 *                         type: integer
 *                         example: 2
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       UserImage:
 *                         type: string
 *                         example: asdf
 *                       Location:
 *                         type: string
 *                         example: hnk
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getLatestBusiness', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getBusinessList
/**
 * @swagger
 * /Business/getBusinessList:
 *   get:
 *     summary: Retrieve business list by subcategoryId
 *     tags:
 *      - Business Directory
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *       - in: query
 *         name: SubCategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the sub-category to retrieve the Ads
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       isFeatured:
 *                         type: boolean
 *                         example: true
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       description:
 *                         type: string
 *                         example: abc
 *                       location:
 *                         type: string
 *                         example: hnk
 *                       rating:
 *                         type: number
 *                         format: float
 *                         example: 3.5
 *                 Message:
 *                   type: string
 *                   example: error message
 */

router.get('/getBusinessList', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getBusinessDetails
/**
 * @swagger
 * /Busniess/getBusinessDetails:
 *   get:
 *     summary: Retrieve Ad details by listingId
 *     tags:
 *      - Business Directory
 *     parameters:
 *       - in: query
 *         name: ListingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Ad in Listings
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: abc
 *                     companyName:
 *                       type: string
 *                       example: abcd
 *                     LineOfBusiness:
 *                       type: string
 *                       example: 1
 *                     description:
 *                       type: string
 *                       example: asdf
 *                     amenities:
 *                       type: string
 *                       example: wifi
 *                     website:
 *                       type: string
 *                       example: www
 *                     email:
 *                       type: string
 *                       example: www
 *                     workingDays:
 *                       type: array
 *                       items:
 *                         type: integer
 *                         example: 
 *                           - 2
 *                           - 3
 *                           - 4
 *                           - 5
 *                           - 6
 *                     startTime:
 *                       type: string
 *                       format: time
 *                       example: 09:00:00
 *                     endTime:
 *                       type: string
 *                       format: time
 *                       example: 17:00:00
 *                     city:
 *                       type: string
 *                       example: hnk
 *                     country:
 *                       type: string
 *                       example: usa
 *                     postedBy:
 *                       type: string
 *                       example: sai
 *                     postedOn:
 *                       type: string
 *                       example: 26/10/2024
 *                     rating:
 *                       type: number
 *                       format: float
 *                       example: 4.6
 *                     latitude:
 *                       type: number
 *                       format: double
 *                       example: 12.2221
 *                     longitude:
 *                       type: number
 *                       format: double
 *                       example: 12.12121
 *                 Message:
 *                   type: string
 *                   example: error message
 */

router.get('/getBusinessDetails', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getFeaturedFurniture
/**
 * @swagger
 * /Furniture/getFeaturedFurniture:
 *   get:
 *     summary: Retrieve Featured furniture Ads 
 *     tags:
 *      - Furniture
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Flag indicating whether the item is featured
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       brandName:
 *                         type: string
 *                         example: abc
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         example: 26/10/2024
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getFeaturedFurniture', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getLatestFurniture
/**
 * @swagger
 * /Furnitre/getLatestFurniture:
 *   get:
 *     summary: Retrieve latest furniture Ads
 *     tags:
 *      - Furniture
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve Ads
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       brandName:
 *                         type: string
 *                         example: abc
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         example: 26/10/2024
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */


router.get('/getLatestFurniture', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getFurnitureList
/**
 * @swagger
 * /Furniture/getFurnitureList:
 *   get:
 *     summary: Retrieve Furniture Ads list by subcategoryId
 *     tags:
 *      - Furniture
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *       - in: query
 *         name: subcategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the sub-category to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       brandName:
 *                         type: string
 *                         example: abc
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         example: 26/10/2024
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */


router.get('/getFurnitureList', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getFurnitureDetails
/**
 * @swagger
 * /Furniture/getFurnitureDetails:
 *   get:
 *     summary: Retrieve Ad details by listingId
 *     tags:
 *      - Furniture
 *     parameters:
 *       - in: query
 *         name: listingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the listing to get details of the Ad
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       subcategoryName:
 *                         type: string
 *                         example: chair
 *                       brandName:
 *                         type: string
 *                         example: abc
 *                       quantity:
 *                         type: string
 *                         example: 3
 *                       condition:
 *                         type: string
 *                         example: looks new
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         example: 26/10/2024
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getFurnitureDetails', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getFeaturedAppliance
/**
 * @swagger
 * /Appliance/getFeaturedAppliance:
 *   get:
 *     summary: Retrieve featured appliance Ads
 *     tags:
 *      - Appliance
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve Ad list
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Flag indicating whether the item is featured
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       location:
 *                         type: string
 *                         example: usa
 *                       rating:
 *                         type: number
 *                         format: float
 *                         example: 4.0
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         example: 26/10/2024
 *                       brandName:
 *                         type: string
 *                         example: abc
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getFeaturedAppliance', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getLatestAppliance
/**
 * @swagger
 * /Appliance/getLatestAppliance:
 *   get:
 *     summary: Retrieve latest appliance Ads
 *     tags:
 *      - Appliance
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve latest Ads
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       location:
 *                         type: string
 *                         example: usa
 *                       rating:
 *                         type: number
 *                         format: float
 *                         example: 4.0
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       brandName:
 *                         type: string
 *                         example: abc
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getLatestAppliance', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getApplianceList
/**
 * @swagger
 * /Appliance/getApplianceList:
 *   get:
 *     summary: Retrieve appliance Ads list
 *     tags:
 *      - Appliance
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *       - in: query
 *         name: subCategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the subCategory to retrieve Ad list
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       brandName:
 *                         type: string
 *                         example: abc
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getApplianceList', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getApplianceDetails
/**
 * @swagger
 * /Appliance/getApplianceDetails:
 *   get:
 *     summary: Retrieve appliance details by ListingId
 *     tags:
 *      - Appliance
 *     parameters:
 *       - in: query
 *         name: ListingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the listing to retrieve details
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: washing machine
 *                     ImageUrl:
 *                       type: string
 *                       example: "http://example.com/image.jpg"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 1234
 *                     description:
 *                       type: string
 *                       example: abcd
 *                     location:
 *                       type: string
 *                       example: usa
 *                     rating:
 *                       type: number
 *                       format: float
 *                       example: 4.0
 *                     postedby:
 *                       type: string
 *                       example: sai
 *                     postedon:
 *                       type: string
 *                       format: date
 *                       example: 26/10/2024
 *                     brandName:
 *                       type: string
 *                       example: abc
 *                     ListingId:
 *                       type: integer
 *                       example: 101
 *                     phone:
 *                       type: string
 *                       example: 987456789
 *                     style:
 *                       type: string
 *                       example: frontdoor
 *                     Capacity:
 *                       type: string
 *                       example: 5.5kg
 *                     condition:
 *                       type: string
 *                       example: new
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getApplianceDetails', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getFeaturedTours
/**
 * @swagger
 * /Tours/getFeaturedTours:
 *   get:
 *     summary: Retrieve featured tours Ads 
 *     tags:
 *      - Tours
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve featured tours
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Flag to filter featured tours
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       pricePerHead:
 *                         type: string
 *                         example: 1234
 *                       tenure:
 *                         type: string
 *                         example: 4
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getFeaturedTours', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getLatestTours
/**
 * @swagger
 * /Tours/getLatestTours:
 *   get:
 *     summary: Retrieve latest tours Ads
 *     tags:
 *      - Tours
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve featured tours
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       pricePerHead:
 *                         type: string
 *                         example: 1234
 *                       tenure:
 *                         type: string
 *                         example: 4
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getLatestTours', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getToursList
/**
 * @swagger
 * /Tours/getToursList:
 *   get:
 *     summary: Retrieve tour Ads list 
 *     tags:
 *      - Tours
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve tour locations
 *       - in: query
 *         name: subcategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the subcategory to retrieve tour list
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       pricePerHead:
 *                         type: string
 *                         example: 1234
 *                       tenure:
 *                         type: string
 *                         example: 4
 *                       to:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       ratings:
 *                         type: number
 *                         format: float
 *                         example: 4.6
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getToursList', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getTourDetails
/**
 * @swagger
 * /Tours/getTourDetails:
 *   get:
 *     summary: Retrieve Tour details by ListingId
 *     tags:
 *      - Tours
 *     parameters:
 *       - in: query
 *         name: ListingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the tour to retrieve details
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: abc
 *                     ImageUrl:
 *                       type: string
 *                       example: "http://example.com/image.jpg"
 *                     pricePerHead:
 *                       type: string
 *                       example: 1234
 *                     tenure:
 *                       type: string
 *                       example: 4
 *                     to:
 *                       type: string
 *                       example: usa
 *                     postedby:
 *                       type: string
 *                       example: sai
 *                     postedon:
 *                       type: string
 *                       format: date
 *                       example: 26/10/2024
 *                     ratings:
 *                       type: number
 *                       format: float
 *                       example: 4.6
 *                     ListingId:
 *                       type: integer
 *                       example: 101
 *                     description:
 *                       type: string
 *                       example: abcd
 *                     phone:
 *                       type: string
 *                       example: 987456789
 *                     moredetails:
 *                       type: object
 *                       properties:
 *                         minAge:
 *                           type: string
 *                           example: 14
 *                         maxAge:
 *                           type: string
 *                           example: 56
 *                         visa:
 *                           type: string
 *                           example: required
 *                         identityProof:
 *                           type: string
 *                           example: any
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getTourDetails', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getFeaturedCars
/**
 * @swagger
 * /Cars/getFeaturedCars:
 *   get:
 *     summary: Retrieve featured car Ads
 *     tags:
 *      - Cars
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve featured ads
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Whether the ad is featured
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       brandName:
 *                         type: string
 *                         example: bmw
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       fuelType:
 *                         type: string
 *                         example: diesel
 *                       Odometer:
 *                         type: string
 *                         example: 37671
 *                       moredetails:
 *                         type: object
 *                         properties:
 *                           kmpl:
 *                             type: string
 *                             example: 44
 *                 message:
 *                   type: string
 *                   example: error message
 */


router.get('/getFeaturedCars', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});



//#region getLatestCars
/**
 * @swagger
 * /Cars/getLatestCars:
 *   get:
 *     summary: Retrieve latest car Ads
 *     tags:
 *      - Cars
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve featured ads
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       brandName:
 *                         type: string
 *                         example: bmw
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       fuelType:
 *                         type: string
 *                         example: diesel
 *                       Odometer:
 *                         type: string
 *                         example: 37671
 *                       moredetails:
 *                         type: object
 *                         properties:
 *                           kmpl:
 *                             type: string
 *                             example: 44
 *                 message:
 *                   type: string
 *                   example: error message
 */
router.get('/getLatestCars', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});



//#region getCarsList
/**
 * @swagger
 * /Cars/getCarsList:
 *   get:
 *     summary: Retrieve cars Ads list by categoryId and brandId
 *     tags:
 *      - Cars
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve featured ads
 *       - in: query
 *         name: BrandId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Brand to retrieve ads list
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       brandName:
 *                         type: string
 *                         example: bmw
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       fuelType:
 *                         type: string
 *                         example: diesel
 *                       Odometer:
 *                         type: string
 *                         example: 37671
 *                       moredetails:
 *                         type: object
 *                         properties:
 *                           kmpl:
 *                             type: string
 *                             example: 44
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getCarsList', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});



//#region getCarDetails
/**
 * @swagger
 * /Cars/getCarDetails:
 *   get:
 *     summary: Retrieve car details by CategoryId, ListingId, and BrandId
 *     tags:
 *      - Cars
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category
 *       - in: query
 *         name: ListingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the car listing
 *       - in: query
 *         name: BrandId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the car brand
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: abc
 *                     ImageUrl:
 *                       type: string
 *                       example: "http://example.com/image.jpg"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 1234
 *                     brandName:
 *                       type: string
 *                       example: ktm
 *                     subcategoryName:
 *                       type: string
 *                       example: coupe
 *                     color:
 *                       type: string
 *                       example: red
 *                     Condition:
 *                       type: string
 *                       example: new
 *                     fuelType:
 *                       type: string
 *                       example: petrol
 *                     Odometer:
 *                       type: string
 *                       example: 37671
 *                     seating:
 *                       type: string
 *                       example: 4
 *                     location:
 *                       type: string
 *                       example: usa
 *                     postedon:
 *                       type: string
 *                       format: date
 *                       example: 26/10/2024
 *                     ListingId:
 *                       type: integer
 *                       example: 101
 *                     description:
 *                       type: string
 *                       example: abcd
 *                     phone:
 *                       type: string
 *                       example: 987456789
 *                     moredetails:
 *                       type: object
 *                       properties:
 *                         kmpl:
 *                           type: string
 *                           example: 44
 *                     postedBy:
 *                       type: string
 *                       example: sai
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getCarDetails', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});



//#region getFeaturedBikes
/**
 * @swagger
 * /Bikes/getFeaturedBikes:
 *   get:
 *     summary: Retrieve featured bikes Ads by CategoryId
 *     tags:
 *      - Bikes
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve featured bikes
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Flag indicating if the bike is featured
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 3553
 *                       brandName:
 *                         type: string
 *                         example: ducati
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 21/10/2024
 *                       ListingId:
 *                         type: integer
 *                         example: 22
 *                       description:
 *                         type: string
 *                         example: xyzd
 *                       phone:
 *                         type: string
 *                         example: 123456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       fuelType:
 *                         type: string
 *                         example: petrol
 *                       Odometer:
 *                         type: string
 *                         example: 37671
 *                       moredetails:
 *                         type: object
 *                         properties:
 *                           kmpl:
 *                             type: string
 *                             example: 44
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getFeaturedBikes', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});



//#region getLatestBikes
/**
 * @swagger
 * /Bikes/getLatestBikes:
 *   get:
 *     summary: Retrieve latest bikes Ads by CategoryId
 *     tags:
 *      - Bikes
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve featured bikes
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 3553
 *                       brandName:
 *                         type: string
 *                         example: ducati
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 21/10/2024
 *                       ListingId:
 *                         type: integer
 *                         example: 22
 *                       description:
 *                         type: string
 *                         example: xyzd
 *                       phone:
 *                         type: string
 *                         example: 123456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       fuelType:
 *                         type: string
 *                         example: petrol
 *                       Odometer:
 *                         type: string
 *                         example: 37671
 *                       moredetails:
 *                         type: object
 *                         properties:
 *                           kmpl:
 *                             type: string
 *                             example: 44
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getLatestBikes', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getBikesList
/**
 * @swagger
 * /Bikes/getBikesList:
 *   get:
 *     summary: Retrieve bikes list by CategoryId and BrandId
 *     tags:
 *      - Bikes
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve bikes
 *       - in: query
 *         name: BrandId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the brand to filter bikes
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 3553
 *                       brandName:
 *                         type: string
 *                         example: ducati
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 21/10/2024
 *                       ListingId:
 *                         type: integer
 *                         example: 22
 *                       description:
 *                         type: string
 *                         example: xyzd
 *                       phone:
 *                         type: string
 *                         example: 123456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       fuelType:
 *                         type: string
 *                         example: petrol
 *                       Odometer:
 *                         type: string
 *                         example: 37671
 *                       moredetails:
 *                         type: object
 *                         properties:
 *                           kmpl:
 *                             type: string
 *                             example: 44
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getBikesList', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getBikeDetails
/**
 * @swagger
 * /Bikes/getBikeDetails:
 *   get:
 *     summary: Retrieve bike details by ListingId
 *     tags:
 *      - Bikes
 *     parameters:
 *       - in: query
 *         name: ListingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the listing to get bike details
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: abc
 *                     ImageUrl:
 *                       type: string
 *                       example: "http://example.com/image.jpg"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 1234
 *                     brandName:
 *                       type: string
 *                       example: ktm
 *                     color:
 *                       type: string
 *                       example: red
 *                     Condition:
 *                       type: string
 *                       example: new
 *                     fuelType:
 *                       type: string
 *                       example: petrol
 *                     Odometer:
 *                       type: string
 *                       example: 37671
 *                     moredetails:
 *                       type: object
 *                       properties:
 *                         kmpl:
 *                           type: string
 *                           example: 44
 *                     location:
 *                       type: string
 *                       example: usa
 *                     postedon:
 *                       type: string
 *                       format: date
 *                       example: 26/10/2024
 *                     ListingId:
 *                       type: integer
 *                       example: 101
 *                     description:
 *                       type: string
 *                       example: abcd
 *                     phone:
 *                       type: string
 *                       example: 987456789
 *                     postedBy:
 *                       type: string
 *                       example: sai
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getBikeDetails', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getRealestateAdsCount
/**
 * @swagger
 * /Realestate/getRealestateAdsCount:
 *   get:
 *     summary: Retrieve Realestate subCategories Ads count
 *     tags:
 *      - Realestate
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     home:
 *                       type: integer
 *                       example: 2
 *                     appartments:
 *                       type: integer
 *                       example: 5
 *                     lands:
 *                       type: integer
 *                       example: 5
 *                     plots:
 *                       type: integer
 *                       example: 10
 *                     offices:
 *                       type: integer
 *                       example: 12
 *                     shops:
 *                       type: integer
 *                       example: 10
 *                     villas:
 *                       type: integer
 *                       example: 28
 *                     commercial:
 *                       type: integer
 *                       example: 10
 *                 Message:
 *                   type: string
 *                   example: error message
 */

router.get('/getRealestateAdsCount', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getBusinessAdCount
/**
 * @swagger
 * /Business/getBusinessAdCount:
 *   get:
 *     summary: Retrieve business directory  sub-categories Ads count 
 *     tags:
 *      - Business Directory
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     hotels:
 *                       type: integer
 *                       example: 2
 *                     cafe:
 *                       type: integer
 *                       example: 5
 *                     shops:
 *                       type: integer
 *                       example: 5
 *                     tours:
 *                       type: integer
 *                       example: 10
 *                     gym:
 *                       type: integer
 *                       example: 12
 *                     restaurants:
 *                       type: integer
 *                       example: 10
 *                 Message:
 *                   type: string
 *                   example: error message
 */

router.get('/getBusinessAdCount', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getBikeAdsCount
/**
 * @swagger
 * /Bikes/getBikeAdsCount:
 *   get:
 *     summary: Retrieve bike Ads count by CategoryId and BrandId
 *     tags:
 *      - Bikes
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *       - in: query
 *         name: BrandId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the brand to retrieve ads count
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     hero:
 *                       type: integer
 *                       example: 2
 *                     honda:
 *                       type: integer
 *                       example: 5
 *                     ducati:
 *                       type: integer
 *                       example: 5
 *                     suzuki:
 *                       type: integer
 *                       example: 10
 *                     tvs:
 *                       type: integer
 *                       example: 12
 *                     yamaha:
 *                       type: integer
 *                       example: 10
 *                     harley:
 *                       type: integer
 *                       example: 10
 *                     ktm:
 *                       type: integer
 *                       example: 12
 *                     re:
 *                       type: integer
 *                       example: 10
 *                 Message:
 *                   type: string
 *                   example: error message
 */

router.get('/getBikeAdsCount', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getCarsAdsCount
/**
 * @swagger
 * /Cars/getCarsAdsCount:
 *   get:
 *     summary: Retrieve cars Ads count by CategoryId and BrandId
 *     tags: 
 *       - Cars
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *       - in: query
 *         name: BrandId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the brand to retrieve ads count
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     lamborgi:
 *                       type: integer
 *                       example: 2
 *                     ferrari:
 *                       type: integer
 *                       example: 5
 *                     ford:
 *                       type: integer
 *                       example: 5
 *                     fiat:
 *                       type: integer
 *                       example: 10
 *                     benz:
 *                       type: integer
 *                       example: 12
 *                     tesla:
 *                       type: integer
 *                       example: 10
 *                     mitsubi:
 *                       type: integer
 *                       example: 10
 *                     toyota:
 *                       type: integer
 *                       example: 12
 *                     bmw:
 *                       type: integer
 *                       example: 10
 *                 Message:
 *                   type: string
 *                   example: error message
 */

router.get('/getCarsAdsCount', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getFurnitureAdsCount
/**
 * @swagger
 * /Furniture/getFurnitureAdsCount:
 *   get:
 *     summary: Retrieve furniture sub-categories ads count by CategoryId
 *     tags:
 *      - Furniture
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve sub-categories
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: object
 *                   properties:
 *                     couch:
 *                       type: integer
 *                       example: 2
 *                     wardrobes:
 *                       type: integer
 *                       example: 5
 *                     beds:
 *                       type: integer
 *                       example: 5
 *                     chairs:
 *                       type: integer
 *                       example: 10
 *                     benches:
 *                       type: integer
 *                       example: 12
 *                     desks:
 *                       type: integer
 *                       example: 10
 *                     dining:
 *                       type: integer
 *                       example: 10
 *                     shelves:
 *                       type: integer
 *                       example: 12
 *                     tables:
 *                       type: integer
 *                       example: 10
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getFurnitureAdsCount', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getSearchRealestate
/**
 * @swagger
 * /Realestate/getSearchRealestate:
 *   get:
 *     summary: Retrieve realestate search results 
 *     tags:
 *      - Realestate
 *     parameters:
 *       - in: query
 *         name: listingType
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the listing type
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Title of the Ad to search
 *       - in: query
 *         name: subcategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the sub-category to retrieve the type
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: Location of the Ad to retrieve its location
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: house for sale
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 3333
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       subcategoryName:
 *                         type: string
 *                         example: plots
 *                       phone:
 *                         type: string
 *                         example: 98765456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       UserImage:
 *                         type: string
 *                         example: asdf
 *                       area:
 *                         type: string
 *                         example: 123
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getSearchRealestate', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getSearchEducation
/**
 * @swagger
 * /Education/getSearchEducation:
 *   get:
 *     summary: Retrieve education search results
 *     tags:
 *      - Education
 *     parameters:
 *       - in: query
 *         name: listingType
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the listing type
 *       - in: query
 *         name: subcategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the sub-category to retrieve the type
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Title of the Ad to search
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: Location of the Ad to retrieve its location
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 3333
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       subcategoryName:
 *                         type: string
 *                         example: IT
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       UserImage:
 *                         type: string
 *                         example: asdf
 *                       Location:
 *                         type: string
 *                         example: hnk
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getSearchEducation', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getSearchJobs
/**
 * @swagger
 * /Jobs/getSearchJobs:
 *   get:
 *     summary: Retrieve search results for jobs
 *     tags:
 *      - Jobs
 *     parameters:
 *       - in: query
 *         name: listingType
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the listing type
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Title of the Ad to search
 *       - in: query
 *         name: subcategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the sub-category to retrieve the type
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: Location of the Ad to retrieve its location
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       max-salary:
 *                         type: string
 *                         example: 1233
 *                       listingType:
 *                         type: string
 *                         example: Developer
 *                       companyName:
 *                         type: string
 *                         example: abSchool
 *                       location:
 *                         type: string
 *                         example: usa
 *                       condition:
 *                         type: string
 *                         example: internship
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getSearchJobs', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});



//#region getSearchCars
/**
 * @swagger
 * /Cars/getSearchCars:
 *   get:
 *     summary: Retrieve cars search results
 *     tags:
 *      - Cars
 *     parameters:
 *       - in: query
 *         name: listingType
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the listing type
 *       - in: query
 *         name: maxprice
 *         schema:
 *           type: integer
 *         required: true
 *         description: Max price of the vehicle
 *       - in: query
 *         name: BrandId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Brand to retrieve the brand name
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: Location of the Ad to retrieve its location
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       brandName:
 *                         type: string
 *                         example: bmw
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       fuelType:
 *                         type: string
 *                         example: diesel
 *                       Odometer:
 *                         type: string
 *                         example: 37671
 *                       moredetails:
 *                         type: object
 *                         properties:
 *                           kmpl:
 *                             type: string
 *                             example: 44
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getSearchCars', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});



//#region getSearchBikes
/**
 * @swagger
 * /Bikes/getSearchBikes:
 *   get:
 *     summary: Retrieve bikes search results
 *     tags:
 *      - Bikes
 *     parameters:
 *       - in: query
 *         name: listingType
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the listing type
 *       - in: query
 *         name: maxprice
 *         schema:
 *           type: integer
 *         required: true
 *         description: Max price of the vehicle
 *       - in: query
 *         name: BrandId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Brand to retrieve the brand name
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: Location of the Ad to retrieve its location
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 3553
 *                       brandName:
 *                         type: string
 *                         example: ducati
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 21/10/2024
 *                       ListingId:
 *                         type: integer
 *                         example: 22
 *                       description:
 *                         type: string
 *                         example: xyzd
 *                       phone:
 *                         type: string
 *                         example: 123456789
 *                       postedBy:
 *                         type: string
 *                         example: sai
 *                       fuelType:
 *                         type: string
 *                         example: petrol
 *                       Odometer:
 *                         type: string
 *                         example: 37671
 *                       moredetails:
 *                         type: object
 *                         properties:
 *                           kmpl:
 *                             type: string
 *                             example: 44
 *                 message:
 *                   type: string
 *                   example: error message
 */
router.get('/getSearchBikes', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});



//#region getSearchBusiness
/**
 * @swagger
 * /Business/getSearchBusiness:
 *   get:
 *     summary: Retrieve search results of business directory
 *     tags:
 *      - Business Directory
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Title of the Ad to search
 *       - in: query
 *         name: subcategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the sub-category to retrieve the type
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       isFeatured:
 *                         type: boolean
 *                         example: true
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       description:
 *                         type: string
 *                         example: abc
 *                       location:
 *                         type: string
 *                         example: hnk
 *                       rating:
 *                         type: number
 *                         format: float
 *                         example: 3.5
 *                 Message:
 *                   type: string
 *                   example: error message
 */
router.get('/getSearchBusiness', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});



//#region getSearchFurniture
/**
 * @swagger
 * /Furniture/getSearchFurniture:
 *   get:
 *     summary: Retrieve search results of furniture
 *     tags:
 *      - Furniture
 *     parameters:
 *       - in: query
 *         name: listingType
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the listing type
 *       - in: query
 *         name: maxprice
 *         schema:
 *           type: integer
 *         required: true
 *         description: Max price of the vehicle
 *       - in: query
 *         name: subCategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the subcategory to retrieve the furniture type
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: Location of the Ad to retrieve its location
  *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       brandName:
 *                         type: string
 *                         example: abc
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         example: 26/10/2024
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */
router.get('/getSearchFurniture', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});



//#region getSearchAppliance
/**
 * @swagger
 * /Appliance/getSearchAppliance:
*   get:
 *     summary: Retrieve appliances search results
 *     tags:
 *      - Appliance
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Title of the Ad to search
 *       - in: query
 *         name: subcategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the sub-category to retrieve the type
  *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       ImageUrl:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       brandName:
 *                         type: string
 *                         example: abc
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */
router.get('/getSearchAppliance', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getFeaturedServices
/**
 * @swagger
 * /Services/getFeaturedServices:
 *   get:
 *     summary: Retrieve featured services by CategoryId
 *     tags:
 *      - Services
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve featured services
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Indicates if the service is featured
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: abc
 *                       imageUrl:
 *                         type: string
 *                         example: asdf
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       ratings:
 *                         type: number
 *                         format: float
 *                         example: 4.6
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getFeaturedServices', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getLatestServices
/**
 * @swagger
 * /Services/getLatestServices:
 *   get:
 *     summary: Retrieve latest services by CategoryId
 *     tags:
 *      - Services
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve latest services
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: cleaning
 *                       imageUrl:
 *                         type: string
 *                         example: asdf
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       serviceName:
 *                         type: string
 *                         example: plumbing
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       ratings:
 *                         type: number
 *                         format: float
 *                         example: 4.6
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getLatestServices', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


//#region getServiceDetails
/**
 * @swagger
 * /Services/getServiceDetails:
 *   get:
 *     summary: Retrieve service details by CategoryId
 *     tags:
 *      - Services
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve service details
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: plumbing
 *                       imageUrl:
 *                         type: string
 *                         example: asdf
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       Experience:
 *                         type: string
 *                         example: 3
 *                       serviceName:
 *                         type: string
 *                         example: plumbing
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       ratings:
 *                         type: number
 *                         format: float
 *                         example: 4.6
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getServiceDetails', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});

//#region getServiceList
/**
 * @swagger
 * /Services/getServiceList:
 *   get:
 *     summary: Retrieve latest services by CategoryId
 *     tags:
 *      - Services
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to retrieve subcategories
 *       - in: query
 *         name: SubCategoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the subcategory to retrieve subtypes
 *       - in: query
 *         name: ListSubTypeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the subtype to retrieve list of Ads
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: boolean
 *                   example: true
 *                 ResultData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: cleaning
 *                       imageUrl:
 *                         type: string
 *                         example: asdf
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 1234
 *                       serviceName:
 *                         type: string
 *                         example: plumbing
 *                       location:
 *                         type: string
 *                         example: usa
 *                       postedby:
 *                         type: string
 *                         example: sai
 *                       postedon:
 *                         type: string
 *                         format: date
 *                         example: 26/10/2024
 *                       ratings:
 *                         type: number
 *                         format: float
 *                         example: 4.6
 *                       ListingId:
 *                         type: integer
 *                         example: 101
 *                       description:
 *                         type: string
 *                         example: abcd
 *                       phone:
 *                         type: string
 *                         example: 987456789
 *                 message:
 *                   type: string
 *                   example: error message
 */

router.get('/getServiceList', (req, res) => {
    const { CategoryId } = req.query;
    const data = { CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});


module.exports = router;
