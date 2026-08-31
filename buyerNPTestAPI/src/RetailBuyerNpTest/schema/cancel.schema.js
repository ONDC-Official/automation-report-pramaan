module.exports = {
    "type": "object",
    "properties": {
        "order_id": {
            "type": "string",
            "minLength": 1,
            "maxLength": 32
        },
        "cancellation_reason_id": {
            "type": "string",
            "minLength": 1,
            "enum": ["051", "052", "053","999"],
            "errorMessage": "cancellation_reason_id must be one of the codes a buyer (BNP) is permitted to use: 051 (Store is not accepting order), 052 (Order/fulfillment not received as per O2D TAT), 053 (Buyer wants to modify address/other order details)"
        }
    }
}