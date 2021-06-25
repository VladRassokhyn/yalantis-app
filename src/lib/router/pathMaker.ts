const PARAM_PREFIX = ":";

export const pathMaker = (path: string) => {
  return (params?: {[key: string]: string}) => {
    if (params) {
      return Object.entries(params).reduce(
        (resultPath, [key, value]) =>
          resultPath.replace(
            `${PARAM_PREFIX}${key}`,
            value
          ),
        path
      );
    } else {
      return path
    }
  };
};
