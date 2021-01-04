const StringSource = require("textlint-util-to-string").StringSource;
const titleCase = require('ap-style-title-case');

const DEFAULT_OPTIONS = {
	exclusions: [],
};

function reporter(context) {
	const opts = Object.assign({}, DEFAULT_OPTIONS);
	const { Syntax, RuleError, report, fixer } = context;
	return {
		[Syntax.Header](node) {
			return new Promise(resolve => {
				const text = getText(node);
				const replacement = updateCase(text, opts.exclusions);
				if (text !== replacement) {
					const index = getFirstStrIndex(node);
					const range = [index, index + text.length];
					const fix = fixer.replaceTextRange(range, replacement);
					const message = `Incorrect title casing: “${text}”, use “${replacement}” instead`;
					report(node, new RuleError(message, { index: 0, fix }));
				}

				resolve();
			});
		},
	};
}

/**
 * Get the first Str node index.
 * @param node
 * @returns {number}
 */
function getFirstStrIndex(node) {
	const firstStrNode = getFirstStrNode(node);
	if (firstStrNode) {
		return firstStrNode.range[0];
	}
	return 0;
}

/**
 * Get the first Str node.
 * @param parent
 * @returns {undefined|*}
 */
function getFirstStrNode(parent) {
	if (parent.type === 'Str') {
		return parent;
	}
	if (parent.children) {
		for (const child of parent.children) {
			const result = getFirstStrNode(child);
			if (result) {
				return result;
			}
		}
	}
	return undefined;
}

/**
 * Extract text content from a Node.
 * @return {string}
 */
function getText(node) {
  const source = new StringSource(node);
	return source.toString();
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
		getText,
		updateCase,
	},
};
