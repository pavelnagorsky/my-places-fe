const textEditorConfig = {
  modules: {
    toolbar: [
      [{ size: ["large", false, "small"] }],
      //[{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
      ["link"],
    ],
  },
  formats: [
    //"header",
    //"font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    // "direction",
    "align",
  ],
};

export default textEditorConfig;
