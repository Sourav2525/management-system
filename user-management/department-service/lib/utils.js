const { validate } = require("uuid");
const csv = require("csvtojson");

const csv_to_json = async (csv_file) => {
    // eslint-disable-next-line snakecasejs/snakecasejs
    const data = await csv().fromString(csv_file);
    return data;
};

async function is_valid_uuid(id) {
    return validate(id);
}

function is_valid_date(date_string) {
    return (date_string && new Date(date_string).toString() !== "Invalid Date") || false;
}

function find_paginated(page, limit) {
    page = Math.abs(parseInt(page)) || 1;
    limit = Math.abs(parseInt(limit)) || 10;

    limit = limit > 50 ? 50 : limit;
    page = page >= 1 ? page - 1 : 0;

    const offset = page * limit;

    return { limit, offset, page };
}

module.exports = {
    is_valid_uuid,
    is_valid_date,
    find_paginated,
    csv_to_json
};
