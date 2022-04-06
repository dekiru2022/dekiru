/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNoteTest = /* GraphQL */ `
  mutation CreateNoteTest(
    $input: CreateNoteTestInput!
    $condition: ModelNoteTestConditionInput
  ) {
    createNoteTest(input: $input, condition: $condition) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const updateNoteTest = /* GraphQL */ `
  mutation UpdateNoteTest(
    $input: UpdateNoteTestInput!
    $condition: ModelNoteTestConditionInput
  ) {
    updateNoteTest(input: $input, condition: $condition) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const deleteNoteTest = /* GraphQL */ `
  mutation DeleteNoteTest(
    $input: DeleteNoteTestInput!
    $condition: ModelNoteTestConditionInput
  ) {
    deleteNoteTest(input: $input, condition: $condition) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const createUserId = /* GraphQL */ `
  mutation CreateUserId(
    $input: CreateUserIdInput!
    $condition: ModelUserIdConditionInput
  ) {
    createUserId(input: $input, condition: $condition) {
      userId
      firstName
      lastName
      birthday
      handleName
      mail
      sex
      experience
      licenseFlag
      identificationFlag
      bankFlag
      status
      point
      transferPoint
      GMOuserID
      businessCode
      id
      createdAt
      updatedAt
      deletedAt
      job
      address
    }
  }
`;
export const updateUserId = /* GraphQL */ `
  mutation UpdateUserId(
    $input: UpdateUserIdInput!
    $condition: ModelUserIdConditionInput
  ) {
    updateUserId(input: $input, condition: $condition) {
      userId
      firstName
      lastName
      birthday
      handleName
      mail
      sex
      experience
      licenseFlag
      identificationFlag
      bankFlag
      status
      point
      transferPoint
      GMOuserID
      businessCode
      id
      createdAt
      updatedAt
      deletedAt
      job
      address
    }
  }
`;
export const deleteUserId = /* GraphQL */ `
  mutation DeleteUserId(
    $input: DeleteUserIdInput!
    $condition: ModelUserIdConditionInput
  ) {
    deleteUserId(input: $input, condition: $condition) {
      userId
      firstName
      lastName
      birthday
      handleName
      mail
      sex
      experience
      licenseFlag
      identificationFlag
      bankFlag
      status
      point
      transferPoint
      GMOuserID
      businessCode
      id
      createdAt
      updatedAt
      deletedAt
      job
      address
    }
  }
`;
export const createQuestions = /* GraphQL */ `
  mutation CreateQuestions(
    $input: CreateQuestionsInput!
    $condition: ModelQuestionsConditionInput
  ) {
    createQuestions(input: $input, condition: $condition) {
      id
      userId
      categoryId
      title
      content
      status
      solvedTime
      createdAt
      updatedAt
      deletedAt
      deleteFlg
    }
  }
`;
export const updateQuestions = /* GraphQL */ `
  mutation UpdateQuestions(
    $input: UpdateQuestionsInput!
    $condition: ModelQuestionsConditionInput
  ) {
    updateQuestions(input: $input, condition: $condition) {
      id
      userId
      categoryId
      title
      content
      status
      solvedTime
      createdAt
      updatedAt
      deletedAt
      deleteFlg
    }
  }
`;
export const deleteQuestions = /* GraphQL */ `
  mutation DeleteQuestions(
    $input: DeleteQuestionsInput!
    $condition: ModelQuestionsConditionInput
  ) {
    deleteQuestions(input: $input, condition: $condition) {
      id
      userId
      categoryId
      title
      content
      status
      solvedTime
      createdAt
      updatedAt
      deletedAt
      deleteFlg
    }
  }
`;
export const createNotice = /* GraphQL */ `
  mutation CreateNotice(
    $input: CreateNoticeInput!
    $condition: ModelNoticeConditionInput
  ) {
    createNotice(input: $input, condition: $condition) {
      id
      userId
      noticeTitle
      noticeStatus
      linkDestinationUrl
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
export const updateNotice = /* GraphQL */ `
  mutation UpdateNotice(
    $input: UpdateNoticeInput!
    $condition: ModelNoticeConditionInput
  ) {
    updateNotice(input: $input, condition: $condition) {
      id
      userId
      noticeTitle
      noticeStatus
      linkDestinationUrl
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
export const deleteNotice = /* GraphQL */ `
  mutation DeleteNotice(
    $input: DeleteNoticeInput!
    $condition: ModelNoticeConditionInput
  ) {
    deleteNotice(input: $input, condition: $condition) {
      id
      userId
      noticeTitle
      noticeStatus
      linkDestinationUrl
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
export const createAnswerUser = /* GraphQL */ `
  mutation CreateAnswerUser(
    $input: CreateAnswerUserInput!
    $condition: ModelAnswerUserConditionInput
  ) {
    createAnswerUser(input: $input, condition: $condition) {
      id
      userId
      questionId
      questionTitle
      questionContent
      comment
      userHandleName
      userJob
      userExperience
      userLicenseFlag
      userSex
      userUnitPrice
      time
      ansStatus
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
export const updateAnswerUser = /* GraphQL */ `
  mutation UpdateAnswerUser(
    $input: UpdateAnswerUserInput!
    $condition: ModelAnswerUserConditionInput
  ) {
    updateAnswerUser(input: $input, condition: $condition) {
      id
      userId
      questionId
      questionTitle
      questionContent
      comment
      userHandleName
      userJob
      userExperience
      userLicenseFlag
      userSex
      userUnitPrice
      time
      ansStatus
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
export const deleteAnswerUser = /* GraphQL */ `
  mutation DeleteAnswerUser(
    $input: DeleteAnswerUserInput!
    $condition: ModelAnswerUserConditionInput
  ) {
    deleteAnswerUser(input: $input, condition: $condition) {
      id
      userId
      questionId
      questionTitle
      questionContent
      comment
      userHandleName
      userJob
      userExperience
      userLicenseFlag
      userSex
      userUnitPrice
      time
      ansStatus
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
export const createCashFlow = /* GraphQL */ `
  mutation CreateCashFlow(
    $input: CreateCashFlowInput!
    $condition: ModelCashFlowConditionInput
  ) {
    createCashFlow(input: $input, condition: $condition) {
      cashFlowId
      questionId
      purchaserId
      sellerId
      purchaserCash
      sellerCash
      earnings
      createdAt
      updatedAt
      deletedAt
      deleteFlg
      id
    }
  }
`;
export const updateCashFlow = /* GraphQL */ `
  mutation UpdateCashFlow(
    $input: UpdateCashFlowInput!
    $condition: ModelCashFlowConditionInput
  ) {
    updateCashFlow(input: $input, condition: $condition) {
      cashFlowId
      questionId
      purchaserId
      sellerId
      purchaserCash
      sellerCash
      earnings
      createdAt
      updatedAt
      deletedAt
      deleteFlg
      id
    }
  }
`;
export const deleteCashFlow = /* GraphQL */ `
  mutation DeleteCashFlow(
    $input: DeleteCashFlowInput!
    $condition: ModelCashFlowConditionInput
  ) {
    deleteCashFlow(input: $input, condition: $condition) {
      cashFlowId
      questionId
      purchaserId
      sellerId
      purchaserCash
      sellerCash
      earnings
      createdAt
      updatedAt
      deletedAt
      deleteFlg
      id
    }
  }
`;
export const createQuestionQuestionnaire = /* GraphQL */ `
  mutation CreateQuestionQuestionnaire(
    $input: CreateQuestionQuestionnaireInput!
    $condition: ModelQuestionQuestionnaireConditionInput
  ) {
    createQuestionQuestionnaire(input: $input, condition: $condition) {
      id
      userId
      questionId
      cashFlowId
      publicQuestionValue
      privateQuestionValue1
      privateQuestionValue2
      privateQuestionValue3
      privateQuestionValue4
      createdAt
      updatedAt
      deletedAt
      deleteFlg
      questonComment
    }
  }
`;
export const updateQuestionQuestionnaire = /* GraphQL */ `
  mutation UpdateQuestionQuestionnaire(
    $input: UpdateQuestionQuestionnaireInput!
    $condition: ModelQuestionQuestionnaireConditionInput
  ) {
    updateQuestionQuestionnaire(input: $input, condition: $condition) {
      id
      userId
      questionId
      cashFlowId
      publicQuestionValue
      privateQuestionValue1
      privateQuestionValue2
      privateQuestionValue3
      privateQuestionValue4
      createdAt
      updatedAt
      deletedAt
      deleteFlg
      questonComment
    }
  }
`;
export const deleteQuestionQuestionnaire = /* GraphQL */ `
  mutation DeleteQuestionQuestionnaire(
    $input: DeleteQuestionQuestionnaireInput!
    $condition: ModelQuestionQuestionnaireConditionInput
  ) {
    deleteQuestionQuestionnaire(input: $input, condition: $condition) {
      id
      userId
      questionId
      cashFlowId
      publicQuestionValue
      privateQuestionValue1
      privateQuestionValue2
      privateQuestionValue3
      privateQuestionValue4
      createdAt
      updatedAt
      deletedAt
      deleteFlg
      questonComment
    }
  }
`;
export const createAnswerQuestionnaire = /* GraphQL */ `
  mutation CreateAnswerQuestionnaire(
    $input: CreateAnswerQuestionnaireInput!
    $condition: ModelAnswerQuestionnaireConditionInput
  ) {
    createAnswerQuestionnaire(input: $input, condition: $condition) {
      id
      userId
      questionId
      cashFlowId
      publicAnswerValue
      privateAnswerValue1
      privateAnswerValue2
      privateAnswerValue3
      declineFlg
      createdAt
      updatedAt
      deletedAt
      deleteFlg
      answerComment
    }
  }
`;
export const updateAnswerQuestionnaire = /* GraphQL */ `
  mutation UpdateAnswerQuestionnaire(
    $input: UpdateAnswerQuestionnaireInput!
    $condition: ModelAnswerQuestionnaireConditionInput
  ) {
    updateAnswerQuestionnaire(input: $input, condition: $condition) {
      id
      userId
      questionId
      cashFlowId
      publicAnswerValue
      privateAnswerValue1
      privateAnswerValue2
      privateAnswerValue3
      declineFlg
      createdAt
      updatedAt
      deletedAt
      deleteFlg
      answerComment
    }
  }
`;
export const deleteAnswerQuestionnaire = /* GraphQL */ `
  mutation DeleteAnswerQuestionnaire(
    $input: DeleteAnswerQuestionnaireInput!
    $condition: ModelAnswerQuestionnaireConditionInput
  ) {
    deleteAnswerQuestionnaire(input: $input, condition: $condition) {
      id
      userId
      questionId
      cashFlowId
      publicAnswerValue
      privateAnswerValue1
      privateAnswerValue2
      privateAnswerValue3
      declineFlg
      createdAt
      updatedAt
      deletedAt
      deleteFlg
      answerComment
    }
  }
`;
