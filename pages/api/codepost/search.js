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

        const posts = await CodePost.find(
          {
            published: true,
            $or: [
              { postName: new RegExp(req.body.searchQuery, "i") },
              { description: new RegExp(req.body.searchQuery, "i") },
            ],
          },
          {
            _id: 1,
            userId: 1,
            postName: 1,
            createdDate: 1,
            description: 1,
            firstName: 1,
            lastName: 1,
          }
        )
          .limit(10)
          .lean();

        const searchedPosts = posts.map((post) => {
          return {
            postId: post._id.toString(),
            userId: post.userId,
            postName: post.postName,
            firstName: post.firstName || null,
            lastName: post.lastName || null,
            description: post.description || null,
            createdDate: Date(post.createdDate),
          };
        });

        return res.status(200).json({
          success: true,
          data: searchedPosts,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          data: "Some error has occurred, please try again later",
        });
      }
      break;

    default:
      res.status(400).json({
        success: false,
        data: "Only GET method is supported",
      });
      break;
  }
};

export default handler;
