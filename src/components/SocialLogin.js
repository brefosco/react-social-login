import React, { useState } from 'react'
import { Card, CardTitle, CardText } from 'reactstrap'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'


export default function SocialLogin() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [email, setEmail] = useState();

    const responseGoogle = response => {
        setName(response.profileObj.name);
        setImgUrl(response.profileObj.imageUrl);
        setEmail(response.profileObj.email);
        setLoggedIn(true)
    }

    const componentClicked = () => {
        console.log('clicked')
    }
    const responseFacebook = response => {
        setName(response.name)
        setEmail(response.email)
        setImgUrl(response.picture.data.url)
        setLoggedIn(true)
    }

    const loginButtons = (
        <>
            <div style={{ margin: '20px' }}>
                <GoogleLogin
                    clientId="{process.env.googleClientID}"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
            <div style={{ margin: '20px' }}>
                <FacebookLogin
                    appId="{process.env.facebookClientID}"
                    autoload={true}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook}
                />
            </div>
        </>
    )

    const profileContent = (
        <Card style={{ backgroundColor: '#f4f4f4', }}>
            <img style={{ width: '50px', height: '50px', borderRadius: '3px' }} src={imgUrl} alt={name} />
            <CardTitle><p className="h5">Welcome, {name}</p></CardTitle>
            <CardText>Email: {email}</CardText>
        </Card>
    )

    return (
        <div className="text-center" style={{ margin: '20px' }}>
            {loggedIn ? profileContent : loginButtons}
        </div>
    )
}
