/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { AxiosError } from "axios";
import { useNavigate,useLocation } from 'react-router-dom';
import ReactQuill from "react-quill";

import { Club } from "@/utils/interface";
import * as Api from "@/utils/api";

import ClubCreateBasic from "@/components/ClubCreate/ClubCreateBasic/ClubCreateBasic";
import ClubPreview from "@/components/ClubCreate/ClubPreview/ClubPreview";

import "react-quill/dist/quill.snow.css";
import * as Style from "./ClubUpdateStyle";

interface CustomizedState {
  club: Club
}

function EditorComponent() {
  const location = useLocation();
  const state = location.state as CustomizedState;
  const { club } = state;

  const navigate = useNavigate();
  const QuillRef = useRef<ReactQuill>();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [contents, setContents] = useState("");
  const [aiContents, setAIContents] = useState("");
  const [duplication, setDuplication] = useState(-1);
  const [preview, setPreview] = useState(false);
  const [clubInfo, setClubInfo] = useState(club);

  useEffect(() => {
    if (document.querySelector(".ql-toolbar:nth-child(2)")) setDuplication(1);
    else setDuplication(0)
  },[])
  
  useEffect(() => {
    if (club) {
      setContents(club.description ? club.description : "");
    }
  },[club])
  
  useEffect(() => {
    setClubInfo({...clubInfo, description: contents})
  },[contents])

  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
  	// 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement("input");
    const formData = new FormData();
    let url = "";

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

	// 파일이 input 태그에 담기면 실행 될 함수 
    // eslint-disable-next-line consistent-return
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        formData.append("file", file[0]);

	// 저의 경우 파일 이미지를 서버에 저장했기 때문에
    	// 백엔드 개발자분과 통신을 통해 이미지를 저장하고 불러왔습니다.
        try {
        // axios를 통해 백엔드 개발자분과 통신했고, 데이터는 폼데이터로 주고받았습니다.
        // const res = await axios.post("/api/upload", formData);
          const res = await Api.post("/clubs/picture", formData);
          const { filePath } = res.data;
	// 백엔드 개발자 분이 통신 성공시에 보내주는 이미지 url을 변수에 담는다.
          url = filePath;

	// 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드 
    	// 해당 DOM의 데이터가 필요하기에 useRef를 사용한다.
          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            const quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src='${url}' alt="이미지 태그가 삽입됩니다." />`
            );
          }

          return { ...res, success: true };
        } catch (error) {
          const err = error as AxiosError;
          return { ...err.response, success: false };
        }
      }
    };
  };

// quill에서 사용할 모듈을 설정하는 코드 입니다.
// 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
// useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.
const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const handleSubmit = () => {
    Api.put(`/clubs/${club.id}`, clubInfo)
      .then((res)=> {console.log(res)
        navigate(`/clubDetail/${clubInfo.id}`);})
      .catch((err) => {console.log(err)
        setButtonDisabled(false);
        alert('등록에 실패했습니다!')
      });

    setButtonDisabled(true);
  }

return (
	<div>
    <ClubCreateBasic clubInfo={clubInfo} setClubInfo={setClubInfo} aiContents={aiContents}/>
    {duplication === -1 && <Style.CoverDiv />}
    <Style.WholeBox>
      {/* <Header /> */}
      <Style.DetailInfoDiv>상세 정보</Style.DetailInfoDiv>
      <Style.ClubReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
            QuillRef.current.getEditor().getText()
          }
        }}
        // eslint-disable-next-line react/no-this-in-sfc
        onChange={(event) => {
          setAIContents(QuillRef.current?.getEditor().getText() ? QuillRef.current?.getEditor().getText() : "")
          setContents(event)
        }}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
        defaultValue={club.description}
        duplicated={duplication}
      />
      {preview && <ClubPreview newClub={clubInfo}/>}
      <Style.ButtonBox>
        <Style.BackLink to={`/clubDetail/${clubInfo.id}`}>
          <Style.MyButton1>
            취소
          </Style.MyButton1>
        </Style.BackLink>
        <Style.MyButton2 onClick={() => {setPreview(!preview)}}>
          미리보기
        </Style.MyButton2>
        <Style.MyButton3 onClick={handleSubmit} disabled={buttonDisabled}>
          등록
        </Style.MyButton3>
      </Style.ButtonBox>
      </Style.WholeBox>
	</div>
)}

export default EditorComponent;