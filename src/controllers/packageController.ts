import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import packages from "../models/packageModel";
import { ApiError, ApiResponse } from "../utils/apiHandlerHelpers";


// Create Package
export const createPackage = asyncHandler(async (req: Request, res: Response) => {
  const {
    pk_name,
    pk_rate,
    pk_validity,
    pk_cntlimit,
    pk_msglimit,
    pk_details,
    pk_commisi,
  } = req.body;

  // Basic validation
  if (!pk_name || !pk_rate || !pk_validity || !pk_cntlimit || !pk_msglimit) {
    res.status(400);
    throw new ApiError(400, "Please provide all required fields");
  }


  const newPackage = await packages.create({
    pk_name,
    pk_rate,
    pk_validity,
    pk_cntlimit,
    pk_msglimit,
    pk_details: pk_details || null,
    pk_commisi: pk_commisi || 0,
  });

  res.status(201).json(
    new ApiResponse(201, newPackage, "Package created successfully")
  );
});
// Update Package
export const updatePackage = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const {
    pk_name,
    pk_rate,
    pk_validity,
    pk_cntlimit,
    pk_msglimit,
    pk_details,
    pk_commisi,
  } = req.body;

  const existingPackage = await packages.findById(id);

  if (!existingPackage) {
    throw new ApiError(404, "Package not found");
  }

  existingPackage.pk_name = pk_name ?? existingPackage.pk_name;
  existingPackage.pk_rate = pk_rate ?? existingPackage.pk_rate;
  existingPackage.pk_validity = pk_validity ?? existingPackage.pk_validity;
  existingPackage.pk_cntlimit = pk_cntlimit ?? existingPackage.pk_cntlimit;
  existingPackage.pk_msglimit = pk_msglimit ?? existingPackage.pk_msglimit;
  existingPackage.pk_details = pk_details ?? existingPackage.pk_details;
  existingPackage.pk_commisi = pk_commisi ?? existingPackage.pk_commisi;
 

  // Save changes
  await existingPackage.save();

  res
    .status(200)
    .json(new ApiResponse(200, existingPackage, "Package updated successfully"));
});
//Delete Package
export const deletePackage = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingPackage = await packages.findById(id);

  if (!existingPackage) {
    throw new ApiError(404, "Package not found");
  }

  await packages.findByIdAndDelete(id);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Package deleted successfully"));
});
//Active status
export const togglePackageStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Find package
  const existingPackage = await packages.findById(id);
  if (!existingPackage) {
    throw new ApiError(404, "Package not found");
  }

  // Toggle status
  existingPackage.isActive = !existingPackage.isActive;

  // Save changes
  await existingPackage.save();

  res.status(200).json(
    new ApiResponse(
      200,
      existingPackage,
      `Package ${existingPackage.isActive ? "activated" : "deactivated"} successfully`
    )
  );
});

//Get Single Package
export const getPackageById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || id.length !== 24) {
    throw new ApiError(400, "Invalid package ID");
  }

  const packageData = await packages.findById(id);

  if (!packageData) {
    throw new ApiError(404, "Package not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, packageData, "Package fetched successfully"));
});

//Get All Packages
export const getPackages = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const filter: any = {};

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search as string, "i");
    filter.$or = [
      { pk_name: searchRegex },
    ];
  }

  if (req.query.isActive !== undefined) {
    filter.isActive = req.query.isActive === "true";
  }

  const total = await packages.countDocuments(filter);

  const packagesData = await packages.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ pk_name: 1 });

  const responsePackages = packagesData.map((pkg) => ({
    ...pkg.toObject(),
  }));

  res.status(200).json(
    new ApiResponse(
      200,
      {
        packages: responsePackages,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPreviousPage: page > 1,
        },
      },
      "Packages retrieved successfully"
    )
  );
});
