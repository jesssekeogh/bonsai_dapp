import React from "react";
import { useParams } from "react-router-dom";

const Story = () => {
  const params = useParams();
    // dangerouslySetInnerHTML={{ __html: storyData }}
  return (
    <>
      Principal: {params.principal}
      StoryId: {params.storyId}
      <br />
    </>
  );
};

export default Story;
