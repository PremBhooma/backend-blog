const Blog = require("../models/Blog.model");

exports.createBlog = async (req, res) => {
  try {
    let { title, description, author_name, author_email } = req.body;

    if (!title || !description || !author_name || !author_email) {
      return res.status(207).json({
        errorcode: 1,
        status: false,
        message: "Please provide all required fields.",
        data: null,
      });
    }

    let blog = new Blog({
      image: req.file && req.file.location ? req.file.location : null,
      title,
      description,
      author_name,
      author_email,
    });

    blog = await blog.save();

    return res.status(201).json({
      errorcode: 0,
      status: true,
      message: "Blog Added Successfully",
      data: blog,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      errorcode: 5,
      status: false,
      message: error.message,
      data: error,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find({}).sort({ created_ts: -1 });
    return res.status(200).json({
      errorcode: 0,
      status: true,
      message: "Get All Blogs Successfully",
      data: blogs,
    });
  } catch (error) {
    return res.status(204).json({
      errorcode: 5,
      status: false,
      message: error.message,
      data: error,
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: id }).sort({ created_ts: -1 });

    if (!blog)
      return res.status(102).json({
        errorcode: 1,
        status: true,
        message: "Blog Not Found",
        data: null,
      });

    return res.status(201).json({
      errorcode: 0,
      status: true,
      message: "Get Single Blog Successfully",
      data: blog,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      errorcode: 5,
      status: false,
      message: error.message,
      data: error,
    });
  }
};

exports.editBlog = async (req, res) => {
  try {
    const { id, title, description, author_name, author_email } = req.body;
    if (!id) {
      return res.status(207).json({
        errorcode: 1,
        status: false,
        message: "Id Should be Present",
        data: null,
      });
    }

    const editBlog = await Blog.findById(id);
    if (!editBlog) {
      return res.status(207).json({
        errorcode: 2,
        status: false,
        message: "Blog Not Found",
        data: null,
      });
    }

    editBlog.title = title || editBlog.title;
    editBlog.description = description || editBlog.description;
    editBlog.author_name = author_name || editBlog.author_name;
    editBlog.author_email = author_email || editBlog.author_email;

    editBlog.image = req.file && req.file.location ? req.file.location : editBlog.image;
    // editBlog.image = req.files && req.files.image && req.files.image[0].location ? req.files.image[0].location : editBlog.image;

    await editBlog.save();

    return res.status(201).json({
      errorcode: 0,
      status: true,
      message: "Blog Updated Successfully.",
      data: editBlog,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      errorcode: 5,
      status: false,
      message: "Internal server error",
      data: error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id)
      return res.status(207).json({
        errorcode: 1,
        status: false,
        message: "Id should present",
        data: null,
      });

    let blog = await Blog.findById({ _id: id });
    if (!blog)
      return res.status(207).json({
        errorcode: 2,
        status: false,
        message: "Blog not found",
        data: null,
      });

    await Blog.deleteOne({ _id: id });

    return res.status(201).json({
      errorcode: 0,
      status: true,
      message: "Blog Deleted Successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      errorcode: 5,
      status: false,
      message: "Internal server error",
      data: error,
    });
  }
};
