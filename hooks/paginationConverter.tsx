const useConvertPagination = (n: number) => {
	if (n <= 1) return 0;
	return (n - 1) * 10;
};

export default useConvertPagination;
