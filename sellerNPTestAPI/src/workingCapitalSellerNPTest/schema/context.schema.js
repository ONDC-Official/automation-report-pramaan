module.exports = {
    "type": "object",
    "search": {
        "properties": {
            "domain": { "id": "wc_bpp_context_01", "type": "string", "minLength": 1, "enum": ["ONDC:FIS12"] },
            "action": { "id": "wc_bpp_context_02", "type": "string", "const": "action" },
            "location": {
                "type": "object",
                "properties": {
                    "country": {
                        "type": "object",
                        "properties": { "id": "wc_bpp_context_03", "type": "string", "pattern": "^[A-Z]{3}$", "minLength": 1, "errorMessage": "Country must be in ISO 3166-1 format (three-letter country code)" },
                        "required": ["code"]
                    },
                    "city": {
                        "type": "object",
                        "properties": { "id": "wc_bpp_context_04", "type": "string", "minLength": 1, "not": { "pattern": "\\*" }, "errorMessage": "City Code can't be * for on_search request" },
                        "required": ["code"]
                    }
                },
                "required": ["country", "city"]
            },
            "version": { "id": "wc_bpp_context_05", "type": "string", "const": "version" },
            "bpp_id": { "id": "wc_bpp_context_06", "type": "string", "minLength": 1 },
            "bpp_uri": { "id": "wc_bpp_context_07", "type": "string", "minLength": 1, "format": "url" },
            "transaction_id": { "id": "wc_bpp_context_08", "type": "string", "minLength": 1 },
            "message_id": { "id": "wc_bpp_context_09", "type": "string", "minLength": 1 },
            "timestamp": { "id": "wc_bpp_context_10", "type": "string", "format": "rfc3339-date-time", "errorMessage": "Time must be RFC3339 UTC timestamp format." },
            "ttl": { "id": "wc_bpp_context_11", "type": "string", "format": "duration", "errorMessage": "Duration must be RFC3339 duration." }
        },
        "required": [
            "domain", "location", "action", "version",
            "bpp_id", "bpp_uri", "transaction_id",
            "message_id", "timestamp"
        ]
    },
    "others": {
        "properties": {
            "domain": { "id": "wc_bpp_context_12", "type": "string", "minLength": 1, "enum": ["ONDC:FIS12"] },
            "action": { "id": "wc_bpp_context_13", "type": "string", "const": "action" },
            "location": {
                "type": "object",
                "properties": {
                    "country": {
                        "type": "object",
                        "properties": { "id": "wc_bpp_context_14", "type": "string", "pattern": "^[A-Z]{3}$", "minLength": 1, "errorMessage": "Country must be in ISO 3166-1 format (three-letter country code)" },
                        "required": ["code"]
                    },
                    "city": {
                        "type": "object",
                        "properties": { "id": "wc_bpp_context_15", "type": "string", "minLength": 1, "not": { "pattern": "\\*" }, "errorMessage": "City Code can't be * for on_search request" },
                        "required": ["code"]
                    }
                },
                "required": ["country", "city"]
            },
           "version": { "id": "wc_bpp_context_16", "type": "string", "const": "version" },
            "bpp_id": { "id": "wc_bpp_context_17", "type": "string", "minLength": 1 },
            "bpp_uri": { "id": "wc_bpp_context_18", "type": "string", "minLength": 1, "format": "url" },
            "bpp_id": { "id": "wc_bpp_context_19", "type": "string" },
            "bpp_uri": { "id": "wc_bpp_context_20", "type": "string", "format": "url" },
            "transaction_id": { "id": "wc_bpp_context_21", "type": "string", "minLength": 1 },
            "message_id": { "id": "wc_bpp_context_22", "type": "string", "minLength": 1 },
            "timestamp": { "id": "wc_bpp_context_23", "type": "string", "format": "rfc3339-date-time", "errorMessage": "Time must be RFC3339 UTC timestamp format." },
            "ttl": { "id": "wc_bpp_context_24", "type": "string", "format": "duration", "errorMessage": "Duration must be RFC3339 duration." }
        },
        "required": [
            "domain", "location", "action", "version",
            "bpp_id", "bpp_uri", "bpp_id", "bpp_uri", "transaction_id",
            "message_id", "timestamp"
        ]
    }
}

// module.exports = {
//     "type": "object",
//     "properties": {
//         "domain": { "id": "wc_log_bpp_context_01", "type": "string", "minLength": 1, "enum": ["ONDC:FIS12"] },
//         "action": { "id": "wc_log_bpp_context_02", "type": "string", "const": "action" },
//         "country": { "id": "wc_log_bpp_context_03", "type": "string", "pattern": "^[A-Z]{3}$", "minLength": 1, "errorMessage": "Country must be in ISO 3166-1 format (three-letter country code)" },
//         "city": { "id": "wc_log_bpp_context_04", "type": "string", "minLength": 1, "not": { "pattern": "\\*" }, "errorMessage": "City Code can't be * for on_search request" },
//         "core_version": { "id": "wc_log_bpp_context_05", "type": "string", "const": "core_version" },
//         "bap_id": { "id": "wc_log_bpp_context_06", "type": "string", "minLength": 1 },
//         "bap_uri": { "id": "wc_log_bpp_context_07", "type": "string", "minLength": 1, "format": "url" },
//         "bpp_id": { "id": "wc_log_bpp_context_08", "type": "string" },
//         "bpp_uri": { "id": "wc_log_bpp_context_09", "type": "string", "format": "url" },
//         "transaction_id": { "id": "wc_log_bpp_context_10", "type": "string", "minLength": 1 },
//         "message_id": { "id": "wc_log_bpp_context_11", "type": "string", "minLength": 1 },
//         "timestamp": { "id": "wc_log_bpp_context_12", "type": "string", "format": "rfc3339-date-time", "errorMessage": "Time must be RFC3339 UTC timestamp format." },
//         "ttl": { "id": "wc_log_bpp_context_13", "type": "string", "format": "duration", "errorMessage": "Duration must be RFC3339 duration." }
//     },
//     "required": [
//         "domain", "country", "city", "action", "core_version",
//         "bap_id", "bap_uri", "bpp_id", "bpp_uri", "transaction_id",
//         "message_id", "timestamp"
//     ]
// }

