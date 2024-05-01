import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import summernote from "summernote";
import { boardType } from "../../model/communityBoardModel";
import { useRecoilState } from "recoil";
import { clientState } from "../../store/ClientStore";
import { groupNoState } from "../../store/GroupStroe";


export const CommunityBoardWrite: React.FC = () => {
  //state

  const [clientStore, setClientStore] = useRecoilState(clientState);
  const [groupStroe, setGroupStroe] = useRecoilState(groupNoState);

  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");


  const [boardData, setBoardData] = useState<boardType>({
    communityBoardTitle: "",
    communityBoardContent: "",
    communityBoardWriter: clientStore.clientEmail,
    communityBoardUploadDate: "",
    communityBoardId: null,
    communityBoardReadCount: 0,
  });





  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleEditorInit = () => {

  };

  useEffect(() => {

    const config: Summernote.Options = {

      minHeight: 300,
      tabDisable: true,

      toolbar: [

        ["font", ["bold", "italic", "underline", "superscript"]],
        ["fontsize", ["fontsize", "fontname", "color"]],
      ],


      fontSizes: ["10", "12", "14", "16"],


      colors: [[["red"]], [["black"]], [["yellow"]]],

      fontSizeUnits: ["px"],

      placeholder: "",

      lang: "ko-KR",

      callbacks: {
        onInit: () => {

        },
        onChange: (contents: string, $editable: JQuery) => {

          console.log(boardData)
          

          setContent(contents)

        },
        onKeyup: (ev: KeyboardEvent) => {
        },
        onKeydown: (ev: KeyboardEvent) => {
        },
        onPaste: (e: Event & { originalEvent: ClipboardEvent }) => {

          const clipboardData = e.originalEvent.clipboardData?.getData("text");
        },
      },
      disableDragAndDrop: false
    };

    $("#summernote").summernote(config);
  }, []);




  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }



  useEffect(() => {
    setBoardData({
      communityBoardTitle: title,
      communityBoardContent: content,
      communityBoardWriter: clientStore.clientEmail,
      communityBoardUploadDate: null,
      communityBoardId: null,
      communityBoardReadCount: 0,
    })
    console.log(boardData)

  }, [content, title])



  const handleSaveContent = () => {
    const imgSrcMap: { [key: number]: string | undefined } = []; // 이미지 태그의 src를 저장할 객체

    // content 변수에는 HTML 내용이 들어 있다고 가정합니다.
    let content: string = $("#summernote").summernote("code");

    // 이미지 태그의 갯수를 구합니다.
    const imgTags = $(content).find("img");
    console.log(imgTags)

    // 이미지 태그를 순회하며 src를 객체에 저장하고 번호로 대체합니다.
    imgTags.each(function (index) {
      const src = $(this).attr("src"); // 이미지 태그의 src 속성을 가져옵니다.
      const newSrc = `{${index}}`; // 번호로 대체할 새로운 src 생성
      imgSrcMap[index] = src; // 객체에 저장합니다.
      // 이미지 태그의 src를 번호로 대체합니다.
      $(this).attr("src", newSrc);
    });

    // 변경된 content를 출력합니다.

    // 이미지 태그의 src를 변경한 것을 확인합니다.
    for (let i = 0; i < imgTags.length; i++) {
      const originalSrc = imgSrcMap[i]; // 이전 src
      const replacedSrc = `${i}`; // 새로운 src

      // content 내의 이미지 태그의 src를 변경합니다.
      content = content.replace(originalSrc || "", replacedSrc);
    }

    // 변경된 content를 출력합니다.
    console.log("imgSrcMap:", imgSrcMap);
    console.log("변경된 content:", content);


    const pureText = content.replace(/<[^>]+>/g, '');



    if (!(boardData.communityBoardContent === '' || boardData.communityBoardTitle === '')) {
      const result = window.confirm("dd?");

      if (result) {
        axios({
          url: `http://localhost:8080/write`,
          method: 'post',
          data: {
            groupsId:groupStroe,
            communityBoardTitle:boardData.communityBoardTitle,
            communityBoardContent:content,
            communityBoardWriter:clientStore.clientEmail
          }
        }).then(res => {
          console.log(res.status);
        }).catch(error => {
          console.error('Error occurred:', error);
        });
      }
    } else if (pureText === '') {
      alert("내용을 입력")
    } else if (boardData.communityBoardTitle === '') {
      alert("제목 입력")
    }




  };

  return (
    <div className="container mt-3">
      <div className="row ">
        <div className="col-12">
          <input className="form-control" name="communityBoardTitle" value={title} onChange={handleChangeTitle} placeholder="title" />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12">
          <div className="w-100">
            <textarea
            
            className="form-control" value={boardData.communityBoardContent} name="communityBoardContent" id="summernote"></textarea>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <button className="btn btn-primary" onClick={handleSaveContent}>저장</button>
        </div>
      </div>
    </div>
  );
}