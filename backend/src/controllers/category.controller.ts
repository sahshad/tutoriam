import asyncHandler from "express-async-handler";
import { ICategoryController } from "../core/interfaces/controller/ICategoryController";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { ICategoryService } from "../core/interfaces/service/ICategoryService";
import { StatusCodes } from "http-status-codes";

@injectable()
export class CategoryController implements ICategoryController {
    constructor(@inject(TYPES.CategoryService) private categoryService: ICategoryService) {}
    getAllCategories = asyncHandler(async (req:Request, res:Response) => {
            const { page = 1, limit = 12, searchQuery = '', filter = '' } = req.query
            console.log(page, limit, searchQuery, filter)
               const categoriesWithPagination = await this.categoryService.getAllCategories({
                    page: Number(page),
                    limit: Number(limit),
                    search: searchQuery as string || '',
                    filter: filter as string || ''
               })
        res.status(StatusCodes.OK).json({message:"Categories fetched successfully", categoriesWithPagination})
   })

   getListedCategories = asyncHandler(async (req:Request, res:Response) => {
     const categories = await this.categoryService.getListedCategories()
     res.status(StatusCodes.OK).json({message: "categories fetched successfully", categories})
   })

   createCategory = asyncHandler(async (req:Request, res:Response) => {
        const { name,status, subcategories } = req.body
        const category = await this.categoryService.create({name,status, subcategories})
        res.status(StatusCodes.CREATED).json({message:"Category created successfully", category})
   })

   updateCategory = asyncHandler(async (req:Request, res:Response) => {
        const { id } = req.params
        const updatedData = req.body
        const category = await this.categoryService.updateCategory(id, updatedData)
        res.status(StatusCodes.OK).json({message:"Category updated successfully", category})
   })

   toggleCategoryStatus = asyncHandler(async (req:Request, res:Response) => {
        const { id } = req.params
        const category = await this.categoryService.toggleCategoryStatus(id)
        res.status(StatusCodes.OK).json({message:"Category status toggled successfully", category})
   })
}