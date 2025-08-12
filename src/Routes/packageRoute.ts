import { Router } from "express";
import { createPackage, deletePackage, getPackageById, getPackages, updatePackage } from "../controllers/packageController";

const router = Router();

router.route("/").post(createPackage).get(getPackages);
router.route("/:id").put(updatePackage).delete(deletePackage).get(getPackageById);


export default router;
