import { useRecoilState } from "recoil";
import { clientState } from "../../recoil/clientStore";
import { NavLink } from "react-router-dom";

export const MyPage = () => {
    const [clientInfo, setClientInfo] = useRecoilState(clientState);

    return (
        <div className="container">
            {clientInfo.clientType === '사업자' ? (
                <NavLink to={"/management"}>매장관리</NavLink>
            ) : (
                <div></div>
            )}
        </div>
    );
}