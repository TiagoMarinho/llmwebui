const sendMessage = async (text, params, character) => {
	// Call OpenAI API or local LLM
	const mockData = {
		response: 'Hello, world!',
		params: '{"temperature": 0.7}',
		character: 'Alice'
	}
	return mockData; // placeholder
};

export default { sendMessage };