const Endpoint = {
  LOGIN: "/login",
  SIGN_UP: "/signup",
  SIGN_OUT: "/signout",
  CHANGE_PASSWORD: "/change_password",
  FORGOT_PASSWORD: "/forgot_password",
  CONFIRM_FORGOT_PASSWORD: "/confirm_forgot_password",
  VERIFY_OTP: "/verify_otp",
  RESEND_OTP: "/resend_otp",
  VERIFY_MFA: "/mfa_verify",
  IS_MFA: "/is_mfa",
  GET_SOFTWARE_TOKEN: "/associate_software_token",
  VERIFY_SOFTWARE_TOKEN: "/verify_software_token",
  SET_MFA_PREFERENCE: "/set_mfa_preference",
  UAM: {
    KEYWORD_OVERVIEW:
      "/api/v1/ecom/unified_ad_manager/keyword_overview/post/",
    KEYWORD_UPDATE: "/api/v1/ecom/unified_ad_manager/keyword_update/post/",
    AD_GROUP_OVERVIEW:
      "/api/v1/ecom/unified_ad_manager/ad_group_overview/post/",
    CAMPAIGN_OVERVIEW_POST:
      "/api/v1/ecom/unified_ad_manager/campaign_update/post/",
    CAMPAIGN_OVERVIEW:
      "/api/v1/ecom/unified_ad_manager/campaign_overview/post/",
    PRODUCT_OVERVIEW:
      "/api/v1/ecom/unified_ad_manager/product_overview/post/",
    PRODUCT_OVERVIEW_UPDATE:
      "/api/v1/ecom/unified_ad_manager/product_update/post/",
    AD_GROUP_UPDATE:
      "/api/v1/ecom/unified_ad_manager/ad_group_update/post/",
    CREATE_CAMPAIGN:
      "/api/v1/ecom/unified_ad_manager/campaign_create/post/",
    PLATFORM_FILTER:
      "/api/v1/ecom/unified_ad_manager/filters/platform/post/",
    STATUS_FILTER: "/api/v1/ecom/unified_ad_manager/filters/status/post/",
    CAMPAIGN_TYPE_FILTER:
      "/api/v1/ecom/unified_ad_manager/filters/campaign_type/post/",
    CAMPAIGN_NAME_FILTER:
      "/api/v1/ecom/unified_ad_manager/filters/campaign_name/post/",
    AD_GROUP_NAME_FILTER:
      "/api/v1/ecom/unified_ad_manager/filters/ad_group_name/post/",
    KEYWORD_FILTER:
      "/api/v1/ecom/unified_ad_manager/filters/keyword/post/",
    MATCH_TYPE_FILTER:
      "/api/v1/ecom/unified_ad_manager/filters/keyword/post/",
    PRODUCT_CODE_FILTER:
      "/api/v1/ecom/unified_ad_manager/filters/product_code/post/",
  },
};

export const RULE_ENGINE_URL =
  process.env.NEXT_PUBLIC_RULE_ENGINE_URL || "https://ruleengine.mfilterit.net";

export default Endpoint;
