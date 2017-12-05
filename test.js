const TextLintTester = require('textlint-tester');
const rule = require('./index');

const { headerRegExp, updateCase } = rule.test;
const tester = new TextLintTester();

describe('headerRegExp', () => {
	test('ATX style headers', () => {
		expect('# This Is a Title'.match(headerRegExp)[1]).toBe('This Is a Title');
		expect('## This Is a Subtitle'.match(headerRegExp)[1]).toBe('This Is a Subtitle');
	});
	test('Setext style headers', () => {
		expect('This Is a Title\n==='.match(headerRegExp)[1]).toBe('This Is a Title');
		expect('This Is a Subtitle\n---'.match(headerRegExp)[1]).toBe('This Is a Subtitle');
	});
});

describe('updateCase', () => {
	test('exclusions', () => {
		expect(updateCase('what is an npm package', ['npm'])).toBe('What Is an npm Package');
	});
	test('ignore case', () => {
		expect(updateCase('new webpack version', ['webpack'])).toBe('New webpack Version');
		expect(updateCase('foo a bar', ['A'])).toBe('Foo A Bar');
	});
});

tester.run('textlint-rule-terminology', rule, {
	valid: [
		{
			text: '# This Is a Title\n\n## This Is a Subtitle',
		},
		{
			text: 'This Is a Title\n===\n\nThis Is a Subtitle\n---',
		},
		{
			// FIXME: Should be "This **Is a** Title" but proper markup support would be hard
			text: '# This **Is A** Title',
		},
	],
	invalid: [
		{
			text: '# This is a title',
			output: '# This Is a Title',
			errors: [
				{
					message: 'Incorrect title casing: “This is a title”, use “This Is a Title” instead',
				},
			],
		},
	],
});
