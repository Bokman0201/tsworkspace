import axios from "axios"

export const helperGetImage = async (clientEmail: string | null) => {
    try {
        if (clientEmail === null) {
            // handle null case if needed
            return null;
        }

        const response = await axios.get<Blob>(`http://localhost:8080/attach/clientImg/${clientEmail}`, {  responseType: 'blob' });

        if (response.status === 200) {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();

                reader.onload = (ev) => {
                    const previewImage = String(ev.target?.result);
                    console.log(previewImage);
                    resolve(previewImage);
                };

                reader.readAsDataURL(new File([response.data], 'imageName'));
            });
        }

    } catch (error) {
        console.error('Error fetching image:', error);
        // handle error if needed
    }
};
