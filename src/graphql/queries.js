/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNoteTest = /* GraphQL */ `
  query GetNoteTest($id: ID!) {
    getNoteTest(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
export const listNoteTests = /* GraphQL */ `
  query ListNoteTests(
    $filter: ModelNoteTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNoteTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserId = /* GraphQL */ `
  query GetUserId($id: ID!) {
    getUserId(id: $id) {
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
export const listUserIds = /* GraphQL */ `
  query ListUserIds(
    $filter: ModelUserIdFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserIds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getQuestions = /* GraphQL */ `
  query GetQuestions($id: ID!) {
    getQuestions(id: $id) {
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
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getNotice = /* GraphQL */ `
  query GetNotice($id: ID!) {
    getNotice(id: $id) {
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
export const listNotices = /* GraphQL */ `
  query ListNotices(
    $filter: ModelNoticeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        noticeTitle
        noticeStatus
        linkDestinationUrl
        createdAt
        updatedAt
        deletedAt
      }
      nextToken
    }
  }
`;
export const getAnswerUser = /* GraphQL */ `
  query GetAnswerUser($id: ID!) {
    getAnswerUser(id: $id) {
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
export const listAnswerUsers = /* GraphQL */ `
  query ListAnswerUsers(
    $filter: ModelAnswerUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswerUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCashFlow = /* GraphQL */ `
  query GetCashFlow($id: ID!) {
    getCashFlow(id: $id) {
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
export const listCashFlows = /* GraphQL */ `
  query ListCashFlows(
    $filter: ModelCashFlowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCashFlows(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getQuestionQuestionnaire = /* GraphQL */ `
  query GetQuestionQuestionnaire($id: ID!) {
    getQuestionQuestionnaire(id: $id) {
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
export const listQuestionQuestionnaires = /* GraphQL */ `
  query ListQuestionQuestionnaires(
    $filter: ModelQuestionQuestionnaireFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionQuestionnaires(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getAnswerQuestionnaire = /* GraphQL */ `
  query GetAnswerQuestionnaire($id: ID!) {
    getAnswerQuestionnaire(id: $id) {
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
export const listAnswerQuestionnaires = /* GraphQL */ `
  query ListAnswerQuestionnaires(
    $filter: ModelAnswerQuestionnaireFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswerQuestionnaires(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
