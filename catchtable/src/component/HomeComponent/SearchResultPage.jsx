import { useRecoilState } from "recoil";
import { searchKeyWordState } from "../../recoil/HeaderStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { getSearchList } from "./HomeFunction";

export const SearchResultPage = () => {
    const [searchKeyWord, setSearchKeyWord] = useRecoilState(searchKeyWordState);
    const [searchResList, setSearchResList] = useState([])

    const getList = async () => {
        if (searchKeyWord !== '' && searchKeyWord.trim().length > 0 && searchKeyWord[0] !== ' ') {
            try {
                const result = await getSearchList(searchKeyWord);
                setSearchResList(result);
            } catch (e) {
                console.error(e, 'error');
            }
        }
    };

    useEffect(() => {
        //비동기로 검색

        getList();
        if(searchKeyWord.length<1){
            setSearchKeyWord('')
        }

    }, [searchKeyWord])
    return (

        <div>
            {searchResList.length > 0 ? (
                <>
                    {
                        searchResList.map((res, index) => (
                            <div key={index}>{res.resNo}{res.resName}</div>
                        ))
                    }
                </>
            ) : (
                <div>검색결과가 없음</div>
            )}

        </div>
    );
}