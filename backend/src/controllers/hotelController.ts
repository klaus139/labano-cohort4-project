import express, { Request, Response, NextFunction } from "express";
import { APIError, STATUS_CODES } from "../utils/app-error";
import Hotel from "../models/hotelModel";
import jwt from "jsonwebtoken";
import { HotelType } from "../utils/types";
import multer from "multer";
import { uploadImages } from "../utils/multer";

export const createHotel = async(req:Request, res:Response, next:NextFunction) => {
  try {
    const newHotel:HotelType = req.body;
    const name = newHotel.name;
    console.log(name);
    const imageFiles:any = req.files as Express.Multer.File[];

    const imageUrls:any = await uploadImages(imageFiles)

    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const oldHotel = await Hotel.findOne({ name })
    if (oldHotel) {
      return res.status(400).json({ message: "hotel already exists please" });

    }

    const hotel = new Hotel(newHotel);
    //check if hotel exists

    await hotel.save();

    res.status(201).json(hotel)

  } catch (error) {
    console.log(error)
  }
}
