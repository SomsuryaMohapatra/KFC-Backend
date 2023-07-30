const express=require("express")
const router = express.Router();

router.post("/getallfooditems", async(req,res)=>{
    try {
        res.send([global.foodItems,global.foodCategory]);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports=router;