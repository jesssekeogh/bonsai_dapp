import React from "react";
import { useParams } from "react-router-dom";

const UniqueStory = () => {
  let storyid = useParams();

  console.log(storyid);
  return (
    <div>
      {/* make this component call the find story function and pass the userID of that story to the find story function */}
      {storyid.storyid}
    </div>
  );
};

export default UniqueStory;
