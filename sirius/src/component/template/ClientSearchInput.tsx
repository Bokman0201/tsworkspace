import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import { clientSearch } from "../helper/HeaderHelper";

export const ClientSearchInput = () => {
    const [text, setText] = useState<string>("");
    const [clientList, setClientList] = useState<string[]>([]);
    const [isClick, setIsClick] = useState<boolean>(false);

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handleSearch = async () => {
        if (text !== '') {
            try {
                const res = await clientSearch(text);
                setClientList(res);
            } catch (error) {
                console.error('Error occurred while searching:', error);
            }
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const handleInputClick = () => {

        //setIsClick(true);
    }

    const handleOutsideClick = (e: MouseEvent) => {
        const clickedElementId = (e.target as HTMLElement)?.id;

        let result = clickedElementId === "searchClient"


        if (!result) {
            setIsClick(false);
        }
        else if (result) {
            let result = clickedElementId === "searchClient"
            setIsClick(true);
        }

    }

    const handleSearchClientClick = (client: string) => {
        alert(client);
    }

    useLayoutEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);


    useEffect(() => {
        handleSearch();
        if (text.length === 0) {
            setClientList([]);
        }
    }, [text]);

    return (
        <div style={{ position: "relative" }}>
            <form onSubmit={handleSubmit} autoComplete="off">
                <input id="searchClient" className="form-control" value={text} onChange={inputChange} />
            </form>

            {isClick && clientList.length > 0 && (
                <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "" }} className="border w-100">
                    {clientList.map((client, index) => (
                        <div className="row" key={index}>
                            <div className="col"  onClick={() => handleSearchClientClick(client)}>
                                {client}
                            </div>
                            <div className="col text-end">
                                <button>추가</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
