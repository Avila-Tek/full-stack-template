// Type to create a log with Axiom
export type TCreateLog = {
  message: string;
  source: string;
  userId?: string;
  userEmail?: string;
  error?: Error;
};
