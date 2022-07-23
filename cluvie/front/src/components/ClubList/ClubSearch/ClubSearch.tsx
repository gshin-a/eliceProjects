import React, { useState } from "react";

import * as Api from "@/utils/api";
import { Club } from "@/utils/interface";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { SearchBox, SearchInput } from "./ClubSearchStyle";

interface Props {
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchedClubList: React.Dispatch<React.SetStateAction<Club[]>>;
}

function ClubSearch({ setIsSearched, setSearchedClubList }: Props) {
  const [searchWord, setSearchWord] = useState<string>("");

  const onWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  }
  const handleSearchClick = async () => {
    if (searchWord === "") {
      alert("검색어를 입력해 주세요!");
      return;
    }
    try {
      const res = await Api.get(`/clubs/searchResults/${searchWord}`);
      const { searchResults } = res.data;

      setIsSearched(() => true);
      setSearchedClubList((prev) => [
        ...prev,
        ...searchResults
      ]);
    } catch (err) {
      console.error(err);
    }
  }

  return (<SearchBox>
    <SearchInput 
      type='text' 
      placeholder='검색어를 입력하세요' 
      value={searchWord}
      onChange={onWordChange}
    />
    <SearchRoundedIcon className='icon' onClick={handleSearchClick} />
  </SearchBox>);
}

export default ClubSearch;