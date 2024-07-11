import { useRecoilState } from 'recoil';
import { PostCodeModal } from './PostCodeModal';
import { PostModalState } from '../../recoil/ModalStore';
import { useEffect, useState } from 'react';
import { clientState } from '../../recoil/clientStore';
import { addRestaurant } from './RestautantFunction';

export const Management = () => {
    const [modalState, setModalState] = useRecoilState(PostModalState);
    const [clientInfo, setClientInfo] = useRecoilState(clientState);
    const openPostModal = () => {
        setModalState(true);
    };

    useEffect(() => {
        setModalState(false);
    }, [setModalState]);

    const [resInfo, setResInfo] = useState({
        resOwner: clientInfo.clientId,
        resName: '',
        resOpenTime: "11:00",
        resCloseTime: '22:00',
        resRegion: '',
        resPost: '',
        resAddr1: '',
        resAddr2: '',
    });


    const [inputSets, setInputSets] = useState([
        {
            id: 1,
            fileInputId: `fileInput-1`,
            textInputId: `textInput-1`,
        },
    ]);

    const addSet = () => {
        const nextId = inputSets.length + 1;
        const newSet = {
            id: nextId,
            fileInputId: `fileInput-${nextId}`,
            textInputId: `textInput-${nextId}`,
        };
        setInputSets([...inputSets, newSet]);
    };

    const removeSet = (setId) => {
        setInputSets(inputSets.filter(set => set.id !== setId));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if(clientInfo.clientId!==''){
            const res = addRestaurant(resInfo);
        }
    };
    useEffect(()=>{
        console.log(resInfo)
    },[resInfo])

    return (
        <div>
            page1
            // 가게 기본정보 등록
            <form onSubmit={handleSubmit}>
                        {clientInfo.clientId}
                <div className="container mt-2">
                    <div className="row">
                        <div className="col">
                            <input type="text" placeholder="가게 이름" value={resInfo.resName} onChange={e => setResInfo({ ...resInfo, resName: e.target.value })} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className='input-group'>
                                <input type="text" placeholder="우편번호" value={resInfo.resPost} readOnly />
                                <button type='button' onClick={openPostModal}>우편번호찾기</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="text" placeholder="주소" value={resInfo.resAddr1} readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="text" placeholder="상세 주소" value={resInfo.resAddr2} onChange={e => setResInfo({ ...resInfo, resAddr2: e.target.value })} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="time" value={resInfo.resOpenTime} onChange={e => setResInfo({ ...resInfo, resOpenTime: e.target.value })} step="1800" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="time" value={resInfo.resCloseTime} onChange={e => setResInfo({ ...resInfo, resCloseTime: e.target.value })} />
                        </div>
                    </div>

                </div>

                <div >
                    <PostCodeModal setResInfo={setResInfo} resInfo={resInfo} />
                </div>

                page2
                // 이미지 선택 등록 
                <div className="container mt-2">
                    <input type="file" multiple />
                </div>

                page3
                // 메뉴 등록 
                <div className="container mt-2">
                    <button type='button' onClick={addSet}>메뉴 추가</button>

                    {inputSets.map(set => (
                        <div key={set.id} className="row mt-2">
                            <div className="col">
                                <input type="file" className='form-control' id={set.fileInputId} />
                            </div>
                            <div className="col">
                                <input type="text" className='form-control' placeholder="메뉴명" id={set.textInputId} />
                            </div>
                            <div className="col">
                                <input type="number" className='form-control' placeholder="가격" id={set.textInputId} />
                            </div>
                            <div className="col">
                                <button type='button' onClick={() => removeSet(set.id)}>x</button>
                            </div>
                        </div>
                    ))}
                </div>

                page4
                // 예약 가능시간 및 테이블 등록
                <div className="container mt-2">
                    <button>테이블 추가</button>
                </div>

                    
                    <div className='container mt-4'>
                        <button type='submit' className='btn btn-primary'>등록</button>
                    </div>
            </form>
        </div>
    );
};
