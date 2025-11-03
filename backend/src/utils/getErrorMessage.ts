export const getErrorMessage = (err: unknown): string => {
	if (typeof err === "string") return err;
	if (err instanceof Error) return err.message;
	return "Something went wrong";
};
