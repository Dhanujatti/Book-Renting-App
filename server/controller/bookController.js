const Book = require('../model/bookModel')

const bookCtrl = {
    getAll: async(req,res) =>{
        try {
            const data = await Book.find({})

            return res.status(200).json({length: data.length, books:data})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getSingle: async(req,res) =>{
        try {
            let id = req.params.id
            const data = await Book.findById({_id: id})

            return res.status(200).json({book:data})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    create: async(req,res) =>{
        try {
            if(!req.body.isbn)
                return res.status(404).json({msg : `ISBN Number is required`})

            let extBook = await Book.findOne({isbn : req.body.isbn})
                if(extBook)
                    return res.status(400).json({msg: `ISBN code already allocated....`})

            let newItem = await Book.create(req.body)
                return res.status(200).json({msg:"new book added successfully", book: newItem})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    update: async(req,res) =>{
        try {
            let id = req.params.id
            
            let extBook = await Book.findById({_id: req.params.id})
                if(!extBook)
                    return res.status(404).json({msg: `Requested book id not found..`})
    
         await Book.findByIdAndUpdate({_id: id},req.body)

            return res.status(200).json({msg:"book updated successfully"})
    
            res.json({msg:"update called"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    delete: async(req,res) =>{
        try {
            let id = req.param.id

            let extBook = await Book.findById({_id: req.params.id})
                if(!extBook)
                return res.status(404).json({msg: `Requested book id not found..`})

     await Book.findByIdAndDelete({_id: id})

        return res.status(200).json({msg:"book deleted successfully"})

            // res.json({msg:"delete called"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = bookCtrl