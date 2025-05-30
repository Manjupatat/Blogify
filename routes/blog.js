const {Router}=require('express')
const multer =require('multer')
const Blog=require('../models/blog')
const Comment=require('../models/comment')
const path =require('path')
const router=Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'../public/upload'))
  },
  filename: function (req, file, cb) {
    const fileName=`${Date.now()}-${file.fieldname}`
    cb(null,fileName)
  }
})

const upload = multer({ storage: storage })

router.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user:req.user,
    })
})

router.get('/:id',async (req,res)=>{
    const blog=await Blog.findById(req.params.id).populate('createdBy')
    const comments =await Comment.find({blogId:req.params.id}).populate('createdBy')
    console.log('comments',comments)
    return res.render('viewBlog',{
        user:req.user,
        blog,
        comments,
    })
})



router.post('/', upload.single('coverImage'), async (req, res) => {
  const { title, body } = req.body;

  try {
    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user._id,
      coverImageURL: `/upload/${req.file.filename}`  // ✅ corrected
    });

    return res.redirect(`/blog/${blog._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/comment/:blogId',async(req,res)=>{
    await Comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})

module.exports=router