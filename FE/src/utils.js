export const navigateToAuthLogin = async () => {
    // const verifier = generateCodeVerifier();
    // sessionStorage.setItem("code_verifier", verifier);
    // const challenge = await generateCodeChallenge(verifier);

    // const tenant = "1a86bb32-c02c-481b-8b67-05f7382f6446";
    // const client_id = '2da02e8f-f4ce-495f-91af-ced405441604'

    // // const tenant = "e6926eae-1a10-43a5-a0c5-8f9822100d49"
    // // const client_id = "bb1cd99d-0f03-4cd4-881a-166cee0188a2"

    // const authParams = new URLSearchParams({
    //   response_type: 'code',
    //   client_id,
    //   state: '12345',
    //   redirect_uri: 'http://localhost:3000/redirect',
    //   // code_challenge: challenge,
    //   // code_challenge_method: 'S256',
    //   scope: 'https://graph.microsoft.com/.default', // Your scopes
    //   response_mode: 'fragment',
  
    //   // scope: 'openid',
    //   // scope: 'openid profile email offline_access api://20c1b138-58f0-464b-981d-1211c852c70b/.default',
    //   // scope: 'openid profile email offline_access api://2da02e8f-f4ce-495f-91af-ced405441604',
    //   // prompt: 'login',
    //   // response_mode: 'fragment',
    // });
 
    // // debugger
    
    // const authUrl = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize?${authParams.toString()}`;

    // window.location.href = authUrl;
    // debugger
    // window.location.href = 'https://bj4458i08a.execute-api.ap-southeast-1.amazonaws.com/test-http-stage/auth-redirect?callbackurl=http://localhost:3000/redirect';
    // window.location.href = '/test-rest-stage/auth/login?callbackurl=http://localhost:80/auth/redirected&abcdef=98765'
    // window.location.href = '/test-rest-stage/localDev/login?'
    window.location.href = backendUrl + '/auth/login?callbackurl=https://test-cookies-5wyhahwd9-mukunthans-projects-440be863.vercel.app/auth/redirected'
    // window.location.href = backendUrl + '/auth/login'

  };
  

export const backendUrl =
 "https://test.api.arc.genexis.gov.sg" // "https://x8a1kt6ini.execute-api.ap-southeast-1.amazonaws.com/dev"; // "https://bj4458i08a.execute-api.ap-southeast-1.amazonaws.com/test-http-stage" //"https://39y018bqwb.execute-api.ap-southeast-1.amazonaws.com/test" // "https://y9p3kmub24.execute-api.ap-southeast-1.amazonaws.com/test3"  // "https://bj4458i08a.execute-api.ap-southeast-1.amazonaws.com/test-http-stage" //"http://localhost:8000";

// Utility function to get tokens from local storage
export const getToken = (key) => localStorage.getItem(key);

// Utility function to set tokens in local storage
export const setToken = (key, value) => localStorage.setItem(key, value);

// Utility function to remove tokens from local storage
export const removeToken = (key) => localStorage.removeItem(key);





// https://login.microsoftonline.com/1a86bb32-c02c-481b-8b67-05f7382f6446/oauth2/v2.0/authorize?client_id=2da02e8f-f4ce-495f-91af-ced405441604&response_type=code&redirect_uri=[replace_with_1_of_redirect_uri_entries]&scope=openid%20profile%20email%20offline_access&code_challenge=[replace_with_code_challenge]&code_challenge_method=S256&state=[replace_with_random_value_generated_from_your_frontend]&prompt=


