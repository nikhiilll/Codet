import { validateCodePostData } from "../../../lib/apiDataValidation";
import { verifyAuthToken } from "../../../lib/authHelper";
import CodePost from "../../../models/CodePost";

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        // Validate user auth
        const { authToken } = req.cookies;
        if (!authToken) {
          return res.status(403).json({ success: false, data: "Unauthorized" });
        }
        const { isValid } = await verifyAuthToken(authToken);
        if (!isValid) {
          return res.status(403).json({ success: false, data: "Unauthorized" });
        }

        // Validate the post data
        const { value, error } = validateCodePostData(req.body);
        if (error) {
          return res.status(400).json({
            success: false,
            data: error.details[0].message,
          });
        }

        const newPost = new CodePost(req.body);
        const savedPost = await newPost.save();
        return res.status(201).json({
          success: true,
          data: { ...savedPost, postId: savedPost._id },
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          data: "Some error has occurred, please try again later",
        });
      }
      break;

    case "PUT":
      try {
        // Validate user auth
        const { authToken } = req.cookies;
        if (!authToken) {
          return res.status(403).json({ success: false, data: "Unauthorized" });
        }
        const { isValid } = await verifyAuthToken(authToken);
        if (!isValid) {
          return res.status(403).json({ success: false, data: "Unauthorized" });
        }

        // Validate the put data
        const { value, error } = validateCodePostData(req.body);
        if (error) {
          return res.status(400).json({
            success: false,
            data: error.details[0].message,
          });
        }

        const savedPost = await CodePost.findByIdAndUpdate(req.body.postId, {
          description: req.body.description,
          code: req.body.code,
          postName: req.body.postName,
          published: req.body.published,
        });

        return res.status(201).json({
          success: true,
          data: { ...savedPost, postId: savedPost._id },
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          data: "Some error has occurred, please try again later",
        });
      }
      break;
  }
};

export default handler;
