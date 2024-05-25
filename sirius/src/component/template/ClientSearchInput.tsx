import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import { clientSearch } from "../helper/HeaderHelper";
import axios from "axios";
import useClientInfo from "../store/UserStoer";
import { useOffcanvasState } from "../store/ModalStore";
import { Offcanvas } from "react-bootstrap";
import { FriendDetail } from "../friend/FriendDetail";
import { friendListType } from "../store/FriendStore";

type SetIsHeaderClickType = (value: boolean) => void;

export const ClientSearchInput = ({ setIsHeaderClick }: { setIsHeaderClick: SetIsHeaderClickType }) => {
    const [text, setText] = useState<string>("");
    const [clientList, setClientList] = useState<string[]>([]);
    const [isClick, setIsClick] = useState<boolean>(false);

    const { clientInfo, setClientInfo, deleteClientInfo } = useClientInfo();
    const [list, setList] = useState<friendListType[]>();

    const getList = async () => {

        const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/friend/list/${clientInfo.clientId}`)

        setList(res.data)
    }

    useEffect(() => {
        getList();
    }, [])

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }


    const handleSearch = async () => {
        if (text !== '') {
            try {
                const res = await clientSearch(text, clientInfo.clientId);
                setClientList(res);
            } catch (error) {
                console.error('Error occurred while searching:', error);
            }
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }



    const handleOutsideClick = (e: MouseEvent) => {
        const clickedElementId = (e.target as HTMLElement)?.id;

        let result = clickedElementId === "searchClient"


        if (!result) {
            setIsClick(false);
            if (isClick) {
                setIsHeaderClick(false)
            }

        }
        else if (result) {
            setIsClick(true);
        }

    }

    const [selectedClient, setSellectedClient] = useState("");
    const handleSearchClientClick = (client: string) => {
        setSellectedClient(client)
        show();
    }

    useLayoutEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    const handleSendRequest = (receiver: string) => {

        axios({
            url: `${process.env.REACT_APP_REST_API_URL}/invite/send`,
            method: 'post',
            data: {
                clientId: clientInfo.clientId,
                invitedClient: receiver
            }
        }).then(res => {

            if (res.data === 'accept') {
                alert("이미 상대방의 요청이 있어 친구목록에 추가됩니다.")
            }

        }).catch(err => {

            console.error(err)
        })

    }

    useEffect(() => {
        handleSearch();
        if (text.length === 0) {
            setClientList([]);
        }
    }, [text]);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const show = () => {
        setIsOpen(true)
    }
    const handleClose = () => setIsOpen(false)

    const isButtonDisabled = (client: string) => {
        if (list) {
            return list.some(friend => friend.memberId === client);
        }
    };


    return (
        <div style={{ position: "relative" }}>
            <form onSubmit={handleSubmit} autoComplete="off">
                <input id="searchClient" className="form-control" value={text} onChange={inputChange} />
            </form>

            {isClick && clientList.length > 0 && (
                <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "white" }} className="border w-100">
                    {clientList.map((client, index) => (
                        <div className="row" key={index}>
                            <div className="col" onClick={() => handleSearchClientClick(client)}>
                                {client}
                            </div>
                            <div className="col text-end">
                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => handleSendRequest(client)}
                                    disabled={isButtonDisabled(client)}
                                >
                                    {isButtonDisabled(client) ? "팔로우중" : "추가"}
                                </button>
                            </div>
                        </div>
                    ))}
                    {clientList.length !== 1 && (
                        <div>더보기</div>
                    )}
                </div>
            )}

            <>
                <Offcanvas placement={"bottom"} show={isOpen} onHide={handleClose} className="fullscreen-offcanvas">
                    <FriendDetail clientId={selectedClient} />
                </Offcanvas>
            </>
        </div>
    );
}
