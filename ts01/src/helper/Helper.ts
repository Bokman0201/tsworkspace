import axios from "axios"


export const helperGetImage = async (clientEmail: string | null): Promise<string | null> => {
    try {
        if (clientEmail === null) {
            // handle null case if needed
            return null;
        }

        const response = await axios.get(`http://localhost:8080/attach/clientImg/${clientEmail}`, {
            responseType: 'arraybuffer',
        });

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'image/png' }); // 'image/png'는 받아오는 이미지 타입에 따라 수정
            const imageUrl = URL.createObjectURL(blob);
            console.log(imageUrl)
            return imageUrl;
        }

        return null;
    } catch (error) {
        console.error('Error fetching image:', error);
        // handle error if needed
        return null;
    }
};