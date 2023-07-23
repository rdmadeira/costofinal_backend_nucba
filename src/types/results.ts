type Success<T> = {
  data: T;
  message: String;
};

type Failure = {
  error: Error;
};

export type APIResponse<T> = Success<T> | Failure;
