const express = require("express");
const router = express.Router();
const { updateDetailsAndApplyRoom, getUserData,getAllUsers} = require("../controlers/userController");
const {updatePaymentDetails}=require('../controlers/paymentcontroller');
const {fetchRoomAvailability}=require('../controlers/userController');

// Update profile details
console.log("reached at routes");
router.put("/:id/details-apply", updateDetailsAndApplyRoom);
router.put("/:id/payment", updatePaymentDetails);
router.get("/rooms", fetchRoomAvailability);
router.get("/:id/data", getUserData);
router.get("/all", getAllUsers);

module.exports = router;
