// @ts-expect-error: Temp
const cc = DataStudioApp.createCommunityConnector();

const isAdminUser = () => false;

const getConfig = (request: any) => {
    const config = cc.getConfig();

    config
        .newInfo()
        .setId('generalInfo')
        .setText(
            'This is the template connector created by https://github.com/googledatastudio/dscc-gen',
        );

    config
        .newSelectSingle()
        .setId('units')
        .setName('Units')
        .setHelpText('Metric or Imperial Units')
        .setAllowOverride(true)
        .addOption(
            config
                .newOptionBuilder()
                .setLabel('Metric')
                .setValue('metric'),
        )
        .addOption(
            config
                .newOptionBuilder()
                .setLabel('Imperial')
                .setValue('imperial'),
        );

    config.setDateRangeRequired(true);

    return config.build();
};

const getFields = () => {
    const fields = cc.getFields();
    const types = cc.FieldType;
    const aggregations = cc.AggregationType;

    fields
        .newDimension()
        .setId('id')
        .setName('Id')
        .setType(types.TEXT);

    fields
        .newMetric()
        .setId('distance')
        .setName('Distance')
        .setType(types.NUMBER)
        .setAggregation(aggregations.SUM);

    return fields;
};

const getSchema = (request: any) => ({ schema: getFields().build() });

const getData = (request: any) => {
    UrlFetchApp.fetch('https://google.com');

    const requestedFields = getFields().forIds(
        request.fields.map(function(field: any) {
            return field.name;
        }),
    );

    let unitMultiplier = 1;
    if (request.configParams.units === 'metric') {
        unitMultiplier = 1.60934;
    }

    const rows = [];
    for (let i = 0; i < 100; i++) {
        const row: any[] = [];
        requestedFields.asArray().forEach(function(field) {
            switch (field.getId()) {
                case 'id':
                    return row.push('id_' + i);
                case 'distance':
                    return row.push(i * unitMultiplier);
                default:
                    return row.push('');
            }
        });
        rows.push({ values: row });
    }

    return {
        schema: requestedFields.build(),
        rows: rows,
    };
};
