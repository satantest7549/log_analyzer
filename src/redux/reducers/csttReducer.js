import {
  FETCH_CSTT_DATA_FAILURE,
  FETCH_CSTT_DATA_REQUEST,
  FETCH_CSTT_DATA_SUCCESS,
} from "../actions";

const initialState = {
  loading: false,
  error: null,
  // finalData: [],
  finalData: [
    {
      ERROR_NO: "153441",
      Anthropic_AI_Summary:
        "This particular error occurred while processing a Save or Update Evaluation request, indicating that there were issues with the Evaluation XML. The message clearly states that some mandatory fields were either missing or set to nil, leading to a failure in processing the request. The error highlights the importance of providing complete and valid data for the successful operation of the application. Addressing these validation constraints is critical for maintaining functionality and ensuring data accuracy in appraisal evaluations.",
      Caused_By_Details:
        "Exception occurred while validating Evaluation XML. Some of the mandatory field is missing or nil.",
      Historical_Solution: "",
      Error_Header:
        "WCAAHELPER: ERROR PROCESSING SAVE/UPDATE EVALUATION REQUEST. ERROR IN APPRAISAL_ASSIGNMENT_HELPER -> NULL WORKITEMID : 8CAB91E8-AC18-3750-0061-39FA64F6DECB -> EXCEPTION OCCURRED WHILE VALIDATING EVALUATION XML. SOME OF THE MANDATORY FIELD IS MISSING OR NIL",
      APP_NM: "WORKCENTER_ASSIGNMENT",
      MODULE_NM: "APPRAISAL_ASSIGNMENT_HELPER",
      CLASS_NM:
        "COM.MITCHELL.SERVICES.TECHNICAL.APPRAISALASSIGNMENT.HELPER.EJB.ASSIGNMENTHELPEREJB",
      METHOD_NM:
        "E(WCAAUIXMLDOCUMENT WCAAUIXMLDOCUMENT, USERINFODOCUMENT ASSIGNORUSERINFODOCUMENT, STRING WORKITEMID)",
      SEVERITY: "FATAL",
      CO_CD: "OA",
      ERR_TIMESTAMP: "2025-01-21T22:21:01.782",
      Page_Name: "",
      Occurrence_Count: "1",
      SERVER_NM: "deap7c7n1lxv.staging.int:jboss_jbc7:node1",
      bug_title: "Missing mandatory fields in Evaluation XML",
    },
  ],
};

const csttReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CSTT_DATA_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CSTT_DATA_SUCCESS:
      return { ...state, loading: false, finalData: action.payload };

    case FETCH_CSTT_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default csttReducer;
