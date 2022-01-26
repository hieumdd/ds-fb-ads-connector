const SERVICE_NAME = 'fb-ads-connector';
const API_VER = 'v12.0';
const AUTHORIZATION_BASE_URL = `https://www.facebook.com/${API_VER}/dialog/oauth`;
const TOKEN_URL = `https://graph.facebook.com/${API_VER}/oauth/access_token`;

const getAuthType = () =>
    cc
        .newAuthTypeResponse()
        .setAuthType(cc.AuthType.OAUTH2)
        .build();

const get3PAuthorizationUrls = () => getOAuthService().getAuthorizationUrl();

const authCallback = (request: object) =>
    getOAuthService().handleCallback(request)
        ? HtmlService.createHtmlOutput(getOAuthService().getAccessToken())
        : HtmlService.createHtmlOutput('Denied. You can close this tab');

const isAuthValid = () => getOAuthService().hasAccess();

const getOAuthService = () => {
    const scriptProps = PropertiesService.getScriptProperties();

    return OAuth2.createService(SERVICE_NAME)
        .setAuthorizationBaseUrl(AUTHORIZATION_BASE_URL)
        .setTokenUrl(TOKEN_URL)
        .setClientId(scriptProps.getProperty('CLIENT_ID'))
        .setClientSecret(scriptProps.getProperty('CLIENT_SECRET'))
        .setPropertyStore(PropertiesService.getUserProperties())
        .setCallbackFunction('authCallback');
};

function resetAuth() {
    getOAuthService().reset();
}

const logout = () => getOAuthService().reset();
