import React, { useState } from 'react';
import axios from 'axios';

function WordCloudComponent({ textData }) {
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWordCloud = async () => {
        setIsLoading(true);
        setError('');
        const formData = new FormData();
        formData.append('text', textData);  // textData는 props로 받은 데이터를 사용

        try {
            const response = await axios({
                method: 'post',
                url: '/generate-wordcloud',
                data: formData,
                responseType: 'blob'
            });
            setImageUrl(URL.createObjectURL(response.data));
        } catch (err) {
            setError('Failed to generate word cloud');
            console.error('Error generating word cloud:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchWordCloud} disabled={!textData || isLoading}>
                {isLoading ? 'Generating...' : 'Generate WordCloud'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {imageUrl && <img src={imageUrl} alt="Word Cloud" />}
        </div>
    );
}

export default WordCloudComponent;
