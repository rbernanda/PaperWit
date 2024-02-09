import React from "react";

type Props = {
  pdf_url: string;
};

const PDFViewer = (props: Props) => {
  return (
    <iframe
      src={`https://docs.google.com/gview?url=${props.pdf_url}&embedded=true`}
      className="w-full h-full "
    ></iframe>
  );
};

export default PDFViewer;
