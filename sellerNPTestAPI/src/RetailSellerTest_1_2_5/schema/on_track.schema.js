module.exports = {
    "id": "retail_bpp_on_track_message_01",
      "type": "object",
      "properties": {
        "tracking": {
            "id": "retail_bpp_on_track_message_02",
          "type": "object",
          "properties": {
            "id": {
                "id": "retail_bpp_on_track_message_03",
              "type": "string",
              "minLength": 1
            },
            // "location": {
            //     "id": "retail_bpp_on_track_message_04",
            //   "type": "object",
            //   "properties": {
            //     "gps": {
            //         "id": "retail_bpp_on_track_message_05",
            //       "type": "string",
            //       "minLength": 1
            //     },
            //     "time": {
            //         "id": "retail_bpp_on_track_message_06",
            //       "type": "object",
            //       "properties": {
            //         "timestamp": {
            //             "id": "retail_bpp_on_track_message_07",
            //           "type": "string",
            //           "minLength": 1
            //         }
            //       }
            //     },
            //     "updated_at": {
            //         "id": "retail_bpp_on_track_message_08",
            //       "type": "string",
            //       "minLength": 1
            //     }
            //   }
            // },
            "url": {
                "id": "retail_bpp_on_track_message_09",
              "type": "string",
              "minLength": 1
            },
            "status": {
                "id": "retail_bpp_on_track_message_10",
              "type": "string",
              "minLength": 1
            },
            // "tags": {
            //     "id": "retail_bpp_on_track_message_11",
            //   "type": "array",
            //   "minItems": 1,
            //   "element": {
            //     "id": "retail_bpp_on_track_message_12",
            //     "type": "object",
            //     "properties": {
            //       "code": {
            //         "id": "retail_bpp_on_track_message_13",
            //         "type": "string",
            //         "minLength": 1
            //       },
            //       "list": {
            //         "id": "retail_bpp_on_track_message_14",
            //         "type": "array",
            //         "minItems": 1,
            //         "element": {
            //             "id": "retail_bpp_on_track_message_15",
            //           "type": "object",
            //           "properties": {
            //             "code": {
            //                 "id": "retail_bpp_on_track_message_16",
            //               "type": "string",
            //               "minLength": 1
            //             },
            //             "value": {
            //                 "id": "retail_bpp_on_track_message_17",
            //               "type": "string",
            //               "minLength": 1
            //             }
            //           }
            //         }
            //       }
            //     }
            //   }
            // }
          }
        }
      }
    }