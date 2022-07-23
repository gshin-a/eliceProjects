import React from "react";
import { useRecoilState } from "recoil";

import { SelectedSpanBox, ResetSpan } from "./ClubFilterSpanListStyle";
import { SelectedSpan } from "@/styles/text";

import { filters } from "@/utils/recoil";

function ClubFilterSpanList() {
  const [checkedItems, setCheckedItems] = useRecoilState(filters);

  const handleSpanClickDelete = (event: React.MouseEvent<HTMLSpanElement>) => {
    const clickedItem = event.currentTarget.id;
    setCheckedItems((prev) => {
      return Object.fromEntries(
        Object.entries(prev)
          .filter((el) => !el.includes(clickedItem)))
    });
  }

  const handleFilterClear = () => {
    setCheckedItems({});
  }

  return <SelectedSpanBox>
    {
      Object.keys(checkedItems).map((item) => 
        <SelectedSpan id={item} key={item} onClick={handleSpanClickDelete}>
          {item}
        </SelectedSpan>
      )
    }
    {
      !!Object.keys(checkedItems).length && 
      (<ResetSpan onClick={handleFilterClear}>필터 초기화</ResetSpan>)
    }
  </SelectedSpanBox>
}

export default ClubFilterSpanList;