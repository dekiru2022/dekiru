/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNoteTest = /* GraphQL */ `
  subscription OnCreateNoteTest {
    onCreateNoteTest {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNoteTest = /* GraphQL */ `
  subscription OnUpdateNoteTest {
    onUpdateNoteTest {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNoteTest = /* GraphQL */ `
  subscription OnDeleteNoteTest {
    onDeleteNoteTest {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserId = /* GraphQL */ `
  subscription OnCreateUserId {
    onCreateUserId {
      userId
      firstName
      lastName
      birthday
      handleName
      mail
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
      jobed1
      jobed2
      jobed3
      jobed4
      jobed5
    }
  }
`;
export const onUpdateUserId = /* GraphQL */ `
  subscription OnUpdateUserId {
    onUpdateUserId {
      userId
      firstName
      lastName
      birthday
      handleName
      mail
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
      jobed1
      jobed2
      jobed3
      jobed4
      jobed5
    }
  }
`;
export const onDeleteUserId = /* GraphQL */ `
  subscription OnDeleteUserId {
    onDeleteUserId {
      userId
      firstName
      lastName
      birthday
      handleName
      mail
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
      jobed1
      jobed2
      jobed3
      jobed4
      jobed5
    }
  }
`;
export const onCreateQuestions = /* GraphQL */ `
  subscription OnCreateQuestions {
    onCreateQuestions {
      id
      userId
      categoryId
      title
      content
      status
      createdAt
      updatedAt
      deletedAt
      deleteFlg
    }
  }
`;
export const onUpdateQuestions = /* GraphQL */ `
  subscription OnUpdateQuestions {
    onUpdateQuestions {
      id
      userId
      categoryId
      title
      content
      status
      createdAt
      updatedAt
      deletedAt
      deleteFlg
    }
  }
`;
export const onDeleteQuestions = /* GraphQL */ `
  subscription OnDeleteQuestions {
    onDeleteQuestions {
      id
      userId
      categoryId
      title
      content
      status
      createdAt
      updatedAt
      deletedAt
      deleteFlg
    }
  }
`;
export const onCreateAnswerUser = /* GraphQL */ `
  subscription OnCreateAnswerUser {
    onCreateAnswerUser {
      id
      userId
      questionId
      comment
      userHandleName
      userJob
      userExperience
      userLicenseFlag
      time
      ansStatus
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
export const onUpdateAnswerUser = /* GraphQL */ `
  subscription OnUpdateAnswerUser {
    onUpdateAnswerUser {
      id
      userId
      questionId
      comment
      userHandleName
      userJob
      userExperience
      userLicenseFlag
      time
      ansStatus
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
export const onDeleteAnswerUser = /* GraphQL */ `
  subscription OnDeleteAnswerUser {
    onDeleteAnswerUser {
      id
      userId
      questionId
      comment
      userHandleName
      userJob
      userExperience
      userLicenseFlag
      time
      ansStatus
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
export const onCreateCashFlow = /* GraphQL */ `
  subscription OnCreateCashFlow {
    onCreateCashFlow {
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
export const onUpdateCashFlow = /* GraphQL */ `
  subscription OnUpdateCashFlow {
    onUpdateCashFlow {
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
export const onDeleteCashFlow = /* GraphQL */ `
  subscription OnDeleteCashFlow {
    onDeleteCashFlow {
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
export const onCreateQuestionQuestionnaire = /* GraphQL */ `
  subscription OnCreateQuestionQuestionnaire {
    onCreateQuestionQuestionnaire {
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
export const onUpdateQuestionQuestionnaire = /* GraphQL */ `
  subscription OnUpdateQuestionQuestionnaire {
    onUpdateQuestionQuestionnaire {
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
export const onDeleteQuestionQuestionnaire = /* GraphQL */ `
  subscription OnDeleteQuestionQuestionnaire {
    onDeleteQuestionQuestionnaire {
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
export const onCreateAnswerQuestionnaire = /* GraphQL */ `
  subscription OnCreateAnswerQuestionnaire {
    onCreateAnswerQuestionnaire {
      id
      userId
      questionId
      cashFlowId
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
export const onUpdateAnswerQuestionnaire = /* GraphQL */ `
  subscription OnUpdateAnswerQuestionnaire {
    onUpdateAnswerQuestionnaire {
      id
      userId
      questionId
      cashFlowId
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
export const onDeleteAnswerQuestionnaire = /* GraphQL */ `
  subscription OnDeleteAnswerQuestionnaire {
    onDeleteAnswerQuestionnaire {
      id
      userId
      questionId
      cashFlowId
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
