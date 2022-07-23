import React from "react";
import * as Style from "./ClubChatButtonStyle";

function ClubChatButton() {
  return (
    <div>
      <Style.ChatButton color='inherit'>
        <Style.MyChatIcon />
      </Style.ChatButton>
    </div>
  );
}

export default ClubChatButton;
