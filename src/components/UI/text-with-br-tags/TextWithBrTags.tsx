const TextWithBrTags = ({ text }: { text: string }) => {
  const sanitizedText = text || "";
  return (
    <>
      {sanitizedText.split("\n").map((article, i) => {
        return (
          <span key={i}>
            {article}
            <br />
          </span>
        );
      })}
    </>
  );
};

export default TextWithBrTags;
