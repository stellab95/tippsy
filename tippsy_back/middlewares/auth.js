import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    console.log('Requête entrante avec Authorization:', authHeader);

    if (!token) {
        return res.status(401).json({ message: 'Token manquant' })
    }

    try {
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        console.log('Token décodé avec succès :', decoded);
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Token invalide' })
    }
}

export default verifyToken