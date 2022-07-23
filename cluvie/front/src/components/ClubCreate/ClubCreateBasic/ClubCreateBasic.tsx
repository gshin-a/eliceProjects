import React, { useEffect, useState } from "react";
import axios from "axios";

import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';

import * as Api from "@/utils/api";
import { Club } from "@/utils/interface";
import { onChangeFunction } from "@/utils/eventHandler";

import { ColumnContainerBox, StyledInput } from "@/styles/containers";
import { StyledLabel } from "@/styles/text";
import {
  ClubCreateFormBox,
  ThumnailBox,
  ThumnailLabel,
  ThumnailImage,
  FormBox,
  InputBox,
  HeadCountInput,
  MeetingInputBox,
  Line,
  StyledSelect,
  HashtagsBox,
  HashtagInnerBox,
  HashtagNotice,
  HashtagNotice2,
  HashtagNotice3,
  HashtagSpan,
  HashtagSpan2,
  AIButton

} from "./ClubCreateBasicStyle";

// * Props type은 해당 파일 내에서 정의
interface Props {
  clubInfo: Club;
  setClubInfo: React.Dispatch<
  React.SetStateAction<Club>>;
  aiContents: string;
}

// ! state setter는 prop으로 가지 않는 게 좋다
function ClubCreateBasic({ clubInfo, setClubInfo,aiContents }: Props) {
  const [ thumnail, setThumnail ] = useState<any>();
  const [ aihashtagArr, setAiHashtagArr ] = useState<string[]>([]);
  const [ hashtagArr, setHashtagArr ] = useState<string[]>([]);
  const [ hashtagLoading, setHashtagLoading] = useState(false);
  const [ inputHashtag, setInputHashtag ] = useState("");

  const onChange = onChangeFunction(setClubInfo);

  const handleCheckBox = (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    
    setClubInfo((prev: Club) => ({
      ...prev,
      [target.name]: (target.checked ? 1 : 0),
    }));
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    
    setClubInfo((prev: Club) => ({
      ...prev,
      [name]: Number(value),
    }));
  }

  const handleHashtagEnter = (event: React.MouseEvent<HTMLSpanElement>) => {
    const clickedHashtag = event.currentTarget.id;

    // 중복 처리
    if (hashtagArr.includes(clickedHashtag)) {
      alert("이미 등록된 해시태그입니다!");
      return;
    }

      // 2개까지만 입력 가능
    if (hashtagArr.length === 2) {
      alert("해시태그를 2개 모두 입력하셨습니다!");
      return;
    }
    setHashtagArr((prev) => [...prev, clickedHashtag]);
  }

  const handleInputHashtagChange = (event: React.ChangeEvent <HTMLInputElement>) => {
    setInputHashtag(event.target.value);
  }


  const handleInputHashtagEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    
    if (event.key === "Enter") {
      // 중복 처리
      if (hashtagArr.includes(value)) {
        alert("이미 등록된 해시태그입니다!");
        return;
      }

      // 2개까지만 입력 가능
      if (hashtagArr.length === 2) {
        alert("해시태그를 2개 모두 입력하셨습니다!");
        return;
      }

      setHashtagArr((prev) => [...prev, value]);
      setInputHashtag(""); 
    }
  }

  const handleSpanClickDelete = (event: React.MouseEvent<HTMLSpanElement>) => {
    const clickedHashtag = event.currentTarget.id;
    const newHashtagArr = hashtagArr.filter((el: string) => el !== clickedHashtag);

    setHashtagArr(() => newHashtagArr);
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    
    // files[0]은 File || null
    if (files !== null && files?.length !== 0) {
      const formData = new FormData();
      
      setThumnail(() => files[0]);
      // "file"로 안 하면 field name 오류 발생
      formData.append("file", files[0]);

      try {
        const pictureRes = await Api.post("/clubs/picture", formData);
        const { filePath }  = pictureRes.data;
        console.log(filePath);

        setClubInfo((prev: Club) => ({
          ...prev,
          picture: filePath,
        }));
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleAISummary = () => {
    if(aiContents.length > 30){
      axios.post('http://kdt-ai4-team18.elicecoding.com:5002/summary',{sentences:aiContents},{
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
        .then((res)=>{setClubInfo((prev: any) => ({
          ...prev,
          'intro': res.data,
        }))
        })
        .catch((err)=>console.log(err))
    }
    else {
      alert('상세 정보를 30자 이상 입력하세요!');
    }
  }

  const handleAIKeyword = () => {
    if(aiContents.length > 30){
      axios.post('http://kdt-ai4-team18.elicecoding.com:5002/keyword-diversity',{sentences:aiContents},{
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
        .then((res)=>{setAiHashtagArr(res.data)
        })
        .catch((err)=>console.log(err))
    }
    else {
      alert('상세 정보를 30자 이상 입력하세요!');
    }
  }

  useEffect(()=>{
    if(!hashtagLoading){
      const newHashtagArr: string[] = []
      if(clubInfo.hashtag1)
        newHashtagArr.push(clubInfo.hashtag1)

      if(clubInfo.hashtag2)
        newHashtagArr.push(clubInfo.hashtag2)
        
      setHashtagArr(newHashtagArr);
      setHashtagLoading(true);
    }
  },[clubInfo])

  useEffect(()=>{
    setClubInfo((prev: Club) => ({
      ...prev,
      hashtag1: hashtagArr[0] ? hashtagArr[0] : "",
      hashtag2: hashtagArr[1] ? hashtagArr[1] : "",
    }));
  },[hashtagArr])

  return (
    <ColumnContainerBox>
      <h1>클럽 생성하기</h1>
      <ClubCreateFormBox>
        <FormBox>
          <ThumnailBox noThumnail={!thumnail}>
            <ThumnailLabel noThumnail={!thumnail} htmlFor="chooseFile">
              <PhotoCameraBackIcon className="thumnail-icon"/>
            </ThumnailLabel>
            <input id="chooseFile" style={{display: 'none'}} type="file" accept="image/*" onChange={handleImageUpload}/>
            {
              clubInfo.picture &&
              <ThumnailImage
                src={clubInfo.picture}
                alt='Club Thumnail'
              />
            }
          </ThumnailBox>
          <InputBox>
            <StyledLabel htmlFor='name'>클럽명<HashtagNotice2>({clubInfo.name?.length}/45자)</HashtagNotice2></StyledLabel>
            <StyledInput
              type='text'
              name='name'
              value={clubInfo.name}
              onChange={onChange}
            />
            {clubInfo.name!==undefined && clubInfo.name?.length > 45 && <HashtagNotice3>클럽명은 45자 이내로 작성하셔야 합니다!</HashtagNotice3>}
          </InputBox>
          <InputBox>
          <StyledLabel htmlFor='intro'>한줄 소개<HashtagNotice2>({clubInfo.intro?.length}/300자)</HashtagNotice2><AIButton type='button' onClick={handleAISummary}>한줄 요약</AIButton><br/><HashtagNotice>한줄 소개는 직접 작성하거나, AI가 제공하는 한줄 요약을 등록할 수도 있습니다!<br/>클럽의 상세 정보를 30자 이상 작성하고 한줄 요약 버튼을 클릭하면 AI가 작성한 한줄 요약이 입력돼요!</HashtagNotice><HashtagNotice2><br/>*한줄 요약 버튼을 클릭하면 작성 중인 한줄 소개가 지워집니다.<br/>*글의 길이에 따라 더 많은 시간이 소요될 수도 있어요.</HashtagNotice2></StyledLabel>
            <StyledInput
              type='text'
              name='intro'
              value={clubInfo.intro}
              onChange={onChange}
            />
            {clubInfo.intro!==undefined && clubInfo.intro?.length > 300 && <HashtagNotice3>한줄 소개는 300자 이내로 작성하셔야 합니다!</HashtagNotice3>}
          </InputBox>
        </FormBox>
        <Line />
        <FormBox>
          <InputBox>
            <StyledLabel htmlFor='head_count'>최대 모집 인원</StyledLabel>
            <HeadCountInput
              type='number'
              name='head_count'
              value={clubInfo.head_count}
              onChange={onChange}
              min='1'
            />
            <span>명</span>
          </InputBox>
          <MeetingInputBox>
            <InputBox>
              <StyledLabel htmlFor='meetingMethod'>진행 방식</StyledLabel>
              <input
                type='checkbox'
                name='online'
                value={clubInfo.online}
                defaultChecked={Boolean(clubInfo.online)}
                onClick={handleCheckBox}
              />
              <span>온라인</span>
              <input
                type='checkbox'
                name='offline'
                value={clubInfo.offline}
                defaultChecked={Boolean(clubInfo.offline)}
                onClick={handleCheckBox}
              />
              <span>오프라인</span>
            </InputBox>
            <InputBox>
              <StyledLabel htmlFor='meetingDay'>진행 요일</StyledLabel>
              <input type='checkbox' name='weekday' value={clubInfo.weekday} defaultChecked={Boolean(clubInfo.weekday)} onClick={handleCheckBox} />
              <span>평일</span>
              <input type='checkbox' name='weekend' value={clubInfo.weekend} defaultChecked={Boolean(clubInfo.weekend)} onClick={handleCheckBox} />
              <span>주말</span>
            </InputBox>
          </MeetingInputBox>
          <InputBox>
            <StyledLabel htmlFor='duration'>진행 기간</StyledLabel>
            <StyledSelect name='duration' id='duration' defaultValue={clubInfo.duration} onChange={handleSelect}>
              <option value='0'>미정</option>
              <option value='1'>단기</option>
              <option value='2'>1~2개월</option>
              <option value='3'>3~4개월</option>
              <option value='4'>5~6개월</option>
              <option value='5'>6개월 이상</option>
              <option value='6'>장기</option>
            </StyledSelect>
          </InputBox>
          <InputBox>
            <StyledLabel htmlFor='hashtags'>해시태그<AIButton type='button' onClick={handleAIKeyword}>키워드 추출</AIButton><br/>
            <HashtagNotice>클럽의 상세 정보를 30자 이상 작성하고 키워드 추출 버튼을 클릭하면 AI가 클럽에 적합한 해시태그를 보여줍니다!<br/>그중에서 해시태그를 선택하거나 직접 작성할 수도 있어요!</HashtagNotice><HashtagNotice2><br/>*최대 2개의 해시태그를 등록할 수 있습니다.<br/>*글의 길이에 따라 더 많은 시간이 소요될 수도 있어요.</HashtagNotice2>
            </StyledLabel>
            <StyledInput
              type='text'
              name='hashtags'
              value={inputHashtag}
              onChange={handleInputHashtagChange}
              onKeyPress={handleInputHashtagEnter}
            />
            <HashtagsBox>
              {aihashtagArr.map((el: string) => 
                <HashtagInnerBox key={el}>
                  <HashtagSpan id={el} key={el} onClick={handleHashtagEnter}>
                    #{el}
                  </HashtagSpan>
                </HashtagInnerBox>)}
            </HashtagsBox>
            {Boolean(aihashtagArr.length) && <HashtagNotice>마음에 드는 해시태그를 클릭하세요!</HashtagNotice>}
            <HashtagsBox>
                {hashtagArr.map((el: string) => 
                <HashtagInnerBox key={el}>
                  <HashtagSpan2 id={el} key={el} onClick={handleSpanClickDelete}>
                    #{el}
                  </HashtagSpan2>
                </HashtagInnerBox>)}
            </HashtagsBox>
            {Boolean(hashtagArr.length) && <HashtagNotice>한 번 더 클릭하면 취소할 수 있어요!</HashtagNotice>}
          </InputBox>
        </FormBox>
      </ClubCreateFormBox>
    </ColumnContainerBox>
  );
}

export default ClubCreateBasic;
