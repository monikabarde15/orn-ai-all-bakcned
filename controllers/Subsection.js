const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

/* =====================================================
   CREATE SUB SECTION
===================================================== */

exports.createSubSection = async (req, res) => {
  try {

    const { sectionId, title, description } = req.body;

    const video = req.files ? req.files.video : undefined;
    const pdf = req.files ? req.files.pdf : undefined;

    // Validation
    if (!sectionId || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "SectionId, title and description are required",
      });
    }

    /* =========================================
       VIDEO UPLOAD
    ========================================= */

    let videoUrl = "";
    let timeDuration = "";

    if (video) {

      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );

      videoUrl = uploadDetails.secure_url;
      timeDuration = `${uploadDetails.duration}`;
    }

    /* =========================================
       PDF UPLOAD TO CLOUDINARY
    ========================================= */

    let pdfUrl = "";

    if (pdf) {

      const pdfUpload = await uploadImageToCloudinary(
        pdf,
        process.env.FOLDER_NAME,
        "raw"
      );

      pdfUrl = pdfUpload.secure_url;
    }

    /* =========================================
       CREATE SUBSECTION
    ========================================= */

    const SubSectionDetails = await SubSection.create({
      title,
      description,
      timeDuration,
      videoUrl,
      pdfUrl,
    });

    /* =========================================
       UPDATE SECTION
    ========================================= */

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: SubSectionDetails._id,
        },
      },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: updatedSection,
    });

  } catch (error) {

    console.error("Error creating sub section:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


/* =====================================================
   UPDATE SUB SECTION
===================================================== */

exports.updateSubSection = async (req, res) => {
  try {

    const {
      sectionId,
      subSectionId,
      title,
      description,
    } = req.body;

    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // Update title
    if (title !== undefined) {
      subSection.title = title;
    }

    // Update description
    if (description !== undefined) {
      subSection.description = description;
    }

    /* =========================================
       UPDATE VIDEO
    ========================================= */

    if (req.files && req.files.video !== undefined) {

      const videoFile = req.files.video;

      const uploadDetails = await uploadImageToCloudinary(
        videoFile,
        process.env.FOLDER_NAME
      );

      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    /* =========================================
       UPDATE PDF
    ========================================= */

    if (req.files && req.files.pdf !== undefined) {

      const pdfFile = req.files.pdf;

      const pdfUpload = await uploadImageToCloudinary(
        pdfFile,
        process.env.FOLDER_NAME,
        "raw"
      );

      subSection.pdfUrl = pdfUpload.secure_url;
    }

    await subSection.save();

    // Get updated section
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: updatedSection,
    });

  } catch (error) {

    console.error("Update subsection error:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the subsection",
      error: error.message,
    });
  }
};


/* =====================================================
   DELETE SUB SECTION
===================================================== */

exports.deleteSubSection = async (req, res) => {
  try {

    const { subSectionId, sectionId } = req.body;

    await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );

    const subSection = await SubSection.findByIdAndDelete(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    });

  } catch (error) {

    console.error("Delete subsection error:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the subsection",
      error: error.message,
    });
  }
};