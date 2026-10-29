
import express from "express";

import {
  verifyRegistrationCode,
  listRegistrationCodes,
  generateRegistrationCode,
  deactivateRegistrationCode,
} from "../controller/registrationCodeController.js";

const router = express.Router();

router.post("/verify", verifyRegistrationCode);

router.get("/registration-codes", listRegistrationCodes);
router.post("/registration-codes", generateRegistrationCode);
router.patch(
  "/registration-codes/:id/disable",
  deactivateRegistrationCode
);

export default router;
