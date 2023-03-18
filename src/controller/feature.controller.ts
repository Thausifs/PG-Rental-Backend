import { Request, Response, NextFunction } from "express";
import FeatureModel from "../models/feature.model";

import catchAsync from "../utils/catchAsync";
import { multerFiledType } from "../utils/Types/multer.types";

const addFeature = catchAsync(
  async (
    req: Request<any, any, { feature_name: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const files = req.files as multerFiledType;
    const featureImage = files["feature_image"];
    const newFeature = await FeatureModel.create({
      feature_name: req.body.feature_name,
      icon: featureImage[0].path,
      slug: req.body.feature_name.toLowerCase().split(" ").join("_"),
    });
    res.status(201).json({
      status: "success",
      data: newFeature,
    });
  }
);
const getAllFeature = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getAllFeature = await FeatureModel.find({});
    res.status(200).json({
      status: true,
      data: getAllFeature,
    });
  }
);

export default {
  addFeature,
  getAllFeature,
};