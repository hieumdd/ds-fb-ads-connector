// TODO - all of the `Object` types could probably be better specified in the
// future, but since that's what the builder's `.build()` return, this is the
// best we can do for now.

// getAuthType
type GetAuthTypeResponse = object;

// getSchema
interface GetSchemaRequest {
    configParams: ConfigParams;
}
interface GetSchemaResponse {
    schema: object[];
}

// getConfig
interface GetConfigRequest {
    languageCode: string;
}
type GetConfigResponse = object;

// getData
interface ConfigParams {
    [configId: string]: string;
}
interface GetDataRequest {
    configParams?: ConfigParams;
    scriptParams: {
        sampleExtraction: boolean;
        lastRefresh: string;
    };
    dateRange?: {
        startDate: string;
        endDate: string;
    };
    fields: Array<{
        name: string;
    }>;
}

type GetDataRowValue = string | number | boolean;
interface GetDataRow {
    values: Array<GetDataRowValue>;
}
type GetDataRows = Array<GetDataRow>;

interface GetDataResponse {
    schema: object[];
    rows: GetDataRows;
}

// setCredentials
interface UserPassCredentials {
    userPass: {
        username: string;
        password: string;
    };
}

interface UserTokenCredentials {
    userToken: {
        username: string;
        token: string;
    };
}

interface KeyCredentials {
    key: string;
}

type SetCredentialsRequest =
    | UserPassCredentials
    | UserTokenCredentials
    | KeyCredentials;

interface SetCredentialsResponse {
    errorCode: 'NONE' | 'INVALID_CREDENTIALS';
}
