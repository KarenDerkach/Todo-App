import {sign} from 'jsonwebtoken'

const generateToken = ( _id ) => {

    return new Promise( (resolve, reject) => {

        const payload = { _id };

        sign( payload, process.env.JWT_SECRET, {
            expiresIn: 86400 //24hr
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );

        })


    })
}

export default generateToken;