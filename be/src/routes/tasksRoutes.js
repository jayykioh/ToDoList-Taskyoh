import express  from 'express'; 
import { getAllTask } from '../controllers/taskController.js';

const router = express.Router();


router.get("/", getAllTask);

router.post("/", (req,res)=> {
    res.status(201).json({messege : " Nhiệm vụ mới đã được thêm vào thành công!"});
});
router.put("/:id", (req,res)=> {
    res.status(200).json({messege : " Nhiệm vụ mới đã được thay đổi vào thành công!"});
});

router.delete("/:id", (req,res)=> {
    res.status(200).json({messege : " Nhiệm vụ mới đã được xóa vào thành công!"});
});


export default router;