const Rent = require('../model/rentModel')
const User = require('../model/authModel')
const Book = require('../model/bookModel')

const rentController = {
    getAll: async (req,res) =>{
        try {
            // res.json({msg:'get all called'})
            const data = await Rent.find({})
            res.json({length: data.length, rents: data})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getSingle: async (req,res) =>{
        try {
            let id = req.params.id
            const data = await Rent.findById({_id:id})
            
            if(!data)
                return res.status(404).json({msg: 'Rent id not found'})
            // res.json({msg:'get single called'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    create: async (req,res) =>{
        try {
            let extRent = await Rent.findOne({bookId: req.body.bookId} && {userId: req.body.userId})

            if(extRent)
                return res.status(400).json({msg: 'Already you have rented a book'})

                //read book info based on id
                const book = await Book.findById({_id: req.body.bookId})

                    if(!book)
                        return res.status(404).json({msg: 'Book details not found'})
                //read user info
                const user = await User.findById({_id: req.body.userId})

                if(!user)
                return res.status(404).json({msg: 'User details not found'})

                //update the number of copy and rented copies
                if(book.numberOfCopy === 0) {
                    return res.status(400).json({msg: 'No more copies available for Rent'})
                } 

                let newRent = {
                    ...req.body,
                    book,
                    user
                }
            // res.json({msg:'create called'})
          const data=  await Rent.create(newRent)

                return res.status(200).json({msg: `Rent details added successfully`, rent: data})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    update: async (req,res) =>{
        try {
            let id = req.params.id

            let extRent = await Rent.findById({_id: id})
            if(!extRent)
                return res.status(404).json({msg:`Requested Rent id not found`})

            if(extRent.bookId === req.body.bookId  && extRent.userId === req.body.userId)
                return res.status(400).json({msg: `Already you have rented a book`})

                

            await Rent.findByIdAndUpdate({_id : id} ,{
                amount : req.body.amount,
                returnDate: req.body.returnDate,
                paymentStatus: req.body.paymentStatus
            } )
                return res.status(200).json({msg: `Rent details Updated successfully`})

            // res.json({msg:'update called'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    delete: async (req,res) =>{
        try {
            let id = req.params.id

            let extRent = await Rent.findById({_id: id})
            if(!extRent)
                return res.status(404).json({msg:`Requested Rent id not found`})

                await Rent.findByIdAndDelete({_id:id})
                    return res.status(200).json({msg:`Rent details deleted successfully`})

            // res.json({msg:'delete called'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}
module.exports = rentController;