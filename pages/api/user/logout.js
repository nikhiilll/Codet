import cookie from "cookie";

const handler = (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("authToken", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV !== "development",
    })
  );

  return res
    .status(200)
    .json({ success: true, data: "Successfully logged out." });
};

export default handler;
