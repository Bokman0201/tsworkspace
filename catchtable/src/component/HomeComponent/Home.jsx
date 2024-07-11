import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isSearchState } from "../../recoil/HeaderStore";
import { SearchResultPage } from "./SearchResultPage";
import CarouselComponent from "./CarouselComponent";
import KakaoMap from "./KakaoMap";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [isSearch, setIsSearch] = useRecoilState(isSearchState);
    const navigator = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    const handleNavclick = ()=>{
        navigator('/resList');
    }

    return (

        <div className="container">
            reserveit
            {!isSearch && (
                <>
                    <div className="row">
                        <div className="col">
                            <div className="wrapper">
                                <CarouselComponent />
                            </div>
                        </div>
                    </div>
                    {/* <KakaoMap/> */}
                    {/* 나중에 클러스터 추가 */}

                    <div className="row mt-2">
                        <div className="col-3" onClick={handleNavclick}>전체</div>
                        <div className="col-3">중식</div>
                        <div className="col-3">일식</div>
                        <div className="col-3">양식</div>
                    </div>


                </>
            )}
            {isSearch && (
                <SearchResultPage />
            )}


        </div>
    );
}