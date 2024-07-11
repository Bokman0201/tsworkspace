import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import FocusLock from 'react-focus-lock';
import './PostCodeModal.css';
import DaumPostcode from 'react-daum-postcode';
import { PostModalState } from '../../recoil/ModalStore';

export const PostCodeModal = ({setResInfo, resInfo}) => {
    const [modalState, setModalState] = useRecoilState(PostModalState);

    const handleComplete = (data) => {
        setResInfo(prevInfo => ({
            ...prevInfo,
            resRegion: data.sido,
            resPost: data.zonecode,
            resAddr1: data.address,
        }));
        setModalState(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setModalState(false);
        }
    };

    useEffect(() => {
        if (modalState) {
            window.addEventListener('keydown', handleKeyDown);
        } else {
            window.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [modalState]);

    return (
        <div className={`post-modal ${modalState ? 'active' : ''}`}>
                    <div className='post-modal-body'>
                        <DaumPostcode onComplete={handleComplete} />
                    </div>
        </div>
    );
};
