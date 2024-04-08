const Category = require("../models/categoryModel");

const createCategory = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Thiếu thông tin id danh mục." });
    }

    await Category.create(req.body);

    return res.status(200).json({ message: "Tạo danh mục thành công."});

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCategory = async (req, res, next) => {
  try {
    const id = req.params.id
    
    if(!id){
      return res.status(400).json({message: 'Thiếu thông tin id danh mục.'})
    }

    const data = await Category.findById({_id: id})

    if(!data){
      return res.status(404).json({message: 'Không tìm thấy danh mục.'})
    }

    return res.status(200).json({data})
  } catch (error) {
    return res.status(200).json({error: error.message})
  }
};

const getCategorys = async (req, res, next) => {
  try {
    const data = await Category.find()

    if(data.length <= 0){
      return res.status(404).json({message: 'Không có danh mục nào.'})
    }

    return res.status(200).json({data})

  } catch (error) {
    return res.status(200).json({error: error.message})
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id
    
    if(!id){
      return res.status(400).json({message: 'Thiếu thông tin id danh mục.'})
    }

    const data = await Category.deleteOne({_id: id})
    
    if(data.deletedCount !== 1){
      return res.status(404).json({message: 'Xóa danh mục thành công.'})
    }
    return res.status(200).json({data})
  } catch (error) {
    return res.status(200).json({error: error.message})
  }
}

module.exports = {
  createCategory,
  getCategory,
  getCategorys,
  deleteCategory
};
