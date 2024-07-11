import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { clientState } from "../../recoil/clientStore";
import { isSearchState, searchKeyWordState } from "../../recoil/HeaderStore";
import { BiBot } from "react-icons/bi";
import { IoArrowBackOutline } from "react-icons/io5";
import { CiBellOn } from "react-icons/ci";
import { useEffect } from "react";

export const Header = () => {
    const resetClientInfo = useResetRecoilState(clientState);
    const [isSearch, setIsSearch] = useRecoilState(isSearchState);
    const [searchKeyWord, setSearchKeyWord] = useRecoilState(searchKeyWordState);

    const navigator = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("enter");
    };
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
    }, [location]);



    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            {location.pathname === '/' ? (
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        {isSearch ? (
                            <span className="nav-icons" onClick={() => { setIsSearch(false); setSearchKeyWord(''); }}>
                                <IoArrowBackOutline />
                            </span>
                        ) : (
                            <span className="nav-icons">
                                <BiBot />
                            </span>
                        )}
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav me-auto w-100">
                            <li className="nav-item w-100">
                                <div className="input-group w-100">
                                    <form onSubmit={handleSearch} className="w-100">
                                        <input
                                            className="form-control w-100"
                                            value={searchKeyWord}
                                            onChange={e => setSearchKeyWord(e.target.value)}
                                            readOnly={!isSearch}
                                            onClick={() => setIsSearch(true)}
                                            type="text"
                                            placeholder="이름 지역 카테고리"
                                        />
                                    </form>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-icons ms-2">
                        <CiBellOn size={20} />
                    </div>
                </div>
            ) : (
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                            <span className="nav-icons" style={{fontWeight:'bold'}} onClick={() => { setIsSearch(false); setSearchKeyWord(''); }}>
                                1
                            </span>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav me-auto w-100">
                            <li className="nav-item w-100">
                                <div className="input-group w-100">
                                   
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-icons ms-2">
                        <CiBellOn size={20} />
                    </div>
                </div>
            )}

        </nav>
    );
};
