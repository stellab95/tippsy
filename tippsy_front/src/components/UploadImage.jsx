import { useRef, useState } from "react";
import imageIcon from '../assets/icons/image-icon.svg'
import cameraIcon from '../assets/icons/camera-icon.svg'
import microphoneIcon from '../assets/icons/microphone-icon.svg'
import linkIcon from '../assets/icons/link-icon.svg'

import '../styles/UploadImage.css'


function UploadImage({ setImage }) {
    const [preview, setPreview] = useState(null)

    const fileInputRef = useRef(null)

    const handleUploadClick = () => {
        fileInputRef.current.click()
    }
    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setPreview(URL.createObjectURL(file))

        const formData = new FormData()
        formData.append('image', file)

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
            })
            const responseText = await response.text()
            console.log('Réponse brute du serveur :', responseText);

            const data = JSON.parse(responseText);
            
            // Récupère le nom du fichier uploadé et mets à jour le state image
            setImage(data.file.filename)

        } catch (err) {
            console.log('Erreur lors de l\'envoi du fichier :', err);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    return (
        <>
            <div className="all-buttons">
                <div className="image-button">
                    <button className="upload-image" type="button" onClick={handleUploadClick}><img src={imageIcon} alt='image-icon' className="image-icon" />Image</button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
                <div className="video-button">
                    <button className="upload-image" onKeyDown={handleKeyDown}><img src={cameraIcon} alt='camera-icon' className="camera-icon" />Vidéo</button>
                </div>
                <div className="microphone-icon-button">
                    <button className="upload-image"><img src={microphoneIcon} alt='microphone-icon' className="microphone-icon" />Audio</button>
                </div>
                <div className="link-icon-button">
                    <button className="upload-image"><img src={linkIcon} alt='link-icon' className="link-icon" />Lien</button>
                </div>
            </div>
            <div className="preview">
                {preview && <img src={preview} alt="Aperçu" />}
            </div>
        </>
    )
}

export default UploadImage