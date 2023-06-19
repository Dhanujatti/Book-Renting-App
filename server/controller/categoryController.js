const category = require('../model/categoryModel')

const categoryCtrl = {
    getAll:async(req,res) =>{
        try {
            const data = await category.find({})
            res.status(200).json({length:data.length, categories:data})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getsingle: async(req,res) => {
        try {
            let id = req.params.id
            let extCat = await category.findById({_id: id})

            if(!extCat)
                return res.status(404).json({msg:`Requested category id not found`})
            return res.status(200).json({category: extCat})
       
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    Create: async(req,res) =>{
        try {
            let {title, desc} = req.body

            let extCat = await category.findOne({ title })
            if(extCat)
                return res.status(400).json({msg:`Category already exists`})

           let newCat = await category.create({ title , desc})
                res.status(200).json({msg: "new category created..", category: newCat})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    Update: async(req,res) =>{
        try {
            let id = req.params.id
                let extCat = await category.findById({_id: id}) 
            if(!extCat)
                return res.status(500).json({msg: "category not found"})

            let updated = await category.findByIdAndUpdate({_id: id}, req.body)
            res.status(200).json({msg:`Category updated successfully`, updated})
        
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    delete: async(req,res) =>{
        try {
            let id = req.params.id

            let extCat = await category.findById({_id: id})
            if(!extCat)
                return res.status(404).json({msg: `Category not found`})
            await category.findByIdAndDelete({_id: id})
                res.status(200).json({msg:"Category deleted successfully"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryCtrl
