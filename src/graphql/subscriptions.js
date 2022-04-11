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
export const onUpdateUserId = /* GraphQL */ `
  subscription OnUpdateUserId {
    onUpdateUserId {
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
export const onDeleteUserId = /* GraphQL */ `
  subscription OnDeleteUserId {
    onDeleteUserId {
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
export const onCreateQuestions = /* GraphQL */ `
  subscription OnCreateQuestions {
    onCreateQuestions {
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
export const onUpdateQuestions = /* GraphQL */ `
  subscription OnUpdateQuestions {
    onUpdateQuestions {
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
export const onDeleteQuestions = /* GraphQL */ `
  subscription OnDeleteQuestions {
    onDeleteQuestions {
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
export const onCreateNotice = /* GraphQL */ `
  subscription OnCreateNotice {
    onCreateNotice {
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
export const onUpdateNotice = /* GraphQL */ `
  subscription OnUpdateNotice {
    onUpdateNotice {
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
export const onDeleteNotice = /* GraphQL */ `
  subscription OnDeleteNotice {
    onDeleteNotice {
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
export const onCreateAnswerUser = /* GraphQL */ `
  subscription OnCreateAnswerUser {
    onCreateAnswerUser {
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
      videoFinishedTime
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
      videoFinishedTime
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
      videoFinishedTime
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
      businessCode
      businessCash
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
      businessCode
      businessCash
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
      businessCode
      businessCash
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
export const onUpdateAnswerQuestionnaire = /* GraphQL */ `
  subscription OnUpdateAnswerQuestionnaire {
    onUpdateAnswerQuestionnaire {
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
export const onDeleteAnswerQuestionnaire = /* GraphQL */ `
  subscription OnDeleteAnswerQuestionnaire {
    onDeleteAnswerQuestionnaire {
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
export const onCreateSkypeCheckoutSession = /* GraphQL */ `
  subscription OnCreateSkypeCheckoutSession {
    onCreateSkypeCheckoutSession {
      id
      userId
      skypeId
      object
      afterEexpiration
      allowPromotionCodes
      amountSubtotal
      amountTotal
      clientReferenceId
      consent
      consentCollection
      currency
      customer
      customerCreation
      customerDetails
      customerEmail
      expires_at
      livemode
      locale
      metadata
      mode
      paymentIntent
      paymentLink
      paymentMethodOptions
      paymentMethodTypes
      paymentStatus
      phoneNumberCollection
      recoveredFrom
      setupIntent
      shipping
      shippingAddressCollection
      shippingOptions
      shippingRate
      status
      submitType
      subscription
      totalDetails
      url
      createdAt
      updatedAt
      deletedAt
      deleteFlg
      answerComment
    }
  }
`;
export const onUpdateSkypeCheckoutSession = /* GraphQL */ `
  subscription OnUpdateSkypeCheckoutSession {
    onUpdateSkypeCheckoutSession {
      id
      userId
      skypeId
      object
      afterEexpiration
      allowPromotionCodes
      amountSubtotal
      amountTotal
      clientReferenceId
      consent
      consentCollection
      currency
      customer
      customerCreation
      customerDetails
      customerEmail
      expires_at
      livemode
      locale
      metadata
      mode
      paymentIntent
      paymentLink
      paymentMethodOptions
      paymentMethodTypes
      paymentStatus
      phoneNumberCollection
      recoveredFrom
      setupIntent
      shipping
      shippingAddressCollection
      shippingOptions
      shippingRate
      status
      submitType
      subscription
      totalDetails
      url
      createdAt
      updatedAt
      deletedAt
      deleteFlg
      answerComment
    }
  }
`;
export const onDeleteSkypeCheckoutSession = /* GraphQL */ `
  subscription OnDeleteSkypeCheckoutSession {
    onDeleteSkypeCheckoutSession {
      id
      userId
      skypeId
      object
      afterEexpiration
      allowPromotionCodes
      amountSubtotal
      amountTotal
      clientReferenceId
      consent
      consentCollection
      currency
      customer
      customerCreation
      customerDetails
      customerEmail
      expires_at
      livemode
      locale
      metadata
      mode
      paymentIntent
      paymentLink
      paymentMethodOptions
      paymentMethodTypes
      paymentStatus
      phoneNumberCollection
      recoveredFrom
      setupIntent
      shipping
      shippingAddressCollection
      shippingOptions
      shippingRate
      status
      submitType
      subscription
      totalDetails
      url
      createdAt
      updatedAt
      deletedAt
      deleteFlg
      answerComment
    }
  }
`;
