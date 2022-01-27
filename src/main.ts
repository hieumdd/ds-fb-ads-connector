const cc = DataStudioApp.createCommunityConnector();

const isAdminUser = () => true;

const getConfig = (request: GetConfigRequest): GetConfigResponse => {
    const config = cc.getConfig();

    config
        .newTextInput()
        .setId('accountId')
        .setName('Facebook Ads Account ID')
        .setPlaceholder('00000000000');

    metrics.reduce(
        (acc, cur) =>
            acc.addOption(
                config
                    .newOptionBuilder()
                    .setLabel(cur)
                    .setValue(cur),
            ),
        config
            .newSelectMultiple()
            .setId('metrics')
            .setName('Metrics'),
    );

    config.setDateRangeRequired(true);

    return config.build();
};

const getFields = (dimensions: string[], metrics: string[]) => {
    const fields = cc.getFields();
    const types = cc.FieldType;
    const aggregations = cc.AggregationType;

    dimensions.forEach((key) =>
        fields
            .newDimension()
            .setId(key)
            .setName(key)
            .setType(types.TEXT),
    );

    metrics.forEach((key) =>
        fields
            .newMetric()
            .setId(key)
            .setName(key)
            .setType(types.NUMBER)
            .setAggregation(aggregations.SUM),
    );

    return fields;
};

const getSchema = (
    request: GetSchemaRequest<FacebookConfig>,
): GetSchemaResponse => {
    const {
        configParams: { metrics },
    } = request;

    return {
        schema: getFields(dimensions, metrics.split(',')).build(),
    };
};

const getData = (request: GetDataRequest<FacebookConfig>): GetDataResponse => {
    const {
        configParams: { accountId },
        dateRange: { startDate, endDate },
        fields,
    } = request;

    const requestedFields = getFields(
        dimensions,
        fields.map(({ name }) => name),
    ).forIds(
        request.fields.map((field) => {
            return field.name;
        }),
    );

    console.log(accountId, startDate, endDate, fields);
    console.log(JSON.stringify(requestedFields.build()));
    // UrlFetchApp.fetch('https://google.com');

    // const requestedFields = 0;

    // let unitMultiplier = 1;
    // if (request.configParams.units === 'metric') {
    //     unitMultiplier = 1.60934;
    // }

    // const rows = [];
    // for (let i = 0; i < 100; i++) {
    //     const row: any[] = [];
    //     requestedFields.asArray().forEach(function(field) {
    //         switch (field.getId()) {
    //             case 'id':
    //                 return row.push('id_' + i);
    //             case 'distance':
    //                 return row.push(i * unitMultiplier);
    //             default:
    //                 return row.push('');
    //         }
    //     });
    //     rows.push({ values: row });
    // }

    return {
        schema: requestedFields.build(),
        rows: [],
    };
};
