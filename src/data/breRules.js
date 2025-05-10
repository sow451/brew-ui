
const breRules =
 {
  "policyDto": {
    "brePolicyId": "af4aac28-394f-4ab8-8c13-bf8fb200f55a",
    "brePolicyName": "KSF AXIS INCOME RUNNING DSCR - v1",
    "activationDate": 1742812176165,
    "assetClass": "HOME",
    "orignatorId": null,
    "orignatorProductId": null,
    "lenderId": null,
    "lenderProductId": null,
    "currentVersion": "2",
    "createdAt": 1742811143493,
    "createdBy": "Shainki Bansal",
    "updatedAt": 1742812176015,
    "updatedBy": "Shainki Bansal",
    "policyStatusType": "ACTIVE",
    "isPolicyDeleted": false
  },
  "ruleUnitDtoList": [
    {
      "ruleId": "06318741f72d1ecf05f2c855",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "9691e38baaf7df3332396198",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.atnwDrop GREATER_THAN_OR_EQUAL_TO -40 )",
      "ruleCheckpointParameter": "Drop in ATNW",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.atnwDrop",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "-40",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "GREATER_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143576,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143576,
      "ruleMetadata": {
        "ruleDescription": "Drop in ATNW should be more than -20%, with deviation -40% allowed",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.atnwDrop",
            "displayName": "Drop in ATNW"
          }
        ]
      }
    },
    {
      "ruleId": "08eabff6a1f1f23a4b275c16",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "2abdc3f46e2d61f4b8c3b2e3",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "debtEquityDeviation",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "path": "borrower.underwritingParameters.debtEquityRatio",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Debt-Equity ratio",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143673,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143673,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L2, Pass"
          }
        ]
      }
    },
    {
      "ruleId": "121c8ec30cdd708b779b349a",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "f62968472d527322e930d71d",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "negativeWilfullDefaulter",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "label": "negativeWilfullDefaulter",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "PEP Check/Negative Willful Defaulter Check/Negative Google Check etc.",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143693,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143693,
      "ruleMetadata": {
        "ruleDescription": "No deviation allowed",
        "failureDescription": "Devation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6, fail"
          }
        ]
      }
    },
    {
      "ruleId": "13fc45c816c7a80fd36e4169",
      "ruleTemplateGroupCategory": "Loan details",
      "ruleTemplateId": "980a9bdae0b3a6001bbc4be6",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( ( terms.tenure.duration GREATER_THAN_OR_EQUAL_TO 12 ) AND ( terms.tenure.duration LESS_THAN_OR_EQUAL_TO 36 ) )",
      "ruleCheckpointParameter": "Loan Tenure",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "CONDITION",
            "value": null,
            "operandDefinition": [
              {
                "operandType": "VARIABLE",
                "value": "terms.tenure.duration",
                "operandDefinition": null,
                "operation": null
              },
              {
                "operandType": "CONSTANT",
                "value": "12",
                "operandDefinition": null,
                "operation": null
              }
            ],
            "operation": {
              "operatorType": "ARITHMATIC",
              "operatorValue": "GREATER_THAN_OR_EQUAL_TO"
            }
          },
          {
            "operandType": "CONDITION",
            "value": null,
            "operandDefinition": [
              {
                "operandType": "VARIABLE",
                "value": "terms.tenure.duration",
                "operandDefinition": null,
                "operation": null
              },
              {
                "operandType": "CONSTANT",
                "value": "36",
                "operandDefinition": null,
                "operation": null
              }
            ],
            "operation": {
              "operatorType": "ARITHMATIC",
              "operatorValue": "LESS_THAN_OR_EQUAL_TO"
            }
          }
        ],
        "operation": {
          "operatorType": "CONNECTOR",
          "operatorValue": "AND"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143717,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143717,
      "ruleMetadata": {
        "ruleDescription": "Min allowable loan tenure is 12 months and max is 36 months",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "terms.tenure.duration",
            "displayName": "Loan Tenure"
          }
        ]
      }
    },
    {
      "ruleId": "14dba822b8ce3d1bb8408eb3",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "495494f837d7aac41f16a9c4",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.cashProfitDrop GREATER_THAN_OR_EQUAL_TO -40 )",
      "ruleCheckpointParameter": "Drop in Cash profit",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.cashProfitDrop",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "-40",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "GREATER_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143733,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143733,
      "ruleMetadata": {
        "ruleDescription": "Drop in Cash profit should be more than -20%, with deviation -40% allowed",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.cashProfitDrop",
            "displayName": "Drop in Cash profit"
          }
        ]
      }
    },
    {
      "ruleId": "195dbe048c82c648da8d9392",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "e642e377fe452250559cc126",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.creditorDays LESS_THAN_OR_EQUAL_TO 150 )",
      "ruleCheckpointParameter": "Creditor days",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.creditorDays",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "150",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143749,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143749,
      "ruleMetadata": {
        "ruleDescription": "Creditor days shall not be more than 90 days, with deviation 150 days",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.creditorDays",
            "displayName": "Creditor days"
          }
        ]
      }
    },
    {
      "ruleId": "1c6b42df0cc2d9744da7a19c",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "90271f7b122de88ffe867804",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( borrower.underwritingParameters.bouncesLast6m LESS_THAN_OR_EQUAL_TO 5 )",
      "ruleCheckpointParameter": "EMI Bounces in L6M",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "borrower.underwritingParameters.bouncesLast6m",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "5",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143769,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143769,
      "ruleMetadata": {
        "ruleDescription": "EMI bounces to be not >5 in L6M due to insufficient funds",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "borrower.underwritingParameters.bouncesLast6m",
            "displayName": "EMI Bounces in Last 6 months"
          }
        ]
      }
    },
    {
      "ruleId": "1d47ec83735f5db6d5b27f78",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "110bf585aa4b87c80f59067b",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "negAtnw",
        "allowedList": "L1,L2,L3,L4"
      },
      "applicantMetaData": [
        {
          "path": "loanAppUnderwritingParameters.atnw",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Negative Net worth (ATNW)",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143789,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143789,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L4 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L4 -Then  Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "1df36e3943dfe1f7694095f0",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "1cf21bb9cfa2f8ba183d4c21",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "pylossCyPositive",
        "allowedList": "L1,L2,L3"
      },
      "applicantMetaData": [
        {
          "path": "borrower.underwritingParameters.pyFinCashLossCyPos",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "PY Financials showing Cash Loss, but current year Positive",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143801,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143801,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L3 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If L1 - L3 then Pass, else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "35833eb06bd3219ad5deffa4",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "185cccdf22cae5b67f7dfd88",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.debtorStockDays LESS_THAN_OR_EQUAL_TO 200 )",
      "ruleCheckpointParameter": "Debtors + Stock Days",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.debtorStockDays",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "200",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143823,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143823,
      "ruleMetadata": {
        "ruleDescription": "Debtors + Stock days shall not be more than 150 days, with Deviation 200 days",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.debtorStockDays",
            "displayName": "Debtors + Stock Days"
          }
        ]
      }
    },
    {
      "ruleId": "36785c510eebf7dc0b1a46e7",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "833d09fba34b274ff6365746",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "pdWaiverTakenDeviation",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "label": "pdWaiverTakenDeviation",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Personal discussion waiver",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143845,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143845,
      "ruleMetadata": {
        "ruleDescription": "No deviation allowed",
        "failureDescription": "Devation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6, fail"
          }
        ]
      }
    },
    {
      "ruleId": "3eee60be1c7cc800e93f1084",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "606559f7dae6c52a6775e0fa",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( ( borrower.companyFinancials.annualBusinessTurnover GREATER_THAN_OR_EQUAL_TO 5000000 ) AND ( borrower.companyFinancials.annualBusinessTurnover LESS_THAN_OR_EQUAL_TO 2500000000 ) )",
      "ruleCheckpointParameter": "Turnover",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "CONDITION",
            "value": null,
            "operandDefinition": [
              {
                "operandType": "VARIABLE",
                "value": "borrower.companyFinancials.annualBusinessTurnover",
                "operandDefinition": null,
                "operation": null
              },
              {
                "operandType": "CONSTANT",
                "value": "5000000",
                "operandDefinition": null,
                "operation": null
              }
            ],
            "operation": {
              "operatorType": "ARITHMATIC",
              "operatorValue": "GREATER_THAN_OR_EQUAL_TO"
            }
          },
          {
            "operandType": "CONDITION",
            "value": null,
            "operandDefinition": [
              {
                "operandType": "VARIABLE",
                "value": "borrower.companyFinancials.annualBusinessTurnover",
                "operandDefinition": null,
                "operation": null
              },
              {
                "operandType": "CONSTANT",
                "value": "2500000000",
                "operandDefinition": null,
                "operation": null
              }
            ],
            "operation": {
              "operatorType": "ARITHMATIC",
              "operatorValue": "LESS_THAN_OR_EQUAL_TO"
            }
          }
        ],
        "operation": {
          "operatorType": "CONNECTOR",
          "operatorValue": "AND"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143858,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143858,
      "ruleMetadata": {
        "ruleDescription": "Min allowed GST turnover should be 50 L and max is 250 Cr",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "borrower.companyFinancials.annualBusinessTurnover",
            "displayName": "GST Turnover"
          }
        ]
      }
    },
    {
      "ruleId": "465491df188932d5d23d624c",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "3558a32c1b16ec17f40d9d73",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "negWorkingCapitalCycle",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "path": "borrower.underwritingParameters.negWorkCapCycle",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Negative Working capital cycle as per last audited financials",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143872,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143872,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If L1 - L2 then Pass, else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "4779e221e7265642b6e5996c",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "02b62acb1ad653a86dadb235",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "gstToGrowthDeviation",
        "allowedList": "L1"
      },
      "applicantMetaData": [
        {
          "path": "loanAppUnderwritingParameters.gstGrowthL12MP12M",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "GST TO growth in L12M over P12M",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143887,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143887,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L1 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1, Pass"
          }
        ]
      }
    },
    {
      "ruleId": "496ab3843de04396362c6e8f",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "4817f993803ea732269223cc",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.posToHighCredit LESS_THAN_OR_EQUAL_TO 75 )",
      "ruleCheckpointParameter": "POS to high credit of entity/ prop",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.posToHighCredit",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "75",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143899,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143899,
      "ruleMetadata": {
        "ruleDescription": "POS to high credit of entity/ prop ratio to be less than 75%",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.posToHighCredit",
            "displayName": "POS to high credit of entity/ prop"
          }
        ]
      }
    },
    {
      "ruleId": "49c2e6fa88bd1f23369abef6",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "964242828878665e59f58309",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.inwardReturn LESS_THAN_OR_EQUAL_TO 4 )",
      "ruleCheckpointParameter": "Inward cheque return",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.inwardReturn",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "4",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143922,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143922,
      "ruleMetadata": {
        "ruleDescription": "Not more than 3% of the cheques issued in value. With deviation, 4% is allowed",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.inwardReturn",
            "displayName": "Inward cheque return"
          }
        ]
      }
    },
    {
      "ruleId": "57070f293289ddf6d1176976",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "4efc94189e4de1d70f06c0f4",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "negDowngradedRating",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "label": "negDowngradedRating",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Negative rating/ downgraded rating",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143948,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143948,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L2 -Then  Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "57766fe232fa784286cb912f",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "e897cac926ebe8ad6a5d1189",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.gstGrowthL12MP12M GREATER_THAN_OR_EQUAL_TO -25 )",
      "ruleCheckpointParameter": "GST TO growth in L12M over P12M",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.gstGrowthL12MP12M",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "-25",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "GREATER_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143976,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143976,
      "ruleMetadata": {
        "ruleDescription": "GST TO growth in L12M over P12M should be more than 25%, with deviation -25% is allowed",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.gstGrowthL12MP12M",
            "displayName": "GST TO growth in L12M over P12M"
          }
        ]
      }
    },
    {
      "ruleId": "58e20f1b32a85662f854f7f0",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "334c296e8d62e27d62dacd7a",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "industryDeviation",
        "allowedList": "L1,L2,L3,L4,L5"
      },
      "applicantMetaData": [
        {
          "label": "Sanctioned Amount",
          "path": "terms.sanctionedAmount",
          "resolutionType": "DIRECT"
        },
        {
          "label": "Industry Sector",
          "path": "borrower.business.industrySector",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Funding to Restricted Industries",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811143984,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811143984,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L5 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L5 -Then  Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "632f004ec6b77e74e16e551a",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "b5132dc00a3ed4a7cccc04fc",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "premiseBeyondLimit",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "label": "premiseBeyondLimit",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Residence OR/AND office outside Geo-Limit (Collection Concurrence)",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144004,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144004,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L2, Pass ELSE Fail"
          }
        ]
      }
    },
    {
      "ruleId": "666d2b3648912412db0de389",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "e5c831469665f7e33b1e99a5",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.groupExposure LESS_THAN_OR_EQUAL_TO 5000000 )",
      "ruleCheckpointParameter": "Group Exposure",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.groupExposure",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "5000000",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144021,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144021,
      "ruleMetadata": {
        "ruleDescription": "Group Exposure should be less than 50 Lakh",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.groupExposure",
            "displayName": "Group Exposure"
          }
        ]
      }
    },
    {
      "ruleId": "674d901307a1e06f05c7512d",
      "ruleTemplateGroupCategory": "Bureau details",
      "ruleTemplateId": "64ee1aa71452ed109f4eda830",
      "ruleType": "CUSTOM",
      "policyType": 0,
      "ruleConfig": {
        "maxCibilWithoutHistory": "5",
        "minCibil": "700",
        "minCibilWithoutHistory": "-1"
      },
      "applicantMetaData": null,
      "ruleActionString": "cibilRuleAction",
      "ruleString": "cibilRule",
      "ruleCheckpointParameter": "CIBIL Score (Primary Applicant)",
      "operand": {
        "operandType": "FUNCTION",
        "value": "cibilRule",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.cibilRule",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.cibilRuleAction"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Aniket",
      "createdAt": 1742811144032,
      "updatedBy": "Aniket",
      "updatedAt": 1742811144032,
      "ruleMetadata": {
        "ruleDescription": "CIBIL Score of Primary Applicant (co-applicant with highest shareholding) should be more than 700 or between -1 and 5. If all co-applicant have same shareholding, then co-applicant with Max CIBIL will be considered",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "cibilRule",
            "displayName": "CIBIL Score of Primary Applicant (co-applicant with highest shareholding) should be more than 700 or between -1 and 5. If all co-applicant have same shareholding, then co-applicant with Max CIBIL will be considered"
          }
        ]
      }
    },
    {
      "ruleId": "67dc27138abea25513560c90",
      "ruleTemplateGroupCategory": "Business details",
      "ruleTemplateId": "d2be068e0001ef5f134e3ff1",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( borrower.business.industryNature IN (\"Manufacturing\",\"Services\",\"Trader- Retail\",\"Trader- Wholesale\",\"Service - Manpower Supply\") )",
      "ruleCheckpointParameter": "Nature of Business",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "borrower.business.industryNature",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "(\"Manufacturing\",\"Services\",\"Trader- Retail\",\"Trader- Wholesale\",\"Service - Manpower Supply\")",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "IN"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144107,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144107,
      "ruleMetadata": {
        "ruleDescription": "Allowed nature of business as per policy",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "borrower.business.industryNature",
            "displayName": "Industry Nature"
          }
        ]
      }
    },
    {
      "ruleId": "67dc27138abea25513560c91",
      "ruleTemplateGroupCategory": "Application details",
      "ruleTemplateId": "ac5b799e90707bd4ffa4fbdd",
      "ruleType": "CUSTOM",
      "policyType": 0,
      "ruleConfig": {
        "minHolding": "51",
        "ruleString": "ageRule",
        "maxAge": "65",
        "minAge": "21"
      },
      "applicantMetaData": null,
      "ruleActionString": "ageRuleAction",
      "ruleString": "ageRule",
      "ruleCheckpointParameter": "Co-applicant Age",
      "operand": {
        "operandType": "FUNCTION",
        "value": "ageRule",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.ageRule",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.ageRuleAction"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144133,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144133,
      "ruleMetadata": {
        "ruleDescription": "Co-applicants with minimum 51% holding to meet the age norms of 21 and 65 years",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "ageRule",
            "displayName": "Co-applicants with minimum 51% holding to meet the age norms of 21 and 65 years"
          }
        ]
      }
    },
    {
      "ruleId": "67dc27138abea25513560c92",
      "ruleTemplateGroupCategory": "Loan details",
      "ruleTemplateId": "e0371f66d17d086eb6d7bdbd",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( terms.interestRate LESS_THAN_OR_EQUAL_TO 24 )",
      "ruleCheckpointParameter": "Interest Rate",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "terms.interestRate",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "24",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144153,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144153,
      "ruleMetadata": {
        "ruleDescription": "The maximum interest to be charged to borrowers by NBFC should not exceed 24%",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "terms.interestRate",
            "displayName": "Interest Rate"
          }
        ]
      }
    },
    {
      "ruleId": "67dc27138abea25513560c93",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "0d5dee7acfc837728ce47d14",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.posToTurnover LESS_THAN_OR_EQUAL_TO 20 )",
      "ruleCheckpointParameter": "POS to TO",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.posToTurnover",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "20",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144167,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144167,
      "ruleMetadata": {
        "ruleDescription": "POS of active UBL to GST turnover ratio to be less than 20%",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.posToTurnover",
            "displayName": "POS of active UBL to GST turnover"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89bdf",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "89c20118c476a17292bae757",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "bureauScoreNorms",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "label": "bureauScoreNorms",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Bureau Score norms not met",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144176,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144176,
      "ruleMetadata": {
        "ruleDescription": "Deviation not allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1-L6 -Then Fail"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89be0",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "8aeccb8ac69e421204ca6209",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "sanctionValidityOveride",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": null,
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Overriding sanction validity",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144192,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144192,
      "ruleMetadata": {
        "ruleDescription": "Deviation not allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6, then fail"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89be1",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "b6918c2a0ddcde3ff25807f8",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "statDuesCurrent",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "path": "borrower.companyFinancials.maxFilingLagL12M",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Current Statutory Dues (Including GST) – Max Filing lag in last 12 months",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144209,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144209,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L2 -Then  Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89be2",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "a22eafcbe674548295490a11",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "groupExposureDeviation",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "label": "groupExposureDeviation",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Deviation to Group exposure norms",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144221,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144221,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval not allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6 -Then Fail"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89be3",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "a69ff60f2e11b759dae8b39b",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "vintageDeviation",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "path": "borrower.business.businessVintageMonths",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Vintage norms/ Business Continuity Proof not met of Entity or any Promoters",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144237,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144237,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L2, then Pass else fail"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89be4",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "2ea155c1ad431c76952927f5",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "DpdWithinL12MDeviation",
        "allowedList": "L1"
      },
      "applicantMetaData": [
        {
          "label": "DpdWithinL12MDeviation",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "DPDs in last 6-12 months in any loan account",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144253,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144253,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L1 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1 -Then Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89be5",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "89b950a826ac0aacf1644252",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "topCustGstMatchFail",
        "allowedList": "L1,L2,L3"
      },
      "applicantMetaData": [
        {
          "path": "loanAppUnderwritingParameters.topCustPerGstNotMatch",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Top supplier/customer as per GST not matching with banking",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144267,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144267,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L3 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L3 -Then  Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89be6",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "2c1a24c4bc91b75d1c1419eb",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "udyamWaiver",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "label": "udyamWaiver",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Udhyam registration certificate waiver",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144285,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144285,
      "ruleMetadata": {
        "ruleDescription": "Deviation not allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6 -Then Fail"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89be7",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "ea7bf75ed10b08e8c440b17f",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "emiBounceDeviation",
        "allowedList": "L1,L2,L3,L4"
      },
      "applicantMetaData": [
        {
          "path": "borrower.underwritingParameters.bouncesLast6m",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "EMI bounce in last 6 months due to insufficient funds",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144301,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144301,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L4 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L4, Pass"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89be8",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "30509431df69ad32b35da4d2",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "turnoverDeviation",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "path": "borrower.companyFinancials.annualBusinessTurnover",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Minimum/Maximum turnover norms not met",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144322,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144322,
      "ruleMetadata": {
        "ruleDescription": "Deviation not allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6 - Then Fail"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89be9",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "f373c436682d461c5f63ff22",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "any90Dpdsettlement",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "label": "any90Dpdsettlement",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Derog in CIBIL (W/O/ Settled/LSS/SUB/DBT/SMA2) in any loan",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144345,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144345,
      "ruleMetadata": {
        "ruleDescription": "Deviation not allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6 -Then Fail"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89bea",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "70c2c7d6f94f5a16f86a4741",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "cmrDeviation",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "path": "borrower.underwritingParameters.cmrScore",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Commercial CIBIL- CMR",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144365,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144365,
      "ruleMetadata": {
        "ruleDescription": "Deviation not allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6 -Then Fail"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89beb",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "e4e064f2a169e9e19df8e9f1",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "recentLitigation",
        "allowedList": "L1,L2,L3"
      },
      "applicantMetaData": [
        {
          "label": "recentLitigation",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Recent open litigation finding in company report (corpository)",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144381,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144381,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L3 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L3 -Then  Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89bec",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "aff53b4f3ca7b82572f14593",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "nonCCdefaultOverdue",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "label": "nonCCdefaultOverdue",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Non-Credit card Default/Overdue in CIBIL",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144400,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144400,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If L1 - L2 Then Pass, Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "67de7ad63e56760e08e89bed",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "9c12c8df8ef540461d92c396",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "dpdWithinL6MDeviation",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "label": "dpdWithinL6MDeviation",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "DPDs within last 6 months in any loan",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144421,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144421,
      "ruleMetadata": {
        "ruleDescription": "Deviation not allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1-L6, Then Fail"
          }
        ]
      }
    },
    {
      "ruleId": "67e130087c88891fbbbc3ab6",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "64ee1aa71452ed109f4eda82z",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "debtorDeviation",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "path": "loanAppUnderwritingParameters.debtorDays",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Debtor days",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Raushan",
      "createdAt": 1742811144050,
      "updatedBy": "Raushan",
      "updatedAt": 1742811144050,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L2 Then Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "67e130087c88891fbbbc3ab7",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "64ee1aa71452ed109f4eda82z",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "creditorDeviation",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "path": "loanAppUnderwritingParameters.creditorDays",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Creditor days",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Raushan",
      "createdAt": 1742811144093,
      "updatedBy": "Raushan",
      "updatedAt": 1742811144093,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L2 Then Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "6df685f9fa31d4d2721af155",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "aa4700c03f678c01cacd7b50",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( ( borrower.underwritingParameters.bouncesLast3m EQUAL_TO 0 ) OR ( borrower.location NOT_IN (\"Delhi\",\"Mumbai\",\"Bangalore\",\"Jaipur\",\"Ahmedabad\",\"Pune\",\"Hyderabad\",\"Kolkata\",\"Chennai\",\"Vijayawada\",\"Surat\",\"Vadodara\",\"Rajkot\",\"Indore\",\"Cochin\",\"Coimbatore\") ) )",
      "ruleCheckpointParameter": "EMI Bounces (In last three months)",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "CONDITION",
            "value": null,
            "operandDefinition": [
              {
                "operandType": "VARIABLE",
                "value": "borrower.underwritingParameters.bouncesLast3m",
                "operandDefinition": null,
                "operation": null
              },
              {
                "operandType": "CONSTANT",
                "value": "0",
                "operandDefinition": null,
                "operation": null
              }
            ],
            "operation": {
              "operatorType": "ARITHMATIC",
              "operatorValue": "EQUAL_TO"
            }
          },
          {
            "operandType": "CONDITION",
            "value": null,
            "operandDefinition": [
              {
                "operandType": "VARIABLE",
                "value": "borrower.location",
                "operandDefinition": null,
                "operation": null
              },
              {
                "operandType": "CONSTANT",
                "value": "(\"Delhi\",\"Mumbai\",\"Bangalore\",\"Jaipur\",\"Ahmedabad\",\"Pune\",\"Hyderabad\",\"Kolkata\",\"Chennai\",\"Vijayawada\",\"Surat\",\"Vadodara\",\"Rajkot\",\"Indore\",\"Cochin\",\"Coimbatore\")",
                "operandDefinition": null,
                "operation": null
              }
            ],
            "operation": {
              "operatorType": "ARITHMATIC",
              "operatorValue": "NOT_IN"
            }
          }
        ],
        "operation": {
          "operatorType": "CONNECTOR",
          "operatorValue": "OR"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144437,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144437,
      "ruleMetadata": {
        "ruleDescription": "No EMI bounce in last 3 months due to insufficient funds for defined locations",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "borrower.location",
            "displayName": "Location"
          },
          {
            "fullPath": "borrower.underwritingParameters.bouncesLast3m",
            "displayName": "EMI Bounces in last three months"
          }
        ]
      }
    },
    {
      "ruleId": "73150f372f7cca7942378bf6",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "7a1b20c9663ae71c91c91154",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "dscrDeviation",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "path": "borrower.underwritingParameters.dscr",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Deviation to DSCR norms",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144453,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144453,
      "ruleMetadata": {
        "ruleDescription": "no deviation allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If L1 - L6 , fail"
          }
        ]
      }
    },
    {
      "ruleId": "761a66b67105001598912c76",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "272e8c6d19f4bccddf23d352",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "btoDeviation",
        "allowedList": "L1,L2,L3"
      },
      "applicantMetaData": [
        {
          "path": "borrower.underwritingParameters.bto",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Banking throughput (BTO)",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144465,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144465,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L3 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L3, Pass"
          }
        ]
      }
    },
    {
      "ruleId": "7d3ff6a5e0143455bc7b15eb",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "71d15cb179dd6409c9fe87ac",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "cashPatPositive",
        "allowedList": "L1,L2,L3"
      },
      "applicantMetaData": [
        {
          "path": "borrower.underwritingParameters.patLossCyCashPatPos",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "PAT Loss in CY, but Cash PAT is positive due to Depreciation",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144481,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144481,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L3 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If L1 - L3 Then Pass, Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "800f14c62a238faeb1b94ed0",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "442d05a2df358896561d76c5",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "odccHighUtilization",
        "allowedList": "L1,L2,L3"
      },
      "applicantMetaData": [
        {
          "label": "Ac 1",
          "path": "loanAppUnderwritingParameters.ccodLimUtilAc1",
          "resolutionType": "DIRECT"
        },
        {
          "label": "Ac 2",
          "path": "loanAppUnderwritingParameters.ccodLimUtilAc2",
          "resolutionType": "DIRECT"
        },
        {
          "label": "Ac 3",
          "path": "loanAppUnderwritingParameters.ccodLimUtilAc3",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "OD/CC limit utilization (recent 3 months) >97%- Norms not met",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144493,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144493,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L3 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L3 -Then  Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "82829cac9d5ce72047f43ecb",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "f539ed5f16b029924e92553c",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "uslNorm",
        "allowedList": "L1,L2,L3"
      },
      "applicantMetaData": [
        {
          "path": "borrower.underwritingParameters.firstTimeUBL",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Deviation to 1st Time USL Norm",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144509,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144509,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L3 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If L1 - L3 then Pass, else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "88eacb9992217f64f3a27058",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "58fc46ed2df524c4d65040fa",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "debtorStockDeviation",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "path": "loanAppUnderwritingParameters.debtorStockDays",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Debtor+ Stock days more than 150",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144525,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144525,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L2 Then Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "8bb7bc1d90b8cb5a793702bf",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "0922f40fcc828141a885702e",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "topupDeviation",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "label": "topupDeviation",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Deviation to Top-up norms",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144536,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144536,
      "ruleMetadata": {
        "ruleDescription": "No deviation allowed",
        "failureDescription": "Devation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6, fail"
          }
        ]
      }
    },
    {
      "ruleId": "8e72d9c3317588bc1ba722d1",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "f9fe68d997ee01854bb7af41",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.turnoverDrop GREATER_THAN_OR_EQUAL_TO -40 )",
      "ruleCheckpointParameter": "Drop in Turnover",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.turnoverDrop",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "-40",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "GREATER_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144553,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144553,
      "ruleMetadata": {
        "ruleDescription": "Drop in Turnover should be more than -20%, with deviation -40% allowed",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.turnoverDrop",
            "displayName": "Drop in Turnover"
          }
        ]
      }
    },
    {
      "ruleId": "8e77d0251631baeef8522f84",
      "ruleTemplateGroupCategory": "Loan details",
      "ruleTemplateId": "deafe04f5f4adcfef1177e8c",
      "ruleType": "CUSTOM",
      "policyType": 0,
      "ruleConfig": {
        "maxAmberAmount": "3570000",
        "minAmount": "1500000",
        "maxGreenAmount": "3570000",
        "maxYellowAmount": "3570000"
      },
      "applicantMetaData": null,
      "ruleActionString": "ruleResultsanctionAmount",
      "ruleString": "sanctionAmount",
      "ruleCheckpointParameter": "Sanction Amount",
      "operand": {
        "operandType": "FUNCTION",
        "value": "sanctionAmount",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.sanctionAmount",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.ruleResultsanctionAmount"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144568,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144568,
      "ruleMetadata": {
        "ruleDescription": "Min Loan Amount - 15 L.\nIf Industry is in Green category then Max Loan Amount is 35.7 L.\nif Industry is in Yellow category then Max Loan Amount is 35.7 L.\nif Industry is in Amber category then Max Loan Amount is 35.7 L.\nif Industry is in Red category then not allowed.",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "sanctionAmount",
            "displayName": "Loan amount at the time of sanction"
          }
        ]
      }
    },
    {
      "ruleId": "9526f328491ceb41b6b9fc16",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "a775b72bdd4b897b060a5f76",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "debtorAtnwDeviation",
        "allowedList": "L1,L2,L3"
      },
      "applicantMetaData": [
        {
          "path": "borrower.underwritingParameters.debtorsMoreAtnwG6M",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Debtors >6 months more than ATNW",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144578,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144578,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L3 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L3 Then Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "95e6f1083a8d0048cffc3e7f",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "e56264fd97c2fd5bc0b808ed",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( borrower.underwritingParameters.dscr GREATER_THAN_OR_EQUAL_TO 1 )",
      "ruleCheckpointParameter": "DSCR",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "borrower.underwritingParameters.dscr",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "1",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "GREATER_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144592,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144592,
      "ruleMetadata": {
        "ruleDescription": "Eligible EMI to be calculated on DSCR of 1.00",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "borrower.underwritingParameters.dscr",
            "displayName": "DSCR"
          }
        ]
      }
    },
    {
      "ruleId": "9d732befe101e646c7020fca",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "c1a58261f9eea968ca7d10a6",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "ccOverallCreditDeviation",
        "allowedList": "L1,L2,L3"
      },
      "applicantMetaData": [
        {
          "path": "loanAppUnderwritingParameters.ccToOverallCredits",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Cash credits to overall credits",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144603,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144603,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L3 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L3, Pass"
          }
        ]
      }
    },
    {
      "ruleId": "9fd37ee71d6e33c23a1a21e4",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "d105c148f2516348a3a32940",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "maxAmtLocation",
        "allowedList": "L1,L2,L3,L4"
      },
      "applicantMetaData": [
        {
          "label": "maxAmtLocation",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Deviation to location wise max loan amount norms",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144612,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144612,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L4 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L4 -Then  Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "9fd37ee71d6e33c23a1c41e4",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "2bf6f75a60a56db9c57b9833",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "hospitalNorms",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "label": "hospitalNorms",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Deviation to Hospital norms",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144625,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144625,
      "ruleMetadata": {
        "ruleDescription": "No deviation allowed",
        "failureDescription": "Devation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6, fail"
          }
        ]
      }
    },
    {
      "ruleId": "a21aee4368b4ea66fb5d2c47",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "e1216471e435dd5d6955f609",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.debtorDays LESS_THAN_OR_EQUAL_TO 150 )",
      "ruleCheckpointParameter": "Debtors days",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.debtorDays",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "150",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144639,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144639,
      "ruleMetadata": {
        "ruleDescription": "Debtor days shall not be more than 90 days, with deviation 150 days",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.debtorDays",
            "displayName": "Debtors days"
          }
        ]
      }
    },
    {
      "ruleId": "a271e8b2e931f0259643942b",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "05adf4e09ca4fa4e3b1d94c2",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "nonOfficePD",
        "allowedList": "L1,L2,L3,L4"
      },
      "applicantMetaData": [
        {
          "label": "nonOfficePD",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "PD at place other than office/factory",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144648,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144648,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L4 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L4, Pass"
          }
        ]
      }
    },
    {
      "ruleId": "a93e5c207212fe808062f87c",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "0b6d78c8546278d57a04ab8c",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.operatingProfitDrop GREATER_THAN_OR_EQUAL_TO -40 )",
      "ruleCheckpointParameter": "Drop in Operating profit",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.operatingProfitDrop",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "-40",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "GREATER_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144653,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144653,
      "ruleMetadata": {
        "ruleDescription": "Drop in Operating profit should be more than -20%, with deviation -40% allowed",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.operatingProfitDrop",
            "displayName": "Drop in Operating profit"
          }
        ]
      }
    },
    {
      "ruleId": "a9b04507b8eb58b0031d7fd4",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "f7e36820984080830edd08d0",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.cashProfit GREATER_THAN_OR_EQUAL_TO 0 )",
      "ruleCheckpointParameter": "Cash Profit",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.cashProfit",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "0",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "GREATER_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144659,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144659,
      "ruleMetadata": {
        "ruleDescription": "Not to be negative in Current Financial Year (Audited)",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.cashProfit",
            "displayName": "Cash Profit"
          }
        ]
      }
    },
    {
      "ruleId": "ae507d590a0a2d859f1943ff",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "1ebc7dc9469e18dd32233281",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "crimeCheck",
        "allowedList": "L1,L2,L3"
      },
      "applicantMetaData": [
        {
          "label": "crimeCheck",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Crime Check",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144665,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144665,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L3 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L3, Pass"
          }
        ]
      }
    },
    {
      "ruleId": "b12029ac8f68b676521fa5d4",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "047c4e48fb6be3175bdd0266",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( borrower.underwritingParameters.tolATNWRatio LESS_THAN_OR_EQUAL_TO 8 )",
      "ruleCheckpointParameter": "TOL/ATNW",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "borrower.underwritingParameters.tolATNWRatio",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "8",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144670,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144670,
      "ruleMetadata": {
        "ruleDescription": "Max allowed Total outstanding limit to Total net worth ratio ratio to be 5, and including deviaiton this ratio can go upto 8",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "borrower.underwritingParameters.tolATNWRatio",
            "displayName": "TOL/ATNW"
          }
        ]
      }
    },
    {
      "ruleId": "b45f142746b370ea26974c52",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "7feb45f348086cf463d7aa42",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "grt24MtenureNonCGTMSE",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "path": "terms.nonCgtmseEntityG24M",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": ">24 months tenure to non-CGTMSE eligible entity",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144677,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144677,
      "ruleMetadata": {
        "ruleDescription": "No deviation allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6, fail"
          }
        ]
      }
    },
    {
      "ruleId": "b4f9458e679f7514236e2127",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "badffcf03e74615f990e5a5d",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "ageDeviation",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "path": "getAllCoapplicantAge",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Max and Min age deviation",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144682,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144682,
      "ruleMetadata": {
        "ruleDescription": "no deviation allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If L1 - L6 , fail"
          }
        ]
      }
    },
    {
      "ruleId": "bc0c9dd7f015d6e834d9b268",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "82ac5c78b99feada65eb9525",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( borrower.underwritingParameters.debtEquityRatio LESS_THAN_OR_EQUAL_TO 5 )",
      "ruleCheckpointParameter": "Debt/Equity",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "borrower.underwritingParameters.debtEquityRatio",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "5",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144688,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144688,
      "ruleMetadata": {
        "ruleDescription": "Debt/Equity ratio to be smaller than 4, with deviation this ratio of 5 is acceptable",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "borrower.underwritingParameters.debtEquityRatio",
            "displayName": "Debt/Equity"
          }
        ]
      }
    },
    {
      "ruleId": "bdb4c260380a080a9bc0d794",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "f434eb774a70936f9ca28c97",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "AbbMin",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "path": "loanAppUnderwritingParameters.bankBalanceAvgL12M",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Minimum ABB norms not met",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144694,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144694,
      "ruleMetadata": {
        "ruleDescription": "No deviation allowed",
        "failureDescription": "Devation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6, fail"
          }
        ]
      }
    },
    {
      "ruleId": "c9020105ded47123b5f17142",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "7841f256fb7e216e607e8a55",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "limitUtilDeviation",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": null,
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "OD/CC limit utilization (recent 3 months) >97% - Norms not met",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811186361,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811186361,
      "ruleMetadata": {
        "ruleDescription": "No deviation allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6, fail"
          }
        ]
      }
    },
    {
      "ruleId": "cc7bf800ad473438a8caeb49",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "0243b87b8895022ca4d9ec1e",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "ownershipDeviation",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "label": "ownershipDeviation",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Deviation to ownership norms",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811186368,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811186368,
      "ruleMetadata": {
        "ruleDescription": "No deviation allowed",
        "failureDescription": "Devation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6, fail"
          }
        ]
      }
    },
    {
      "ruleId": "d35145284bbce354dba1ef94",
      "ruleTemplateGroupCategory": "Loan details",
      "ruleTemplateId": "be4438ae84202b1653354923",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.pdWaiver NOT_EQUAL_TO true )",
      "ruleCheckpointParameter": "Personal discussion waiver",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.pdWaiver",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "true",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "NOT_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144710,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144710,
      "ruleMetadata": {
        "ruleDescription": "Personal discussion waiver shoudn't be taken",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.pdWaiver",
            "displayName": "Personal discussion waiver"
          }
        ]
      }
    },
    {
      "ruleId": "d9792909320ab5a0236725d5",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "b67a044a5a4ce2f031890cd3",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "tolAtnwDeviation",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "path": "borrower.underwritingParameters.tolATNWRatio",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "TOL/ATNW",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144724,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144724,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L2 Then Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "dab2f8da5d111cd7e428fc15",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "4e801b3f2bbec77a324f6421",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "disqualifiedDirector",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "label": "disqualifiedDirector",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Director is disqualified u/s 164(2) of Companies act.",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144729,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144729,
      "ruleMetadata": {
        "ruleDescription": "No deviation allowed",
        "failureDescription": "Devation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6, fail"
          }
        ]
      }
    },
    {
      "ruleId": "df4b4b1bc702eea1cec27311",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "f7220acb75b3a22a68ad59a3",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.ccToOverallCredits LESS_THAN_OR_EQUAL_TO 60 )",
      "ruleCheckpointParameter": "Cash credits to overall credits",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.ccToOverallCredits",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "60",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144736,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144736,
      "ruleMetadata": {
        "ruleDescription": "Cash credits to overall credits should be less than 60%",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.ccToOverallCredits",
            "displayName": "Cash credits to overall credits"
          }
        ]
      }
    },
    {
      "ruleId": "dfcff5e569d68226b19c4ddb",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "d02f953cf428a00bc512f9eb",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "itrFilinggap",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "label": "itrFilinggap",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Filing gap between two ITR's Less than 6 months",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144741,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144741,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If L1 - L2 then Pass, else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "e1e37de2c6b03a9415ee8e1c",
      "ruleTemplateGroupCategory": "Bureau details",
      "ruleTemplateId": "b0142719a1d73c5ad2e20a8f",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( borrower.underwritingParameters.cmrScore LESS_THAN_OR_EQUAL_TO 8 )",
      "ruleCheckpointParameter": "CMR Score",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "borrower.underwritingParameters.cmrScore",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "8",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144745,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144745,
      "ruleMetadata": {
        "ruleDescription": "CMR score till 5 allowed, with Deviation 8",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "borrower.underwritingParameters.cmrScore",
            "displayName": "CMR Score"
          }
        ]
      }
    },
    {
      "ruleId": "e4c61882dbdf595db4d371bc",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "650f7dc525b273e8fe189122",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "statDuesNotPaid",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "label": "statDuesNotPaid",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Statutory Dues not paid beyond due date of filing of Tax Audit Report",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144751,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144751,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L2 -Then  Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "e57cbdb9f60eea2aa873b820",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "e5784c4ac39994033fdcd144",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( borrower.underwritingParameters.bto GREATER_THAN_OR_EQUAL_TO 70 )",
      "ruleCheckpointParameter": "BTO",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "borrower.underwritingParameters.bto",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "70",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "GREATER_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144756,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144756,
      "ruleMetadata": {
        "ruleDescription": "Banking Throughput to be more than 70%",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "borrower.underwritingParameters.bto",
            "displayName": "Banking Throughput"
          }
        ]
      }
    },
    {
      "ruleId": "e5fdcbfbcaa6a4cf2510e642",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "0b12e58fdbefd7c9213e0b30",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "inwardReturnDeviation",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "path": "loanAppUnderwritingParameters.inwardReturn",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Current/CC/Saving A/c - Inward cheques return of total transactions (Other than EMI Cheques)",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144761,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144761,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L2, Pass"
          }
        ]
      }
    },
    {
      "ruleId": "e6515c63d647a5d8e0117c9f",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "7d42154ab6268f19b741bc2d",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.borrowingToTurnover LESS_THAN_OR_EQUAL_TO 50 )",
      "ruleCheckpointParameter": "Borrowing to Turnover",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.borrowingToTurnover",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "50",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "LESS_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144767,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144767,
      "ruleMetadata": {
        "ruleDescription": "Borrowing (Debt) to 12 M GST sales ratio to be less than 50%",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.borrowingToTurnover",
            "displayName": "Borrowing to Turnover"
          }
        ]
      }
    },
    {
      "ruleId": "e76c00cdb4dfa929d491bfb8",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "f2f95c29cab90571e765178d",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "videoPdDeviation",
        "allowedList": "L1,L2,L3,L4"
      },
      "applicantMetaData": [
        {
          "label": "videoPdDeviation",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Deviation to Video PD norms",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144776,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144776,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L4 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If L1 - L4 Then Pass, Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "e9f644a34c160c4fc9c0f3a5",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "515f05199d0c4a3c55c3bd9f",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "fiFcu",
        "allowedList": "L1,L2,L3"
      },
      "applicantMetaData": [
        {
          "label": "fiFcu",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "FI and FCU deviation",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144782,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144782,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L3 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L3, Pass"
          }
        ]
      }
    },
    {
      "ruleId": "eb66d65cf8740a1c402508fe",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "88b9000ccd51236889df3798",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "turnoverProfitDropDeviation",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "label": "Drop in turnover",
          "path": "loanAppUnderwritingParameters.turnoverDrop",
          "resolutionType": "DIRECT"
        },
        {
          "label": "Drop in cash profit",
          "path": "loanAppUnderwritingParameters.cashProfitDrop",
          "resolutionType": "DIRECT"
        },
        {
          "label": "Drop in operating profit",
          "path": "loanAppUnderwritingParameters.operatingProfitDrop",
          "resolutionType": "DIRECT"
        },
        {
          "label": "Drop in ATNW",
          "path": "loanAppUnderwritingParameters.atnwDrop",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Drop in Turnover, OPBDIT/ Cash Profit/Net Worth",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144787,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144787,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": null,
            "displayName": "If value in L1- L2 -Then  Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "eece1916d9a6847d6d766fb1",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "f91ed315951c5939866c7413",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "borrowingToDeviation",
        "allowedList": "L1,L2"
      },
      "applicantMetaData": [
        {
          "path": "loanAppUnderwritingParameters.borrowingToTurnover",
          "resolutionType": "DIRECT"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Borrowing to T/o Ratio",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144792,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144792,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L2 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L2 -Then  Pass Else Fail"
          }
        ]
      }
    },
    {
      "ruleId": "f1b278f91bc6a182e663c350",
      "ruleTemplateGroupCategory": "Financial details",
      "ruleTemplateId": "04a8b2513276f78b61d7c482",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( loanAppUnderwritingParameters.atnw GREATER_THAN_OR_EQUAL_TO 0 )",
      "ruleCheckpointParameter": "ATNW",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "loanAppUnderwritingParameters.atnw",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "0",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "GREATER_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144799,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144799,
      "ruleMetadata": {
        "ruleDescription": "Not to be negative in Current Financial Year (Audited)",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "loanAppUnderwritingParameters.atnw",
            "displayName": "ATNW"
          }
        ]
      }
    },
    {
      "ruleId": "f650417e689ea1a3ffb53b71",
      "ruleTemplateGroupCategory": "Business details",
      "ruleTemplateId": "86b94ecc44e01457b4fc0c8e",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( borrower.business.businessVintageMonths GREATER_THAN_OR_EQUAL_TO 24 )",
      "ruleCheckpointParameter": "Bus Vintage-months",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "borrower.business.businessVintageMonths",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "24",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "GREATER_THAN_OR_EQUAL_TO"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144804,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144804,
      "ruleMetadata": {
        "ruleDescription": "Business vintage should be minimum 2 years",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "borrower.business.businessVintageMonths",
            "displayName": "Business Vintage-months"
          }
        ]
      }
    },
    {
      "ruleId": "f91e56bcb8d7d95a551673b6",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "b54849b69256179d885930c3",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "coApplicantNorms",
        "blockList": "L1,L2,L3,L4,L5,L6"
      },
      "applicantMetaData": [
        {
          "label": "coApplicantNorms",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "nonDeviationRuleActionV2",
      "ruleString": "nonDeviationRuleV2",
      "ruleCheckpointParameter": "Deviation to co-applicant norms",
      "operand": {
        "operandType": "FUNCTION",
        "value": "nonDeviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.nonDeviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.nonDeviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144809,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144809,
      "ruleMetadata": {
        "ruleDescription": "No deviation allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "nonDeviationRuleV2",
            "displayName": "If value in L1- L6, fail"
          }
        ]
      }
    },
    {
      "ruleId": "f9d093ec597f5907bcfdc844",
      "ruleTemplateGroupCategory": "Loan details",
      "ruleTemplateId": "d10bbf727c9719673ba8a040",
      "ruleType": "REGULAR",
      "policyType": 0,
      "ruleConfig": null,
      "applicantMetaData": null,
      "ruleActionString": null,
      "ruleString": "( borrower.business.entityType IN (\"Proprietorship\",\"Partnership\",\"LLP\",\"Pvt Ltd company\",\"One Person Company\",\"Ltd Company-listed\",\"Ltd company- unlisted\") )",
      "ruleCheckpointParameter": "Constitution",
      "operand": {
        "operandType": "CONDITION",
        "value": null,
        "operandDefinition": [
          {
            "operandType": "VARIABLE",
            "value": "borrower.business.entityType",
            "operandDefinition": null,
            "operation": null
          },
          {
            "operandType": "CONSTANT",
            "value": "(\"Proprietorship\",\"Partnership\",\"LLP\",\"Pvt Ltd company\",\"One Person Company\",\"Ltd Company-listed\",\"Ltd company- unlisted\")",
            "operandDefinition": null,
            "operation": null
          }
        ],
        "operation": {
          "operatorType": "ARITHMATIC",
          "operatorValue": "IN"
        }
      },
      "importList": null,
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144815,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144815,
      "ruleMetadata": {
        "ruleDescription": "Business Type to be as per the policy",
        "failureDescription": "Policy criteria not met",
        "orderOfOccurence": [
          {
            "fullPath": "borrower.business.entityType",
            "displayName": "Business Type"
          }
        ]
      }
    },
    {
      "ruleId": "fd798563f57f76e2e424c96d",
      "ruleTemplateGroupCategory": "Deviation Parameter",
      "ruleTemplateId": "116775f17b82ce7dfdbfa100",
      "ruleType": "CUSTOM",
      "policyType": 1,
      "ruleConfig": {
        "param": "dedupeOverride",
        "allowedList": "L1,L2,L3"
      },
      "applicantMetaData": [
        {
          "label": "dedupeOverride",
          "path": "getDeviationValues",
          "resolutionType": "CUSTOM"
        }
      ],
      "ruleActionString": "deviationRuleActionV2",
      "ruleString": "deviationRuleV2",
      "ruleCheckpointParameter": "Internal De-dupe override",
      "operand": {
        "operandType": "FUNCTION",
        "value": "deviationRuleV2",
        "operandDefinition": null,
        "operation": null
      },
      "importList": [
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleEvaluations.deviationRuleV2",
        "com.saison.omni.drlevaluator.utility.EvaluationMethods.CustomRuleActions.deviationRuleActionV2"
      ],
      "isActive": false,
      "isDeleted": false,
      "createdBy": "Pulkit",
      "createdAt": 1742811144820,
      "updatedBy": "Pulkit",
      "updatedAt": 1742811144820,
      "ruleMetadata": {
        "ruleDescription": "Deviation approval till L3 allowed",
        "failureDescription": "Deviation norms not met",
        "orderOfOccurence": [
          {
            "fullPath": "deviationRuleV2",
            "displayName": "If value in L1- L3, Pass"
          }
        ]
      }
    }
  ]
};

export default breRules;
