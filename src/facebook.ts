const API_VER = 'v12.0';
const AUTHORIZATION_BASE_URL = `https://www.facebook.com/${API_VER}/dialog/oauth`;
// const GRAPH_BASE_URL = 'https://graph.facebook.com/';
const TOKEN_URL = `https://graph.facebook.com/${API_VER}/oauth/access_token`;

type FacebookConfig = {
    accountId: string;
    metrics: string;
};

const dimensions = [
    'campaign_id',
    'adset_id',
    'ad_id',
    'campaign_name',
    'adset_name',
    'ad_name',
];

const metrics = ['clicks', 'spend', 'impressions', 'actions'];
