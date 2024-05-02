import { ChangeEvent, useState } from "react";
import { clientSearch } from "../helper/HeaderHelper";

export const ClientSearchInput = () => {

    const [text, setText] = useState<string>("");



    const inputChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setText(e.target.value)
    }
    const handleSearch = async () => {
        if (text !== '') {
            try {
                const res = await clientSearch(text); // clientSearch 함수를 async/await로 호출하여 결과를 받음
                console.log(res); // 결과의 data만 출력
                
            } catch (error) {
                console.error('Error occurred while searching:', error);
            }
        }
    }


    return (
        <>
            <div className="">
                <div className="input-group">
                    <input className="form-control" value={text} onChange={inputChange}></input>
                    <button className="btn btn-secondary" onClick={handleSearch}>search</button>
                </div>
            </div>
        </>
    );
}