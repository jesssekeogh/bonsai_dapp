import React from "react";
import { useParams } from "react-router-dom";

const Story = () => {
  const params = useParams();
  return (
    <>
      Principal: {params.principal}
      <br />
    </>
  );
};

export default Story;
