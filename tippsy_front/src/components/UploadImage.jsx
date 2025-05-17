import { useRef, useState, useEffect } from "react";
import imageIcon from '../assets/icons/image-icon.svg'
import cameraIcon from '../assets/icons/camera-icon.svg'
import microphoneIcon from '../assets/icons/microphone-icon.svg'
import linkIcon from '../assets/icons/link-icon.svg'

import '../styles/UploadImage.css'


function UploadImage({ setImage, initialImage }) {
    const [preview, setPreview] = useState(initialImage ? `http://localhost:3000/uploads/${initialImage}` : null)

useEffect(() => {
    if (initialImage) {
        setPreview(`http://localhost:3000/uploads/${initialImage}`)
    }
}, [initialImage])

    const fileInputRef = useRef(null)

    const handleUploadClick = () => {
        fileInputRef.current.click()
    }
    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (file){
            setImage(file.name)
            setPreview(URL.createObjectURL(file))
        }


        const formData = new FormData()
        formData.append('image', file)

        try {
            const uploadResponse = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
            })
            const uploadData = await uploadResponse.json()
            console.log('Réponse brute du serveur :', uploadData);

            const imageFilename = uploadData.file.filename;

            // Récupère le nom du fichier uploadé et mets à jour le state image
            console.log("Nom du fichier reçu :", uploadData.file.filename)
            setImage(imageFilename)

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