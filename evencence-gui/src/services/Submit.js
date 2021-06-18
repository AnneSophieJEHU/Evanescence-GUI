import { withRouter } from 'react-router-dom'

class Submit {

    handleLoginSubmit(values, actions) {
    //https://stackoverflow.com/questions/13391579/how-to-rename-json-key
    //https://www.oauth.com/oauth2-servers/access-tokens/password-grant/
    setTimeout(()=> console.log(JSON.stringify(values)), 1000)
    const oauthURL = 'http://192.168.1.82:8787/evanescence/oauth/token'
    const initRequest = {
        method: 'POST',
        body: 'grant_type=password&username=' + values.email +
         '&password=' + values.password + '&client_id=evanescence-client-id',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
    }
    fetch(oauthURL, initRequest)
    .then(resp => resp.json())
    .then(resp=>{
        console.log(resp)
        if(resp.user_id){
            localStorage.setItem('token', resp.access_token)
            this.props.history.push('/')
        }else{
            actions.setSubmitting(false)
            actions.resetForm()
        }
        
    })
    .catch(err => console.log("Error :", err))
  
}
}

export default withRouter(Submit) 
