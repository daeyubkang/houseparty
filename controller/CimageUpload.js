exports.uploadImage = async (req, res) => {
  try {
    // 클라이언트로부터 이미지 파일을 받습니다.
    const imageFile = req.file;

    if (!imageFile) {
      return res
        .status(400)
        .json({ error: "이미지 파일이 전송되지 않았습니다." });
    }

    // 이미지를 S3 또는 다른 스토리지에 업로드합니다.
    // const imageUrl = await imageUpload(imageFile);

    // // 업로드된 이미지의 URL을 클라이언트에게 전송합니다.
    res.json({ file: req.file });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "이미지 업로드 중 오류가 발생했습니다." });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    // 클라이언트로부터 이미지 파일을 받습니다.
    const imageFiles = req.files;
    console.log("req.files", req.files);
    if (!imageFiles) {
      return res
        .status(400)
        .json({ error: "이미지 파일이 전송되지 않았습니다." });
    }

    // 이미지를 S3 또는 다른 스토리지에 업로드합니다.
    // const imageUrl = await imageUpload(imageFile);

    // // 업로드된 이미지의 URL을 클라이언트에게 전송합니다.
    res.json({ files: req.files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "이미지 업로드 중 오류가 발생했습니다." });
  }
};
