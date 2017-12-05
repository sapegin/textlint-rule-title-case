const titleCase = require('ap-style-title-case');

const DEFAULT_OPTIONS = {
	exclusions: [],
};
const headerRegExp = /^#*\s*(.*?)\s*[=-]*$/;

function reporter(context, options = {}) {
	const opts = Object.assign({}, DEFAULT_OPTIONS, options);
	const { Syntax, RuleError, report, fixer, getSource } = context;
	return {
		[Syntax.Header](node) {
			return new Promise(resolve => {
				const text = getSource(node);
				const match = text.match(headerRegExp);
				const matched = match[1];
				const replacement = updateCase(matched, opts.exclusions);
				if (matched !== replacement) {
					const index = text.indexOf(matched);
					const range = [index, index + matched.length];
					const fix = fixer.replaceTextRange(range, replacement);
					const message = `Incorrect title casing: “${matched}”, use “${replacement}” instead`;
					report(node, new RuleError(message, { index: 0, fix }));
				}

				resolve();
			});
		},
	};
}

/**
 * Apply the title case with a list of exclusions.
 *
 * @param {string} text
 * @param {string[]} exclusions
 * @return {string}
 */
function updateCase(text, exclusions) {
	text = titleCase(text);
	const words = text.trim().split(/\s+/);
	const correctedWords = words.map(word => {
		const lowerWord = word.toLowerCase();
		const exclusion = exclusions.find(w => w.toLowerCase() === lowerWord);
		return exclusion || word;
	});

	return correctedWords.join(' ');
}

module.exports = {
	linter: reporter,
	fixer: reporter,
	test: {
		headerRegExp,
		updateCase,
	},
};
