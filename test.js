const TextLintTester = require('textlint-tester');
const rule = require('./index');

const { getText, updateCase } = rule.test;
const tester = new TextLintTester();

describe('getText', () => {
	test('ATX style headers', () => {
		expect(getText({
			type: 'Header',
			depth: 1,
			raw: '# This Is a Title',
			range: [0, 17],
			children: [{
				type: 'Str',
				value: 'This Is a Title',
				range: [1, 17],
			}],
		})).toBe('This Is a Title');
		expect(getText({
			type: 'Header',
			depth: 2,
			raw: '## This Is a Subtitle',
			range: [0, 21],
			children: [{
				type: 'Str',
				value: 'This Is a Subtitle',
				range: [2, 21],
			}],
		})).toBe('This Is a Subtitle');
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
			text: '# This **Is a** Title',
		},
		{
			text: '# _This Is a Title_',
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
		{
			text: '# _This is a title_',
			output: '# _This Is a Title_',
			errors: [
				{
					message: 'Incorrect title casing: “This is a title”, use “This Is a Title” instead',
				},
			],
		},
		{
			text: '# _**This is a title**_',
			output: '# _**This Is a Title**_',
			errors: [
				{
					message: 'Incorrect title casing: “This is a title”, use “This Is a Title” instead',
				},
			],
		},
	],
});

tester.run(
	'textlint-rule-title-case',
	{
		rules: [
			{
				ruleId: 'title-case',
				rule,
				options: {
					headingLevels: [1]
				},
			},
		],
	},
	{
		valid: [
			{
				// The rule should only be applied on document title (level 1)
				// The document title (level 1) is using AP/APA title case but the section title (level 2) is *not*
				text: '# This Is a Title\n\n## This is a subtitle',
			},
		],
		invalid: [
			{
				text: '# This is a title\n\n## This Is a Subtitle',
				output: '# This Is a Title\n\n## This Is a Subtitle',
				errors: [
					{
						message:
							'Incorrect title casing: “This is a title”, use “This Is a Title” instead',
					},
				],
			},
		],
	}
);

tester.run(
	'textlint-rule-title-case',
	{
		rules: [
			{
				ruleId: 'title-case',
				rule,
				options: {
					exclusions: [
						'reveal.js'
					]
				},
			},
		],
	},
	{
		valid: [
			{
				text: '# reveal.js Configuration Options',
			},
		],
		invalid: [
			{
				text: '# node.js Configuration Options',
				output: '# Node.js Configuration Options',
				errors: [
					{
						message:
							'Incorrect title casing: “node.js Configuration Options”, use “Node.js Configuration Options” instead',
					},
				],
			},
		],
	}
);
