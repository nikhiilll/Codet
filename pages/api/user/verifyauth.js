import { getUserData, verifyAuthToken } from "../../../lib/authHelper";

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { authToken } = req.cookies;
        if (!authToken) {
          return res.status(401).json({ success: false, data: "Unauthorized" });
        }

        const { isValid, data } = await verifyAuthToken(authToken);
        if (isValid) {
          const userData = await getUserData(data.userId);
          return res.status(200).json({ success: true, data: { ...userData } });
        } else {
          return res.status(401).json({ success: false, data: "Unauthorized" });
        }
      } catch (err) {
        res.status(500).json({
          success: false,
          data: "Something went wrong, please try again later",
        });
      }
      break;
    default:
      res.status(403).json({
        success: false,
        data: "Only GET request is allowed",
      });
      break;
  }
};

export default handler;
