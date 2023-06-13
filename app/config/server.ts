import md5 from "spark-md5";
// import { useAppConfig } from "../store";
// import { useAppConfig } from "../store/config";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY?: string;
      CODE?: string;
      PROXY_URL?: string;
      VERCEL?: string;
    }
  }
}

const ACCESS_CODES = (function getAccessCodes(): Set<string> {
  const code = process.env.CODE;

  try {
    const codes = (code?.split(",") ?? [])
      .filter((v) => !!v)
      .map((v) => md5.hash(v.trim()));
    return new Set(codes);
  } catch (e) {
    return new Set();
  }
})();


export const getServerSideConfig = () => {
  
  if (typeof process === "undefined") {
    throw Error(
      "[Server Config] you are importing a nodejs-only module outside of nodejs",
    );
  }

  const apiKeys = (process.env.OPENAI_API_KEY ?? '').split(',')
  const apiKey = apiKeys.at(Math.floor(Math.random() * apiKeys.length )) ?? ''

  // let apiKey = ""
  // if (useAppConfig.getState().modelConfig.model == "gpt-3.5-turbo"|| useAppConfig.getState().modelConfig.model == "gpt-3.5-turbo-0301"){
  //   apiKey = apiKeys[0]
  // }else{
  //   apiKey = apiKeys[1]
  // }

  return {
    apiKey,
    code: process.env.CODE,
    codes: ACCESS_CODES,
    needCode: ACCESS_CODES.size > 0,
    proxyUrl: process.env.PROXY_URL,
    isVercel: !!process.env.VERCEL,
  };
};
