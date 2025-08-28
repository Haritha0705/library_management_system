import {Request} from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary"
import librarianModel from "../models/librarianModel.mjs";
import memberModel from "../models/memberModel.mjs";
import bookModel from "../models/bookModel.mjs";
import issueModel from "../models/issueModel.mjs";
import {Librarian} from "../types/librarian";

export class DashboardService {

    //API - librarian account create
    addLibrarian = async (req: Request<{},{},Librarian>) =>{
        try {
            const {username,full_name,email,password,phone,address} = req.body;

            const imageFile = req.file

            // Check if file exists first
            if (!imageFile) {
                return { success: false, status: 400, message: "Image file is required" };
            }

            //chacking all data add
            if (!username || !full_name || !email || !password || !phone || !address ){
                return { success: false, status: 400, message: "Missing Details!" };
            }

            //validating email format
            if (!validator.isEmail(email)){
                return { success: false, status: 400, message: "Please enter valid email!" };
            }

            //password is strong
            if (password.length < 8){
                return { success: false, status: 400, message: "Please enter strong password!" };
            }

            //hashing doctor password
            const salt =  await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password,salt)

            //upload image upload cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl = imageUpload.secure_url

            const librarianData = {
                username,
                full_name,
                email,
                image:imageUrl,
                password:hashPassword,
                phone,
                address,
                joinedDate:Date.now()
            }

            const newLibrarian = new librarianModel(librarianData)
            await newLibrarian.save()

            return { success: true, status: 201, message: "Librarian added successfully!" };

        } catch (error: any) {
            console.error(error);
            return {success: false, status: 500, message: "Something went wrong", error: error.message,};
        }
    }

    //API - view All Members
    getAllMembers = async (_: Request) =>{
        try {
            const members = await memberModel.find({}).select('-password')

            return { success: true, status: 200, data:members };

        } catch (error: any) {
            console.error(error);
            return {success: false, status: 500, message: "Something went wrong", error: error.message,};
        }
    }

    //API - view All Librarian
    getAllLibrarian = async (_: Request) =>{
        try {
            const librarians = await librarianModel.find({}).select('-password')

            return { success: true, status: 200, data:librarians };

        } catch (error: any) {
            console.error(error);
            return {success: false, status: 500, message: "Something went wrong", error: error.message,};
        }
    }

    //API - Delete Librarian
    deleteLibrarian = async (req: Request) =>{
        try {
            const librarianId = req.params.id;
            const deleted = await librarianModel.findByIdAndDelete(librarianId);

            //check is member in here
            if (!deleted){
                return { success: false, status: 404, message: "Librarian not found" };
            }

            return { success: true, status: 200, message: "Librarian deleted successfully" };

        } catch (error: any) {
            console.error(error);
            return {success: false, status: 500, message: "Something went wrong", error: error.message,};
        }
    }

    // API - Librarian Dashboard Counts
    librarianDashBoard = async (_: Request) => {
        try {
            // Run counts in parallel
            const [
                memberCount,
                librarianCount,
                bookCount,
                borrowedBooksCount,
                overdueBooksCount,
                uniqueAuthors,
                uniqueCategory
            ] = await Promise.all([
                memberModel.countDocuments(),
                librarianModel.countDocuments(),
                bookModel.countDocuments(),
                issueModel.countDocuments({ status: "issued" }),
                issueModel.countDocuments({ status: "overdue" }),
                bookModel.distinct("author"),
                bookModel.distinct("category"),
            ]);

            const bookAuthorCount = uniqueAuthors.length;
            const bookCategoryCount = uniqueCategory.length;

            const allData = {
                memberCount,
                librarianCount,
                bookCount,
                borrowedBooksCount,
                overdueBooksCount,
                bookAuthorCount,
                bookCategoryCount
            };

            return { success: true, status: 200, data: allData };

        } catch (error: any) {
            console.error("Dashboard Error:", error);
            return {success: false, status: 500, message: "Something went wrong", error: error.message,};
        }
    };

    // API - View All Borrowed Books List
    borrowBooksList = async (_: Request) => {
        try {
            // Get all books that are still not returned (only issued ones)
            const stillNotReturnBooks = await issueModel.find({ status: "issued" });

            return { success: true, status: 200, data: stillNotReturnBooks };

        } catch (error: any) {
            console.error("Dashboard Error:", error);
            return {success: false, status: 500, message: "Something went wrong", error: error.message,};
        }
    };
}

export default new DashboardService()


