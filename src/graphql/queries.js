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
      experience
      licenseFlag
      identificationFlag
      bankFlag
      created
      updated
      deleted_date
      status
      point
      transferPoint
      GMOuserID
      id
      createdAt
      updatedAt
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
        experience
        licenseFlag
        identificationFlag
        bankFlag
        created
        updated
        deleted_date
        status
        point
        transferPoint
        GMOuserID
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuestions = /* GraphQL */ `
  query GetQuestions($id: ID!) {
    getQuestions(id: $id) {
      questionId
      userId
      categoryId
      title
      content
      status
      createdAt
      updatedAt
      deleteFlg
      id
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
        questionId
        userId
        categoryId
        title
        content
        status
        createdAt
        updatedAt
        deleteFlg
        id
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
      created
      updated
      deleted
      deleteFlg
      id
      createdAt
      updatedAt
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
        created
        updated
        deleted
        deleteFlg
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuestionQuestionnaire = /* GraphQL */ `
  query GetQuestionQuestionnaire($id: ID!) {
    getQuestionQuestionnaire(id: $id) {
      questionQuestionnaireId
      userId
      questionId
      cashFlowId
      publicQuestionValue
      privateQuestionValue1
      privateQuestionValue2
      privateQuestionValue3
      privateQuestionValue4
      created
      updated
      deleted
      deleteFlg
      questonComment
      id
      createdAt
      updatedAt
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
        questionQuestionnaireId
        userId
        questionId
        cashFlowId
        publicQuestionValue
        privateQuestionValue1
        privateQuestionValue2
        privateQuestionValue3
        privateQuestionValue4
        created
        updated
        deleted
        deleteFlg
        questonComment
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAnswerQuestionnaire = /* GraphQL */ `
  query GetAnswerQuestionnaire($id: ID!) {
    getAnswerQuestionnaire(id: $id) {
      answerQuestionnaireId
      userId
      questionId
      cashFlowId
      privateAnswerValue1
      privateAnswerValue2
      privateAnswerValue3
      declineFlg
      created
      updated
      deleted
      deleteFlg
      answerComment
      id
      createdAt
      updatedAt
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
        answerQuestionnaireId
        userId
        questionId
        cashFlowId
        privateAnswerValue1
        privateAnswerValue2
        privateAnswerValue3
        declineFlg
        created
        updated
        deleted
        deleteFlg
        answerComment
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
