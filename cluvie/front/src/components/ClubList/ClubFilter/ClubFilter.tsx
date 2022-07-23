import React from "react";
import { useRecoilState } from "recoil";

import { filters } from "@/utils/recoil";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { SelectBox, SelectButton, DropDownBox, DropDownMenu} from "./ClubFilterStyle";

const clubState = new Map([
  ["모집중", "state0"],
  ["모집완료", "state1"],
]);

const clubMeeting = new Map([
  ["온라인", "online1"],
  ["오프라인", "offline1"],
]);

const clubDuration = new Map([
  ["단기", "duration0"],
  ["1~2개월", "duration1"],
  ["3~4개월", "duration2"],
  ["5~6개월", "duration3"],
  ["6개월 이상", "duration4"],
  ["장기", "duration5"],
]);

const clubDay = new Map([
  ["평일", "weekday1"],
  ["주말", "weekend1"],
]);

function ClubFilter() {
  const [checkedItems, setCheckedItems] = useRecoilState(filters);

  // 이벤트 함수
  const handleDropDownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget as HTMLInputElement;
    const dropDownMenu = document.querySelector(`.${target.name}`) as HTMLElement;
    
    target.classList.toggle("clicked");
    dropDownMenu.classList.toggle("hidden");
  };

  const handleDropDownItemCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const checkEachFilter = (selected: Map<string, string>) => {
      if (selected.has(target.value)) {
        return selected.get(target.value);
      }
      return "";
    }
    const filterKey = checkEachFilter(clubState) || checkEachFilter(clubMeeting) || checkEachFilter(clubDuration) || checkEachFilter(clubDay) || "";

    // * Span으로 필터링 label 표시 @target.value
    // 체크하는 경우
    if (target.checked) {
      setCheckedItems((prev) => ({
          ...prev,
          [target.value]: filterKey,
        })
      );
    // 체크 해제하는 경우
    } else {
      setCheckedItems((prev) => { 
        return Object.fromEntries(
          Object.entries(prev)
            .filter((el) => !el.includes(target.value)))
      });
    }
  }

  const makeDropDown = (items: Map<string, string>) => {
    const dropDown: Array<any> = [];

    items.forEach((value, key) => {
      dropDown.push(
        <label key={value} htmlFor={value}>
          <input id={value} type='checkbox' value={key} 
            onChange={handleDropDownItemCheck} checked={Object.keys(checkedItems).includes(key)} />
          <span>{key}</span>
        </label>
      );
    });

    return dropDown;
  };

  return <SelectBox>
    <DropDownBox>
      <SelectButton
        type='button'
        name='clubstate'
        onClick={handleDropDownClick}
      >
        모집 상태
        <ArrowDropDownRoundedIcon />
      </SelectButton>
      <DropDownMenu className='clubstate hidden'>
        {makeDropDown(clubState)}
      </DropDownMenu>
    </DropDownBox>
    <DropDownBox>
      <SelectButton
        type='button'
        name='clubmeeting'
        onClick={handleDropDownClick}
      >
        진행 방식
        <ArrowDropDownRoundedIcon />
      </SelectButton>
      <DropDownMenu className='clubmeeting hidden'>
        {makeDropDown(clubMeeting)}
      </DropDownMenu>
    </DropDownBox>
    <DropDownBox>
      <SelectButton
        type='button'
        name='clubduration'
        onClick={handleDropDownClick}
      >
        진행 기간
        <ArrowDropDownRoundedIcon />
      </SelectButton>
      <DropDownMenu className='clubduration hidden'>
        {makeDropDown(clubDuration)}
      </DropDownMenu>
    </DropDownBox>
    <DropDownBox>
      <SelectButton
        type='button'
        name='clubday'
        onClick={handleDropDownClick}
      >
        요일
        <ArrowDropDownRoundedIcon />
      </SelectButton>
      <DropDownMenu className='clubday hidden'>
        {makeDropDown(clubDay)}
      </DropDownMenu>
    </DropDownBox>
  </SelectBox>
}

export default ClubFilter;