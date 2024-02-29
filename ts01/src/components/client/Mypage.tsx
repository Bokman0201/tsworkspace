import { useNavigate } from "react-router-dom";
import { useClientStore } from "../../store/client/clientStore";
import { helperGetImage } from "../../helper/Helper";
import { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";


export const MyPage = () => {

    const { clientEmail, clientName, clientJoinDate } = useClientStore();

    const [isImageUpdate, setIsImageUpdate] = useState<boolean>(false);

    const handleImageUpdate = () => {
        console.log(isImageUpdate)

        setIsImageUpdate(!isImageUpdate);
    }

    const [image, setImage] = useState<string | null>();
    useEffect(() => {
        if (clientEmail) {
            helperGetImage(clientEmail).then((res) => {
                console.log(res); // 이미지 URL 또는 null이 출력됨
                setImage(res);
            });
        }
    }, [clientEmail]);


    return (
        <>
            <div className="row">
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3 border p-4">
                    <div className="row">
                        <div className="position-relative" style={{ width: '150px', height: '150px', margin: 'auto' }}>
                            {image && (
                                <img
                                    src={image}
                                    width={"120px"}
                                    height={"120px"}
                                    className="mx-auto d-block position-absolute top-50 start-50 translate-middle"
                                    style={{ borderRadius: '50%' }}
                                    alt="Profile"
                                />
                            )}

                            <FaExchangeAlt onClick={handleImageUpdate} className="position-absolute bottom-0 start-0 translate-middle" style={{ cursor: 'pointer' }} />
                        </div>

                        <div className="col">

                            <div className="row">
                                <div className="col">
                                    email : {clientEmail}<hr />
                                </div>

                            </div>
                            <div className="row">
                                <div className="col">
                                    이름 : {clientName}<hr />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    가입일 : {clientJoinDate}<hr />
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col" >
                                    {isImageUpdate ? (
                                        <>
                                            <div className="mb-3">
                                                <input className="form-control form-control-sm" id="formFileSm" type="file" />
                                            </div>
                                        </>
                                    ):(
                                        <>
                                        <div className="mb-3">
                                            <p></p>
                                        </div>
                                    </>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3 border p-4">

                </div>
            </div>
            <div className="row">
                <div className="col">
                    {/* 프로필 이미지  */}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {/* 프로필 이미지  */}
                </div>
            </div>
        </>
    )
}