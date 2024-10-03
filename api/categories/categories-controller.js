const Category = require("./categories-model");

const category_controller = {
  async get_all(req, res, next) {
    try {
      const categories = await Category.get_all();

      if (!Array.isArray(categories)) {
        throw new Error("Expected an array of categories")
      }

      res.json(categories); 
    } catch (error) {
      next(error); 
    }
  }, 

  async create(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });

      if (!category) {
        return res.status(404).json({ message: "cannot create category" });
      }

      res.status(201).json(category); 
    } catch (error) {
      next(error);
    }
  }, 

  async update(req, res, next) {
    try {
      const category_data = req.body;
      const category_id = req.params.id;
      const category = await Category.update(category_id, category_data);

      if (!category) {
        return res.status(404).json({ message: "category not found or you dont have permission to update" });
      }
      
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const tobe_deleted_category = await Category.get_by_id(req.params.id);
      const deleted_category = await Category.delete(req.params.id);

      if (deleted_category) {
        res.status(200).json({ message: "category successfully deleted", deleted_category: tobe_deleted_category });
      } else {
        res.status(404).json({ message: "category not found" });
      }
    } catch (error) {
      next(error); 
    }
  }, 
}

module.exports = category_controller;
